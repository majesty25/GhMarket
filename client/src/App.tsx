import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Checkout from "@/pages/checkout";
import OrderTracking from "@/pages/order-tracking";
import UserProfile from "@/pages/user-profile";
import SellerDashboard from "@/pages/seller-dashboard";
import DeliveryDashboard from "@/pages/delivery-dashboard";
import { useLocation } from "wouter";
import AdminDashboard from "@/pages/admin-dashboard";
import StorePage from "@/pages/store";
import CategoriesPage from "@/pages/categories";
import CategoryPage from "@/pages/category";
import ManageStorePage from "@/pages/seller/manage-store";
import ManageProductsPage from "@/pages/seller/manage-products";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { useEffect, useState } from "react";
import { CartProvider } from "@/context/cart-context";
import { UserProvider } from "@/context/user-context";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order/tracking/:id" component={OrderTracking} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/seller-dashboard" component={SellerDashboard} />
      <Route path="/delivery-dashboard" component={DeliveryDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/store/:id" component={StorePage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/category/:slug/:subSlug?" component={CategoryPage} />
      <Route path="/seller/manage-store" component={ManageStorePage} />
      <Route path="/seller/manage-products" component={ManageProductsPage} />
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/signup" component={SignupPage} />
      <Route path="/auth/forgot-password" component={ForgotPasswordPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Toaster />
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}

function App() {
  

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', '0 57% 32%'); // Ghana green
    document.documentElement.style.setProperty('--primary-foreground', '210 40% 98%');
    document.documentElement.style.setProperty('--secondary', '45 100% 51%'); // Ghana gold/yellow
    document.documentElement.style.setProperty('--secondary-foreground', '24 9.8% 10%');
    document.documentElement.style.setProperty('--accent', '351 100% 43%'); // Ghana red
    document.documentElement.style.setProperty('--accent-foreground', '0 0% 100%');
   
  }, []);



  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
