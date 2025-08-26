import { useCart } from '@/context/cart-context';
import { Link, useLocation } from 'wouter';
import { useGetCartQuery, useDeleteCartItemMutation, useUpdateCartItemMutation } from '@/redux/features/api/apiSlice';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { data: cartData, isLoading, error, refetch } = useGetCartQuery('');
  const [deleteCartItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [, navigate] = useLocation();

  // Extract cart items from query response
  const cartItems = cartData?.items || [];
  const cartTotal = cartData?.totalPrice || 0;
  const cartCount = cartItems.reduce((sum: any, item: any) => sum + item.quantity, 0);

  const deliveryFee = cartItems.length > 0 ? 25 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleDeleteItem = async (productId: string) => {
    try {
      // Call the API to delete the item from the backend
      await deleteCartItem(productId).unwrap();
      
      // Also update the local cart context
      removeFromCart(productId);
      
      // Optionally show a success message
      console.log('Item removed from cart successfully');
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      // You might want to show an error toast here
    }
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number, currentQuantity: number) => {
    // If quantity would be 0 or less, delete the item instead
    if (newQuantity <= 0) {
      await handleDeleteItem(productId);
      return;
    }

    // Don't make unnecessary API calls if quantity hasn't changed
    if (newQuantity === currentQuantity) {
      return;
    }

    try {
      // Debug: Log what we're sending
      console.log('Sending update request with:', { 
        productId, 
        newQuantity,
        payload: { id: productId, quantity: newQuantity }
      });
      
      // Call the API to update the quantity - Only send quantity in body
      const result = await updateCartItem({ 
        id: productId,  // This will be used for the URL path parameter
        quantity: newQuantity  // This will be sent in the request body
      }).unwrap();
      
      console.log('API response:', result);
      
      // Also update the local cart context
      updateQuantity(productId, newQuantity);
      
      console.log('Cart item quantity updated successfully');
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      console.error('Error details:', error);
      // You might want to show an error toast here
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="font-bold font-poppins">Your Cart</h3>
            <button className="text-neutral-500 hover:text-neutral-700" onClick={onClose}>
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-neutral-500">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="font-bold font-poppins">Your Cart</h3>
            <button className="text-neutral-500 hover:text-neutral-700" onClick={onClose}>
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <i className="ri-error-warning-line text-4xl text-red-400 mb-4"></i>
              <p className="text-neutral-500 mb-2">Failed to load cart</p>
              <button 
                onClick={() => refetch()}
                className="bg-primary text-white px-4 py-2 rounded-md font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="font-bold font-poppins">Your Cart ({cartCount})</h3>
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
              {cartItems.map((item: any) => (
                <div key={item.productId._id} className="flex gap-3 border-b border-neutral-100 pb-4">
                  <img 
                    src={item.productId.images[0]} 
                    alt={item.productId.name} 
                    className="w-20 h-20 object-cover rounded" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productId.name}</h4>
                    <div className="text-sm text-neutral-500">
                      {item.productId.category?.name}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-accent font-semibold">
                        GH₵ {item.productId.price.toLocaleString()}
                      </div>
                      <div className="flex items-center border border-neutral-200 rounded">
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-50"
                          onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1, item.quantity)}
                          disabled={item.quantity <= 1 || isUpdating}
                        >
                          -
                        </button>
                        <span className="px-2 border-x border-neutral-200 min-w-[40px] text-center">
                          {isUpdating ? (
                            <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button 
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-50"
                          onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1, item.quantity)}
                          disabled={isUpdating}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-neutral-400 hover:text-red-500 self-start disabled:opacity-50 transition-colors"
                    onClick={() => handleDeleteItem(item.productId._id)}
                    disabled={isDeleting || isUpdating}
                    title="Remove item"
                  >
                    {isDeleting ? (
                      <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <i className="ri-delete-bin-line"></i>
                    )}
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
                <span className="font-medium">GH₵ {cartTotal.toLocaleString()}</span>
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