import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialiser Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware de sécurité

// Rate limiting pour prévenir les attaques par force brute
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10; // Max 10 requêtes par minute par IP

const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, startTime: now });
    } else {
        const record = rateLimit.get(ip);
        if (now - record.startTime > RATE_LIMIT_WINDOW) {
            rateLimit.set(ip, { count: 1, startTime: now });
        } else {
            record.count++;
            if (record.count > MAX_REQUESTS) {
                return res.status(429).json({ 
                    success: false, 
                    message: 'Trop de requêtes. Veuillez réessayer plus tard.' 
                });
            }
        }
    }
    next();
};

// CORS configuré avec origines spécifiques
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://eternatech.net',
    'https://www.eternatech.net',
    'https://eternatech-web-site-v2.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
        // Permettre les requêtes sans origin (comme les apps mobiles ou Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    },
    credentials: true
}));

// Limiter la taille des requêtes JSON (protection contre les attaques de payload)
app.use(express.json({ limit: '10kb' }));

// Headers de sécurité avec Helmet
app.use(helmet({
    contentSecurityPolicy: false, // Désactivé pour permettre le frontend
    crossOriginEmbedderPolicy: false
}));

// Configuration des emails de destination
const CONTACT_EMAIL = process.env.EMAIL_USER || 'contact@eternatech.net';
const SERVICE_EMAIL = process.env.SERVICE_EMAIL_USER || 'service@eternatech.net';

// Debug
console.log('📧 Resend API Key configurée:', process.env.RESEND_API_KEY ? 'OUI' : 'NON');
console.log('📧 Contact email:', CONTACT_EMAIL);
console.log('📧 Service email:', SERVICE_EMAIL);

// Endpoint de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Endpoint pour envoyer un email (avec rate limiting)
app.post(
  '/api/contact',
  rateLimitMiddleware,
  [
    body('name').trim().notEmpty().escape().withMessage('Le nom est requis'),
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('subject').trim().notEmpty().escape().withMessage('Le sujet est requis'),
    body('message').trim().notEmpty().escape().withMessage('Le message est requis'),
    body('phone').optional().trim().escape(),
    body('company').optional().trim().escape(),
  ],
  async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, subject, message, phone, company } = req.body;

    // Déterminer si c'est une demande de service (contient "Demande de devis")
    const isServiceRequest = subject && subject.includes('Demande de devis');
    const recipientEmail = isServiceRequest ? SERVICE_EMAIL : CONTACT_EMAIL;

    try {
      // Envoyer l'email via Resend
      const { data, error } = await resend.emails.send({
        from: 'Eterna Tech <onboarding@resend.dev>', // Utilisez votre domaine vérifié sur Resend
        to: [recipientEmail],
        replyTo: email,
        subject: `[Site Web] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">${isServiceRequest ? 'Nouvelle demande de service' : 'Nouveau message'} - Eterna Tech</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
              ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
              <p><strong>Sujet:</strong> ${subject}</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2563eb;">
              <h3 style="color: #1e293b;">Message:</h3>
              <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
              <p>Cet email a été envoyé depuis le ${isServiceRequest ? 'formulaire de demande de service' : 'formulaire de contact'} du site web Eterna Tech.</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('❌ Erreur Resend:', error);
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de l\'envoi de l\'email',
          error: process.env.NODE_ENV !== 'production' ? error.message : 'Erreur serveur',
        });
      }

      console.log('✅ Email envoyé via Resend:', data.id);
      
      res.status(200).json({
        success: true,
        message: 'Email envoyé avec succès',
        messageId: data.id,
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'envoi de l\'email',
        error: process.env.NODE_ENV !== 'production' ? error.message : 'Erreur serveur',
      });
    }
  }
);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📧 Configuration email: ${process.env.EMAIL_USER}`);
});
