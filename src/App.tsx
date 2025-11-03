import { useEffect, useState, lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { loadProducts, Product } from '@/lib/csvLoader';
import './App.css';

const Collections = lazy(() => import('@/components/Collections').then(m => ({ default: m.Collections })));
const ProductGrid = lazy(() => import('@/components/ProductGrid').then(m => ({ default: m.ProductGrid })));
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })));
const FAQ = lazy(() => import('@/components/FAQ').then(m => ({ default: m.FAQ })));
const ConsultationForm = lazy(() => import('@/components/ConsultationForm').then(m => ({ default: m.ConsultationForm })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));
const Cart = lazy(() => import('@/components/Cart').then(m => ({ default: m.Cart })));

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await loadProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-amber-200 dark:border-amber-700 border-t-amber-600 dark:border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-amber-800 dark:text-amber-200 subtext">Loading beautiful furniture...</p>
            </div>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <Header />
            <Hero />
            <Suspense fallback={<div className="h-96" />}>
              <Collections products={products} />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <ProductGrid products={products} />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <FAQ />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <ConsultationForm />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <Footer />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <Cart />
            </Suspense>
          </div>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
