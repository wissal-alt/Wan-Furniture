import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import wanLogo from "../assets/1761168066890.png";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
      };
    }
  }
}

export function Hero() {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.90/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 w-full h-full">
        <spline-viewer url="https://prod.spline.design/QkkiBgZpsBCWm3Nk/scene.splinecode" className="w-full h-full"></spline-viewer>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="w-1/2 flex items-start justify-start -mt-8">
            <div className="relative ml-12 pointer-events-auto">
              <img
                src={wanLogo}
                alt="Wan Furniture Logo"
                className="relative w-80 md:w-96 h-auto drop-shadow-lg"
              />
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>

        <div className="flex-1 flex items-end justify-end pb-8 pr-4 md:pr-8">
          <div className="max-w-md text-right">
            <p className="text-lg md:text-xl leading-relaxed drop-shadow-sm" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
              {t('hero.text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
