import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { categories, products } from '@/data';
import ProductCard from '@/components/products/product-card';
import { SubCategory } from '@/types';

const CategoryPage = () => {
  const { slug, subSlug } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(subSlug || null);
  const [sortOption, setSortOption] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'
  
  // Find the category based on the slug
  const category = categories.find(c => c.slug === slug);
  
  // Filtering products based on category and subcategory
  const categoryProducts = products.filter(p => p.category.id === category?.id);
  const filteredProducts = selectedSubCategory 
    ? categoryProducts.filter(p => {
        const subCategory = category?.subCategories?.find(sc => sc.slug === selectedSubCategory);
        // In a real app, products would be directly linked to subcategories
        // Here we're using a basic keyword matching to simulate subcategory filtering
        return p.name.toLowerCase().includes(subCategory?.name.toLowerCase() || '') || 
               p.description.toLowerCase().includes(subCategory?.name.toLowerCase() || '');
      })
    : categoryProducts;
    
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'newest':
        // In a real app, you would use a date field. Here we'll just use the product ID as a proxy
        return parseInt(b.id) - parseInt(a.id);
      case 'featured':
      default:
        // Sort featured first, then by rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });
  
  useEffect(() => {
    if (category) {
      document.title = `${category.name} - GhanaMarket`;
    }
  }, [category]);
  
  // Handle subcategory selection
  const handleSubCategoryClick = (subCategorySlug: string) => {
    if (selectedSubCategory === subCategorySlug) {
      // If user clicks on the already selected subcategory, clear the filter
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(subCategorySlug);
    }
  };
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">Sorry, the category you're looking for doesn't exist or has been removed.</p>
          <Link href="/categories" className="bg-primary text-white px-6 py-2 rounded-md">
            Browse Categories
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
            <Link href="/categories" className="text-neutral-500 hover:text-primary">
              Categories
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className={`${selectedSubCategory ? 'inline-flex items-center' : 'text-neutral-800 font-medium'}`}>
            {selectedSubCategory ? (
              <>
                <Link href={`/category/${category.slug}`} className="text-neutral-500 hover:text-primary">
                  {category.name}
                </Link>
                <span className="mx-2 text-neutral-400">/</span>
              </>
            ) : (
              category.name
            )}
          </li>
          {selectedSubCategory && (
            <li className="text-neutral-800 font-medium">
              {category.subCategories?.find(sc => sc.slug === selectedSubCategory)?.name}
            </li>
          )}
        </ol>
      </nav>
      
      {/* Category Header */}
      <div className="mb-8">
        <div 
          className="h-64 bg-cover bg-center rounded-lg relative mb-6"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/80 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>
      
      {/* Subcategories */}
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.subCategories.map(subCategory => (
              <button 
                key={subCategory.id}
                className={`group ${selectedSubCategory === subCategory.slug ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSubCategoryClick(subCategory.slug)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <img 
                    src={subCategory.image} 
                    alt={subCategory.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  />
                </div>
                <div className="text-center">
                  <h3 className={`text-sm font-medium group-hover:text-primary transition ${
                    selectedSubCategory === subCategory.slug ? 'text-primary' : ''
                  }`}>
                    {subCategory.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Products Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="border-b border-neutral-200 p-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-medium">
              {selectedSubCategory 
                ? `${category.subCategories?.find(sc => sc.slug === selectedSubCategory)?.name} Products` 
                : `${category.name} Products`}
            </h2>
            <div className="ml-4 text-sm text-neutral-500">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>
          
          <div className="flex items-center mt-3 sm:mt-0">
            {selectedSubCategory && (
              <button 
                className="flex items-center text-sm mr-4 text-neutral-500 hover:text-primary"
                onClick={() => setSelectedSubCategory(null)}
              >
                <i className="ri-close-line mr-1"></i> Clear Filter
              </button>
            )}
            
            <div className="relative">
              <select 
                className="border border-neutral-300 rounded-md text-sm py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <i className="ri-arrow-down-s-line"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-inbox-line text-2xl text-neutral-400"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-neutral-500 mb-6">We couldn't find any products in this category.</p>
              {selectedSubCategory && (
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-md"
                  onClick={() => setSelectedSubCategory(null)}
                >
                  View All {category.name} Products
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Product Recommendations */}
      {sortedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Shopping Guide</h2>
          <div className="text-neutral-600">
            <p className="mb-4">
              Looking for the best {selectedSubCategory 
                ? category.subCategories?.find(sc => sc.slug === selectedSubCategory)?.name.toLowerCase() 
                : category.name.toLowerCase()} products? Here are some tips:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Check product ratings and reviews from verified buyers</li>
              <li>Compare prices from different sellers</li>
              <li>Look for warranty information and return policies</li>
              <li>Consider delivery options and times before ordering</li>
            </ul>
            
            <p>
              If you need further assistance, our customer service team is available to help you find the perfect product.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;