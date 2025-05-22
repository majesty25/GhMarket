import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useUserContext } from '@/context/user-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from '@/data';
import { getOrderStatusText, getOrderStatusColor } from '@/data';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { user, role } = useUserContext();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    document.title = 'My Account - GhanaMarket';
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Sections based on user role
  const renderBuyerContent = () => (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-2">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-primary text-white"
                    onClick={() => {
                      toast({
                        title: "Profile updated",
                        description: "Your profile has been updated successfully.",
                      });
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="orders">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                            {getOrderStatusText(order.status)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-500">Placed on {formatDate(order.date)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/order/tracking/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <i className="ri-map-pin-line mr-1"></i> Track
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <i className="ri-file-list-line mr-1"></i> Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-neutral-200">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex gap-4">
                            <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex-1">
                              <Link href={`/product/${item.product.id}`}>
                                <h4 className="font-medium hover:text-primary">{item.product.name}</h4>
                              </Link>
                              <div className="text-sm text-neutral-500">Qty: {item.quantity}</div>
                            </div>
                            <div className="text-accent font-medium">
                              GH₵ {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-neutral-300 rounded-lg">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                  <i className="ri-shopping-bag-line text-2xl"></i>
                </div>
                <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                <p className="text-neutral-500 mb-4">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link href="/">
                  <Button className="bg-primary text-white">
                    Browse Products
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="addresses">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Addresses</h2>
              <Button className="bg-primary text-white">
                <i className="ri-add-line mr-1"></i> Add New Address
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address Form */}
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h3 className="font-medium mb-4">Add New Address</h3>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Address added",
                      description: "Your new address has been added successfully.",
                    });
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Address Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Home, Office"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Full Address</label>
                      <textarea
                        placeholder="Street address"
                        rows={3}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">City</label>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="default-address" />
                      <label htmlFor="default-address" className="text-sm">Set as default address</label>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white">
                      Add Address
                    </Button>
                  </form>
                </div>

                {/* Existing Addresses */}
                <div className="space-y-4">
                  <div className="border border-primary bg-primary/5 rounded-lg p-4 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="text-neutral-500 hover:text-primary">
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button className="text-neutral-500 hover:text-accent">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                    <div className="mb-2">
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">Default</span>
                    </div>
                    <h3 className="font-medium">Home</h3>
                    <p className="text-neutral-700 mb-2">123 Independence Ave, Accra, Ghana</p>
                    <p className="text-sm text-neutral-500">
                      <i className="ri-phone-line mr-1"></i> +233 20 123 4567
                    </p>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-lg p-4 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="text-neutral-500 hover:text-primary">
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button className="text-neutral-500 hover:text-accent">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-neutral-700 mb-2">45 Liberation Road, Airport, Accra, Ghana</p>
                    <p className="text-sm text-neutral-500">
                      <i className="ri-phone-line mr-1"></i> +233 25 987 6543
                    </p>
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="wishlist">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            
            <div className="text-center py-12 border border-dashed border-neutral-300 rounded-lg">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <i className="ri-heart-line text-2xl"></i>
              </div>
              <h3 className="font-medium text-lg mb-2">Your wishlist is empty</h3>
              <p className="text-neutral-500 mb-4">
                Save your favorite items to your wishlist for easy access later.
              </p>
              <Link href="/">
                <Button className="bg-primary text-white">
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderSellerContent = () => (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-2">
                  {user?.name.charAt(0) || 'S'}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Logo
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Store Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Store Name</label>
                      <input
                        type="text"
                        value="Accra Tech"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Main Category</label>
                      <select className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Grocery</option>
                        <option>Home & Kitchen</option>
                        <option>Beauty</option>
                        <option>Sports</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">Store Description</label>
                  <textarea
                    className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={4}
                    value="Premier electronics store with the latest gadgets and accessories. Fast delivery in Accra."
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3">Store Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Address</label>
                      <input
                        type="text"
                        value="25 Spintex Road"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">City</label>
                      <input
                        type="text"
                        value="Accra"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Region</label>
                      <input
                        type="text"
                        value="Greater Accra"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-primary text-white"
                    onClick={() => {
                      toast({
                        title: "Store profile updated",
                        description: "Your store profile has been updated successfully.",
                      });
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="products">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Products</h2>
              <Button className="bg-primary text-white">
                <i className="ri-add-line mr-1"></i> Add New Product
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200">
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Stock</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-neutral-100 rounded overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                            alt="Samsung Galaxy S21" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="font-medium">Samsung Galaxy S21 Ultra</span>
                      </div>
                    </td>
                    <td className="p-3">Electronics</td>
                    <td className="p-3 text-right">GH₵ 3,599</td>
                    <td className="p-3 text-right">15</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 text-neutral-500 hover:text-primary">
                          <i className="ri-pencil-line"></i>
                        </button>
                        <button className="p-1 text-neutral-500 hover:text-accent">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-neutral-100 rounded overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                            alt="MacBook Pro" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="font-medium">MacBook Pro 13" M2</span>
                      </div>
                    </td>
                    <td className="p-3">Electronics</td>
                    <td className="p-3 text-right">GH₵ 12,499</td>
                    <td className="p-3 text-right">7</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 text-neutral-500 hover:text-primary">
                          <i className="ri-pencil-line"></i>
                        </button>
                        <button className="p-1 text-neutral-500 hover:text-accent">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="orders">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>
            
            <div className="mb-6 flex flex-wrap gap-3">
              <Button variant="outline" className="text-sm border-primary text-primary">
                All Orders
              </Button>
              <Button variant="outline" className="text-sm">
                Pending
              </Button>
              <Button variant="outline" className="text-sm">
                Processing
              </Button>
              <Button variant="outline" className="text-sm">
                Shipped
              </Button>
              <Button variant="outline" className="text-sm">
                Delivered
              </Button>
              <Button variant="outline" className="text-sm">
                Cancelled
              </Button>
            </div>
            
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="bg-neutral-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Order #{order.id}</span>
                        <span className={`py-1 px-3 rounded-full text-white text-xs ${getOrderStatusColor(order.status)}`}>
                          {getOrderStatusText(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-500">Placed on {formatDate(order.date)}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <i className="ri-truck-line mr-1"></i> Update Status
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="ri-file-list-line mr-1"></i> Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-neutral-200">
                    <div className="space-y-4">
                      {order.items.map((item) => (
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Sales Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">Total Sales</div>
                <div className="text-2xl font-bold">GH₵ 45,270</div>
                <div className="text-xs text-green-500 mt-1">
                  <i className="ri-arrow-up-line"></i> 12% from last month
                </div>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">Orders</div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-xs text-green-500 mt-1">
                  <i className="ri-arrow-up-line"></i> 8% from last month
                </div>
              </div>
              
              <div className="bg-accent/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">Customers</div>
                <div className="text-2xl font-bold">85</div>
                <div className="text-xs text-green-500 mt-1">
                  <i className="ri-arrow-up-line"></i> 5% from last month
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center mb-6">
              <div className="text-center">
                <i className="ri-line-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Sales chart visualization would go here</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-right">Sold</th>
                      <th className="p-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-neutral-100 rounded overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                              alt="Samsung Galaxy S21" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <span>Samsung Galaxy S21 Ultra</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">24 units</td>
                      <td className="p-3 text-right">GH₵ 86,376</td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-neutral-100 rounded overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                              alt="MacBook Pro" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <span>MacBook Pro 13" M2</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">18 units</td>
                      <td className="p-3 text-right">GH₵ 224,982</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderDeliveryAgentContent = () => (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
        <TabsTrigger value="earnings">Earnings</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-neutral-100 overflow-hidden mb-2">
                  <img 
                    src="https://i.pravatar.cc/150?img=11" 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        value="Kwame Asante"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        value="kwame@example.com"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value="+233 24 123 4567"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">ID Number</label>
                      <input
                        type="text"
                        value="GH-45678921"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Vehicle Type</label>
                      <select className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Motorcycle</option>
                        <option>Car</option>
                        <option>Van</option>
                        <option>Bicycle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">License Plate</label>
                      <input
                        type="text"
                        value="GR-2345-21"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">License Number</label>
                      <input
                        type="text"
                        value="DL-456789"
                        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">Service Area</label>
                      <select className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Accra Central</option>
                        <option>Accra North</option>
                        <option>Tema</option>
                        <option>Spintex</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3">Availability Status</h3>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="status-online" 
                        name="availability-status" 
                        checked 
                        className="w-4 h-4 text-primary" 
                      />
                      <label htmlFor="status-online" className="ml-2">Available for deliveries</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="status-offline" 
                        name="availability-status" 
                        className="w-4 h-4 text-primary" 
                      />
                      <label htmlFor="status-offline" className="ml-2">Not available</label>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                    <i className="ri-information-line mr-1"></i> 
                    Your location will be shared with buyers and sellers only when you're marked as available.
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-primary text-white"
                    onClick={() => {
                      toast({
                        title: "Profile updated",
                        description: "Your delivery agent profile has been updated successfully.",
                      });
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="deliveries">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Deliveries</h2>
            
            <div className="mb-6 flex flex-wrap gap-3">
              <Button variant="outline" className="text-sm border-primary text-primary">
                All
              </Button>
              <Button variant="outline" className="text-sm">
                Assigned
              </Button>
              <Button variant="outline" className="text-sm">
                In Progress
              </Button>
              <Button variant="outline" className="text-sm">
                Completed
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Order #ORD-12345</span>
                      <span className="py-1 px-3 rounded-full text-white text-xs bg-orange-500">
                        On the Way
                      </span>
                    </div>
                    <div className="text-sm text-neutral-500">Assigned: 15 Jul, 2023 • 12:45 PM</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <i className="ri-map-pin-line mr-1"></i> Navigation
                    </Button>
                    <Button className="bg-primary text-white" size="sm">
                      <i className="ri-check-line mr-1"></i> Mark Delivered
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Pickup Location</div>
                      <div className="font-medium">Accra Tech Store</div>
                      <div className="text-sm">25 Spintex Road, Accra</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Delivery Address</div>
                      <div className="font-medium">123 Independence Ave</div>
                      <div className="text-sm">Accra, Ghana</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Customer</div>
                      <div className="font-medium">Kofi Annan</div>
                      <div className="text-sm">+233 20 123 4567</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Order #ORD-12346</span>
                      <span className="py-1 px-3 rounded-full text-white text-xs bg-green-500">
                        Delivered
                      </span>
                    </div>
                    <div className="text-sm text-neutral-500">Completed: 10 Jul, 2023 • 6:20 PM</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <i className="ri-file-list-line mr-1"></i> Details
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Pickup Location</div>
                      <div className="font-medium">Kumasi Fashion Store</div>
                      <div className="text-sm">45 Asafo Market, Kumasi</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Delivery Address</div>
                      <div className="font-medium">45 Cantonments Road</div>
                      <div className="text-sm">Accra, Ghana</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">Customer</div>
                      <div className="font-medium">Ama Serwaa</div>
                      <div className="text-sm">+233 25 987 6543</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="earnings">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Earnings Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">Today's Earnings</div>
                <div className="text-2xl font-bold">GH₵ 85</div>
                <div className="text-xs text-neutral-500 mt-1">From 4 deliveries</div>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">This Week</div>
                <div className="text-2xl font-bold">GH₵ 387</div>
                <div className="text-xs text-green-500 mt-1">
                  <i className="ri-arrow-up-line"></i> 12% from last week
                </div>
              </div>
              
              <div className="bg-accent/10 rounded-lg p-4">
                <div className="text-neutral-500 text-sm mb-1">This Month</div>
                <div className="text-2xl font-bold">GH₵ 1,542</div>
                <div className="text-xs text-green-500 mt-1">
                  <i className="ri-arrow-up-line"></i> 8% from last month
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center mb-6">
              <div className="text-center">
                <i className="ri-line-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Earnings chart visualization would go here</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Recent Earnings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Distance</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="p-3">ORD-12345</td>
                      <td className="p-3">15 Jul, 2023</td>
                      <td className="p-3">3.2 km</td>
                      <td className="p-3 text-right">GH₵ 25</td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="p-3">ORD-12346</td>
                      <td className="p-3">10 Jul, 2023</td>
                      <td className="p-3">5.8 km</td>
                      <td className="p-3 text-right">GH₵ 35</td>
                    </tr>
                    <tr className="border-b border-neutral-200">
                      <td className="p-3">ORD-12334</td>
                      <td className="p-3">5 Jul, 2023</td>
                      <td className="p-3">2.5 km</td>
                      <td className="p-3 text-right">GH₵ 20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              
              <div className="flex items-center bg-primary/5 p-3 rounded-lg">
                <div className="text-3xl font-bold text-primary mr-3">4.9</div>
                <div>
                  <div className="flex text-secondary mb-1">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-half-fill"></i>
                  </div>
                  <div className="text-sm text-neutral-500">Based on 245 reviews</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Kofi Annan</h4>
                  <div className="flex text-secondary">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 mb-2">ORD-12345 • 15 Jul, 2023</div>
                <p className="text-neutral-700">
                  Kwame was very professional and punctual. He arrived with my package well before the estimated time. Very satisfied with the service!
                </p>
              </div>
              
              <div className="border-b border-neutral-200 pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Ama Serwaa</h4>
                  <div className="flex text-secondary">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-line"></i>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 mb-2">ORD-12346 • 10 Jul, 2023</div>
                <p className="text-neutral-700">
                  Delivery was good but a bit delayed. The agent was friendly and kept me updated about his location though.
                </p>
              </div>
              
              <div className="pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">David Owusu</h4>
                  <div className="flex text-secondary">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                </div>
                <div className="text-sm text-neutral-500 mb-2">ORD-12334 • 5 Jul, 2023</div>
                <p className="text-neutral-700">
                  Excellent service! Kwame handled my fragile items with care and was very polite. Would definitely want him to deliver my packages again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {role === 'buyer' && renderBuyerContent()}
        {role === 'seller' && renderSellerContent()}
        {role === 'delivery' && renderDeliveryAgentContent()}
      </div>
    </div>
  );
};

export default UserProfile;
