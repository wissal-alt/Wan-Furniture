import { X, ShoppingCart, Plus, Minus, Trash2, ExternalLink, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';

export const Cart = memo(function Cart() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, closeCart, cartCount } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showProgressPanel, setShowProgressPanel] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const popupRef = useRef<Window | null>(null);
  const checkIntervalRef = useRef<number | null>(null);

  const getTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const priceStr = item.price.replace(/[^\d]/g, '');
      const price = parseInt(priceStr) || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const formatPrice = useCallback((price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  }, []);

  const handleCompleteOrder = useCallback(() => {
    if (cartItems.length === 0) return;
    setShowCheckoutModal(true);
  }, [cartItems.length]);

  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  const openTokopediaPopup = useCallback((url: string) => {
    const popupWidth = Math.floor(window.screen.width * 0.55);
    const popupHeight = window.screen.height;
    const popupLeft = 0;
    const popupTop = 0;
    const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop},scrollbars=yes,resizable=yes`;

    const popup = window.open(
      encodeURI(url),
      'tokopedia_checkout',
      popupFeatures
    );

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.open(url, '_blank');
      return null;
    }

    return popup;
  }, []);

  const startPopupMonitoring = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    checkIntervalRef.current = window.setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(checkIntervalRef.current!);
        checkIntervalRef.current = null;
        setShowRetryModal(true);
      }
    }, 500);
  }, []);

  const proceedToCheckout = useCallback(() => {
    setShowCheckoutModal(false);

    const firstItem = cartItems[0];
    const firstUrl = firstItem.url && firstItem.url.trim() !== '' ? firstItem.url.trim() : '';

    if (!firstUrl) {
      return;
    }

    const popup = openTokopediaPopup(firstUrl);
    popupRef.current = popup;

    setCurrentProductIndex(0);
    setShowProgressPanel(true);

    if (popup) {
      startPopupMonitoring();
    }
  }, [cartItems, openTokopediaPopup, startPopupMonitoring]);

  const handleNextProduct = useCallback(() => {
    const nextIndex = currentProductIndex + 1;

    if (nextIndex >= cartItems.length) {
      return;
    }

    const nextItem = cartItems[nextIndex];
    const nextUrl = nextItem.url && nextItem.url.trim() !== '' ? nextItem.url.trim() : '';

    if (!nextUrl) {
      setCurrentProductIndex(nextIndex);
      return;
    }

    if (popupRef.current && !popupRef.current.closed) {
      try {
        popupRef.current.location.href = nextUrl;
      } catch (e) {
        window.open(nextUrl, '_blank');
      }
    } else {
      const popup = openTokopediaPopup(nextUrl);
      popupRef.current = popup;
      if (popup) {
        startPopupMonitoring();
      }
    }

    setCurrentProductIndex(nextIndex);
  }, [cartItems, currentProductIndex, openTokopediaPopup, startPopupMonitoring]);

  const handleFinish = useCallback(() => {
    setShowProgressPanel(false);
    setCurrentProductIndex(0);
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    popupRef.current = null;
  }, []);

  const handleRetry = useCallback(() => {
    setShowRetryModal(false);
    const currentItem = cartItems[currentProductIndex];
    const url = currentItem.url && currentItem.url.trim() !== '' ? currentItem.url.trim() : '';

    if (url) {
      const popup = openTokopediaPopup(url);
      popupRef.current = popup;
      if (popup) {
        startPopupMonitoring();
      }
    }
  }, [cartItems, currentProductIndex, openTokopediaPopup, startPopupMonitoring]);

  const handleCancelRetry = useCallback(() => {
    setShowRetryModal(false);
    handleFinish();
  }, [handleFinish]);

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 animate-in fade-in duration-300"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={closeCart}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md shadow-2xl z-50 animate-in slide-in-from-right duration-300" style={{ background: 'var(--surface)' }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Your Cart</h2>
              {cartCount > 0 && (
                <span className="bg-amber-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-amber-900 dark:text-amber-400" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Your cart is empty</h3>
              <p className="subtext" style={{ color: 'var(--muted-text)' }}>Add some beautiful furniture to get started</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => {
                  const priceStr = item.price.replace(/[^\d]/g, '');
                  const price = parseInt(priceStr) || 0;

                  return (
                    <div
                      key={item.id}
                      className="border rounded-xl p-4 animate-in fade-in slide-in-from-right duration-300"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0" style={{ background: 'var(--muted-surface)' }}>
                          {item.imageUrl && item.imageUrl.trim() !== '' ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-600 text-xs">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 line-clamp-2 text-sm" style={{ color: 'var(--text)' }}>
                            {item.name}
                          </h3>
                          <p className="text-xs text-amber-700 mb-2">{item.category}</p>
                          <p className="text-amber-700 font-bold">{formatPrice(price)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 border border-amber-200 dark:border-amber-800 rounded-lg p-1" style={{ background: 'var(--surface)' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-amber-50 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-amber-700" />
                          </button>
                          <span className="w-8 text-center font-semibold" style={{ color: 'var(--text)' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-amber-50 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-amber-700" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t p-6" style={{ borderColor: 'var(--border)', background: 'var(--muted-surface)' }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Total</span>
                  <span className="text-2xl font-bold text-amber-700">
                    {formatPrice(getTotalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCompleteOrder}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Complete Your Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showCheckoutModal && (
        <>
          <div
            className="fixed inset-0 z-[60] animate-in fade-in duration-200"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
            onClick={() => setShowCheckoutModal(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md px-4 animate-in zoom-in-95 duration-300">
            <div className="rounded-2xl shadow-2xl p-8 border-2 border-amber-300/30" style={{ background: 'var(--surface)' }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: "'DM Serif Text', serif" }}>
                  Secure checkout powered by Tokopedia
                </h3>

                <p className="text-sm mb-6 subtext" style={{ color: 'var(--muted-text)' }}>
                  {cartItems.length === 1
                    ? "You'll be redirected to complete your purchase"
                    : "For secure checkout, your products will open one by one in Tokopedia."}
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 border-2"
                    style={{ background: 'var(--muted-surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={proceedToCheckout}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showProgressPanel && (
        <div
          className="fixed top-0 right-0 z-[9999] animate-in slide-in-from-right duration-300 w-full md:w-[35vw] h-full md:max-w-[480px] overflow-y-auto"
          style={{ background: 'var(--surface)' }}
        >
          <div className="h-full flex flex-col p-6 md:p-8">
            <div className="w-full flex-1 flex flex-col justify-center">
              <div className="aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden mb-6 shadow-xl" style={{ background: 'var(--muted-surface)' }}>
                {cartItems[currentProductIndex]?.imageUrl && cartItems[currentProductIndex]?.imageUrl.trim() !== '' ? (
                  <img
                    src={cartItems[currentProductIndex]?.imageUrl}
                    alt={cartItems[currentProductIndex]?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-amber-600">
                    No image
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2" style={{ color: 'var(--text)', fontFamily: "'DM Serif Text', serif" }}>
                  {cartItems[currentProductIndex]?.name}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--muted-text)', fontFamily: "'Lexend', sans-serif" }}>
                  Your checkout is now in progress on Tokopedia. Please complete your purchase to confirm.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleFinish}
                  className="w-full px-5 py-3 rounded-xl font-semibold transition-all duration-300 border-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 shadow-md"
                  style={{ background: 'var(--muted-surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
                >
                  Finish
                </button>
                {currentProductIndex < cartItems.length - 1 && (
                  <button
                    onClick={handleNextProduct}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    Next Product
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showRetryModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-end pr-0 md:pr-4">
          <div
            className="absolute inset-0 animate-in fade-in duration-200"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={handleCancelRetry}
          />
          <div className="relative w-full max-w-sm mx-4 md:mr-[calc(17.5vw-12rem)] animate-in zoom-in-95 duration-300">
            <div className="rounded-2xl shadow-2xl p-6 border-2 border-amber-300/30" style={{ background: 'var(--surface)' }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3">
                  <AlertCircle className="w-7 h-7 text-amber-700 dark:text-amber-400" />
                </div>

                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)', fontFamily: "'DM Serif Text', serif" }}>
                  Checkout Closed
                </h3>

                <p className="text-sm mb-5 subtext" style={{ color: 'var(--muted-text)' }}>
                  You closed the checkout early. Would you like to retry?
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleCancelRetry}
                    className="flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 border-2 text-sm"
                    style={{ background: 'var(--muted-surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRetry}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
