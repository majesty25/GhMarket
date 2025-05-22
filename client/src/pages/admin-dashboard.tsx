import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useUserContext } from '@/context/user-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { categories } from '@/data';
import { Category, SubCategory } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'buyer',
    status: 'active',
    joinedDate: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    role: 'seller',
    status: 'active',
    joinedDate: '2024-02-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    username: 'mikej',
    email: 'mike@example.com',
    role: 'delivery',
    status: 'inactive',
    joinedDate: '2024-03-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
  }
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'buyer':
      return 'bg-blue-100 text-blue-800';
    case 'seller':
      return 'bg-green-100 text-green-800';
    case 'delivery':
      return 'bg-purple-100 text-purple-800';
    case 'admin':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Mock orders data
const orders = [
  {
    id: "ORD001",
    status: "pending",
    date: "2024-03-20",
    total: 150.00,
    items: [
      { id: 1, name: "Product 1", quantity: 2, price: 75.00 }
    ]
  },
  {
    id: "ORD002",
    status: "processing",
    date: "2024-03-19",
    total: 299.99,
    items: [
      { id: 2, name: "Product 2", quantity: 1, price: 299.99 }
    ]
  },
  {
    id: "ORD003",
    status: "shipped",
    date: "2024-03-18",
    total: 499.99,
    items: [
      { id: 3, name: "Product 3", quantity: 1, price: 499.99 }
    ]
  }
];

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'delivered':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-neutral-500';
  }
};

const getOrderStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const { user } = useUserContext();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [showAddSubcategoryDialog, setShowAddSubcategoryDialog] = useState(false);
  const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false);
  const [showEditSubcategoryDialog, setShowEditSubcategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Mock statistics
  const stats = {
    totalUsers: 1250,
    activeSellers: 45,
    activeDeliveryAgents: 28,
    totalOrders: 3567,
    pendingOrders: 124,
    revenue: 45670
  };

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 32500 },
    { month: 'Feb', revenue: 38700 },
    { month: 'Mar', revenue: 42300 },
    { month: 'Apr', revenue: 39800 },
    { month: 'May', revenue: 45670 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 850 },
    { month: 'Feb', users: 950 },
    { month: 'Mar', users: 1050 },
    { month: 'Apr', users: 1150 },
    { month: 'May', users: 1250 }
  ];

  const orderStatusData = [
    { status: 'Pending', count: 124 },
    { status: 'Processing', count: 85 },
    { status: 'Delivered', count: 245 },
    { status: 'Cancelled', count: 32 }
  ];

  useEffect(() => {
    document.title = 'Admin Dashboard - GhanaMarket';
  }, []);

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Here you would typically make an API call to add the category
    console.log('Adding category:', Object.fromEntries(formData));
    setShowAddCategoryDialog(false);
  };

  const handleAddSubcategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Here you would typically make an API call to add the subcategory
    console.log('Adding subcategory:', Object.fromEntries(formData));
    setShowAddSubcategoryDialog(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', profileForm);
    alert('Profile updated successfully!'); // Mock success message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            <i className="ri-download-line mr-2"></i>Export Data
          </button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-xl text-primary"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Total Users</p>
                    <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <i className="ri-store-line text-xl text-secondary"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Active Sellers</p>
                    <h3 className="text-xl font-bold">{stats.activeSellers}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <i className="ri-truck-line text-xl text-accent"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Delivery Agents</p>
                    <h3 className="text-xl font-bold">{stats.activeDeliveryAgents}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
                <ChartContainer config={{ revenue: { color: '#0097FB' } }} className="h-72">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Revenue
                              </span>
                              <span className="font-bold text-muted-foreground">
                                GH₵ {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0097FB"
                      fill="#0097FB"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">User Growth</h2>
                <ChartContainer config={{ users: { color: '#10B981' } }} className="h-72">
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Users
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }} />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <i className="ri-line-chart-line text-xl text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Today's Revenue</p>
                    <h3 className="text-xl font-bold">GH₵ {stats.revenue}</h3>
                    <p className="text-xs text-green-500">+12.5% from yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <i className="ri-shopping-cart-line text-xl text-blue-500"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Orders Today</p>
                    <h3 className="text-xl font-bold">{stats.pendingOrders}</h3>
                    <p className="text-xs text-blue-500">+5.2% from yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <i className="ri-user-add-line text-xl text-purple-500"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">New Users</p>
                    <h3 className="text-xl font-bold">48</h3>
                    <p className="text-xs text-purple-500">+8.3% from yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
                <ChartContainer config={{ revenue: { color: '#10B981' } }} className="h-72">
                  <BarChart data={[
                    { category: 'Electronics', revenue: 25000 },
                    { category: 'Fashion', revenue: 18000 },
                    { category: 'Home', revenue: 15000 },
                    { category: 'Beauty', revenue: 12000 },
                    { category: 'Sports', revenue: 9000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="revenue" fill="#10B981" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
                <ChartContainer config={{ orders: { color: '#8B5CF6' } }} className="h-72">
                  <BarChart data={orderStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Top Performing Sellers</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Tech Hub Store', sales: 156, revenue: 45600 },
                    { name: 'Fashion World', sales: 142, revenue: 38900 },
                    { name: 'Home Essentials', sales: 128, revenue: 32500 },
                    { name: 'Beauty Box', sales: 115, revenue: 28700 },
                    { name: 'Sports Center', sales: 98, revenue: 24500 }
                  ].map((seller, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{seller.name}</h4>
                          <p className="text-sm text-neutral-500">{seller.sales} sales</p>
                        </div>
                      </div>
                      <span className="font-medium">GH₵ {seller.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Traffic Analytics</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Direct</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Social Media</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Search Engines</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-neutral-500">Avg. Session Duration</p>
                        <p className="font-medium">8m 42s</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Bounce Rate</p>
                        <p className="font-medium">32.4%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">User Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <i className="ri-filter-3-line mr-2"></i>Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="ri-download-line mr-2"></i>Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-primary"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">Regular Users</h3>
                      <p className="text-sm text-neutral-500">{stats.totalUsers} users</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <i className="ri-store-line text-secondary"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">Sellers</h3>
                      <p className="text-sm text-neutral-500">{stats.activeSellers} active sellers</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className="ri-truck-line text-accent"></i>
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Agents</h3>
                      <p className="text-sm text-neutral-500">{stats.activeDeliveryAgents} active agents</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="w-12">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-neutral-500">@{user.username}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(user.status)}`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <i className="ri-more-2-fill"></i>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Admin Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">System Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Maintenance Mode</h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      Enable maintenance mode to temporarily disable access to the platform
                    </p>
                    <div className="flex items-center">
                      <div className="w-11 h-6 bg-neutral-200 rounded-full cursor-pointer relative">
                        <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full"></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      Configure system-wide email notification settings
                    </p>
                    <div className="flex items-center">
                      <div className="w-11 h-6 bg-primary rounded-full cursor-pointer relative">
                        <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transform translate-x-5"></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-accent mb-2">Danger Zone</h3>
                    <button className="w-full border border-accent text-accent rounded-lg py-2 hover:bg-accent/5">
                      Reset System Settings
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Categories Management</h2>
                  <Button onClick={() => setShowAddCategoryDialog(true)} variant="outline" className="text-sm">
                    <i className="ri-add-line mr-2"></i>Add New Category
                  </Button>
                </div>

                <div className="space-y-4">
                  {categories.map(category => (
                    <div key={category.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <i className={`${category.icon} text-primary`}></i>
                          </div>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-neutral-500">{category.subCategories?.length || 0} subcategories</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => {
                            setSelectedCategory(category);
                            setShowAddSubcategoryDialog(true);
                          }} variant="outline" size="sm">
                            Add Subcategory
                          </Button>
                          <Button onClick={() => {
                            setSelectedCategory(category);
                            setShowEditCategoryDialog(true);
                          }} variant="ghost" size="sm">
                            <i className="ri-edit-line mr-2"></i>Edit
                          </Button>
                        </div>
                      </div>

                      {category.subCategories && category.subCategories.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          {category.subCategories.map(subCategory => (
                            <div key={subCategory.id} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <img src={subCategory.image} alt={subCategory.name} className="w-8 h-8 rounded object-cover" />
                                <span className="font-medium">{subCategory.name}</span>
                              </div>
                              <Button onClick={() => {
                                setSelectedSubcategory(subCategory);
                                setShowEditSubcategoryDialog(true);
                              }} variant="ghost" size="sm">
                                <i className="ri-edit-line"></i>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Dialog open={showAddCategoryDialog} onOpenChange={setShowAddCategoryDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input required name="name" placeholder="Category name" />
                      </div>
                      <div>
                        <Label>Icon (Remix Icon class)</Label>
                        <Input required name="icon" placeholder="ri-smartphone-line" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea required name="description" placeholder="Category description" />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input required name="image" type="url" placeholder="https://example.com/image.jpg" />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Category</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={showAddSubcategoryDialog} onOpenChange={setShowAddSubcategoryDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subcategory</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddSubcategory} className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input required name="name" placeholder="Subcategory name" />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input required name="image" type="url" placeholder="https://example.com/image.jpg" />
                      </div>
                      <div>
                        <Label>Featured</Label>
                        <Switch name="featured" />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Subcategory</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Order Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <i className="ri-filter-3-line mr-2"></i>Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="ri-download-line mr-2"></i>Export
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-3">
                <Button variant="outline" className="text-sm border-primary text-primary">All Orders</Button>
                <Button variant="outline" className="text-sm">Pending</Button>
                <Button variant="outline" className="text-sm">Processing</Button>
                <Button variant="outline" className="text-sm">Shipped</Button>
                <Button variant="outline" className="text-sm">Delivered</Button>
                <Button variant="outline" className="text-sm">Cancelled</Button>
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
                        <div className="text-sm text-neutral-500">Placed on {order.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <i className="ri-file-list-line mr-2"></i>Details
                        </Button>
                        {order.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="border-green-500 text-green-500">
                              <i className="ri-check-line mr-2"></i>Approve
                            </Button>
                            <Button variant="outline" size="sm" className="border-accent text-accent">
                              <i className="ri-close-line mr-2"></i>Reject
                            </Button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                            <i className="ri-truck-line mr-2"></i>Mark Shipped
                          </Button>
                        )}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <i className="ri-file-list-line mr-2"></i>View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Order Information</h4>
                              <div className="text-sm space-y-1">
                                <p>Date: {order.date}</p>
                                <p>Status: <span className={`py-1 px-2 rounded-full text-xs ${getOrderStatusColor(order.status)} text-white`}>
                                  {getOrderStatusText(order.status)}
                                </span></p>
                                <p>Total Amount: GH₵ {order.total}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Customer Information</h4>
                              <div className="text-sm space-y-1">
                                <p>Name: John Doe</p>
                                <p>Email: john@example.com</p>
                                <p>Phone: +233 XX XXX XXXX</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                                  <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden">
                                    <img src={`https://picsum.photos/200/200?random=${item.id}`} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-medium">{item.name}</h5>
                                    <p className="text-sm text-neutral-500">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">GH₵ {item.price}</p>
                                    <p className="text-sm text-neutral-500">Per Unit</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total Amount</span>
                              <span className="font-medium text-xl">GH₵ {order.total}</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Activity Logs</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <i className="ri-filter-3-line mr-2"></i>Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="ri-download-line mr-2"></i>Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { timestamp: '2024-03-20 14:30:25', type: 'user', action: 'User registration', details: 'New user registered: john_doe', severity: 'info' },
                  { timestamp: '2024-03-20 14:15:10', type: 'order', action: 'Order status update', details: 'Order #ORD123 marked as delivered', severity: 'success' },
                  { timestamp: '2024-03-20 14:00:05', type: 'security', action: 'Login attempt', details: 'Failed login attempt from IP: 192.168.1.1', severity: 'warning' },
                  { timestamp: '2024-03-20 13:45:30', type: 'system', action: 'System update', details: 'New product category added: Electronics', severity: 'info' },
                  { timestamp: '2024-03-20 13:30:15', type: 'security', action: 'Permission change', details: 'Admin privileges granted to user: jane_smith', severity: 'warning' },
                ].map((log, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        log.severity === 'info' ? 'bg-blue-500' :
                        log.severity === 'success' ? 'bg-green-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-neutral-500">{log.timestamp}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        log.type === 'user' ? 'bg-purple-100 text-purple-800' :
                        log.type === 'order' ? 'bg-blue-100 text-blue-800' :
                        log.type === 'security' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-neutral-500">{log.details}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;