import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
// import { products } from '@/data';
import { useCart } from '@/context/cart-context';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/products/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductQuery } from '@/redux/features/api/apiSlice';
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('accra');
  const {data, error, isLoading} = useGetProductQuery(`${id}`);
  
  // const product = products.find(p => p.id === id);
  const product = data?.data
  // console.log(product)

  // Shipping options based on location
  const shippingOptions = {
    accra: {
      standard: { price: 0, days: '1-2', label: 'Standard Delivery' },
      express: { price: 15, days: 'Same day', label: 'Express Delivery' },
      pickup: { price: 0, days: 'Today', label: 'Store Pickup' }
    },
    kumasi: {
      standard: { price: 25, days: '2-3', label: 'Standard Delivery' },
      express: { price: 45, days: '1-2', label: 'Express Delivery' },
      pickup: { price: 0, days: 'N/A', label: 'Not Available' }
    },
    other: {
      standard: { price: 35, days: '3-5', label: 'Standard Delivery' },
      express: { price: 65, days: '2-3', label: 'Express Delivery' },
      pickup: { price: 0, days: 'N/A', label: 'Not Available' }
    }
  };

  // console.log(product.data);
  // Check if product is already in cart
  const productInCart = cartItems.find(item => item.product.id === id);
  const currentCartQuantity = productInCart?.quantity || 0;
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - GhanaMarket`;
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="bg-primary text-white px-6 py-2 rounded-md">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  
  // const handleAddToCart = () => {
  //   setAdding(true);
  //   addToCart(product, quantity);
    
  //   toast({
  //     title: "Added to cart",
  //     description: `${quantity} ${quantity > 1 ? 'units' : 'unit'} of ${product.name} added to your cart.`,
  //     duration: 3000,
  //   });
    
  //   setTimeout(() => {
  //     setAdding(false);
  //   }, 800);
  // };
  
  // const relatedProducts = products
  //   .filter(p => p.category._id === product.category._id && p._id !== product._id)
  //   .slice(0, 4);
  
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
            <Link href={`/category/${product.category?.slug}`} className="text-neutral-500 hover:text-primary">
              {product.category?.name}
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="text-neutral-800 font-medium truncate">
            {product.name}
          </li>
        </ol>
      </nav>
      
      {/* Product Detail */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Product Images */}
          <div>
            <div className="bg-neutral-100 w-full rounded-lg h-80 flex items-center justify-center overflow-hidden mb-2">
              <img 
                src={product?.images[0]} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image: any, index: any) => (
                <button 
                  key={index}
                  className={`w-16 h-16 rounded bg-neutral-100 flex-shrink-0 overflow-hidden border-2 ${
                    activeImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full mb-2">
              {/* {product.category.name} */}
            </span>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-secondary">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = product.rating;
                  if (i < Math.floor(rating)) {
                    return <i key={i} className="ri-star-fill"></i>;
                  } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                    return <i key={i} className="ri-star-half-fill"></i>;
                  } else {
                    return <i key={i} className="ri-star-line"></i>;
                  }
                })}
              </div>
              <span className="ml-2 text-sm text-neutral-500">
                ({product.reviews} reviews)
              </span>
              <span className="mx-2 text-neutral-300">|</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">
                  {/* GH₵ {(product.discountPrice || product.price).toLocaleString()} */}
                </span>
                {product.discountPrice && (
                  <span className="text-neutral-500 line-through">
                    GH₵ {product.price.toLocaleString()}
                  </span>
                )}
                
                {product.discountPrice && (
                  <span className="bg-accent text-white px-2 py-0.5 text-xs rounded-md">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
            
            <div className="border-t border-b border-neutral-200 py-4 my-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 mr-3">
                  <i className="ri-store-2-line"></i>
                </div>
                <div>
                  <div className="font-medium">{product.seller?.name}</div>
                  <div className="text-sm text-neutral-500">
                    <span className="text-secondary">
                      <i className="ri-star-fill"></i> {product.seller?.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Link 
                  href={`/store/${product.seller?.id}`} 
                  className="ml-auto px-3 py-1 border border-primary text-primary text-sm rounded-lg hover:bg-primary/5"
                >
                  View Store
                </Link>
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-neutral-600">Quantity:</span>
                  <div className="flex items-center border border-neutral-300 rounded">
                    <button 
                      className="px-3 py-1 text-neutral-500 hover:text-neutral-700"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-3 border-x border-neutral-300 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button 
                      className="px-3 py-1 text-neutral-500 hover:text-neutral-700"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-neutral-500">
                    {product.stock} units available
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    className={`w-full py-6 text-base ${adding ? 'bg-accent animate-pulse' : productInCart ? 'bg-primary/90' : 'bg-primary'}`}
                    // onClick={handleAddToCart}
                    disabled={adding}
                  >
                    {adding ? (
                      <span className="flex items-center gap-2">
                        <i className="ri-loader-4-line animate-spin"></i> Adding...
                      </span>
                    ) : productInCart ? (
                      <span className="flex items-center gap-2">
                        <i className="ri-shopping-cart-fill"></i>
                        Update Cart ({currentCartQuantity} in cart)
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <i className="ri-shopping-cart-line"></i> Add to Cart
                      </span>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-6 text-base border-primary text-primary hover:bg-primary/5"
                  >
                    <span className="flex items-center gap-2">
                      <i className="ri-shopping-bag-line"></i> Buy Now
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Shipping & Delivery Info - Right Side */}
          <div className="bg-neutral-50 p-4 rounded-lg h-fit">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="ri-truck-line text-primary"></i>
              Shipping & Delivery
            </h3>
            
            {/* Location Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <i className="ri-map-pin-line mr-1"></i>
                Delivery Location:
              </label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="accra">Accra & surrounding areas</option>
                <option value="kumasi">Kumasi & surrounding areas</option>
                <option value="other">Other regions</option>
              </select>
            </div>
            
            {/* Shipping Options */}
            <div className="space-y-3 mb-4">
              {Object.entries(shippingOptions[selectedLocation]).map(([key, option]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {key === 'express' && <i className="ri-flashlight-line text-primary text-sm"></i>}
                      {key === 'standard' && <i className="ri-truck-line text-primary text-sm"></i>}
                      {key === 'pickup' && <i className="ri-store-2-line text-primary text-sm"></i>}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-neutral-500">
                        {option.days !== 'N/A' ? `${option.days} business days` : 'Not available'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {option.price === 0 ? 'FREE' : `GH₵ ${option.price}`}
                    </div>
                    {key === 'standard' && selectedLocation === 'accra' && (
                      <div className="text-xs text-green-600">
                        Free for orders over GH₵ 500
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Delivery Information */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm text-neutral-600">
                <i className="ri-time-line text-primary mt-0.5 flex-shrink-0"></i>
                <div>
                  <span className="font-medium">Same-day delivery</span> for orders before 12:00 PM (Accra only)
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-neutral-600">
                <i className="ri-shield-check-line text-primary mt-0.5 flex-shrink-0"></i>
                <div>
                  <span className="font-medium">Secure packaging</span> with tracking number
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-neutral-600">
                <i className="ri-refund-2-line text-primary mt-0.5 flex-shrink-0"></i>
                <div>
                  <span className="font-medium">Return policy:</span> 7-day return window
                </div>
              </div>
            </div>
            
            {/* Weight and Dimensions Info */}
            <div className="pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Weight:</span>
                  <span className="font-medium">2.5 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="font-medium">30×20×15 cm</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                <i className="ri-information-line mr-1"></i>
                Costs may vary for oversized items
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description and Reviews */}
        <div className="p-6 border-t border-neutral-200">
          <Tabs defaultValue="description">
            <TabsList className="border-b border-neutral-200 mb-4 pb-0 rounded-none bg-transparent">
              <TabsTrigger 
                value="description" 
                className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Shipping Info
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-neutral-700 mt-4">
              <p className="mb-2">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="text-neutral-700 mt-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 font-medium pr-4">Brand</td>
                    <td className="py-2">{product.name?.split(' ')[0]}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 font-medium pr-4">Category</td>
                    <td className="py-2">{product.category?.name}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 font-medium pr-4">Seller</td>
                    <td className="py-2">{product.seller?.name}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="shipping" className="text-neutral-700 mt-4">
              <div className="space-y-6">
                {/* Shipping Methods */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Available Shipping Methods</h4>
                  <div className="grid gap-4">
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <i className="ri-truck-line text-primary"></i>
                        Standard Delivery
                      </h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Accra: FREE (1-2 business days)</li>
                        <li>• Kumasi: GH₵ 25 (2-3 business days)</li>
                        <li>• Other regions: GH₵ 35 (3-5 business days)</li>
                        <li>• Free delivery for orders over GH₵ 500 (Accra only)</li>
                      </ul>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <i className="ri-flashlight-line text-primary"></i>
                        Express Delivery
                      </h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Accra: GH₵ 15 (Same day delivery)</li>
                        <li>• Kumasi: GH₵ 45 (1-2 business days)</li>
                        <li>• Other regions: GH₵ 65 (2-3 business days)</li>
                        <li>• Orders must be placed before 12:00 PM for same-day delivery</li>
                      </ul>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <i className="ri-store-2-line text-primary"></i>
                        Store Pickup
                      </h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• FREE pickup from our Accra location</li>
                        <li>• Available today after order confirmation</li>
                        <li>• Store hours: Mon-Sat 9:00 AM - 6:00 PM</li>
                        <li>• Address: 123 Oxford Street, Osu, Accra</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Processing Time */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Order Processing</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• Orders are processed within 1-2 business hours</li>
                      <li>• You will receive a confirmation email with tracking details</li>
                      <li>• Processing time is not included in delivery estimates</li>
                      <li>• Orders placed on weekends are processed on Monday</li>
                    </ul>
                  </div>
                </div>
                
                {/* International Shipping */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">International Shipping</h4>
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <p className="text-sm text-neutral-600 mb-2">
                      Currently, we only ship within Ghana. We're working on expanding our delivery network to serve neighboring countries.
                    </p>
                    <p className="text-sm text-neutral-600">
                      For international inquiries, please contact our customer service team.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="text-neutral-700 mt-4">
              <div className="text-center py-8">
                <div className="text-5xl font-bold text-primary mb-1">{product.rating?.toFixed(1)}</div>
                <div className="flex justify-center text-secondary mb-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = product.rating;
                    if (i < Math.floor(rating)) {
                      return <i key={i} className="ri-star-fill"></i>;
                    } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                      return <i key={i} className="ri-star-half-fill"></i>;
                    } else {
                      return <i key={i} className="ri-star-line"></i>;
                    }
                  })}
                </div>
                <div className="text-sm text-neutral-500 mb-4">Based on {product.reviews} reviews</div>
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium">
                  Write a Review
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related Products */}
      {/* {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductDetail;