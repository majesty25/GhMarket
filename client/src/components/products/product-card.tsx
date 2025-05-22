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

  return (
    <Link href={`/product/${product.id}`} className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition group block">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2">
          <button 
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-500 hover:text-accent"
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <i className="ri-heart-line"></i>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition">
          <button 
            className={`w-full font-medium py-1 text-sm rounded flex items-center justify-center ${
              isAdding 
                ? 'bg-accent text-white' 
                : productInCart 
                ? 'bg-primary/90 text-white' 
                : 'bg-white text-primary'
            } ${isAdding ? 'animate-pulse' : ''} transition-colors`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <span>Adding...</span>
            ) : productInCart ? (
              <span className="flex items-center">
                <i className="ri-check-line mr-1"></i> 
                In Cart ({productInCart.quantity})
              </span>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="text-xs text-primary font-medium mb-1">{product.category.name}</div>
        <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-accent font-semibold">
            GH₵ {(product.discountPrice || product.price).toLocaleString()}
          </div>
          {product.discountPrice && (
            <div className="text-xs text-neutral-500 line-through">
              GH₵ {product.price.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
