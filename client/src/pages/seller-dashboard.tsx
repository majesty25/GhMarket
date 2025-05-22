import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/user-context';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products, orders } from '@/data';
import { getOrderStatusText, getOrderStatusColor } from '@/data';
import { toast } from '@/hooks/use-toast';

const SellerDashboard = () => {
  const { user } = useUserContext();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filter products and orders that belong to the seller (in a real app this would come from API)
  const sellerProducts = products.slice(0, 4); // Using first 4 products as example
  const sellerOrders = orders.filter(order => 
    order.items.some(item => sellerProducts.some(p => p.id === item.product.id))
  );
  
  // Mock statistics
  const stats = {
    totalSales: 24650,
    totalOrders: sellerOrders.length,
    totalProducts: sellerProducts.length,
    pendingOrders: sellerOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length
  };

  useEffect(() => {
    document.title = 'Seller Dashboard - GhanaMarket';
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Check if user has seller role
  // useEffect(() => {
  //   if (user?.role !== 'seller' ) {
  //     navigate('/');
  //     toast({
  //       title: "Access denied",
  //       description: "You need to be a seller to access this dashboard.",
  //       variant: "destructive"
  //     });
  //   }
  // }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-neutral-500">Manage your products, orders, and store settings</p>
        </div>
        <Button className="bg-primary text-white" onClick={() => navigate('/seller/manage-products')}>
          <i className="ri-add-line mr-1"></i> Add New Product
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <i className="ri-money-dollar-circle-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Sales</p>
                <h3 className="text-xl font-bold">GH₵ {stats.totalSales.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <i className="ri-shopping-bag-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Orders</p>
                <h3 className="text-xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <i className="ri-store-2-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Products</p>
                <h3 className="text-xl font-bold">{stats.totalProducts}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                <i className="ri-time-line text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Pending Orders</p>
                <h3 className="text-xl font-bold">{stats.pendingOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                  <div className="space-y-4">
                    {sellerOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Order #{order.id}</span>
                              <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                                {getOrderStatusText(order.status)}
                              </span>
                            </div>
                            <div className="text-sm text-neutral-500">Placed on {formatDate(order.date)}</div>
                          </div>
                          <div className="font-medium">
                            GH₵ {order.total.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <i className="ri-eye-line mr-1"></i> View
                          </Button>
                          {(order.status === 'pending' || order.status === 'confirmed') && (
                            <Button variant="outline" size="sm" className="text-primary border-primary">
                              <i className="ri-check-line mr-1"></i> Process
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {sellerOrders.length > 3 && (
                    <Button variant="link" className="mt-4 w-full">
                      View All Orders
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Store Performance</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-neutral-600">Conversion Rate</span>
                        <span className="text-sm font-medium">4.2%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-neutral-600">Customer Satisfaction</span>
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-neutral-600">On-time Delivery</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Tips to Grow</h2>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <i className="ri-checkbox-circle-line text-primary mt-0.5"></i>
                      <span>Complete your store profile to attract more customers</span>
                    </li>
                    <li className="flex gap-2">
                      <i className="ri-checkbox-circle-line text-primary mt-0.5"></i>
                      <span>Add high-quality images to your product listings</span>
                    </li>
                    <li className="flex gap-2">
                      <i className="ri-checkbox-circle-line text-primary mt-0.5"></i>
                      <span>Offer special discounts to increase sales</span>
                    </li>
                    <li className="flex gap-2">
                      <i className="ri-checkbox-circle-line text-primary mt-0.5"></i>
                      <span>Respond to customer inquiries within 24 hours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      
        <TabsContent value="products">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Your Products</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-8 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                  </div>
                  <Button className="bg-primary text-white" onClick={() => navigate('/seller/manage-products')}>
                    <i className="ri-add-line mr-1"></i> Add Product
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 text-left">
                    <tr>
                      <th className="py-3 px-4 font-medium">Product</th>
                      <th className="py-3 px-4 font-medium">Category</th>
                      <th className="py-3 px-4 font-medium">Price</th>
                      <th className="py-3 px-4 font-medium">Stock</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {sellerProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-neutral-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-neutral-100">
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-600">{product.category.name}</td>
                        <td className="py-3 px-4 font-medium">
                          GH₵ {(product.discountPrice || product.price).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="py-1 px-2 bg-green-100 text-green-700 rounded-full text-xs">
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-neutral-500 hover:text-primary">
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button className="p-1 text-neutral-500 hover:text-accent">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-neutral-500">
                  Showing 1-{sellerProducts.length} of {sellerProducts.length} products
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-neutral-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-neutral-300 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="orders">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Orders</h2>
                <div className="flex gap-4">
                  <select className="p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-8 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {sellerOrders.map((order) => (
                  <div key={order.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-4 flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                            {getOrderStatusText(order.status)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-500">Placed on {formatDate(order.date)}</div>
                      </div>
                      <div className="font-medium">
                        GH₵ {order.total.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-neutral-200">
                      <div className="space-y-4">
                        {order.items
                          .filter(item => sellerProducts.some(p => p.id === item.product.id))
                          .map((item) => (
                            <div key={item.product.id} className="flex gap-4">
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
                    
                    <div className="p-4 border-t border-neutral-200 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <i className="ri-eye-line mr-1"></i> View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm" className="border-green-500 text-green-500">
                          <i className="ri-check-line mr-1"></i> Accept Order
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                          <i className="ri-truck-line mr-1"></i> Mark as Shipped
                        </Button>
                      )}
                      {(order.status === 'pending' || order.status === 'confirmed') && (
                        <Button variant="outline" size="sm" className="border-accent text-accent">
                          <i className="ri-close-line mr-1"></i> Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-6">Store Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Store Name</label>
                      <input
                        type="text"
                        defaultValue="Accra Tech"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Store Description</label>
                      <textarea
                        rows={3}
                        defaultValue="Premier electronics store with the latest gadgets and accessories. Fast delivery in Accra."
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue="contact@accratech.com"
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+233 20 123 4567"
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                        <input
                          type="text"
                          defaultValue="Accra"
                          className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
                        <input
                          type="text"
                          defaultValue="123 Independence Ave, Accra"
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
                        defaultValue="+233 54 123 4567"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        id="cashOnDelivery"
                        defaultChecked={true}
                        className="w-4 h-4 text-primary"
                      />
                      <label htmlFor="cashOnDelivery" className="text-sm font-medium text-neutral-700">
                        Accept Cash on Delivery
                      </label>
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
                  <h2 className="text-lg font-semibold mb-4">Store Logo</h2>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      AT
                    </div>
                    <Button variant="outline" size="sm" className="mb-4">
                      Change Logo
                    </Button>
                    <p className="text-sm text-neutral-500 text-center">
                      Upload a square logo at least 200x200px
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Store Status</h2>
                  <div className="flex justify-between items-center">
                    <span>Store Visibility</span>
                    <div className="relative inline-block w-12 h-6 bg-green-500 rounded-full">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        defaultChecked={true}
                      />
                      <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 mt-2">
                    When turned off, your store will not be visible to customers
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-accent">Danger Zone</h2>
                  <Button variant="outline" className="w-full border-accent text-accent">
                    <i className="ri-delete-bin-line mr-1"></i> Delete Store
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;