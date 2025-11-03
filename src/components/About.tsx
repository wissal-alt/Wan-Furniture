import { Hammer, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { memo } from 'react';

export const About = memo(function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 font-bold" style={{ color: 'var(--text)' }}>
            {t('about.title')}
          </h2>
          <p className="subtext text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hammer className="w-12 h-12 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>{t('about.craftsmanship.title')}</h3>
            <p className="subtext text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              {t('about.craftsmanship.desc')}
            </p>
          </div>

          <div className="p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>{t('about.materials.title')}</h3>
            <p className="subtext text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              {t('about.materials.desc')}
            </p>
          </div>

          <div className="p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>{t('about.custom.title')}</h3>
            <p className="subtext text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>
              {t('about.custom.desc')}
            </p>
          </div>
        </div>

        <div className="mt-20 p-14 rounded-3xl shadow-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h3 className="text-4xl font-bold mb-10 text-center" style={{ color: 'var(--text)' }}>{t('about.philosophy.title')}</h3>
          <div className="grid md:grid-cols-2 gap-10 subtext">
            <div>
              <h4 className="font-bold mb-3 text-lg" style={{ color: 'var(--text)' }}>{t('about.minimalism.title')}</h4>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>{t('about.minimalism.desc')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg" style={{ color: 'var(--text)' }}>{t('about.vintage.title')}</h4>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>{t('about.vintage.desc')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg" style={{ color: 'var(--text)' }}>{t('about.japanese.title')}</h4>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>{t('about.japanese.desc')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg" style={{ color: 'var(--text)' }}>{t('about.indoor.title')}</h4>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>{t('about.indoor.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
