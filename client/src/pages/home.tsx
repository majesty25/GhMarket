import HeroCarousel from '@/components/home/hero-carousel';
import ServiceHighlights from '@/components/home/service-highlights';
import CategoryHighlights from '@/components/home/category-highlights';
import ProductGrid from '@/components/home/product-grid';
import DeliveryHighlight from '@/components/home/delivery-highlight';
import SellersHighlight from '@/components/home/sellers-highlight';
import PaymentMethodsHighlight from '@/components/home/payment-methods-highlight';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'GhanaMarket - E-Commerce Platform';
  }, []);

  return (
    <>
      <HeroCarousel />
      <ServiceHighlights />
      <CategoryHighlights />
      <ProductGrid />
      <DeliveryHighlight />
      <SellersHighlight />
      <PaymentMethodsHighlight />
    </>
  );
};

export default Home;
