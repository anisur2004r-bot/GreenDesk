import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedCategories } from './components/FeaturedCategories';
import { HomeSections } from './components/HomeSections';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { CheckoutView } from './components/CheckoutView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { PlantCareTipsView } from './components/PlantCareTipsView';
import { AboutContactView } from './components/AboutContactView';
import { PolicyFaqView } from './components/PolicyFaqView';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { page } = useShop();

  if (page === 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-stone-100 font-sans">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-[#1c2b20]">
      <Navbar />

      <main className="flex-1">
        {page === 'home' && (
          <>
            <HeroBanner />
            <FeaturedCategories />
            <HomeSections />
          </>
        )}

        {page === 'shop' && <ShopView />}

        {page === 'product-detail' && <ProductDetailView />}

        {page === 'cart' && <CheckoutView />}

        {page === 'checkout' && <CheckoutView />}

        {page === 'tracking' && <OrderTrackingView />}

        {page === 'care-tips' && <PlantCareTipsView />}

        {page === 'about' && <AboutContactView />}

        {page === 'contact' && <AboutContactView />}

        {page === 'policy' && <PolicyFaqView />}

        {page === 'faq' && <PolicyFaqView />}
      </main>

      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
