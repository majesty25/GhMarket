import { Link } from 'wouter';
import { Product } from '@/types';
import { useCart } from '@/context/cart-context';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if product is already in cart
  const productInCart = cartItems.find(item => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product._id}`} className="block">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </div>
            </div>
          )}

          {/* Add to Cart Icon - Top Right */}
          <div className="absolute top-2 right-2 z-10">
            <button 
              className={`w-8 h-8 rounded bg-white/90 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${
                isAdding 
                  ? 'bg-green-500 text-white' 
                  : productInCart 
                  ? 'bg-blue-500 text-white' 
                  : 'text-neutral-700 hover:text-blue-600'
              }`}
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label="Add to cart"
            >
              {isAdding ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
              ) : productInCart ? (
                <i className="ri-check-line text-sm"></i>
              ) : (
                <i className="ri-shopping-cart-line text-sm"></i>
              )}
            </button>
          </div>

          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-neutral-50">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Stock Status Overlay */}
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute bottom-2 left-2">
                <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Only {product.stock} left
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Product Name */}
            <h3 className="font-medium text-neutral-800 text-sm line-clamp-2 mb-0 leading-tight">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = product.rating || 0;
                  if (i < Math.floor(rating)) {
                    return <i key={i} className="ri-star-fill text-xs"></i>;
                  } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                    return <i key={i} className="ri-star-half-fill text-xs"></i>;
                  } else {
                    return <i key={i} className="ri-star-line text-xs text-neutral-300"></i>;
                  }
                })}
              </div>
              <span className="text-xs text-neutral-500">
                {product.rating} | {product.reviews} sold
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-bold text-red-600">
                GH₵{(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  GH₵{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-xs text-neutral-500">
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </div>
          </div>

          {/* Hover Add to Cart Button */}
          <div className={`absolute bottom-0 left-0 right-0 bg-white border-t transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}>
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className={`w-full py-2 px-3 text-sm font-medium transition-colors duration-200 ${
                isAdding
                  ? 'bg-green-50 text-green-600 cursor-not-allowed'
                  : product.stock === 0
                  ? 'bg-neutral-50 text-neutral-400 cursor-not-allowed'
                  : productInCart
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </span>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : productInCart ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-check-line"></i>
                  Added to Cart
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-shopping-cart-line text-red-900"></i>
                  Add to Cart
                </span>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;