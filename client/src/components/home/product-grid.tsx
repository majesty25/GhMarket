import { useState } from 'react';
import ProductCard from '@/components/products/product-card';
import { useGetProductsQuery } from '@/redux/features/api/apiSlice';
import { Product } from '@/types';

const ProductGrid = () => {
  const [page, setPage] = useState(0);
  const { data: productList, error, isLoading } = useGetProductsQuery();
  
  // Handle loading state
  if (isLoading) {
    return (
      <section className="py-10 w-full bg-white" id="product-grid">
        <div className="container w-full mx-auto px-4">
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <section className="py-10 w-full bg-white" id="product-grid">
        <div className="container w-full mx-auto px-4">
          <div className="text-center text-red-500">Error loading products</div>
        </div>
      </section>
    );
  }

  // Extract products from the nested data structure
  const products = productList?.data?.products || [];

  const displayedProducts = products.slice(page * 6, page * 6 + 6);

  // Pagination handlers
  const totalPages = Math.ceil(products.length / 6);
  
  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <section className="py-10 w-full bg-white" id="product-grid">
      <div className="container w-full mx-auto px-4">
        {/* <div className="flex w-full justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-poppins">Featured Products</h2>
          <div className="flex gap-1">
            <button 
              className="bg-neutral-100 hover:bg-neutral-200 w-8 h-8 rounded flex items-center justify-center text-neutral-700"
              onClick={prevPage}
              aria-label="Previous page"
              disabled={products.length <= 6}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button 
              className="bg-primary w-8 h-8 rounded flex items-center justify-center text-white"
              onClick={nextPage}
              aria-label="Next page"
              disabled={products.length <= 6}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div> */}
        
        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {displayedProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {displayedProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {displayedProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {displayedProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {/* Optional: Display pagination info */}
        {products.length > 6 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Page {page + 1} of {totalPages}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;