import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/context/cart-context';
import { useUserContext } from '@/context/user-context';
import { paymentOptions } from '@/data';
import { PaymentMethod } from '@/types';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { user } = useUserContext();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('mtn');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const deliveryOptions = {
    standard: { name: 'Standard Delivery', fee: 25, time: '2-3 days' },
    express: { name: 'Express Delivery', fee: 45, time: 'Same day' },
    pickup: { name: 'Store Pickup', fee: 0, time: '1-2 hours' }
  };
  
  const deliveryFee = cartItems.length > 0 ? deliveryOptions[deliveryOption].fee : 0;
  const totalAmount = getCartTotal() + deliveryFee;
  
  useEffect(() => {
    document.title = 'Checkout - GhanaMarket';
    
    if (cartItems.length === 0) {
      navigate('/');
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
    }
  }, [cartItems.length, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would create an order and process payment
    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be processed shortly.",
      duration: 5000,
    });
    
    // Generate a mock order ID
    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    
    // Clear cart and redirect to tracking
    clearCart();
    navigate(`/order/tracking/${orderId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Contact & Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                    onChange={(e) => {
                      if (e.target.checked && user) {
                        setFormData({
                          ...formData,
                          fullName: user.name,
                          email: user.email,
                          phone: user.phone || '',
                          address: user.address || '',
                          city: user.city || '',
                        });
                      } else {
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          address: '',
                          city: '',
                          notes: ''
                        });
                      }
                    }}
                  />
                  <span>Use my profile information</span>
                </label>
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${user ? 'transition-opacity duration-300' : ''}`} style={{ display: formData.fullName && user ? 'none' : 'grid' }}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="+233"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Special instructions for delivery"
                  ></textarea>
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Delivery Method</h2>
              
              <div className="space-y-3 mb-6">
                {Object.entries(deliveryOptions).map(([key, option]) => (
                  <div 
                    key={key}
                    className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                      deliveryOption === key ? 'border-primary bg-primary/5' : 'border-neutral-200'
                    }`}
                    onClick={() => setDeliveryOption(key)}
                  >
                    <div className={`w-10 h-10 bg-${key === 'express' ? 'secondary' : key === 'pickup' ? 'accent' : 'primary'}/10 rounded-full flex items-center justify-center mr-3`}>
                      <i className={`ri-${key === 'express' ? 'flashlight' : key === 'pickup' ? 'store' : 'truck'}-line text-xl ${
                        key === 'express' ? 'text-secondary' : key === 'pickup' ? 'text-accent' : 'text-primary'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-xs text-neutral-500">Estimated delivery time: {option.time}</div>
                      <div className="text-xs font-medium text-primary">GH₵ {option.fee}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                      {deliveryOption === key && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                {paymentOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                      selectedPayment === option.id ? 'border-primary bg-primary/5' : 'border-neutral-200'
                    }`}
                    onClick={() => handlePaymentChange(option.id)}
                  >
                    <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center mr-3`}>
                      {option.icon.startsWith('ri-') ? (
                        <i className={`${option.icon} text-xl text-white`}></i>
                      ) : (
                        <div className={`font-bold ${option.id === 'mtn' ? 'text-black' : 'text-white'} text-sm`}>
                          {option.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-xs text-neutral-500">{option.description}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                      {selectedPayment === option.id && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:hidden mb-6">
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-neutral-100 text-neutral-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                          {item.quantity}
                        </span>
                        <span className="text-neutral-700">{item.product.name}</span>
                      </div>
                      <span className="font-medium">
                        GH₵ {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-b border-neutral-200 py-3 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">GH₵ {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">GH₵ {deliveryFee}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>GH₵ {totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto space-y-4 mb-4">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <div className="text-sm text-neutral-500 mb-1">Qty: {item.quantity}</div>
                    <div className="text-accent font-medium">
                      GH₵ {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-b border-neutral-200 py-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">GH₵ {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">GH₵ {deliveryFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>GH₵ {totalAmount.toLocaleString()}</span>
            </div>
            
            <Link href="/" className="block text-center text-primary text-sm hover:underline">
              <i className="ri-arrow-left-line mr-1"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
