
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { orders, deliveryAgents } from '@/data';
import { useUserContext } from '@/context/user-context';

const DeliveryAnalytics = () => {
  const { user } = useUserContext();
  const [timeRange, setTimeRange] = useState('week');
  
  // Find the current delivery agent's data
  const deliveryAgent = deliveryAgents[0]; // In a real app, this would be filtered by user.id
  
  // Filter orders assigned to this delivery agent
  const agentOrders = orders.filter(order => 
    order.tracking?.deliveryAgent?.id === deliveryAgent.id
  );

  // Calculate metrics
  const metrics = {
    totalDeliveries: agentOrders.length,
    completedDeliveries: agentOrders.filter(o => o.status === 'delivered').length,
    totalEarnings: agentOrders.reduce((sum, order) => sum + 25, 0), // Assuming GH₵25 per delivery
    rating: deliveryAgent.rating,
    activeHours: 126, // This would come from actual tracking data
    averageDeliveryTime: 45, // In minutes, would be calculated from actual data
  };

  // Calculate performance metrics
  const performance = {
    onTimeDelivery: 94, // Percentage
    customerSatisfaction: 4.8,
    ordersDeclined: 3,
    averageTimeToAccept: 2.5 // minutes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center flex-wrap">
          <li className="inline-flex items-center">
            <Link href="/delivery-dashboard" className="text-neutral-500 hover:text-primary">
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
        <h1 className="text-2xl font-bold">Delivery Performance</h1>
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
                <p className="text-sm text-neutral-500">Total Earnings</p>
                <h3 className="text-xl font-bold">GH₵ {metrics.totalEarnings.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <i className="ri-truck-line text-xl text-secondary"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Completed Deliveries</p>
                <h3 className="text-xl font-bold">{metrics.completedDeliveries}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-xl text-accent"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Active Hours</p>
                <h3 className="text-xl font-bold">{metrics.activeHours}h</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                <i className="ri-star-line text-xl text-amber-500"></i>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Rating</p>
                <h3 className="text-xl font-bold">{metrics.rating.toFixed(1)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>On-time Delivery Rate</span>
                  <span>{performance.onTimeDelivery}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${performance.onTimeDelivery}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>{performance.customerSatisfaction}/5</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full" 
                    style={{ width: `${(performance.customerSatisfaction/5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm text-neutral-500">Orders Declined</div>
                  <div className="text-xl font-bold">{performance.ordersDeclined}</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <div className="text-sm text-neutral-500">Avg. Accept Time</div>
                  <div className="text-xl font-bold">{performance.averageTimeToAccept}m</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Times</h2>
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-line-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Delivery time trend visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Earnings Breakdown</h2>
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-pie-chart-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Earnings distribution chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-neutral-200 last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-neutral-100 rounded-full"></div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i key={i} className="ri-star-fill text-sm"></i>
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500">2 days ago</span>
                    </div>
                    <p className="text-sm">Very professional delivery service. The driver was polite and on time.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Heat Map</h2>
            <div className="bg-neutral-50 h-64 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-map-2-line text-4xl text-neutral-300 mb-2"></i>
                <p className="text-neutral-500">Delivery locations heat map would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryAnalytics;
