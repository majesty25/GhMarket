import { useState, useEffect } from 'react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'GhanaMarket',
      subtitle: 'Your Local Marketplace',
      features: [
        { icon: '✓', text: 'Tax exemptions' },
        { icon: '💳', text: 'Express payment' },
        { icon: '💰', text: 'Financial support' }
      ],
      stats: [
        { number: '5M+', text: 'Factory direct supply' },
        { number: '20M+', text: 'Value dropshipping items' },
        { number: '10', text: 'Local warehouses worldwide' },
        { number: '24H', text: 'Personalized sourcing service' }
      ],
      buttonText: 'Shop now',
      buttonUrl: '#product-grid'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'SuperBuyer',
      subtitle: 'Premium Shopping Experience',
      features: [
        { icon: '🚚', text: 'Free delivery' },
        { icon: '🔒', text: 'Secure checkout' },
        { icon: '⭐', text: 'Premium quality' }
      ],
      stats: [
        { number: '2M+', text: 'Happy customers' },
        { number: '50K+', text: 'Premium products' },
        { number: '15', text: 'Countries served' },
        { number: '12H', text: 'Customer support' }
      ],
      buttonText: 'Explore',
      buttonUrl: '#categories'
    }
  ];

  const productSections = [
    {
      title: 'Bulk Saver Hub',
      products: [
        {
          id: 1,
          name: 'Mr. Robot T-Shirt',
          price: 73.86,
          originalPrice: 92.33,
          image: 'https://via.placeholder.com/200x200/2d3748/ffffff?text=MR.ROBOT',
          category: 'Clothing'
        },
        {
          id: 2,
          name: 'Wooden Cufflinks Set',
          price: 77.44,
          originalPrice: 86.55,
          image: 'https://via.placeholder.com/200x200/8b5a3c/ffffff?text=CUFFLINKS',
          category: 'Accessories'
        }
      ]
    },
    {
      title: 'Fast delivery',
      products: [
        {
          id: 3,
          name: 'USB Hub 7-Port',
          price: 39.23,
          originalPrice: 41.36,
          image: 'https://via.placeholder.com/200x200/4a5568/ffffff?text=USB+HUB',
          category: 'Electronics',
          shipping: 'Ships in 2 days'
        },
        {
          id: 4,
          name: 'Denim Jeans Stack',
          price: 201.39,
          originalPrice: 402.78,
          image: 'https://via.placeholder.com/200x200/3182ce/ffffff?text=JEANS',
          category: 'Clothing',
          shipping: 'Ships in 2 days'
        }
      ]
    },
    {
      title: 'Buy again',
      products: [
        {
          id: 5,
          name: 'Sports T-Shirt Set',
          price: 140.97,
          originalPrice: 281.93,
          image: 'https://via.placeholder.com/200x200/1a202c/ffffff?text=SPORTS+TEE',
          category: 'Clothing',
          tag: 'Viewed before'
        },
        {
          id: 6,
          name: 'Sports Gym Bag',
          price: 159.60,
          originalPrice: 343.96,
          image: 'https://via.placeholder.com/200x200/2d3748/ffffff?text=GYM+BAG',
          category: 'Accessories',
          tag: 'Similar items'
        }
      ]
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const handleSlideChange = (newSlide: any) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(newSlide);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full h- overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={currentSlideData.image} 
          alt={currentSlideData.title} 
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Section - Title and Features */}
        <div className="flex-1 flex items-center justify-between px-8 md:px-16 pt-20">
          {/* Left Content */}
          <div className="text-white max-w-lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              {currentSlideData.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-8">
              {currentSlideData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              {currentSlideData.buttonText}
            </button>
          </div>

          {/* Right Stats */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-8 text-white">
              {currentSlideData.stats.map((stat, index) => (
                <div key={index} className="text-right">
                  <div className="text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Product Cards */}
        <div className="px-8 md:px-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{section.title}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {section.products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xl font-bold text-gray-900">
                          GH₵{product.price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          GH₵{product.originalPrice}
                        </div>
                        {/* {product?.shipping && (
                          <div className="text-xs text-gray-600 font-medium">
                            {product.shipping}
                          </div>
                        )}
                        {product.tag && (
                          <div className="text-xs text-gray-600 font-medium">
                            {product.tag}
                          </div>
                        )} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-8 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <i className="ri-arrow-left-line text-xl"></i>
      </button>
      
      <button 
        onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
      >
        <i className="ri-arrow-right-line text-xl"></i>
      </button>
    </section>
  );
};

export default HeroCarousel;