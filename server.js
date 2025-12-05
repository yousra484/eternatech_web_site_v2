import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
    'https://www.eternatech.net'
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

// Configuration du transporteur Nodemailer pour contact@eternatech.net
const contactTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Configuration du transporteur Nodemailer pour service@eternatech.net
const serviceTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SERVICE_EMAIL_USER || 'service@eternatech.net',
    pass: process.env.SERVICE_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Debug: afficher les variables d'environnement (sans les mots de passe)
if (process.env.NODE_ENV !== 'production') {
    console.log('📧 Contact email:', process.env.EMAIL_USER);
    console.log('📧 Service email:', process.env.SERVICE_EMAIL_USER);
    console.log('🔑 Service pass défini:', process.env.SERVICE_EMAIL_PASS ? 'OUI' : 'NON');
}

// Vérifier la connexion aux serveurs SMTP
contactTransporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Erreur SMTP contact:', error);
  } else {
    console.log('✅ SMTP contact@eternatech.net prêt');
  }
});

serviceTransporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Erreur SMTP service:', error);
  } else {
    console.log('✅ SMTP service@eternatech.net prêt');
  }
});

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
    const transporter = isServiceRequest ? serviceTransporter : contactTransporter;
    const recipientEmail = isServiceRequest 
      ? (process.env.SERVICE_EMAIL_USER || 'service@eternatech.net')
      : process.env.EMAIL_USER;

    // Configuration de l'email
    const mailOptions = {
      from: `"${name}" <${recipientEmail}>`,
      to: recipientEmail,
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
      text: `
${isServiceRequest ? 'Nouvelle demande de service' : 'Nouveau message'} - Eterna Tech

Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ''}
${company ? `Entreprise: ${company}` : ''}
Sujet: ${subject}

Message:
${message}
      `,
    };

    try {
      // Envoyer l'email
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email envoyé:', info.messageId);
      
      res.status(200).json({
        success: true,
        message: 'Email envoyé avec succès',
        messageId: info.messageId,
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      // Ne pas exposer les détails de l'erreur en production
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
