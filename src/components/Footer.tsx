import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageCircle, Music2 } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Instagram, href: 'https://www.instagram.com/eternaltech3', label: 'Instagram' },
        { icon: Facebook, href: 'https://www.facebook.com/share/17UChGf4Vc/', label: 'Facebook' },
        { icon: Music2, href: 'https://www.tiktok.com/@eterna.tech', label: 'TikTok' },
        { icon: Linkedin, href: 'https://dz.linkedin.com/company/eterna-tech13', label: 'LinkedIn' },
        { icon: MessageCircle, href: 'https://wa.me/213659793110', label: 'WhatsApp' },
    ];

    const quickLinks = [
        { name: 'Accueil', href: '#accueil' },
        { name: 'Services', href: '#services' },
        { name: 'Solutions', href: '#solutions' },
        { name: 'À propos', href: '#a-propos' },
        { name: 'Contact', href: '#contact' },
    ];

    const services = [
        'Développement Web',
        'Applications Mobiles',
        'Formation IT',
        'IA & Machine Learning',
        'Modélisation 3D & Prototypage',
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-darker border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Eterna Tech</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Solutions technologiques innovantes pour les entreprises de demain.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Liens rapides</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.href.substring(1));
                                        }}
                                        className="text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Services</h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href="#services"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('services');
                                        }}
                                        className="text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <a
                                    href="https://maps.app.goo.gl/747TNwyxx69ab8327"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Voir sur Google Maps
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <a href="tel:+213659793110" className="hover:text-primary transition-colors">
                                    +213 659 793 110
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <a href="mailto:contact@eternatech.net" className="hover:text-primary transition-colors">
                                    contact@eternatech.net
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} Eterna Tech. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
