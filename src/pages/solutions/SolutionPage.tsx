import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Home, Check, Send, Loader2, CheckCircle, Glasses, Car, Eye, Volume2, Smartphone, Users, Shield, AlertTriangle, BarChart3, Cpu, Camera, Wifi } from 'lucide-react';
import { CONTACT_ENDPOINT } from '../../config/api';

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
            const count = Math.floor((canvas.width * canvas.height) / 12000);
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
                    color: Math.random() > 0.5 ? '#06b6d4' : '#3b82f6',
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
                        const opacity = (1 - dist2 / 80) * 0.3;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
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

// Données des solutions
const solutionsData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    gradient: string;
    icon: typeof Glasses;
    logo: string;
    images?: { src: string; alt: string; caption: string }[];
    features: { icon: typeof Eye; title: string; description: string }[];
    benefits: string[];
    specs: { label: string; value: string }[];
    howItWorks?: { step: number; title: string; description: string }[];
}> = {
    'blindpath': {
        title: 'BlindPath',
        subtitle: 'Dispositif d\'Assistance Visuelle Intelligent',
        description: 'Un dispositif portable révolutionnaire conçu pour offrir une autonomie réelle aux personnes aveugles et malvoyantes.',
        longDescription: 'BlindPath est une innovation révolutionnaire qui combine la vision par ordinateur, l\'intelligence artificielle et un guidage vocal avancé pour transformer la vie des personnes malvoyantes. Notre technologie analyse l\'environnement en temps réel, détecte les obstacles, lit les textes et reconnaît les visages familiers. Connecté à une application mobile 100% accessible, BlindPath garantit une mobilité plus sûre, plus fluide et totalement indépendante.',
        gradient: 'from-cyan-500 to-blue-600',
        icon: Glasses,
        logo: '/blindpath-logo.png',
        images: [
            { src: '/blindpath-device.png', alt: 'BlindPath Device', caption: 'Boîtier compact avec caméra HD et haut-parleur intégré' },
            { src: '/blindpath-usage.png', alt: 'BlindPath en utilisation', caption: 'Utilisation quotidienne en milieu urbain' }
        ],
        howItWorks: [
            { step: 1, title: 'Capture', description: 'La caméra HD capture l\'environnement en temps réel à 30 images/seconde' },
            { step: 2, title: 'Analyse IA', description: 'L\'intelligence artificielle embarquée analyse et identifie les éléments importants' },
            { step: 3, title: 'Guidage', description: 'Des instructions vocales claires guident l\'utilisateur en toute sécurité' }
        ],
        features: [
            {
                icon: Eye,
                title: 'Vision par Ordinateur',
                description: 'Analyse en temps réel de l\'environnement grâce à des caméras haute définition et des algorithmes de deep learning.'
            },
            {
                icon: Volume2,
                title: 'Guidage Vocal Avancé',
                description: 'Instructions vocales claires et précises pour naviguer en toute sécurité dans n\'importe quel environnement.'
            },
            {
                icon: Users,
                title: 'Reconnaissance Faciale',
                description: 'Identification des visages familiers pour faciliter les interactions sociales au quotidien.'
            },
            {
                icon: Smartphone,
                title: 'Application Mobile Accessible',
                description: 'Application 100% accessible avec VoiceOver et TalkBack pour une configuration et un suivi simplifiés.'
            },
            {
                icon: AlertTriangle,
                title: 'Détection d\'Obstacles',
                description: 'Alertes en temps réel pour éviter les obstacles, escaliers, trottoirs et dangers potentiels.'
            },
            {
                icon: Cpu,
                title: 'IA Embarquée',
                description: 'Traitement local des données pour une réponse instantanée et une confidentialité maximale.'
            }
        ],
        benefits: [
            'Autonomie totale dans les déplacements quotidiens',
            'Lecture de textes (panneaux, menus, documents)',
            'Navigation intérieure et extérieure',
            'Reconnaissance des produits et des couleurs',
            'Assistance 24/7 via l\'application',
            'Mises à jour régulières des fonctionnalités'
        ],
        specs: [
            { label: 'Autonomie', value: '8-10 heures' },
            { label: 'Poids', value: '85g' },
            { label: 'Connectivité', value: 'Bluetooth 5.0, WiFi' },
            { label: 'Compatibilité', value: 'iOS & Android' },
            { label: 'Résistance', value: 'IP54' },
            { label: 'Langues', value: 'FR, EN, AR' }
        ]
    },
    'amane-trig': {
        title: 'Amane Trig',
        subtitle: 'Système Intelligent de Sécurité Routière',
        description: 'Un dispositif de sécurité routière basé sur l\'intelligence artificielle pour surveiller le comportement du conducteur.',
        longDescription: 'Amane Trig est un système de sécurité routière de nouvelle génération qui utilise l\'intelligence artificielle pour analyser en temps réel le comportement du conducteur et l\'environnement routier. Grâce à une double dashcam intelligente et une plateforme web avancée, Amane Trig permet aux entreprises de réduire significativement les accidents, d\'améliorer la performance de leurs conducteurs et de protéger leurs véhicules, tout en diminuant les coûts opérationnels liés aux risques routiers.',
        gradient: 'from-orange-500 to-red-600',
        icon: Car,
        logo: '/amanetrig-logo.png',
        images: [
            { src: '/amanetrig-cam-driver.png', alt: 'Caméra Conducteur', caption: 'Caméra conducteur avec LED d\'état et objectif grand angle' },
            { src: '/amanetrig-cam-road.png', alt: 'Caméra Route', caption: 'Caméra route avec anneau LED et vision nocturne' }
        ],
        howItWorks: [
            { step: 1, title: 'Installation', description: 'Installation rapide Plug & Play sur le pare-brise du véhicule' },
            { step: 2, title: 'Surveillance', description: 'Double caméra IA surveille le conducteur et la route en temps réel' },
            { step: 3, title: 'Analyse', description: 'L\'IA détecte les comportements à risque et les situations dangereuses' },
            { step: 4, title: 'Alertes', description: 'Notifications instantanées au conducteur et au gestionnaire de flotte' }
        ],
        features: [
            {
                icon: Camera,
                title: 'Double Dashcam IA',
                description: 'Caméra intérieure et extérieure avec analyse IA pour une surveillance complète du véhicule.'
            },
            {
                icon: Eye,
                title: 'Détection de Fatigue',
                description: 'Surveillance des signes de fatigue et de somnolence avec alertes immédiates au conducteur.'
            },
            {
                icon: AlertTriangle,
                title: 'Alertes Temps Réel',
                description: 'Notifications instantanées en cas de comportement dangereux ou de situation à risque.'
            },
            {
                icon: BarChart3,
                title: 'Plateforme Analytics',
                description: 'Tableau de bord complet pour suivre les performances et identifier les axes d\'amélioration.'
            },
            {
                icon: Wifi,
                title: 'Connectivité 4G/5G',
                description: 'Transmission des données en temps réel vers la plateforme cloud sécurisée.'
            },
            {
                icon: Shield,
                title: 'Protection des Données',
                description: 'Chiffrement de bout en bout et conformité RGPD pour une sécurité maximale.'
            }
        ],
        benefits: [
            'Réduction de 40% des accidents de la route',
            'Diminution des coûts d\'assurance',
            'Amélioration du comportement des conducteurs',
            'Preuve vidéo en cas d\'incident',
            'Optimisation de la consommation de carburant',
            'Conformité aux réglementations de transport'
        ],
        specs: [
            { label: 'Résolution', value: '1080p Full HD' },
            { label: 'Stockage', value: '128GB + Cloud' },
            { label: 'Connectivité', value: '4G LTE, WiFi, GPS' },
            { label: 'Installation', value: 'Plug & Play' },
            { label: 'Alimentation', value: '12V-24V' },
            { label: 'Garantie', value: '2 ans' }
        ]
    }
};

export default function SolutionPage() {
    const { solutionId } = useParams<{ solutionId: string }>();
    const solution = solutionId ? solutionsData[solutionId] : null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!solution) {
        return (
            <div className="min-h-screen bg-darker flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Solution non trouvée</h1>
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
            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: `Demande de devis - ${solution.title}`,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success('Votre demande a été envoyée avec succès !');
                setFormData({ name: '', email: '', phone: '', company: '', message: '' });
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

    const Icon = solution.icon;

    return (
        <div className="min-h-screen bg-darker">
            {/* Header */}
            <header className="fixed w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-full text-white hover:border-cyan-500/50 transition-all duration-300"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Retour</span>
                        <Home size={16} className="text-cyan-400" />
                    </Link>
                    <div className="hidden sm:flex items-center gap-3">
                        <img src="/logo.png" alt="Eterna Tech" className="h-8 w-auto object-contain" />
                        <span className="text-sm text-gray-400">Eterna Tech - Solutions</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 bg-gradient-to-b from-dark to-darker overflow-hidden min-h-[70vh] flex items-center">
                <TechBackground />
                
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent" />
                <div className={`absolute top-20 left-10 w-96 h-96 bg-gradient-to-br ${solution.gradient} opacity-10 rounded-full blur-3xl animate-pulse`} />
                <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br ${solution.gradient} opacity-10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
                
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 ${solutionId === 'blindpath' ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-orange-500/10 border-orange-500/20'} border rounded-full mb-10`}>
                        <span className={`w-2 h-2 ${solutionId === 'blindpath' ? 'bg-cyan-400' : 'bg-orange-400'} rounded-full animate-pulse`} />
                        <span className={`${solutionId === 'blindpath' ? 'text-cyan-400' : 'text-orange-400'} text-sm font-medium`}>Innovation Eterna Tech</span>
                    </div>
                    
                    {/* Logo + Title Side by Side - Professional Layout */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
                        {/* Logo */}
                        <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
                            <img 
                                src={solution.logo} 
                                alt={solution.title} 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                        {/* Title & Subtitle */}
                        <div className="text-center md:text-left">
                            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                                {solution.title}
                            </h1>
                            <p className={`text-xl md:text-2xl font-semibold ${solutionId === 'blindpath' ? 'text-cyan-300' : 'text-orange-300'}`}>
                                {solution.subtitle}
                            </p>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        {solution.longDescription}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="#contact"
                            className={`px-8 py-4 bg-gradient-to-r ${solution.gradient} text-white font-bold rounded-xl hover:shadow-xl ${solutionId === 'blindpath' ? 'hover:shadow-cyan-500/30' : 'hover:shadow-orange-500/30'} hover:-translate-y-1 transition-all duration-300 flex items-center gap-2`}
                        >
                            <Send size={20} />
                            Demander une démo
                        </a>
                        <a 
                            href="#features"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            Découvrir les fonctionnalités
                        </a>
                    </div>
                </div>
            </section>

            {/* Product Gallery Section */}
            {solution.images && solution.images.length > 0 && (
                <section className="py-20 px-4 bg-gradient-to-b from-darker to-dark relative overflow-hidden">
                    {/* Dynamic gradient background based on solution */}
                    <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${solutionId === 'blindpath' ? 'from-cyan-500/5' : 'from-orange-500/5'} via-transparent to-transparent`} />
                    
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className={`inline-block px-4 py-2 ${solutionId === 'blindpath' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'} border rounded-full text-sm font-medium mb-4`}>
                                {solutionId === 'blindpath' ? 'Notre Dispositif' : 'Double Caméra IA'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Découvrez {solution.title}
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                {solutionId === 'blindpath' 
                                    ? 'Un design compact et élégant pour une utilisation quotidienne confortable'
                                    : 'Système de double caméra intelligent pour une surveillance complète'}
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {solution.images.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border border-white/10 ${solutionId === 'blindpath' ? 'hover:border-cyan-500/30' : 'hover:border-orange-500/30'} transition-all duration-500`}
                                >
                                    {/* Product showcase with clean background */}
                                    <div className="aspect-square overflow-hidden p-8 flex items-center justify-center">
                                        <img 
                                            src={image.src} 
                                            alt={image.alt}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                                        />
                                    </div>
                                    {/* Caption overlay */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t ${solutionId === 'blindpath' ? 'from-cyan-900/95 via-cyan-900/80' : 'from-gray-900/95 via-gray-900/80'} to-transparent`}>
                                        <p className="text-white font-semibold text-lg">{image.alt}</p>
                                        <p className="text-gray-300 text-sm mt-1">{image.caption}</p>
                                    </div>
                                    {/* Glow effect */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${solution.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How It Works Section */}
            {solution.howItWorks && solution.howItWorks.length > 0 && (
                <section className="py-20 px-4 bg-dark relative overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className={`inline-block px-4 py-2 ${solutionId === 'blindpath' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'} border rounded-full text-sm font-medium mb-4`}>
                                Fonctionnement
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Comment ça marche ?
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                {solutionId === 'blindpath' 
                                    ? 'Une technologie simple et intuitive pour une assistance au quotidien'
                                    : 'Un système complet pour la sécurité de votre flotte'}
                            </p>
                        </div>
                        
                        <div className="relative">
                            {/* Connection line - adapts to number of steps */}
                            <div className={`absolute top-10 left-[10%] right-[10%] h-1 bg-gradient-to-r ${solution.gradient} rounded-full hidden md:block`} />
                            
                            <div className={`grid ${solution.howItWorks.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 relative`}>
                                {solution.howItWorks.map((step, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex flex-col items-center text-center">
                                            {/* Step number */}
                                            <div className={`w-20 h-20 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl ${solutionId === 'blindpath' ? 'shadow-cyan-500/20' : 'shadow-orange-500/20'} relative z-10`}>
                                                <span className="text-3xl font-bold text-white">{step.step}</span>
                                            </div>
                                            {/* Content */}
                                            <div className="p-5 bg-darker/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                                                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-darker">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Fonctionnalités Clés
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Découvrez les technologies innovantes qui font de {solution.title} une solution unique
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solution.features.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-6 bg-gradient-to-br from-darker/80 to-dark/80 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${solution.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <FeatureIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits & Specs */}
            <section className="py-20 px-4 bg-darker">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Benefits */}
                    <div className="p-8 bg-gradient-to-br from-dark/80 to-darker/80 border border-white/10 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className={`w-10 h-10 bg-gradient-to-br ${solution.gradient} rounded-lg flex items-center justify-center`}>
                                <Check className="w-5 h-5 text-white" />
                            </span>
                            Avantages
                        </h2>
                        <ul className="space-y-4">
                            {solution.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-400`} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specs */}
                    <div className="p-8 bg-gradient-to-br from-dark/80 to-darker/80 border border-white/10 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className={`w-10 h-10 bg-gradient-to-br ${solution.gradient} rounded-lg flex items-center justify-center`}>
                                <Cpu className="w-5 h-5 text-white" />
                            </span>
                            Spécifications
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {solution.specs.map((spec, index) => (
                                <div key={index} className="p-4 bg-darker/50 rounded-xl border border-white/5">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{spec.label}</p>
                                    <p className="text-white font-semibold">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-20 px-4 bg-gradient-to-b from-dark to-darker relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                
                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${solution.gradient} rounded-2xl mb-6 shadow-xl`}>
                            <Send className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Intéressé par {solution.title} ?
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Contactez-nous pour une démonstration ou pour obtenir plus d'informations
                        </p>
                    </div>

                    <div className="relative p-8 md:p-10 bg-gradient-to-br from-darker/90 to-dark/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        Nom complet <span className="text-cyan-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        Email <span className="text-cyan-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        placeholder="+213 XXX XXX XXX"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        Entreprise
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        placeholder="Nom de votre entreprise"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                                    Votre message <span className="text-cyan-400">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-5 py-4 bg-darker/50 border-2 border-white/5 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none"
                                    placeholder="Décrivez vos besoins ou posez vos questions..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                    isSuccess 
                                        ? 'bg-green-500 text-white' 
                                        : `bg-gradient-to-r ${solution.gradient} text-white hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-0.5 disabled:opacity-70`
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
                                        <span>Message envoyé !</span>
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
