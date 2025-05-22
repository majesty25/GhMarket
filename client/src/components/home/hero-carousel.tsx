import { useState, useEffect } from 'react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://pixabay.com/get/g130ce9abaefbe15253ff98c5eee67bbf40e7af3b06228b352308df78fa46189c5ac12f145d32c59d83f8cc80a4723b0a766ba31b21ee47a3ae459557f43205d0_1280.jpg',
      title: 'Shop Ghana, Shop Easy',
      description: 'Discover thousands of products with same-day delivery and secure payments',
      buttonText: 'Shop Now',
      buttonUrl: '#product-grid'
    },
    {
      image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Local Products, Fast Delivery',
      description: 'Support Ghanaian businesses and get your items delivered same-day',
      buttonText: 'Explore',
      buttonUrl: '#categories'
    },
    {
      image: 'https://images.unsplash.com/photo-1610792516286-524726503fb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Secure Mobile Money Payments',
      description: 'Pay with MTN, Vodafone, AirtelTigo or cash on delivery',
      buttonText: 'Learn More',
      buttonUrl: '#payment-methods'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <section className="bg-neutral-100">
      <div className="container mx-auto px-4 py-4">
        <div className="h-64 md:h-96 rounded-lg overflow-hidden relative">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: index === currentSlide ? 10 : 0 }}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
                <div className="text-white p-6 md:p-12 max-w-md">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2 font-poppins">{slide.title}</h1>
                  <p className="mb-4 text-sm md:text-base">{slide.description}</p>
                  <a 
                    href={slide.buttonUrl}
                    className="bg-secondary text-primary px-6 py-2 rounded font-medium hover:bg-secondary-light transition inline-block"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
