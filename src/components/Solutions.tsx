import { Link } from 'react-router-dom';
import { Glasses, Car, Brain, Signal, Link2, ArrowRight, Sparkles } from 'lucide-react';

export default function Solutions() {
    // Solutions phares avec pages détaillées
    const featuredSolutions = [
        {
            slug: 'blindpath',
            title: 'BlindPath',
            subtitle: 'Lunettes Intelligentes pour Malvoyants',
            description: 'BlindPath est une paire de lunettes intelligentes conçue pour offrir une autonomie réelle aux personnes aveugles et malvoyantes. Grâce à la vision par ordinateur, l\'intelligence artificielle et un guidage vocal avancé.',
            icon: Glasses,
            logo: '/blindpath-logo.png',
            gradient: 'from-cyan-500 to-blue-600',
            features: ['Vision par ordinateur', 'Détection d\'obstacles', 'Reconnaissance faciale', 'Guidage vocal'],
        },
        {
            slug: 'amane-trig',
            title: 'Amane Trig',
            subtitle: 'Sécurité Routière Intelligente',
            description: 'Amane Trig est un dispositif de sécurité routière basé sur l\'intelligence artificielle, conçu pour surveiller en temps réel le comportement du conducteur et l\'environnement routier.',
            icon: Car,
            logo: '/amanetrig-logo.png',
            gradient: 'from-orange-500 to-red-600',
            features: ['Double dashcam IA', 'Analyse comportementale', 'Plateforme web', 'Alertes temps réel'],
        },
    ];

    // Autres solutions - Expertise Technologique
    const otherSolutions = [
        {
            title: 'IA & Machine Learning',
            description: 'Solutions d\'intelligence artificielle sur mesure pour automatiser et optimiser vos processus métiers.',
            icon: Brain,
            features: ['Détection d\'objets', 'Vision par ordinateur', 'Modèles d\'IA personnalisés', 'Analyse prédictive'],
        },
        {
            title: '5G & IoT',
            description: 'Solutions de connectivité avancée combinant la puissance de la 5G et l\'Internet des Objets pour des systèmes intelligents.',
            icon: Signal,
            features: ['Réseaux 5G', 'Capteurs IoT', 'Edge Computing', 'Temps réel'],
        },
        {
            title: 'Blockchain & Smart Contracts',
            description: 'Technologies décentralisées pour sécuriser vos transactions et automatiser vos processus avec des contrats intelligents.',
            icon: Link2,
            features: ['Smart Contracts', 'Tokenisation', 'Traçabilité', 'Sécurité décentralisée'],
        },
    ];

    return (
        <section id="solutions" className="py-24 px-4 bg-gradient-to-b from-dark to-darker relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-medium">Innovation & Technologie</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Nos Solutions
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Découvrez nos solutions innovantes qui transforment les défis en opportunités
                    </p>
                </div>

                {/* Solutions Phares */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <span className="text-white text-lg">⚡</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Solutions Phares</h3>
                        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredSolutions.map((solution) => {
                            const Icon = solution.icon;
                            return (
                                <div
                                    key={solution.slug}
                                    className="group relative p-8 bg-gradient-to-br from-dark/80 to-darker/80 border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                                >
                                    {/* Background glow */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${solution.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
                                    <div className={`absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr ${solution.gradient} opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                                    
                                    <div className="relative z-10">
                                        {/* Logo & Title */}
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img 
                                                    src={solution.logo} 
                                                    alt={solution.title} 
                                                    className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                                                    {solution.title}
                                                </h4>
                                                <p className={`text-sm font-medium bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                                                    {solution.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            {solution.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {solution.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            to={`/solutions/${solution.slug}`}
                                            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${solution.gradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-${solution.gradient.split('-')[1]}/30 transition-all duration-300 group/btn`}
                                        >
                                            En savoir plus
                                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Autres Solutions */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-white text-lg">🧠</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Expertise Technologique</h3>
                        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherSolutions.map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative p-6 bg-dark/70 border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden"
                                >
                                    {/* Background glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                                            <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">{solution.title}</h4>
                                        <p className="text-gray-400 mb-4 text-sm group-hover:text-gray-300 transition-colors">{solution.description}</p>
                                        <ul className="space-y-2">
                                            {solution.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 group-hover:scale-125 transition-transform" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
