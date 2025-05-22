import { Link, useLocation } from 'wouter';
import { useCart } from '@/context/cart-context';
import { useUserContext } from '@/context/user-context';

const MobileNavigation = () => {
  const [location] = useLocation();
  const { setIsCartOpen } = useCart();
  const { role } = useUserContext();

  const handleCartOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  // Buyer navigation
  if (role === 'buyer') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className={`flex flex-col items-center p-2 ${location === '/' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-home-5-line text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-apps-line text-xl"></i>
            <span className="text-xs mt-1">Categories</span>
          </Link>
          <a href="#" onClick={handleCartOpen} className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-shopping-cart-line text-xl"></i>
            <span className="text-xs mt-1">Cart</span>
          </a>
          <Link href="/profile" className={`flex flex-col items-center p-2 ${location === '/profile' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>
    );
  }

  // Seller navigation
  if (role === 'seller') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/seller-dashboard" className={`flex flex-col items-center p-2 ${location === '/seller-dashboard' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-shopping-bag-line text-xl"></i>
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-file-list-line text-xl"></i>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center p-2 ${location === '/profile' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-user-settings-line text-xl"></i>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    );
  }

  // Admin navigation
  if (role === 'admin') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/admin-dashboard" className={`flex flex-col items-center p-2 ${location === '/admin-dashboard' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Users</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-settings-line text-xl"></i>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    );
  }

  // Delivery navigation
  if (role === 'delivery') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/delivery-dashboard" className={`flex flex-col items-center p-2 ${location === '/delivery-dashboard' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-route-line text-xl"></i>
            <span className="text-xs mt-1">Active</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-500 p-2">
            <i className="ri-takeaway-line text-xl"></i>
            <span className="text-xs mt-1">Available</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center p-2 ${location === '/profile' ? 'text-primary' : 'text-neutral-500'}`}>
            <i className="ri-user-line text-xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    );
  }

  // Default navigation - should never reach here, but added as fallback
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${location === '/' ? 'text-primary' : 'text-neutral-500'}`}>
          <i className="ri-home-5-line text-xl"></i>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center p-2 ${location === '/profile' ? 'text-primary' : 'text-neutral-500'}`}>
          <i className="ri-user-line text-xl"></i>
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;