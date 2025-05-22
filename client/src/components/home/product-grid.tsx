import { useState } from 'react';
import ProductCard from '@/components/products/product-card';
import { products } from '@/data';

const ProductGrid = () => {
  const [page, setPage] = useState(0);
  const featuredProducts = products.filter(product => product.featured);
  
  const nextPage = () => {
    setPage((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 6));
  };
  
  const prevPage = () => {
    setPage((prev) => (prev === 0 ? Math.ceil(featuredProducts.length / 6) - 1 : prev - 1));
  };

  const displayedProducts = featuredProducts.slice(page * 6, page * 6 + 6);

  return (
    <section className="py-10 bg-white" id="product-grid">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-poppins">Featured Products</h2>
          <div className="flex gap-2">
            <button 
              className="bg-neutral-100 hover:bg-neutral-200 w-8 h-8 rounded flex items-center justify-center text-neutral-700"
              onClick={prevPage}
              aria-label="Previous page"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button 
              className="bg-primary w-8 h-8 rounded flex items-center justify-center text-white"
              onClick={nextPage}
              aria-label="Next page"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
