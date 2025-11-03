import { useState, useCallback, memo } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ConsultationForm = memo(function ConsultationForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vision: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <section id="consultation" className="py-20 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 dark:bg-amber-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 dark:bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <Heart className="w-5 h-5" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
            {t('consultation.title')}
          </h2>
          <p className="subtext text-xl text-amber-800 dark:text-amber-400 max-w-2xl mx-auto leading-relaxed">
            {t('consultation.subtitle')}
          </p>
        </div>

        {submitted ? (
          <div className="p-12 rounded-3xl shadow-2xl border-2 border-amber-300/50 dark:border-amber-700/50 text-center animate-in zoom-in-95 duration-500" style={{ background: 'var(--surface)' }}>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-amber-200 dark:bg-amber-700 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-amber-700 dark:text-amber-300 animate-pulse" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
              {t('consultation.thankYou')}
            </h3>
            <p className="text-lg subtext leading-relaxed max-w-md mx-auto" style={{ color: 'var(--muted-text)' }}>
              {t('consultation.received')}
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-10 rounded-3xl shadow-2xl border border-amber-200/50 dark:border-amber-700/50" style={{ background: 'var(--surface)' }}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                    {t('consultation.firstName')} {t('consultation.required')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    disabled={submitted}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 dark:focus:ring-amber-700/50 transition-all duration-300 outline-none hover:border-amber-300 dark:hover:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'var(--muted-surface)', color: 'var(--text)' }}
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                    {t('consultation.lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    disabled={submitted}
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 dark:focus:ring-amber-700/50 transition-all duration-300 outline-none hover:border-amber-300 dark:hover:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'var(--muted-surface)', color: 'var(--text)' }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('consultation.email')} {t('consultation.required')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={submitted}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 dark:focus:ring-amber-700/50 transition-all duration-300 outline-none hover:border-amber-300 dark:hover:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--muted-surface)', color: 'var(--text)' }}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('consultation.phone')} {t('consultation.required')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  disabled={submitted}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 dark:focus:ring-amber-700/50 transition-all duration-300 outline-none hover:border-amber-300 dark:hover:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--muted-surface)', color: 'var(--text)' }}
                  placeholder="+62 812 3456 7890"
                />
              </div>

              <div>
                <label htmlFor="vision" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {t('consultation.vision')} {t('consultation.required')}
                </label>
                <textarea
                  id="vision"
                  name="vision"
                  required
                  disabled={submitted}
                  value={formData.vision}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/50 dark:focus:ring-amber-700/50 transition-all duration-300 outline-none hover:border-amber-300 dark:hover:border-amber-600 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--muted-surface)', color: 'var(--text)' }}
                  placeholder={t('consultation.visionPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,119,6,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('consultation.sending')}
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {t('consultation.submit')}
                    </>
                  )}
                </span>
                {!isSubmitting && !submitted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>

              <p className="text-center text-sm text-amber-700/70 dark:text-amber-400/70 subtext">
                {t('consultation.response')}
              </p>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
});
