import { useMemo, useState, useCallback, memo, lazy, Suspense } from 'react';
import { Product } from '@/lib/csvLoader';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryModal = lazy(() => import('./CategoryModal').then(m => ({ default: m.CategoryModal })));

interface CollectionsProps {
  products: Product[];
}

export const Collections = memo(function Collections({ products }: CollectionsProps) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categoryTranslations: Record<string, string> = {
    'Patio chairs': language === 'en' ? 'Patio chairs' : 'Kursi Teras',
    'TV console': language === 'en' ? 'TV console' : 'Meja TV',
    'Sleeping cot': language === 'en' ? 'Sleeping cot' : 'Tempat Tidur',
    'Sofa for guest': language === 'en' ? 'Sofa for guest' : 'Sofa Tamu',
    'Sofa': language === 'en' ? 'Sofa' : 'Sofa',
    'Dining chairs': language === 'en' ? 'Dining chairs' : 'Kursi Makan',
    'Small table cupboard': language === 'en' ? 'Small table cupboard' : 'Lemari Kecil',
    'Cafe chairs': language === 'en' ? 'Cafe chairs' : 'Kursi Kafe',
  };

  const collections = useMemo(() => {
    const categoryMap = new Map<string, Product[]>();

    products.forEach(product => {
      const existing = categoryMap.get(product.category) || [];
      categoryMap.set(product.category, [...existing, product]);
    });

    return Array.from(categoryMap.entries()).map(([name, categoryProducts]) => ({
      name,
      count: categoryProducts.length,
      products: categoryProducts,
      mainImage: categoryProducts[0]?.imageUrl || ''
    }));
  }, [products]);

  const selectedCategoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return collections.find(c => c.name === selectedCategory)?.products || [];
  }, [selectedCategory, collections]);

  const handleCategoryClick = useCallback((categoryName: string) => {
    setSelectedCategory(categoryName);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return (
    <>
      <section id="collections" className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
              {t('collections.title')}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "'Lexend', sans-serif", color: 'var(--muted-text)' }}>
              {t('collections.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {collections.map((collection, index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCategoryClick(collection.name)}
                className="group perspective-1000 cursor-pointer coin-wrapper"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full aspect-square transition-transform duration-700 preserve-3d coin-container"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: hoveredIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div
                    className="absolute inset-0 backface-hidden rounded-full overflow-hidden shadow-lg border-4 border-amber-200 group-hover:border-amber-400 transition-all duration-500 coin-front"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50">
                      {collection.mainImage && collection.mainImage.trim() !== '' ? (
                        <img
                          src={collection.mainImage}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-amber-700 font-semibold">No Image</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div
                      className="absolute inset-0 gold-reflection opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, transparent 30%, rgba(251, 191, 36, 0.5) 50%, transparent 70%)',
                        backgroundSize: '200% 200%'
                      }}
                    />
                    <div className="absolute inset-0 soft-glow" />
                  </div>

                  <div
                    className="absolute inset-0 backface-hidden rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 shadow-xl flex flex-col items-center justify-center p-6"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <Eye className="w-12 h-12 text-white mb-3 animate-pulse" />
                    <p className="text-white text-lg font-semibold text-center" style={{ fontFamily: "'Newsreader', serif" }}>
                      {t('collections.view')}
                    </p>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h3
                    className="font-semibold text-amber-900 text-base md:text-lg group-hover:text-amber-700 transition-colors"
                    style={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    {categoryTranslations[collection.name] || collection.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory && (
        <Suspense fallback={null}>
          <CategoryModal
            isOpen={!!selectedCategory}
            onClose={handleCloseModal}
            categoryName={selectedCategory}
            products={selectedCategoryProducts}
            allProducts={products}
          />
        </Suspense>
      )}

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes softGlow {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes goldReflection {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .soft-glow {
          background: radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 60%);
          animation: softGlow 2s ease-in-out;
          animation-delay: 0s;
          pointer-events: none;
        }

        .coin-wrapper:nth-child(1) .soft-glow { animation-delay: 0s; }
        .coin-wrapper:nth-child(2) .soft-glow { animation-delay: 1s; }
        .coin-wrapper:nth-child(3) .soft-glow { animation-delay: 2s; }
        .coin-wrapper:nth-child(4) .soft-glow { animation-delay: 3s; }
        .coin-wrapper:nth-child(5) .soft-glow { animation-delay: 4s; }
        .coin-wrapper:nth-child(6) .soft-glow { animation-delay: 5s; }
        .coin-wrapper:nth-child(7) .soft-glow { animation-delay: 0s; }
        .coin-wrapper:nth-child(8) .soft-glow { animation-delay: 1s; }

        .coin-wrapper .soft-glow {
          animation: softGlow 2s ease-in-out infinite;
          animation-iteration-count: infinite;
        }

        .coin-wrapper:nth-child(n) .soft-glow {
          animation-duration: 2s;
        }

        @keyframes glowCycle {
          0%, 100% { opacity: 0; }
          8.33% { opacity: 1; }
          16.66% { opacity: 0; }
        }

        .coin-wrapper:nth-child(1) .soft-glow { animation: glowCycle 12s ease-in-out 0s infinite; }
        .coin-wrapper:nth-child(2) .soft-glow { animation: glowCycle 12s ease-in-out 2s infinite; }
        .coin-wrapper:nth-child(3) .soft-glow { animation: glowCycle 12s ease-in-out 4s infinite; }
        .coin-wrapper:nth-child(4) .soft-glow { animation: glowCycle 12s ease-in-out 6s infinite; }
        .coin-wrapper:nth-child(5) .soft-glow { animation: glowCycle 12s ease-in-out 8s infinite; }
        .coin-wrapper:nth-child(6) .soft-glow { animation: glowCycle 12s ease-in-out 10s infinite; }
        .coin-wrapper:nth-child(7) .soft-glow { animation: glowCycle 12s ease-in-out 0s infinite; }
        .coin-wrapper:nth-child(8) .soft-glow { animation: glowCycle 12s ease-in-out 2s infinite; }

        .gold-reflection {
          animation: goldReflection 0.6s ease-out;
        }

        .group:hover .gold-reflection {
          animation: goldReflection 0.6s ease-out;
        }
      `}</style>
    </>
  );
});
