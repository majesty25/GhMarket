import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import ProductCard from '@/components/products/product-card';
import { useGetCategoryByIdQuery } from '@/redux/features/api/apiSlice';

const CategoryPage = () => {
  const params = useParams();
  console.log('All params:', params); // Debug: see all available params
  
  // Try different possible parameter names
  const id = params.slug || params.categoryId || params.category;
  console.log('Category ID:', id);
  
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'
  
  // Only fetch if we have an ID
  const { data: categoryData, isLoading, error } = useGetCategoryByIdQuery(id, {
    skip: !id // Skip the query if no ID is available
  });
  // If the API returns an array, use the first element; otherwise, use as is
  const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;
  
  const categoryProducts: any[] = []; // This should be replaced with actual product fetching
  
  const filteredProducts = selectedSubCategory 
    ? categoryProducts.filter(p => {
        const subCategory = category?.children?.find(sc => sc._id === selectedSubCategory);
        return p.name?.toLowerCase().includes(subCategory?.name.toLowerCase() || '') || 
               p.description?.toLowerCase().includes(subCategory?.name.toLowerCase() || '');
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
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'featured':
      default:
        // Sort featured first, then by rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 0) - (a.rating || 0);
    }
  });
  
  useEffect(() => {
    if (category) {
      document.title = `${category.name} - GhanaMarket`;
    }
  }, [category]);
  
  // Handle subcategory selection
  const handleSubCategoryClick = (subCategoryId: string) => {
    if (selectedSubCategory === subCategoryId) {
      // If user clicks on the already selected subcategory, clear the filter
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(subCategoryId);
    }
  };

  // No ID available
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-red-500 mb-4">
            <i className="ri-error-warning-line text-4xl"></i>
          </div>
          <h1 className="text-2xl font-bold mb-4">Invalid Category</h1>
          <p className="mb-6">No category ID was provided in the URL.</p>
          <Link href="/categories" className="bg-primary text-white px-6 py-2 rounded-md">
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-red-500 mb-4">
            <i className="ri-error-warning-line text-4xl"></i>
          </div>
          <h1 className="text-2xl font-bold mb-4">Error Loading Category</h1>
          <p className="mb-6">Sorry, we couldn't load the category. Please try again later.</p>
          <p className="text-sm text-gray-500 mb-4">Category ID: {id}</p>
          <Link href="/categories" className="bg-primary text-white px-6 py-2 rounded-md">
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }
  
  // Category not found
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">Sorry, the category you're looking for doesn't exist or has been removed.</p>
          <p className="text-sm text-gray-500 mb-4">Category ID: {id}</p>
          <Link href="/categories" className="bg-primary text-white px-6 py-2 rounded-md">
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  // Get the selected subcategory details
  const selectedSubCategoryData = selectedSubCategory 
    ? category.children?.find(sc => sc._id === selectedSubCategory)
    : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Debug info - remove in production */}
      <div className="bg-gray-100 p-2 mb-4 text-xs rounded">
        <strong>Debug:</strong> Category ID: {id}, Category Name: {category?.name}
      </div>

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
                <Link href={`/category/${category._id}`} className="text-neutral-500 hover:text-primary">
                  {category.name}
                </Link>
                <span className="mx-2 text-neutral-400">/</span>
              </>
            ) : (
              category.name
            )}
          </li>
          {selectedSubCategory && selectedSubCategoryData && (
            <li className="text-neutral-800 font-medium">
              {selectedSubCategoryData.name}
            </li>
          )}
        </ol>
      </nav>
      
      {/* Category Header */}
      <div className="mb-8">
        <div 
          className="h-64 bg-cover bg-center rounded-lg relative mb-6"
          style={{ 
            backgroundImage: category.imageUrl 
              ? `url(${category.imageUrl})` 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/80 max-w-2xl">
              Discover amazing {category.name.toLowerCase()} products from top brands and sellers.
            </p>
          </div>
        </div>
      </div>
      
      {/* Subcategories */}
      {category.children && category.children.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.children.map(subCategory => (
              <button 
                key={subCategory._id}
                className={`group ${selectedSubCategory === subCategory._id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSubCategoryClick(subCategory._id)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  {subCategory.imageUrl ? (
                    <img 
                      src={subCategory.imageUrl} 
                      alt={subCategory.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-2xl text-primary"></i>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className={`text-sm font-medium group-hover:text-primary transition ${
                    selectedSubCategory === subCategory._id ? 'text-primary' : ''
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
              {selectedSubCategoryData 
                ? `${selectedSubCategoryData.name} Products` 
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
              <p className="text-neutral-500 mb-6">
                {selectedSubCategory 
                  ? "We couldn't find any products in this subcategory." 
                  : "We couldn't find any products in this category."}
              </p>
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
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Shopping Guide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">Shopping Guide</h2>
        <div className="text-neutral-600">
          <p className="mb-4">
            Looking for the best {selectedSubCategoryData 
              ? selectedSubCategoryData.name.toLowerCase() 
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
    </div>
  );
};

export default CategoryPage;