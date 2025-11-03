import { ShoppingCart, Sun, Moon, Languages } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { key: 'nav.home', href: '#home', en: 'Home', id: 'Beranda' },
  { key: 'nav.collections', href: '#collections', en: 'Collections', id: 'Koleksi' },
  { key: 'nav.products', href: '#products', en: 'Products', id: 'Produk' },
  { key: 'nav.about', href: '#about', en: 'About', id: 'Tentang' },
  { key: 'nav.faq', href: '#faq', en: 'FAQ', id: 'FAQ' },
  { key: 'nav.consultation', href: '#consultation', en: 'Consultation', id: 'Konsultasi' },
  { key: 'nav.contact', href: '#contact', en: 'Contact', id: 'Kontak' },
];

export function Header() {
  const { cartCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 m-0 p-0">
      <nav className="backdrop-blur-md border-b shadow-sm h-16 flex items-center m-0" style={{ background: 'rgba(255, 253, 250, 0.8)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center relative">
          <div className="flex items-center justify-center space-x-1 h-16">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.href)}
                className="relative px-6 py-0 h-16 text-base font-medium text-amber-800 dark:text-amber-200 transition-colors duration-300 group overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 group-hover:text-amber-900 dark:group-hover:text-amber-100 transition-colors duration-300">
                  {language === 'en' ? link.en : link.id}
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 dark:from-amber-900/30 dark:via-amber-800/30 dark:to-amber-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>
          <div className="absolute right-4 flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-3 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-all duration-300 group relative"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                {language}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              ) : (
                <Sun className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              )}
            </button>
            <button
              onClick={openCart}
              className="relative p-3 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </header>
  );
}
