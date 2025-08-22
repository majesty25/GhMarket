import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';
import { useLoginMutation } from '@/redux/features/api/apiSlice';

const LoginPage = () => {
  const [, navigate] = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  
  // Use the login mutation hook
  const [login, { isLoading: isSubmitting }] = useLoginMutation();
  
  // Check if user is already logged in
  // const { data: currentUser, isLoading: isCheckingAuth } = useGetCurrentUserQuery(undefined, {
  //   skip: false, // Always check auth status
  // });
  
  // Redirect if user is already logged in
  // useEffect(() => {
  //   if () {
  //     navigate('/');
  //   }
  // }, [currentUser, isCheckingAuth, navigate]);
  
  // // Show loading while checking authentication
  // if (isCheckingAuth) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-neutral-50">
  //       <div className="flex items-center justify-center">
  //         <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //         </svg>
  //       </div>
  //     </div>
  //   );
  // }
  
  // // Don't render if user is already logged in
  // if (currentUser) {
  //   return null;
  // }
  
  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      
      console.log('Login result:', result.user);
      
      toast({
        title: "Login successful",
        description: "Welcome back to GhanaMarket!",
        duration: 3000,
      });
      
      // Navigate to home page - RTK Query will automatically refetch user data
      navigate('/');
      
    } catch (error: any) {
      // Handle different types of errors
      let errorMessage = "An error occurred during login";
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error?.status === 429) {
        errorMessage = "Too many login attempts. Please try again later";
      } else if (error?.status >= 500) {
        errorMessage = "Server error. Please try again later";
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      
      // Clear form on certain errors
      if (error?.status === 401) {
        setFormData(prev => ({
          ...prev,
          password: '',
        }));
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-white font-bold text-xl">G</div>
              <div className="text-2xl font-bold text-primary">Ghana<span className="text-accent">Market</span></div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome back</h1>
          <p className="text-neutral-500">Sign in to your account to continue</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-neutral-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#E4572E"/>
                <path d="M16.5 12C16.5 9.51 14.49 7.5 12 7.5C9.51 7.5 7.5 9.51 7.5 12C7.5 14.49 9.51 16.5 12 16.5C14.49 16.5 16.5 14.49 16.5 12Z" fill="white"/>
              </svg>
              Continue with Ghana Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;