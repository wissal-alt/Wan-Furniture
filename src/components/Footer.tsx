import { Mail, MessageCircle, Instagram, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { memo } from 'react';

export const Footer = memo(function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-amber-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'DM Serif Text', serif" }}>
              Wan Furniture
            </h3>
            <p className="text-amber-100 subtext">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#collections" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.collections')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.products')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.faq')}
                </a>
              </li>
              <li>
                <a href="#consultation" className="text-amber-100 hover:text-white transition-colors">
                  {t('nav.consultation')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.connect')}</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/62839223364"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-amber-100 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center group-hover:bg-amber-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span>+62 839 223 364</span>
              </a>

              <a
                href="mailto:irwanjepara30@gmail.com"
                className="flex items-center space-x-3 text-amber-100 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center group-hover:bg-amber-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>irwanjepara30@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/wanfurniture/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-amber-100 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center group-hover:bg-amber-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>wanfurniture</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8 text-center">
          <p className="text-amber-100 text-sm">
            &copy; {new Date().getFullYear()} Wan Furniture. {t('footer.rights')}
          </p>
          <p className="text-sm mt-3 flex items-center justify-center gap-1.5">
            <span className="text-white">{t('footer.poweredBy')}</span>
            <a
              href="https://wissi.space"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group"
            >
              <span className="relative z-10 text-lg font-semibold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-purple-400 group-hover:to-purple-500 transition-all duration-500">
                Wissi
              </span>

              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-400/40 via-purple-500/40 to-purple-600/40 blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

              <Sparkles className="absolute -top-1 -right-2 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{ animationDuration: '1s' }} />
              <Sparkles className="absolute -bottom-1 -left-2 w-3 h-3 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ animation: 'sparkle 1.5s ease-in-out infinite' }} />
              <Sparkles className="absolute top-1/2 -right-3 w-2.5 h-2.5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-200" style={{ animation: 'sparkle 1.2s ease-in-out infinite' }} />
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
      `}</style>
    </footer>
  );
});
