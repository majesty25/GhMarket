import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useUserContext } from '@/context/user-context';
import { useCart } from '@/context/cart-context';
import RoleSwitchModal from '@/components/modals/role-switch-modal';
import CartSidebar from '@/components/cart/cart-sidebar';
import { categories } from '@/data';

const Header = () => {
  const { user, role, setIsRoleModalOpen, isRoleModalOpen, logout, isAuthenticated } = useUserContext();
  const { isCartOpen, setIsCartOpen, getCartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, navigate] = useLocation();

  const handleUserRoleSwitch = () => {
    setIsRoleModalOpen(true);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <div className="text-xs text-neutral-500 hidden md:block">Welcome to Ghana's premier online marketplace</div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <Link href="#" className="hover:text-primary">Help</Link>
              <Link href="/order/tracking/ORD-12345" className="hover:text-primary">Track Order</Link>
              <Link href="/auth/login" className="hover:text-primary">Sign In</Link>
              <Link href="/auth/signup" className="hover:text-primary">Register</Link>
              <button onClick={handleUserRoleSwitch} className="hover:text-primary">Switch Role</button>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-white font-bold text-xl">G</div>
              <div className="text-xl font-bold text-primary">Ghana<span className="text-accent">Market</span></div>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search for products, brands and categories..." 
                  className="w-full pl-4 pr-12 py-2 border border-neutral-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md">
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
            
            {/* Navigation Icons */}
            <div className="flex items-center gap-3 md:gap-6">
              {role === 'seller' ? (
                <Link 
                  href="/seller-dashboard" 
                  className={`flex flex-col items-center ${location === '/seller-dashboard' ? 'text-primary' : 'text-neutral-600'} hover:text-primary`}
                >
                  <i className="ri-store-2-line text-xl"></i>
                  <span className="text-xs hidden md:inline">Dashboard</span>
                </Link>
              ) : role === 'delivery' ? (
                <Link 
                  href="/delivery-dashboard" 
                  className={`flex flex-col items-center ${location === '/delivery-dashboard' ? 'text-primary' : 'text-neutral-600'} hover:text-primary`}
                >
                  <i className="ri-truck-line text-xl"></i>
                  <span className="text-xs hidden md:inline">Dashboard</span>
                </Link>
              ) : (
                <Link 
                  href="/profile" 
                  className={`flex flex-col items-center ${location === '/profile' ? 'text-primary' : 'text-neutral-600'} hover:text-primary`}
                >
                  <i className="ri-user-line text-xl"></i>
                  <span className="text-xs hidden md:inline">Account</span>
                </Link>
              )}
              <Link 
                href="#" 
                className="flex flex-col items-center text-neutral-600 hover:text-primary"
              >
                <i className="ri-heart-line text-xl"></i>
                <span className="text-xs hidden md:inline">Wishlist</span>
              </Link>
              {role === 'buyer' && (
                <button 
                  onClick={handleCartOpen} 
                  className="flex flex-col items-center text-neutral-600 hover:text-primary relative"
                >
                  <i className="ri-shopping-cart-line text-xl"></i>
                  <span className="text-xs hidden md:inline">Cart</span>
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Categories Menu - Only show for buyer role */}
          {role === 'buyer' && (
            <div className="py-2 border-t border-neutral-100 hidden md:block">
              <div className="flex items-center gap-6 overflow-x-auto">
                <Link href="/" className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location === '/' ? 'text-primary' : ''}`}>Home</Link>
                <Link 
                  href="/categories" 
                  className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location === '/categories' ? 'text-primary' : ''}`}
                >
                  All Categories
                </Link>
                {categories.map(category => (
                  <Link 
                    key={category.id} 
                    href={`/category/${category.slug}`} 
                    className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location.startsWith(`/category/${category.slug}`) ? 'text-primary' : ''}`}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Today's Deals</Link>
              </div>
            </div>
          )}
          
          {/* Seller Menu - Only show for seller role */}
          {role === 'seller' && (
            <div className="py-2 border-t border-neutral-100 hidden md:block">
              <div className="flex items-center gap-6 overflow-x-auto">
                <Link href="/seller-dashboard" className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location === '/seller-dashboard' ? 'text-primary' : ''}`}>Dashboard</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Products</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Orders</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Analytics</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Settings</Link>
              </div>
            </div>
          )}
          
          {/* Admin Menu - Only show for admin role */}
          {role === 'admin' && (
            <div className="py-2 border-t border-neutral-100 hidden md:block">
              <div className="flex items-center gap-6 overflow-x-auto">
                <Link href="/admin-dashboard" className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location === '/admin-dashboard' ? 'text-primary' : ''}`}>Dashboard</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Users</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Orders</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Analytics</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Settings</Link>
              </div>
            </div>
          )}

          {/* Delivery Menu - Only show for delivery role */}
          {role === 'delivery' && (
            <div className="py-2 border-t border-neutral-100 hidden md:block">
              <div className="flex items-center gap-6 overflow-x-auto">
                <Link href="/delivery-dashboard" className={`text-sm font-medium hover:text-primary whitespace-nowrap ${location === '/delivery-dashboard' ? 'text-primary' : ''}`}>Dashboard</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Available Orders</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">My Deliveries</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Earnings</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary whitespace-nowrap">Settings</Link>
              </div>
            </div>
          )}
          
          {/* Mobile Search - Only show for buyer role */}
          {role === 'buyer' && (
            <div className="py-2 md:hidden">
              <form onSubmit={handleSearch} className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-4 pr-12 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md">
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Modals/Sidebars */}
      <RoleSwitchModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
