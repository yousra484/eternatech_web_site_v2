import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="Eterna Tech Logo" 
              className="h-14 w-20 object-cover object-center scale-150"            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eterna Tech
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['accueil', 'services', 'solutions', 'a-propos', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                className="text-white hover:text-primary transition-colors relative group"
              >
                {item === 'a-propos' ? 'À propos' : item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contactez-nous
          </a>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-[73px] bg-dark/95 backdrop-blur-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {['accueil', 'services', 'solutions', 'a-propos', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
              className="text-2xl text-white hover:text-primary transition-colors"
            >
              {item === 'a-propos' ? 'À propos' : item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Contactez-nous
          </a>
        </nav>
      </div>
    </header>
  );
}
