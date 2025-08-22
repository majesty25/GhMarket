import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useGetCategoriesQuery } from '@/redux/features/api/apiSlice';
import type { Category } from '@/types';

const CategoryCard = ({ category }: { category: Category}) => {
  // Get subcategories from children array
  const displaySubCategories = category.children?.slice(0, 4) || [];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <div 
        className="h-40 bg-cover bg-center relative"
        style={{ 
          backgroundImage: category.imageUrl 
            ? `url(${category.imageUrl})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <div className="text-sm text-white/80">
            {category.children?.length || 0} subcategories
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {category.description || `Discover amazing ${category.name.toLowerCase()} products`}
        </p>
        
        {displaySubCategories.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {displaySubCategories.map(children => (
              <Link 
                key={children._id} 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${children.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm hover:text-primary truncate"
              >
                {children.name}
              </Link>
            ))}
          </div>
        )}
        
        <Link 
          href={`/category/${category._id}`}
          className="text-primary text-sm font-medium hover:underline inline-block"
        >
          Browse All <i className="ri-arrow-right-line align-middle ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    document.title = 'Categories - GhanaMarket';
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <i className="ri-error-warning-line text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">Failed to load categories</h2>
          <p className="text-neutral-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const categories = categoriesData || [];
  
  // Get all subcategories that are marked as featured (if you have a featured field)
  // For now, we'll take the first few subcategories from each category
  const featuredSubCategories = categories
    .flatMap(category => 
      (category.children || []).slice(0, 2) // Take first 2 from each category
    )
    .slice(0, 12); // Limit to 12 total featured subcategories
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center flex-wrap">
          <li className="inline-flex items-center">
            <Link href="/" className="text-neutral-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="text-neutral-800 font-medium">
            Categories
          </li>
        </ol>
      </nav>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Explore our wide range of product categories, from electronics and fashion to groceries and home goods.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      
      {featuredSubCategories.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-12">
          <h2 className="text-xl font-bold mb-6">Featured Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredSubCategories.map(children => {
              // Find the parent category for this children
              const parentCategory = categories.find(cat => 
                cat.children?.some(child => child._id === children._id)
              );
              
              return (
                <Link 
                  key={children._id} 
                  href={`/category/${parentCategory?._id}`}
                  // href={`/category/${parentCategory?.name.toLowerCase().replace(/\s+/g, '-') || 'category'}/${children.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-primary/20 to-primary/40">
                    {children.imageUrl ? (
                      <img 
                        src={children.imageUrl} 
                        alt={children.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary">
                        <i className="ri-shopping-bag-line text-2xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium group-hover:text-primary transition">{children.name}</h3>
                    <p className="text-xs text-neutral-500">{parentCategory?.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold mb-3">Can't find what you're looking for?</h2>
        <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
          Our catalog of products is continuously growing. If you can't find a specific category or product, feel free to contact us.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;