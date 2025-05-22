import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { sellers, products, categories } from '@/data';
import ProductCard from '@/components/products/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const StorePage = () => {
  const { id } = useParams();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const seller = sellers.find(s => s.id === id);
  const sellerProducts = products.filter(p => p.seller.id === id);
  
  // Get unique categories from seller's products
  const sellerCategories = Array.from(
    new Set(sellerProducts.map(p => p.category.id))
  ).map(catId => {
    return categories.find(c => c.id === catId);
  }).filter(Boolean);
  
  // Filter products by category if a filter is selected
  const filteredProducts = categoryFilter 
    ? sellerProducts.filter(p => p.category.id === categoryFilter)
    : sellerProducts;
  
  // Sort products: featured first, then by rating
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  useEffect(() => {
    if (seller) {
      document.title = `${seller.name} - GhanaMarket`;
    }
  }, [seller]);
  
  if (!seller) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Store Not Found</h1>
          <p className="mb-6">Sorry, the store you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="bg-primary text-white px-6 py-2 rounded-md">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm">
        <ol className="flex items-center flex-wrap">
          <li className="inline-flex items-center">
            <Link href="/" className="text-neutral-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="inline-flex items-center">
            <Link href="/stores" className="text-neutral-500 hover:text-primary">
              Stores
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="text-neutral-800 font-medium truncate">
            {seller.name}
          </li>
        </ol>
      </nav>
      
      {/* Store Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-primary to-primary-dark relative">
          <div className="absolute -bottom-12 left-8 flex items-end">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden border-4 border-white">
              {seller.logo ? (
                <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover" />
              ) : (
                <div 
                  className={`w-full h-full flex items-center justify-center text-white font-bold text-2xl`}
                  style={{ backgroundColor: seller.bgColor }}
                >
                  {seller.initials}
                </div>
              )}
            </div>
            <div className="ml-4 mb-2 text-white">
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-300">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = seller.rating;
                    if (i < Math.floor(rating)) {
                      return <i key={i} className="ri-star-fill text-sm"></i>;
                    } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                      return <i key={i} className="ri-star-half-fill text-sm"></i>;
                    } else {
                      return <i key={i} className="ri-star-line text-sm"></i>;
                    }
                  })}
                </div>
                <span className="text-sm">({seller.rating.toFixed(1)})</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-6 px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1">
              <div className="flex gap-4 mb-4 flex-wrap">
                <Badge variant="outline" className="bg-white px-3 py-1 text-neutral-600 border-neutral-300">
                  <i className="ri-store-2-line mr-1"></i> {seller.category}
                </Badge>
                <Badge variant="outline" className="bg-white px-3 py-1 text-neutral-600 border-neutral-300">
                  <i className="ri-box-3-line mr-1"></i> {sellerProducts.length} Products
                </Badge>
                <Badge variant="outline" className="bg-white px-3 py-1 text-neutral-600 border-neutral-300">
                  <i className="ri-map-pin-line mr-1"></i> Ghana
                </Badge>
                <Badge variant="outline" className="bg-white px-3 py-1 text-neutral-600 border-neutral-300">
                  <i className="ri-time-line mr-1"></i> Joined 2023
                </Badge>
              </div>
              <p className="text-neutral-600 line-clamp-2">{seller.description}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark transition">
                <i className="ri-chat-1-line mr-1"></i> Contact
              </button>
              <button className="border border-primary text-primary px-4 py-2 rounded-md font-medium hover:bg-primary/5 transition">
                <i className="ri-heart-line mr-1"></i> Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              <button 
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  categoryFilter === null ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-neutral-100'
                }`}
                onClick={() => setCategoryFilter(null)}
              >
                All Categories ({sellerProducts.length})
              </button>
              {sellerCategories.map(category => category && (
                <button 
                  key={category.id}
                  className={`w-full text-left px-3 py-2 rounded-md transition flex items-center justify-between ${
                    categoryFilter === category.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-neutral-100'
                  }`}
                  onClick={() => setCategoryFilter(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="text-neutral-500 text-sm">
                    ({sellerProducts.filter(p => p.category.id === category.id).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Tabs defaultValue="products" className="w-full">
              <div className="border-b border-neutral-200">
                <div className="px-6">
                  <TabsList className="h-14 border-0 bg-transparent p-0 rounded-none">
                    <TabsTrigger 
                      value="products" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                    >
                      Products ({sellerProducts.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="featured" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                    >
                      Featured
                    </TabsTrigger>
                    <TabsTrigger 
                      value="about" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                    >
                      About
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <TabsContent value="products" className="p-6">
                {sortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                      <i className="ri-inbox-line text-2xl text-neutral-400"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-neutral-500">This seller has no products in this category yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">
                        {categoryFilter ? (
                          <>Products in {categories.find(c => c.id === categoryFilter)?.name}</>
                        ) : (
                          'All Products'
                        )}
                      </h3>
                      <div className="text-sm text-neutral-500">
                        Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="featured" className="p-6">
                {sellerProducts.filter(p => p.featured).length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                      <i className="ri-award-line text-2xl text-neutral-400"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No featured products</h3>
                    <p className="text-neutral-500">This seller has no featured products yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Featured Products</h3>
                      <div className="text-sm text-neutral-500">
                        Showing {sellerProducts.filter(p => p.featured).length} {sellerProducts.filter(p => p.featured).length === 1 ? 'product' : 'products'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {sellerProducts.filter(p => p.featured).map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="about" className="p-6">
                <h3 className="text-lg font-medium mb-4">About {seller.name}</h3>
                <div className="space-y-4">
                  <p>{seller.description}</p>
                  <p>{seller.description}</p>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-6">
                    <h4 className="font-medium mb-2">Business Information</h4>
                    <ul className="space-y-2">
                      <li className="flex">
                        <span className="w-32 text-neutral-500">Category:</span>
                        <span>{seller.category}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-neutral-500">Location:</span>
                        <span>Accra, Ghana</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-neutral-500">Business Type:</span>
                        <span>Retail</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-neutral-500">Year Founded:</span>
                        <span>2023</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;