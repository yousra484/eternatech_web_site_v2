import { Link } from 'react-router-dom';
import { 
    Code, 
    Smartphone, 
    Brain, 
    Box, 
    Palette, 
    Layout, 
    GraduationCap, 
    Network, 
    Shield, 
    ShoppingCart, 
    Megaphone, 
    Lightbulb, 
    Rocket,
    Sparkles
} from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: Code,
            title: 'Développement Web',
            description: 'Création de sites web sur mesure, applications web et solutions e-commerce évolutives.',
            slug: 'developpement-web',
        },
        {
            icon: Smartphone,
            title: 'Applications Mobiles',
            description: 'Applications iOS et Android intuitives conçues pour offrir une expérience utilisateur exceptionnelle.',
            slug: 'applications-mobiles',
        },
        {
            icon: Brain,
            title: 'IA & Machine Learning',
            description: 'Création de modèles d\'IA, apprentissage automatique et apprentissage fédéré pour des solutions intelligentes.',
            slug: 'ia-machine-learning',
        },
        {
            icon: Box,
            title: 'Modélisation 3D & Prototypage',
            description: 'Conception de modèles 3D professionnels et prototypes pour visualiser vos projets avant réalisation.',
            slug: 'modelisation-3d',
        },
        {
            icon: Palette,
            title: 'Conception Graphique & Design',
            description: 'Création d\'identités visuelles, logos, supports marketing et designs créatifs pour votre marque.',
            slug: 'conception-graphique',
        },
        {
            icon: Layout,
            title: 'UI/UX Design',
            description: 'Conception d\'interfaces utilisateur intuitives et expériences utilisateur optimisées pour vos produits digitaux.',
            slug: 'ui-ux',
        },
        {
            icon: GraduationCap,
            title: 'Formation IT',
            description: 'Programmes de formation personnalisés en technologies de l\'information pour vos équipes.',
            slug: 'formation-it',
        },
        {
            icon: Network,
            title: 'Installation Réseaux Domestiques',
            description: 'Configuration et installation de réseaux domestiques sécurisés, Wi-Fi et câblage structuré.',
            slug: 'reseaux-domestiques',
        },
        {
            icon: Shield,
            title: 'Blockchain & Sécurité des Données',
            description: 'Solutions blockchain et stratégies de cybersécurité pour protéger vos données sensibles.',
            slug: 'blockchain-securite',
        },
        {
            icon: ShoppingCart,
            title: 'E-Commerce',
            description: 'Création de boutiques en ligne performantes avec systèmes de paiement sécurisés et gestion des stocks.',
            slug: 'e-commerce',
        },
        {
            icon: Megaphone,
            title: 'Agence de Publicité',
            description: 'Stratégies marketing digitales, campagnes publicitaires et gestion des réseaux sociaux.',
            slug: 'publicite',
        },
        {
            icon: Lightbulb,
            title: 'Dépôt Label Projet Innovant',
            description: 'Accompagnement et orientation pour le dépôt de votre dossier label projet innovant.',
            slug: 'label-projet-innovant',
        },
        {
            icon: Rocket,
            title: 'Dépôt Label Startup',
            description: 'Assistance complète pour l\'obtention du label startup et accès aux avantages associés.',
            slug: 'label-startup',
        },
    ];

    return (
        <section id="services" className="py-24 px-4 bg-dark relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Ce que nous offrons</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Nos Services
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Des solutions technologiques complètes pour répondre à tous vos besoins
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group p-8 bg-dark/60 border border-white/10 rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
                            >
                                <div className="mb-6">
                                    <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                <Link
                                    to={`/services/${service.slug}`}
                                    className="inline-flex items-center text-primary hover:text-secondary transition-colors font-semibold"
                                >
                                    En savoir plus →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
