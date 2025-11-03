import { X, Eye } from 'lucide-react';
import { Product } from '@/lib/csvLoader';
import { useState, useCallback, memo, lazy, Suspense } from 'react';

const ProductModal = lazy(() => import('./ProductModal').then(m => ({ default: m.ProductModal })));

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  products: Product[];
  allProducts: Product[];
}

export const CategoryModal = memo(function CategoryModal({ isOpen, onClose, categoryName, products, allProducts }: CategoryModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const convertPrice = useCallback((priceStr: string): { rp: string; usd: string } => {
    const cleanPrice = priceStr.replace(/[^\d]/g, '');
    const rpAmount = parseInt(cleanPrice) || 0;
    const usdAmount = Math.round(rpAmount / 16666);
    return {
      rp: `Rp${rpAmount.toLocaleString('id-ID')}`,
      usd: `$${usdAmount}`
    };
  }, []);

  const getProductImages = useCallback((product: Product): string[] => {
    const images = [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];
    return images;
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseProductModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <div
          className="modal rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
          style={{ background: 'var(--surface)', color: 'var(--text)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 backdrop-blur-sm border-b p-6 flex justify-between items-center z-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
                {categoryName}
              </h2>
              <p className="text-amber-600 text-sm font-medium" style={{ fontFamily: "'Lexend', sans-serif" }}>
                {products.length} {products.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-amber-900 dark:text-amber-400" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const prices = convertPrice(product.price);
              const images = getProductImages(product);
              const currentIndex = currentImageIndex[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="rounded-xl overflow-hidden border border-amber-100 dark:border-amber-800 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="relative aspect-square group overflow-hidden" style={{ background: 'var(--muted-surface)' }}>
                    {images[currentIndex] && images[currentIndex].trim() !== '' ? (
                      <img
                        src={images[currentIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover absolute inset-0"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center absolute inset-0">
                        <span className="text-amber-600 subtext">Image coming soon</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(prev => ({ ...prev, [product.id]: idx }))}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? 'bg-amber-600 w-6'
                              : 'bg-white/60 hover:bg-white/90'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]"
                      style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className="text-xl font-bold text-amber-700"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        {prices.rp}
                      </span>
                      <span
                        className="text-sm text-amber-600"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        / {prices.usd}
                      </span>
                    </div>

                    <button
                      onClick={() => handleProductClick(product)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
                      style={{ fontFamily: "'Lexend', sans-serif" }}
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={handleCloseProductModal}
            allProducts={allProducts}
          />
        </Suspense>
      )}
    </>
  );
});
