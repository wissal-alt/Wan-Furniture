import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = ['faq.q1', 'faq.q2', 'faq.q3', 'faq.q4', 'faq.q5', 'faq.q6'];
  const answerKeys = ['faq.a1', 'faq.a2', 'faq.a3', 'faq.a4', 'faq.a5', 'faq.a6'];

  return (
    <section id="faq" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 font-bold" style={{ color: 'var(--text)' }}>
            {t('faq.title')}
          </h2>
          <p className="subtext text-2xl text-amber-700 dark:text-amber-400 leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {faqKeys.map((questionKey, index) => (
            <div
              key={index}
              className="border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-7 flex justify-between items-center text-left hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-colors"
              >
                <span className="font-bold pr-4 text-lg" style={{ color: 'var(--text)' }}>
                  {t(questionKey)}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-7 subtext text-lg leading-relaxed animate-in fade-in duration-300" style={{ color: 'var(--muted-text)' }}>
                  {t(answerKeys[index])}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
