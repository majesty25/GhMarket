import { useCart } from '@/context/cart-context';
import { Link, useLocation } from 'wouter';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [, navigate] = useLocation();

  const deliveryFee = cartItems.length > 0 ? 25 : 0;
  const totalAmount = getCartTotal() + deliveryFee;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="font-bold font-poppins">Your Cart ({cartItems.length})</h3>
          <button className="text-neutral-500 hover:text-neutral-700" onClick={onClose}>
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <i className="ri-shopping-cart-line text-4xl text-neutral-300 mb-4"></i>
              <p className="text-neutral-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-neutral-400 mb-6">Add some products to start shopping</p>
              <button 
                onClick={onClose} 
                className="bg-primary text-white px-6 py-2 rounded-md font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3 border-b border-neutral-100 pb-4">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <div className="text-sm text-neutral-500">
                      {item.product.category.name}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-accent font-semibold">
                        GH₵ {(item.product.discountPrice || item.product.price).toLocaleString()}
                      </div>
                      <div className="flex items-center border border-neutral-200 rounded">
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-700"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 border-x border-neutral-200">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-700"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-neutral-400 hover:text-accent self-start"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-neutral-200">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">GH₵ {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">GH₵ {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>GH₵ {totalAmount.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              className="w-full bg-primary text-white font-medium py-3 rounded hover:bg-primary-dark transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
