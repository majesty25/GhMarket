import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { categories } from '@/data';
import { Category, SubCategory } from '@/types';

const CategoryCard = ({ category }: { category: Category }) => {
  // Get 4 featured subcategories or the first 4 if there are no featured ones
  const featuredSubCategories = category.subCategories?.filter(sc => sc.featured) || [];
  const displaySubCategories = featuredSubCategories.length > 0 
    ? featuredSubCategories.slice(0, 4) 
    : category.subCategories?.slice(0, 4) || [];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <div 
        className="h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <div className="text-sm text-white/80">
            {category.subCategories?.length || 0} subcategories
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {displaySubCategories.map(subCategory => (
            <Link 
              key={subCategory.id} 
              href={`/category/${category.slug}/${subCategory.slug}`}
              className="text-sm hover:text-primary truncate"
            >
              {subCategory.name}
            </Link>
          ))}
        </div>
        
        <Link 
          href={`/category/${category.slug}`}
          className="text-primary text-sm font-medium hover:underline inline-block"
        >
          Browse All <i className="ri-arrow-right-line align-middle ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  useEffect(() => {
    document.title = 'Categories - GhanaMarket';
  }, []);
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-12">
        <h2 className="text-xl font-bold mb-6">Featured Subcategories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.flatMap(category => 
            (category.subCategories || [])
              .filter(subCategory => subCategory.featured)
              .map(subCategory => (
                <Link 
                  key={subCategory.id} 
                  href={`/category/${category.slug}/${subCategory.slug}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2">
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium group-hover:text-primary transition">{subCategory.name}</h3>
                    <p className="text-xs text-neutral-500">{category.name}</p>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
      
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