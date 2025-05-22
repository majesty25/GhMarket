import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { orders, getOrderStatusText, getOrderStatusColor } from '@/data';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(orders.find(o => o.id === id) || orders[0]);
  
  useEffect(() => {
    document.title = `Track Order ${order?.id} - GhanaMarket`;
    
    // In a real app, we would fetch the order details here
    const foundOrder = orders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id]);
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the order you're looking for.</p>
          <Link href="/" className="bg-primary text-white px-6 py-2 rounded-md">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  
  const orderStatusSteps = ['pending', 'confirmed', 'processing', 'picked', 'en-route', 'delivered'];
  const currentStepIndex = orderStatusSteps.indexOf(order.status);
  const progress = Math.round(((currentStepIndex + 1) / orderStatusSteps.length) * 100);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline flex items-center">
          <i className="ri-arrow-left-line mr-1"></i> Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Order Tracking</h1>
              <p className="text-neutral-500">Order ID: {order.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                {getOrderStatusText(order.status)}
              </span>
              <span className="text-neutral-500 text-sm">
                Ordered on {formatDate(order.date)}
              </span>
            </div>
          </div>
          
          {/* Tracking Progress */}
          <div className="mb-10">
            <Progress value={progress} className="h-2 mb-8" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {orderStatusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted 
                        ? 'bg-primary text-white' 
                        : 'bg-neutral-100 text-neutral-400'
                    } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                      {index + 1}
                    </div>
                    <div className={isCompleted ? 'text-neutral-900 font-medium' : 'text-neutral-400'}>
                      {getOrderStatusText(step as any)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Order Details Tabs */}
          <Tabs defaultValue="tracking">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking">
              {order.tracking ? (
                <div>
                  {/* Map Visualization */}
                  <div className="bg-neutral-100 h-64 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                      alt="Delivery tracking map" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Estimated Delivery */}
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mt-1">
                        <i className="ri-time-line"></i>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Estimated Delivery</h3>
                        <p className="text-neutral-600">
                          {formatDate(order.tracking.estimatedArrival)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Updates */}
                  <h3 className="font-medium text-lg mb-4">Status Updates</h3>
                  <div className="space-y-4">
                    {order.tracking.statusUpdates.map((update, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative">
                          <div className={`w-6 h-6 rounded-full ${getOrderStatusColor(update.status)} flex items-center justify-center text-white`}>
                            <i className="ri-check-line text-sm"></i>
                          </div>
                          {index !== order.tracking!.statusUpdates.length - 1 && (
                            <div className="absolute top-6 bottom-0 left-1/2 w-0.5 -ml-px bg-neutral-200"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">{getOrderStatusText(update.status)}</h4>
                            <span className="text-neutral-500 text-sm">{formatDate(update.timestamp)}</span>
                          </div>
                          {update.location && (
                            <div className="text-sm text-neutral-600 mb-1">
                              <i className="ri-map-pin-line mr-1"></i> {update.location}
                            </div>
                          )}
                          <p className="text-sm text-neutral-600">{update.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                    <i className="ri-truck-line text-2xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No tracking details available</h3>
                  <p className="text-neutral-500">
                    Tracking information will be available once your order ships.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details">
              <div className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 border-b border-neutral-100 pb-4">
                        <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <div className="text-sm text-neutral-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-accent font-medium">
                          GH₵ {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Payment Details */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Payment Details</h3>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Payment Method</div>
                        <div className="font-medium capitalize">
                          {order.paymentMethod === 'mtn' ? 'MTN Mobile Money' :
                           order.paymentMethod === 'vodafone' ? 'Vodafone Cash' :
                           order.paymentMethod === 'airteltigo' ? 'AirtelTigo Money' :
                           order.paymentMethod === 'cash-on-delivery' ? 'Cash on Delivery' : 
                           order.paymentMethod}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Order Date</div>
                        <div className="font-medium">{formatDate(order.date)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Subtotal</div>
                        <div className="font-medium">GH₵ {(order.total - order.deliveryFee).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Delivery Fee</div>
                        <div className="font-medium">GH₵ {order.deliveryFee}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between">
                      <div className="font-medium text-lg">Total</div>
                      <div className="font-bold text-lg">GH₵ {order.total.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery">
              <div className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Delivery Address</h3>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mt-1">
                        <i className="ri-map-pin-line"></i>
                      </div>
                      <div>
                        <p className="text-neutral-600">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Agent */}
                {order.tracking?.deliveryAgent && (
                  <div>
                    <h3 className="font-medium text-lg mb-4">Delivery Agent</h3>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-200">
                          <img 
                            src={order.tracking.deliveryAgent.avatar} 
                            alt={order.tracking.deliveryAgent.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{order.tracking.deliveryAgent.name}</h4>
                          <div className="flex items-center text-sm mb-1">
                            <span className="text-secondary mr-1">
                              <i className="ri-star-fill"></i> {order.tracking.deliveryAgent.rating.toFixed(1)}
                            </span>
                            <span className="text-neutral-500">
                              ({order.tracking.deliveryAgent.reviews} reviews)
                            </span>
                          </div>
                          <a 
                            href={`tel:${order.tracking.deliveryAgent.phone}`} 
                            className="text-primary flex items-center text-sm"
                          >
                            <i className="ri-phone-line mr-1"></i> {order.tracking.deliveryAgent.phone}
                          </a>
                        </div>
                        <button className="ml-auto bg-primary text-white px-4 py-2 rounded-md text-sm">
                          <i className="ri-chat-1-line mr-1"></i> Chat
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Contact Support */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Need Help?</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary py-3 rounded-lg hover:bg-primary/5">
                      <i className="ri-chat-3-line"></i> Chat with Support
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-700">
                      <i className="ri-phone-line"></i> Call Support
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
