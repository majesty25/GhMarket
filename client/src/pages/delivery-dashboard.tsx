import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/user-context';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { orders, deliveryAgents } from '@/data';
import { getOrderStatusText, getOrderStatusColor } from '@/data';
import { toast } from '@/hooks/use-toast';

const DeliveryDashboard = () => {
  const { user } = useUserContext();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);
  
  // Filter orders that are assigned to the delivery agent (in a real app this would come from API)
  const deliveryAgent = deliveryAgents[0]; // Using the first delivery agent as an example
  const assignedOrders = orders.filter(order => 
    order.tracking?.deliveryAgent?.id === deliveryAgent.id
  );
  const availableOrders = orders.filter(order => 
    (order.status === 'pending' || order.status === 'confirmed') && 
    !order.tracking?.deliveryAgent
  ).slice(0, 3); // Just showing a few for the example
  
  // Mock statistics
  const stats = {
    totalDeliveries: 156,
    completedToday: 4,
    earnings: 450,
    rating: deliveryAgent.rating
  };

  useEffect(() => {
    document.title = 'Delivery Dashboard - GhanaMarket';
  }, []);

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

  // Check if user has delivery agent role
  // useEffect(() => {
  //   if (user?.role !== 'delivery') {
  //     navigate('/');
  //     toast({
  //       title: "Access denied",
  //       description: "You need to be a delivery agent to access this dashboard.",
  //       variant: "destructive"
  //     });
  //   }
  // }, [user, navigate]);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "You're now offline" : "You're now online",
      description: isOnline ? "You won't receive new delivery requests." : "You'll receive new delivery requests.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
          <p className="text-neutral-500">Manage your deliveries, earnings, and profile</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="mr-2">Status:</span>
            <Button 
              variant={isOnline ? "default" : "outline"} 
              size="sm" 
              className={isOnline ? "bg-green-500 hover:bg-green-600" : "border-neutral-300 text-neutral-700"}
              onClick={toggleOnlineStatus}
            >
              {isOnline ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white mr-1.5 animate-pulse"></span>
                  Online
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-neutral-400 mr-1.5"></span>
                  Offline
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <i className="ri-truck-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Deliveries</p>
                <h3 className="text-xl font-bold">{stats.totalDeliveries}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <i className="ri-check-double-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Completed Today</p>
                <h3 className="text-xl font-bold">{stats.completedToday}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <i className="ri-money-cedi-circle-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Earnings</p>
                <h3 className="text-xl font-bold">GH₵ {stats.earnings}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                <i className="ri-star-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Rating</p>
                <h3 className="text-xl font-bold">{stats.rating.toFixed(1)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Current Tasks</TabsTrigger>
          <TabsTrigger value="available">Available Orders</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
      
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Current Deliveries</h2>
              
              {assignedOrders.length > 0 ? (
                <div className="space-y-6">
                  {assignedOrders
                    .filter(order => ['picked', 'en-route'].includes(order.status))
                    .map((order) => (
                      <div key={order.id} className="border border-primary/20 bg-primary/5 rounded-lg overflow-hidden">
                        <div className="bg-primary/10 p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Order #{order.id}</span>
                                <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                                  {getOrderStatusText(order.status)}
                                </span>
                              </div>
                              <div className="text-sm">
                                <i className="ri-map-pin-line text-primary mr-1"></i>
                                Delivery to: {order.deliveryAddress}
                              </div>
                            </div>
                            <div className="text-sm flex flex-col md:items-end">
                              <span>Estimated arrival:</span>
                              <span className="font-medium">{formatDate(order.tracking?.estimatedArrival || '')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-4">
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Delivery Progress</span>
                              <span>{order.status === 'picked' ? '50%' : '75%'}</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: order.status === 'picked' ? '50%' : '75%' }}
                              ></div>
                            </div>
                          </div>
                          
                          <h3 className="font-medium mb-2">Order Items ({order.items.length})</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex items-center gap-2 bg-neutral-50 rounded p-2">
                                <div className="w-8 h-8 rounded bg-neutral-200 overflow-hidden">
                                  <img 
                                    src={item.product.images[0]} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <span className="text-sm">{item.quantity}x {item.product.name.split(' ')[0]}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <i className="ri-customer-service-2-line mr-1"></i> Contact Customer
                            </Button>
                            <Button variant="outline" size="sm">
                              <i className="ri-map-pin-line mr-1"></i> Navigation
                            </Button>
                            {order.status === 'picked' && (
                              <Button className="bg-primary text-white" size="sm">
                                <i className="ri-truck-line mr-1"></i> Start Delivery
                              </Button>
                            )}
                            {order.status === 'en-route' && (
                              <Button className="bg-green-500 text-white" size="sm">
                                <i className="ri-check-double-line mr-1"></i> Mark as Delivered
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  {assignedOrders.filter(order => ['picked', 'en-route'].includes(order.status)).length === 0 && (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                        <i className="ri-truck-line text-2xl"></i>
                      </div>
                      <h3 className="font-medium text-lg mb-2">No active deliveries</h3>
                      <p className="text-neutral-500 mb-4">
                        You don't have any active deliveries at the moment.
                      </p>
                      <Button onClick={() => setActiveTab('available')} className="bg-primary text-white">
                        Find Available Orders
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                    <i className="ri-truck-line text-2xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No deliveries assigned</h3>
                  <p className="text-neutral-500 mb-4">
                    You don't have any deliveries assigned to you yet.
                  </p>
                  <Button onClick={() => setActiveTab('available')} className="bg-primary text-white">
                    Find Available Orders
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="available">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Available Orders</h2>
                <div className="flex gap-4">
                  <select className="p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="nearest">Nearest First</option>
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Value</option>
                  </select>
                </div>
              </div>
              
              {availableOrders.length > 0 ? (
                <div className="space-y-6">
                  {availableOrders.map((order) => (
                    <div key={order.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">Order #{order.id}</span>
                              <span className="text-sm text-neutral-500">
                                {formatDate(order.date)}
                              </span>
                            </div>
                            <div className="text-sm">
                              <i className="ri-map-pin-line text-primary mr-1"></i>
                              Delivery to: {order.deliveryAddress}
                            </div>
                          </div>
                          <div className="text-center md:text-right">
                            <div className="font-medium text-lg text-accent">GH₵ 25</div>
                            <div className="text-xs text-neutral-500">Delivery Fee</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                          <div>
                            <div className="text-sm font-medium mb-1">Pickup From</div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                {order.items[0]?.product.seller.initials}
                              </div>
                              <span>{order.items[0]?.product.seller.name}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Distance</div>
                            <div className="flex items-center">
                              <i className="ri-route-line text-primary mr-1"></i>
                              <span>Approximately 4.2 km</span>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="font-medium mb-2">Order Items ({order.items.length})</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-2 bg-neutral-50 rounded p-2">
                              <div className="w-8 h-8 rounded bg-neutral-200 overflow-hidden">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <span className="text-sm">{item.quantity}x {item.product.name.split(' ')[0]}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button className="bg-primary text-white" size="sm">
                            <i className="ri-check-line mr-1"></i> Accept Delivery
                          </Button>
                          <Button variant="outline" size="sm">
                            <i className="ri-map-pin-line mr-1"></i> View on Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                    <i className="ri-search-line text-2xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No orders available</h3>
                  <p className="text-neutral-500">
                    There are no orders available in your area right now.
                    <br />
                    Check back soon or adjust your delivery area.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="history">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Delivery History</h2>
                <div className="flex gap-4">
                  <select className="p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
              
              {assignedOrders.filter(order => order.status === 'delivered').length > 0 ? (
                <div className="space-y-4">
                  {assignedOrders
                    .filter(order => order.status === 'delivered')
                    .map((order) => (
                      <div key={order.id} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">Order #{order.id}</span>
                              <span className={`py-1 px-3 rounded-full text-white text-xs bg-green-500`}>
                                Delivered
                              </span>
                            </div>
                            <div className="text-sm text-neutral-500">
                              Delivered on {formatDate(order.tracking?.statusUpdates.find(u => u.status === 'delivered')?.timestamp || '')}
                            </div>
                          </div>
                          <div className="text-center md:text-right">
                            <div className="font-medium">GH₵ 25</div>
                            <div className="text-xs text-neutral-500">Earnings</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-map-pin-line text-primary"></i>
                          <span>{order.deliveryAddress}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <i className="ri-eye-line mr-1"></i> View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                    <i className="ri-history-line text-2xl"></i>
                  </div>
                  <h3 className="font-medium text-lg mb-2">No delivery history yet</h3>
                  <p className="text-neutral-500">
                    You haven't completed any deliveries yet.
                    <br />
                    Start accepting orders to build your history.
                  </p>
                </div>
              )}
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={deliveryAgent.name}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue="kwame@example.com"
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue={deliveryAgent.phone}
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Home Address</label>
                      <input
                        type="text"
                        defaultValue="45 Independence Ave, Accra"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Delivery Area</label>
                      <select className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="accra-central">Accra Central</option>
                        <option value="east-legon">East Legon</option>
                        <option value="osu">Osu</option>
                        <option value="airport">Airport Residential</option>
                      </select>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-3 pt-4 border-t border-neutral-200">Vehicle Information</h2>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Vehicle Type</label>
                        <select className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                          <option value="motorcycle">Motorcycle</option>
                          <option value="car">Car</option>
                          <option value="bicycle">Bicycle</option>
                          <option value="van">Van</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">License Plate</label>
                        <input
                          type="text"
                          defaultValue="GE-123-20"
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-3 pt-4 border-t border-neutral-200">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">MTN Mobile Money Number</label>
                      <input
                        type="text"
                        defaultValue="+233 24 123 4567"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button className="bg-primary text-white">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={deliveryAgent.avatar} 
                        alt={deliveryAgent.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button variant="outline" size="sm" className="mb-4">
                      Change Photo
                    </Button>
                    <p className="text-sm text-neutral-500 text-center">
                      Upload a clear face photo for customer identification
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Identity Verification</h2>
                  <div className="flex items-center justify-between mb-4">
                    <span>Verification Status</span>
                    <span className="py-1 px-3 bg-green-100 text-green-700 rounded-full text-xs">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-4">
                    Your identity has been verified. This helps build trust with customers and merchants.
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>ID Verification</span>
                      <span className="text-green-600">
                        <i className="ri-check-line"></i> Complete
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Verification</span>
                      <span className="text-green-600">
                        <i className="ri-check-line"></i> Complete
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Address Verification</span>
                      <span className="text-green-600">
                        <i className="ri-check-line"></i> Complete
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Performance Rating</h2>
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">{deliveryAgent.rating.toFixed(1)}</div>
                        <div className="text-xs text-neutral-500">out of 5</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="flex justify-center text-secondary">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const rating = deliveryAgent.rating;
                        if (i < Math.floor(rating)) {
                          return <i key={i} className="ri-star-fill"></i>;
                        } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                          return <i key={i} className="ri-star-half-fill"></i>;
                        } else {
                          return <i key={i} className="ri-star-line"></i>;
                        }
                      })}
                    </div>
                    <div className="text-sm text-neutral-500">
                      Based on {deliveryAgent.reviews} reviews
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-time delivery</span>
                        <span>4.7</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Communication</span>
                        <span>4.9</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Order handling</span>
                        <span>4.8</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeliveryDashboard;