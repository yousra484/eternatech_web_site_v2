import { Rocket, Target, Lightbulb, Users, MapPin, Calendar, Award, TrendingUp, Building2 } from 'lucide-react';

export default function About() {
    const stats = [
        { value: '1+', label: 'Année d\'expérience', icon: Calendar },
        { value: '25+', label: 'Projets réalisés', icon: Award },
        { value: '15+', label: 'Clients satisfaits', icon: Users },
    ];

    const values = [
        { 
            icon: Lightbulb, 
            title: 'Innovation', 
            description: 'Nous repoussons les limites de la technologie pour créer des solutions uniques.' 
        },
        { 
            icon: Target, 
            title: 'Excellence', 
            description: 'Chaque projet est réalisé avec rigueur et souci du détail.' 
        },
        { 
            icon: TrendingUp, 
            title: 'Croissance', 
            description: 'Nous accompagnons nos clients vers le succès et la transformation digitale.' 
        },
    ];

    return (
        <section id="a-propos" className="py-24 px-4 bg-gradient-to-b from-darker to-dark relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Algérie</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Qui sommes-nous ?
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        <span className="text-white font-semibold">Eterna Tech</span> est une entreprise algérienne spécialisée dans les solutions technologiques innovantes. 
                        Notre équipe d'experts passionnés s'engage à fournir des services de qualité supérieure 
                        pour répondre aux défis technologiques de demain.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div 
                                key={index}
                                className="group relative p-8 bg-gradient-to-br from-dark/80 to-darker/80 border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all duration-500 text-center overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                                        <Icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                    </div>
                                    <h3 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                                        {stat.value}
                                    </h3>
                                    <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                    {/* Mission Card */}
                    <div className="group relative p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:opacity-150 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                                    <Rocket className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">Notre Mission</h3>
                                    <p className="text-blue-400 text-sm font-medium">Ce qui nous anime</p>
                                </div>
                            </div>
                            
                            <p className="text-gray-300 leading-relaxed text-lg mb-6 group-hover:text-gray-200 transition-colors">
                                Fournir des solutions technologiques innovantes qui transforment les défis en opportunités
                                et stimulent la croissance de nos clients en Algérie et au-delà.
                            </p>
                            
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                                    🚀 Innovation
                                </span>
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                                    🎯 Excellence
                                </span>
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                                    🤝 Partenariat
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Values Grid */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            Nos Valeurs
                        </h3>
                        
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div 
                                    key={index}
                                    className="group flex items-start gap-4 p-5 bg-dark/50 border border-white/10 rounded-xl hover:border-purple-500/30 hover:bg-dark/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 relative z-10">
                                        <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">{value.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{value.description}</p>
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
