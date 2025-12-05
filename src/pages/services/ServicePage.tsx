import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Check, Home, Send, Loader2, CheckCircle } from 'lucide-react';

// Composant Canvas pour l'arrière-plan animé
function TechBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let mouse = { x: 0, y: 0 };
        
        interface Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
        }
        
        const particles: Particle[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            init();
        };

        const init = () => {
            particles.length = 0;
            const count = Math.floor((canvas.width * canvas.height) / 10000);
            for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 0.5,
                    color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6',
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 100;
                
                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    p.x -= dx * force * 0.02;
                    p.y -= dy * force * 0.02;
                }

                p.x += (p.originX - p.x) * 0.01 + p.vx;
                p.y += (p.originY - p.y) * 0.01 + p.vy;

                if (p.originX < 0 || p.originX > canvas.width) p.vx *= -1;
                if (p.originY < 0 || p.originY > canvas.height) p.vy *= -1;
                p.originX += p.vx;
                p.originY += p.vy;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (dist2 < 80) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = (1 - dist2 / 80) * 0.4;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        resize();
        animate();
        
        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
            style={{ background: 'transparent' }}
        />
    );
}

// Données des services
const servicesData: Record<string, {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
    features: string[];
    includes: string[];
}> = {
    'developpement-web': {
        title: 'Développement Web',
        description: 'Nous créons des sites web sur mesure, modernes et performants qui reflètent l\'identité de votre entreprise et répondent à vos objectifs commerciaux.',
        steps: [
            {
                title: '1. Analyse des besoins',
                description: 'Nous commençons par une consultation approfondie pour comprendre vos objectifs, votre audience cible et vos exigences fonctionnelles.'
            },
            {
                title: '2. Conception & Maquettage',
                description: 'Création de maquettes visuelles (wireframes et mockups) pour valider le design et l\'architecture du site avant le développement.'
            },
            {
                title: '3. Développement',
                description: 'Codage du site avec les technologies les plus récentes (React, Next.js, Node.js) en respectant les bonnes pratiques de développement.'
            },
            {
                title: '4. Tests & Optimisation',
                description: 'Tests approfondis sur tous les navigateurs et appareils, optimisation des performances et du référencement SEO.'
            },
            {
                title: '5. Hébergement & Nom de domaine',
                description: 'Configuration de l\'hébergement sécurisé, installation du certificat SSL et configuration de votre nom de domaine personnalisé.'
            },
            {
                title: '6. Mise en ligne & Formation',
                description: 'Déploiement du site en production et formation à l\'utilisation du back-office pour gérer votre contenu.'
            },
            {
                title: '7. Maintenance & Support',
                description: 'Support technique continu, mises à jour de sécurité et maintenance préventive pour garantir la pérennité de votre site.'
            }
        ],
        features: [
            'Design responsive adapté à tous les écrans',
            'Optimisation SEO pour un meilleur référencement',
            'Performance optimale (temps de chargement rapide)',
            'Sécurité renforcée avec certificat SSL',
            'Interface d\'administration intuitive',
            'Intégration des réseaux sociaux',
            'Formulaires de contact sécurisés',
            'Analytics et suivi des performances'
        ],
        includes: [
            'Hébergement premium pendant 1 an',
            'Nom de domaine offert la première année',
            'Certificat SSL gratuit',
            '5 adresses email professionnelles',
            'Sauvegarde automatique quotidienne',
            'Support technique 6 mois'
        ]
    },
    'applications-mobiles': {
        title: 'Applications Mobiles',
        description: 'Développement d\'applications iOS et Android natives ou cross-platform pour offrir une expérience utilisateur exceptionnelle.',
        steps: [
            { title: '1. Définition du projet', description: 'Analyse des besoins, définition des fonctionnalités et choix de la technologie (React Native, Flutter, natif).' },
            { title: '2. Design UX/UI', description: 'Conception des interfaces utilisateur intuitives et création des prototypes interactifs.' },
            { title: '3. Développement', description: 'Programmation de l\'application avec les meilleures pratiques de développement mobile.' },
            { title: '4. Tests', description: 'Tests unitaires, tests d\'intégration et tests utilisateurs sur différents appareils.' },
            { title: '5. Publication', description: 'Soumission sur l\'App Store et Google Play Store avec optimisation ASO.' },
            { title: '6. Maintenance', description: 'Mises à jour régulières, corrections de bugs et ajout de nouvelles fonctionnalités.' }
        ],
        features: ['Applications iOS et Android', 'Interface intuitive', 'Notifications push', 'Mode hors-ligne', 'Intégration API', 'Sécurité des données'],
        includes: ['Publication sur les stores', 'Support technique 3 mois', 'Documentation technique', 'Formation utilisateur']
    },
    'ia-machine-learning': {
        title: 'IA & Machine Learning',
        description: 'Création de modèles d\'intelligence artificielle sur mesure, apprentissage automatique et apprentissage fédéré pour des solutions intelligentes et innovantes.',
        steps: [
            { title: '1. Analyse des données', description: 'Étude de vos données existantes, identification des cas d\'usage et définition des objectifs du modèle IA.' },
            { title: '2. Préparation des données', description: 'Collecte, nettoyage et prétraitement des données pour l\'entraînement du modèle.' },
            { title: '3. Conception du modèle', description: 'Choix de l\'architecture (réseaux de neurones, arbres de décision, etc.) et conception du modèle adapté.' },
            { title: '4. Entraînement', description: 'Entraînement du modèle avec vos données, optimisation des hyperparamètres et validation croisée.' },
            { title: '5. Tests & Validation', description: 'Évaluation des performances du modèle, tests sur données réelles et ajustements.' },
            { title: '6. Déploiement', description: 'Intégration du modèle dans votre infrastructure et mise en production.' },
            { title: '7. Monitoring & Amélioration', description: 'Surveillance des performances, réentraînement périodique et amélioration continue.' }
        ],
        features: [
            'Modèles d\'IA personnalisés',
            'Apprentissage automatique (Machine Learning)',
            'Apprentissage fédéré (Federated Learning)',
            'Deep Learning & Réseaux de neurones',
            'Vision par ordinateur',
            'Traitement du langage naturel (NLP)',
            'Analyse prédictive',
            'Détection d\'anomalies'
        ],
        includes: [
            'Audit données gratuit',
            'Prototype fonctionnel',
            'Documentation technique complète',
            'Formation équipe',
            'Support technique 6 mois',
            'Code source et modèles'
        ]
    },
    'modelisation-3d': {
        title: 'Modélisation 3D & Prototypage',
        description: 'Création de modèles 3D professionnels et prototypes pour visualiser vos projets avant leur réalisation.',
        steps: [
            { title: '1. Brief créatif', description: 'Compréhension de votre vision et des spécifications techniques du projet.' },
            { title: '2. Modélisation', description: 'Création du modèle 3D avec les logiciels professionnels (Blender, 3ds Max, Maya).' },
            { title: '3. Texturing', description: 'Application des textures et matériaux réalistes.' },
            { title: '4. Rendu', description: 'Génération des images et animations haute qualité.' },
            { title: '5. Prototypage', description: 'Impression 3D ou création de prototypes virtuels interactifs.' },
            { title: '6. Livraison', description: 'Fourniture des fichiers dans tous les formats nécessaires.' }
        ],
        features: ['Modélisation haute précision', 'Rendus photoréalistes', 'Animation 3D', 'Impression 3D', 'Réalité virtuelle', 'Visualisation architecturale'],
        includes: ['Fichiers sources', 'Rendus HD', 'Révisions incluses', 'Export multi-formats']
    },
    'conception-graphique': {
        title: 'Conception Graphique & Design',
        description: 'Création d\'identités visuelles uniques et de supports marketing percutants pour votre marque.',
        steps: [
            { title: '1. Découverte', description: 'Analyse de votre marque, vos valeurs et votre positionnement.' },
            { title: '2. Recherche', description: 'Étude de la concurrence et des tendances du marché.' },
            { title: '3. Concepts', description: 'Création de plusieurs propositions créatives.' },
            { title: '4. Développement', description: 'Raffinement du concept choisi et déclinaisons.' },
            { title: '5. Charte graphique', description: 'Documentation complète de l\'identité visuelle.' },
            { title: '6. Livraison', description: 'Fourniture de tous les fichiers et formats.' }
        ],
        features: ['Logo & identité visuelle', 'Charte graphique', 'Supports print', 'Supports digitaux', 'Packaging', 'Signalétique'],
        includes: ['Logo en plusieurs formats', 'Charte graphique PDF', 'Fichiers sources', 'Guide d\'utilisation']
    },
    'ui-ux': {
        title: 'UI/UX Design',
        description: 'Conception d\'interfaces utilisateur intuitives et d\'expériences utilisateur optimisées.',
        steps: [
            { title: '1. Recherche utilisateur', description: 'Études utilisateurs, personas et parcours clients.' },
            { title: '2. Architecture', description: 'Définition de l\'arborescence et des flux de navigation.' },
            { title: '3. Wireframes', description: 'Création des maquettes fil de fer pour valider la structure.' },
            { title: '4. Design UI', description: 'Conception des interfaces visuelles finales.' },
            { title: '5. Prototypage', description: 'Création de prototypes interactifs pour les tests.' },
            { title: '6. Tests utilisateurs', description: 'Validation avec de vrais utilisateurs et itérations.' }
        ],
        features: ['Recherche UX', 'Wireframing', 'Design system', 'Prototypes interactifs', 'Tests utilisateurs', 'Accessibilité'],
        includes: ['Fichiers Figma/Sketch', 'Design system', 'Documentation UX', 'Prototype cliquable']
    },
    'formation-it': {
        title: 'Formation IT',
        description: 'Programmes de formation personnalisés pour développer les compétences technologiques de vos équipes.',
        steps: [
            { title: '1. Évaluation', description: 'Analyse des compétences actuelles et des besoins de formation.' },
            { title: '2. Programme', description: 'Création d\'un programme de formation sur mesure.' },
            { title: '3. Planning', description: 'Organisation des sessions selon vos disponibilités.' },
            { title: '4. Formation', description: 'Sessions de formation théoriques et pratiques.' },
            { title: '5. Exercices', description: 'Travaux pratiques et projets concrets.' },
            { title: '6. Certification', description: 'Évaluation finale et remise des attestations.' }
        ],
        features: ['Formation sur mesure', 'Formateurs experts', 'Support de cours', 'Exercices pratiques', 'Certification', 'Suivi post-formation'],
        includes: ['Supports de cours', 'Accès plateforme e-learning', 'Attestation de formation', 'Support 1 mois']
    },
    'reseaux-domestiques': {
        title: 'Installation Réseaux Domestiques',
        description: 'Configuration et installation de réseaux domestiques sécurisés pour une connectivité optimale.',
        steps: [
            { title: '1. Diagnostic', description: 'Analyse de vos besoins et de la configuration de votre domicile.' },
            { title: '2. Conception', description: 'Planification du réseau et choix des équipements.' },
            { title: '3. Installation', description: 'Mise en place du câblage et des équipements réseau.' },
            { title: '4. Configuration', description: 'Paramétrage du routeur, Wi-Fi et sécurité.' },
            { title: '5. Tests', description: 'Vérification de la couverture et des performances.' },
            { title: '6. Formation', description: 'Explication du fonctionnement et des bonnes pratiques.' }
        ],
        features: ['Wi-Fi haute performance', 'Câblage structuré', 'Sécurité réseau', 'Domotique', 'NAS & stockage', 'VPN'],
        includes: ['Diagnostic gratuit', 'Équipements garantis', 'Configuration complète', 'Support téléphonique']
    },
    'blockchain-securite': {
        title: 'Blockchain & Sécurité des Données',
        description: 'Solutions blockchain innovantes et stratégies de cybersécurité pour protéger vos actifs numériques.',
        steps: [
            { title: '1. Audit sécurité', description: 'Évaluation des vulnérabilités et des risques actuels.' },
            { title: '2. Stratégie', description: 'Définition de la stratégie de sécurité et/ou blockchain.' },
            { title: '3. Développement', description: 'Mise en place des solutions techniques.' },
            { title: '4. Smart contracts', description: 'Développement et audit des contrats intelligents.' },
            { title: '5. Déploiement', description: 'Mise en production sécurisée.' },
            { title: '6. Monitoring', description: 'Surveillance continue et alertes de sécurité.' }
        ],
        features: ['Smart contracts', 'NFT & tokens', 'Audit sécurité', 'Cryptographie', 'DeFi', 'Conformité RGPD'],
        includes: ['Rapport d\'audit', 'Documentation technique', 'Formation sécurité', 'Support continu']
    },
    'e-commerce': {
        title: 'E-Commerce',
        description: 'Création de boutiques en ligne performantes pour développer vos ventes sur internet.',
        steps: [
            { title: '1. Stratégie', description: 'Définition de votre stratégie e-commerce et analyse du marché.' },
            { title: '2. Catalogue', description: 'Organisation de vos produits et création des fiches.' },
            { title: '3. Développement', description: 'Création de la boutique (Shopify, WooCommerce, sur mesure).' },
            { title: '4. Paiement', description: 'Intégration des solutions de paiement sécurisées.' },
            { title: '5. Logistique', description: 'Configuration de la gestion des stocks et livraisons.' },
            { title: '6. Lancement', description: 'Mise en ligne et stratégie marketing de lancement.' }
        ],
        features: ['Boutique responsive', 'Paiement sécurisé', 'Gestion des stocks', 'Multi-devises', 'SEO e-commerce', 'Analytics'],
        includes: ['Hébergement 1 an', 'SSL gratuit', 'Formation back-office', 'Support 6 mois']
    },
    'publicite': {
        title: 'Agence de Publicité',
        description: 'Stratégies marketing digitales et campagnes publicitaires pour accroître votre visibilité.',
        steps: [
            { title: '1. Analyse', description: 'Étude de votre marché, concurrence et audience cible.' },
            { title: '2. Stratégie', description: 'Définition des objectifs et du plan marketing.' },
            { title: '3. Création', description: 'Conception des visuels et contenus publicitaires.' },
            { title: '4. Campagnes', description: 'Lancement des campagnes sur les plateformes choisies.' },
            { title: '5. Optimisation', description: 'Suivi des performances et optimisation continue.' },
            { title: '6. Reporting', description: 'Rapports détaillés et recommandations.' }
        ],
        features: ['Google Ads', 'Facebook/Instagram Ads', 'LinkedIn Ads', 'SEO/SEA', 'Community management', 'Influence marketing'],
        includes: ['Audit marketing gratuit', 'Rapports mensuels', 'Visuels publicitaires', 'Conseil stratégique']
    },
    'label-projet-innovant': {
        title: 'Dépôt Label Projet Innovant',
        description: 'Accompagnement complet pour l\'obtention du label projet innovant et accès aux financements.',
        steps: [
            { title: '1. Évaluation', description: 'Analyse de l\'éligibilité de votre projet au label.' },
            { title: '2. Préparation', description: 'Constitution du dossier et des documents requis.' },
            { title: '3. Business plan', description: 'Rédaction ou amélioration de votre business plan.' },
            { title: '4. Pitch', description: 'Préparation de votre présentation devant le comité.' },
            { title: '5. Dépôt', description: 'Soumission officielle du dossier.' },
            { title: '6. Suivi', description: 'Accompagnement jusqu\'à l\'obtention du label.' }
        ],
        features: ['Étude d\'éligibilité', 'Rédaction dossier', 'Business plan', 'Coaching pitch', 'Suivi administratif', 'Mise en relation'],
        includes: ['Consultation initiale gratuite', 'Modèles de documents', 'Révisions illimitées', 'Accompagnement personnalisé']
    },
    'label-startup': {
        title: 'Dépôt Label Startup',
        description: 'Assistance complète pour l\'obtention du label startup et tous les avantages fiscaux associés.',
        steps: [
            { title: '1. Diagnostic', description: 'Vérification des critères d\'éligibilité au label startup.' },
            { title: '2. Documentation', description: 'Préparation de tous les documents administratifs requis.' },
            { title: '3. Dossier technique', description: 'Rédaction du dossier de présentation du projet.' },
            { title: '4. Validation', description: 'Vérification et validation du dossier complet.' },
            { title: '5. Soumission', description: 'Dépôt officiel auprès des autorités compétentes.' },
            { title: '6. Obtention', description: 'Suivi jusqu\'à l\'obtention du label et accompagnement post-label.' }
        ],
        features: ['Avantages fiscaux', 'Exonérations', 'Accès financements', 'Réseau entrepreneurs', 'Accompagnement ANADE', 'Facilités bancaires'],
        includes: ['Étude de faisabilité', 'Dossier complet', 'Accompagnement administratif', 'Suivi post-obtention']
    }
};

export default function ServicePage() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = serviceId ? servicesData[serviceId] : null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!service) {
        return (
            <div className="min-h-screen bg-darker flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Service non trouvé</h1>
                    <Link to="/" className="text-primary hover:text-secondary">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: `Demande de devis - ${service.title}`,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success('Votre demande a été envoyée avec succès !');
                setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                // Reset success state after 5 seconds
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                toast.error('Erreur lors de l\'envoi de la demande');
            }
        } catch {
            toast.error('Erreur de connexion au serveur');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-darker">
            {/* Header */}
            <header className="fixed w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-full text-white hover:border-primary/50 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Retour</span>
                        <Home size={16} className="text-primary" />
                    </Link>
                    <div className="hidden sm:flex items-center gap-3">
                        <img src="/logo.png" alt="Eterna Tech" className="h-14 w-20 object-cover object-center scale-150" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Eterna Tech</span>
                    </div>
                </div>
            </header>

            {/* Hero Section with animated background */}
            <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-dark to-darker overflow-hidden min-h-[50vh] flex items-center">
                {/* Animated tech background */}
                <TechBackground />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent" />
                
                {/* Glow orbs */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                        {service.title}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Étapes du processus - Design créatif */}
            <section className="py-20 px-4 bg-dark relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
                
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Notre Processus
                        </h2>
                    </div>
                    
                    {/* Timeline container */}
                    <div className="relative">
                        {/* Vertical line for desktop */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 transform -translate-x-1/2" />
                        
                        <div className="space-y-8 md:space-y-0">
                            {service.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`relative md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Content card */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                        <div className="group relative p-6 bg-gradient-to-br from-darker/80 to-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                {/* Mobile step number */}
                                                <div className="md:hidden flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                                                    {index + 1}
                                                </div>
                                                
                                                <div className="flex-1 relative z-10">
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-gray-400 leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Decorative corner */}
                                            <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0 rounded-tr-2xl rounded-bl-2xl' : 'left-0 rounded-tl-2xl rounded-br-2xl'} w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50`} />
                                        </div>
                                    </div>
                                    
                                    {/* Center circle with number - Desktop only */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl shadow-purple-500/30 border-4 border-darker z-10">
                                        <span className="relative">
                                            {index + 1}
                                            {/* Pulse effect */}
                                            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                                        </span>
                                    </div>
                                    
                                    {/* Empty space for the other side */}
                                    <div className="hidden md:block md:w-1/2" />
                                    
                                    {/* Connector dots */}
                                    {index < service.steps.length - 1 && (
                                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 flex-col items-center" style={{ top: '100%', marginTop: '8px' }}>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mb-2 animate-pulse" />
                                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mb-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Fonctionnalités & Inclus */}
            <section className="py-16 px-4 bg-darker">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Fonctionnalités */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-8">Fonctionnalités</h2>
                        <ul className="space-y-4">
                            {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ce qui est inclus */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-8">Ce qui est inclus</h2>
                        <ul className="space-y-4">
                            {service.includes.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Formulaire de demande - Design amélioré */}
            <section className="py-20 px-4 bg-gradient-to-b from-dark to-darker relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                
                <div className="max-w-3xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-purple-500/20">
                            <Send className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                            Intéressé par ce service ?
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais.
                        </p>
                    </div>

                    {/* Form card */}
                    <div className="relative p-8 md:p-10 bg-gradient-to-br from-darker/90 to-dark/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                        {/* Decorative gradient border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        Nom complet <span className="text-blue-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-darker focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                                        placeholder="Votre nom complet"
                                    />
                                </div>
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        Email <span className="text-blue-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-darker focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-darker focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                                        placeholder="+213 XXX XXX XXX"
                                    />
                                </div>
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                        Entreprise
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-darker focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                                        placeholder="Nom de votre entreprise"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                    Décrivez votre projet <span className="text-blue-400">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-darker focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
                                    placeholder="Décrivez votre projet, vos besoins, vos objectifs et vos attentes..."
                                />
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Prêt à démarrer ?</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                isSuccess 
                                    ? 'bg-green-500 text-white cursor-default' 
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={22} className="animate-spin" />
                                    <span>Envoi en cours...</span>
                                </>
                            ) : isSuccess ? (
                                <>
                                    <CheckCircle size={22} />
                                    <span>Demande envoyée avec succès !</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Envoyer ma demande</span>
                                </>
                            )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 bg-darker border-t border-white/10">
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Eterna Tech. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}
