import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Collections } from '@/components/Collections';
import { ProductGrid } from '@/components/ProductGrid';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { ConsultationForm } from '@/components/ConsultationForm';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { loadProducts, Product } from '@/lib/csvLoader';
import './App.css';

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
            <Collections products={products} />
            <ProductGrid products={products} />
            <About />
            <FAQ />
            <ConsultationForm />
            <Footer />
            <Cart />
          </div>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
