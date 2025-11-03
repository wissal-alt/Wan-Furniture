import { Product } from '@/lib/csvLoader';
import { X, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
}

export function ProductModal({ product, isOpen, onClose, allProducts }: ProductModalProps) {
  const { addToCart, openCart } = useCart();
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [showArrows, setShowArrows] = useState(true);
  const [relatedProductsScrollPosition, setRelatedProductsScrollPosition] = useState(0);

  const imagePlaceholders = [
    currentProduct.imageUrl || '',
    currentProduct.imageUrl || '',
    currentProduct.imageUrl || '',
    currentProduct.imageUrl || '',
    currentProduct.imageUrl || '',
  ];

  const currentIndex = allProducts.findIndex(p => p.id === currentProduct.id);
  const relatedProducts = allProducts
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 6);

  useEffect(() => {
    setCurrentProduct(product);
    setSelectedImageIndex(0);
    setShowArrows(true);
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const modalContent = document.getElementById('modal-content');
    if (!modalContent) return;

    const handleScroll = () => {
      const scrollTop = modalContent.scrollTop;
      const mainProductHeight = 800;

      if (scrollTop > mainProductHeight) {
        setShowArrows(false);
      } else {
        setShowArrows(true);
      }
    };

    modalContent.addEventListener('scroll', handleScroll);
    return () => modalContent.removeEventListener('scroll', handleScroll);
  }, [isOpen, currentProduct]);

  const handleAddToCart = () => {
    addToCart(currentProduct);
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(currentProduct);
    onClose();
    openCart();
  };

  const handlePrevProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      const newProduct = allProducts[currentIndex - 1];
      setCurrentProduct(newProduct);
      setSelectedImageIndex(0);
      setShowArrows(true);
      const modalContent = document.getElementById('modal-content');
      if (modalContent) {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNextProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < allProducts.length - 1) {
      const newProduct = allProducts[currentIndex + 1];
      setCurrentProduct(newProduct);
      setSelectedImageIndex(0);
      setShowArrows(true);
      const modalContent = document.getElementById('modal-content');
      if (modalContent) {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const convertPrice = (priceStr: string): { rp: string; usd: string } => {
    const cleanPrice = priceStr.replace(/[^\d]/g, '');
    const rpAmount = parseInt(cleanPrice) || 0;
    const usdAmount = Math.round(rpAmount / 16666);
    return {
      rp: `Rp${rpAmount.toLocaleString('id-ID')}`,
      usd: `$${usdAmount}`
    };
  };

  const cleanDescription = (desc: string): string => {
    return desc
      .replace(/\*\*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const scrollRelatedProducts = (direction: 'left' | 'right') => {
    const container = document.getElementById('related-products-container');
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === 'left'
      ? Math.max(0, relatedProductsScrollPosition - scrollAmount)
      : relatedProductsScrollPosition + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setRelatedProductsScrollPosition(newPosition);
  };

  if (!isOpen) return null;

  const prices = convertPrice(currentProduct.price);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {currentIndex > 0 && (
          <button
            onClick={handlePrevProduct}
            className={`absolute left-2 lg:left-8 z-20 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group ${
              showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ background: 'var(--surface)' }}
          >
            <ChevronLeft className="w-6 h-6 text-amber-900 dark:text-amber-400 group-hover:scale-125 transition-transform" />
          </button>
        )}

        <div
          id="modal-content"
          className="modal rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 relative"
          style={{ background: 'var(--surface)', color: 'var(--text)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 backdrop-blur-sm border-b p-4 flex justify-between items-center z-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Product Details</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors hover:bg-amber-50 dark:hover:bg-amber-900/20"
            >
              <X className="w-6 h-6" style={{ color: 'var(--text)' }} />
            </button>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden relative group" style={{ background: 'var(--muted-surface)' }}>
                  {imagePlaceholders[selectedImageIndex] && imagePlaceholders[selectedImageIndex].trim() !== '' ? (
                    <img
                      src={imagePlaceholders[selectedImageIndex]}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover absolute inset-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-amber-600 subtext">Image coming soon</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {imagePlaceholders.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                        selectedImageIndex === index
                          ? 'border-amber-600 shadow-md scale-105'
                          : 'border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      {img && img.trim() !== '' ? (
                        <img
                          src={img}
                          alt={`${currentProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover absolute inset-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center absolute inset-0" style={{ background: 'var(--muted-surface)' }}>
                          <span className="text-xs text-amber-600">{index + 1}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-sm font-medium text-amber-700 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                    {currentProduct.category}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
                  {currentProduct.name}
                </h2>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-amber-700" style={{ fontFamily: "'Lexend', sans-serif" }}>
                    {prices.rp}
                  </span>
                  <span className="text-xl text-amber-600" style={{ fontFamily: "'Lexend', sans-serif" }}>
                    / {prices.usd}
                  </span>
                </div>

                <div className="max-w-none">
                  <p className="whitespace-pre-line leading-relaxed text-[15px]" style={{ color: 'var(--text)' }}>
                    {cleanDescription(currentProduct.description)}
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 border-2 border-amber-600 text-amber-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden"
                      style={{ background: 'var(--surface)' }}
                    >
                      {showAddedFeedback ? (
                        <span className="animate-in zoom-in duration-200">Added!</span>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                      Buy Now
                    </button>
                  </div>

                  {currentProduct.url && (
                    <a
                      href={currentProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-amber-700 hover:text-amber-800 transition-colors font-medium group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      View on Tokopedia
                    </a>
                  )}
                </div>
              </div>
            </div>

            {relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'DM Serif Text', serif", color: 'var(--text)' }}>
                  Related Products
                </h3>
                <div className="relative">
                  {relatedProducts.length > 3 && (
                    <>
                      <button
                        onClick={() => scrollRelatedProducts('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
                        style={{ background: 'var(--surface)' }}
                      >
                        <ChevronLeft className="w-5 h-5 text-amber-900 group-hover:scale-125 transition-transform" />
                      </button>
                      <button
                        onClick={() => scrollRelatedProducts('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
                        style={{ background: 'var(--surface)' }}
                      >
                        <ChevronRight className="w-5 h-5 text-amber-900 group-hover:scale-125 transition-transform" />
                      </button>
                    </>
                  )}
                  <div
                    id="related-products-container"
                    className="flex gap-4 overflow-x-auto scroll-smooth"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {relatedProducts.map((relatedProduct) => {
                      const relatedPrices = convertPrice(relatedProduct.price);
                      return (
                        <button
                          key={relatedProduct.id}
                          onClick={() => {
                            setCurrentProduct(relatedProduct);
                            setSelectedImageIndex(0);
                            setShowArrows(true);
                            setRelatedProductsScrollPosition(0);
                            const modalContent = document.getElementById('modal-content');
                            if (modalContent) {
                              modalContent.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="rounded-xl overflow-hidden border border-amber-100 dark:border-amber-800 hover:border-amber-300 transition-all duration-300 hover:shadow-lg text-left flex-shrink-0 w-64"
                          style={{ background: 'var(--surface)' }}
                        >
                          <div className="aspect-square overflow-hidden relative" style={{ background: 'var(--muted-surface)' }}>
                            {relatedProduct.imageUrl && relatedProduct.imageUrl.trim() !== '' ? (
                              <img
                                src={relatedProduct.imageUrl}
                                alt={relatedProduct.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-xs text-amber-600">No image</span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold line-clamp-2 mb-2 text-sm" style={{ color: 'var(--text)' }}>
                              {relatedProduct.name}
                            </h4>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-bold text-amber-700" style={{ fontFamily: "'Lexend', sans-serif" }}>
                                {relatedPrices.rp}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {currentIndex < allProducts.length - 1 && (
          <button
            onClick={handleNextProduct}
            className={`absolute right-2 lg:right-8 z-20 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group ${
              showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ background: 'var(--surface)' }}
          >
            <ChevronRight className="w-6 h-6 text-amber-900 dark:text-amber-400 group-hover:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
