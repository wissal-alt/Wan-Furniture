import { useState, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { Product } from '@/lib/csvLoader';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductModal = lazy(() => import('./ProductModal').then(m => ({ default: m.ProductModal })));

interface ProductGridProps {
  products: Product[];
}

function convertPrice(priceStr: string): { rp: string; usd: string } {
  const cleanPrice = priceStr.replace(/[^\d]/g, '');
  const rpAmount = parseInt(cleanPrice) || 0;
  const usdAmount = Math.round(rpAmount / 16666);

  return {
    rp: `Rp${rpAmount.toLocaleString('id-ID')}`,
    usd: `$${usdAmount}`
  };
}

const PRODUCTS_PER_PAGE = 12;

export const ProductGrid = memo(function ProductGrid({ products }: ProductGridProps) {
  const { t, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();

  const categoryTranslations: Record<string, string> = {
    'All': t('products.all'),
    'Patio chairs': language === 'en' ? 'Patio chairs' : 'Kursi Teras',
    'TV console': language === 'en' ? 'TV console' : 'Meja TV',
    'Sleeping cot': language === 'en' ? 'Sleeping cot' : 'Tempat Tidur',
    'Sofa for guest': language === 'en' ? 'Sofa for guest' : 'Sofa Tamu',
    'Sofa': language === 'en' ? 'Sofa' : 'Sofa',
    'Dining chairs': language === 'en' ? 'Dining chairs' : 'Kursi Makan',
    'Small table cupboard': language === 'en' ? 'Small table cupboard' : 'Lemari Kecil',
    'Cafe chairs': language === 'en' ? 'Cafe chairs' : 'Kursi Kafe',
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
  }, [addToCart]);

  const handleViewProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <section id="products" className="py-20" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
              {t('products.title')}
            </h2>
            <p className="text-lg md:text-xl subtitle" style={{ color: 'var(--muted-text)' }}>
              {t('products.subtitle')}
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-700 text-white shadow-[0_4px_12px_rgba(180,83,9,0.25)]'
                      : 'border hover:shadow-[0_2px_8px_rgba(217,119,6,0.15)]'
                  }`}
                  style={selectedCategory !== category ? { background: 'var(--muted-surface)', color: 'var(--text)', borderColor: 'var(--border)', fontFamily: "'Lexend', sans-serif" } : { fontFamily: "'Lexend', sans-serif" }}
                >
                  {categoryTranslations[category] || category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => {
              const prices = convertPrice(product.price);

              return (
                <div
                  key={product.id}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_40px_rgba(217,119,6,0.3)] transition-all duration-500 border hover:scale-[1.03] hover:border-amber-300"
                  style={{
                    transformOrigin: 'center',
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className="aspect-square relative overflow-hidden" style={{ background: 'var(--muted-surface)' }}>
                    {product.imageUrl && product.imageUrl.trim() !== '' ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const imageComingSoonText = language === 'en' ? 'Image coming soon' : 'Gambar segera hadir';
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center border-2 border-amber-400 border-dashed">
                                <span class="text-amber-700 font-medium" style="font-family: 'Lexend', sans-serif;">${imageComingSoonText}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center border-2 border-amber-400 border-dashed">
                        <span className="text-amber-700 font-medium" style={{ fontFamily: "'Lexend', sans-serif" }}>
                          {t('products.imageComingSoon')}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span
                        className="text-2xl font-bold text-amber-700"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        {prices.rp}
                      </span>
                      <span
                        className="text-lg text-amber-600"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        / {prices.usd}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        className="w-full bg-amber-900 hover:bg-amber-950 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,53,15,0.5)] flex items-center justify-center gap-2 group/btn"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span className="subtitle">{t('products.viewDetails')}</span>
                      </button>

                      <button
                        className="w-full border-2 border-amber-600 text-amber-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] flex items-center justify-center gap-2 group/btn"
                        style={{ background: 'var(--surface)' }}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span className="subtitle">{t('products.addToCart')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <ChevronLeft className="w-5 h-5 text-amber-700" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    currentPage === page
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-300/50'
                      : 'border text-amber-700'
                  }`}
                  style={currentPage !== page ? { background: 'var(--surface)', borderColor: 'var(--border)', fontFamily: "'Lexend', sans-serif" } : { fontFamily: "'Lexend', sans-serif" }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <ChevronRight className="w-5 h-5 text-amber-700" />
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={handleCloseModal}
            allProducts={products}
          />
        </Suspense>
      )}
    </>
  );
});
