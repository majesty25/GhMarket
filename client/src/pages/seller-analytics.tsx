
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products, orders } from '@/data';
import { useUserContext } from '@/context/user-context';

const SellerAnalytics = () => {
  const { user } = useUserContext();
  const [timeRange, setTimeRange] = useState('week');
  
  // Filter products and orders for this seller
  const sellerProducts = products.filter(p => p.seller.id === user?.id);
  const sellerOrders = orders.filter(order => 
    order.items.some(item => sellerProducts.some(p => p.id === item.product.id))
  );

  // Calculate metrics
  const metrics = {
    totalRevenue: sellerOrders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: sellerOrders.length,
    averageOrderValue: sellerOrders.length > 0 
      ? sellerOrders.reduce((sum, order) => sum + order.total, 0) / sellerOrders.length 
      : 0,
    pendingOrders: sellerOrders.filter(o => o.status === 'pending').length
  };

  // Top selling products
  const topProducts = sellerProducts
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center flex-wrap">
          <li className="inline-flex items-center">
            <Link href="/seller-dashboard" className="text-neutral-500 hover:text-primary">
              Dashboard
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
          </li>
          <li className="text-neutral-800 font-medium">
            Analytics
          </li>
        </ol>
      </nav>

      {/* Time Range Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Overview</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-neutral-300 rounded-md p-2"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-xl text-primary"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Revenue</p>
                <h3 className="text-xl font-bold">GH₵ {metrics.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <i className="ri-shopping-cart-line text-xl text-secondary"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Orders</p>
                <h3 className="text-xl font-bold">{metrics.totalOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <i className="ri-coin-line text-xl text-accent"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Average Order Value</p>
                <h3 className="text-xl font-bold">GH₵ {metrics.averageOrderValue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-xl text-blue-500"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Pending Orders</p>
                <h3 className="text-xl font-bold">{metrics.pendingOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-line-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Revenue trend visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2">Product</th>
                    <th className="text-right py-2">Units Sold</th>
                    <th className="text-right py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id} className="border-b border-neutral-200">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-neutral-100 rounded overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-2">{product.sold || 0}</td>
                      <td className="text-right py-2">
                        GH₵ {((product.sold || 0) * (product.discountPrice || product.price)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-pie-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Order status distribution chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerAnalytics;
