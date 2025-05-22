import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';

const ForgotPasswordPage = () => {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would send a password reset link to the user's email
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
        duration: 5000,
      });
    }, 1000);
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
          <h1 className="text-2xl font-bold mt-6 mb-2">Forgot your password?</h1>
          <p className="text-neutral-500">We'll help you reset it and get back on track</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-send-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Check your email</h3>
              <p className="text-neutral-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                If you don't see the email, check your spam folder or make sure the email address is correct.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Try a different email
                </Button>
                <Link href="/auth/login">
                  <Button variant="link" className="w-full">
                    Return to sign in
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? 'border-red-500' : ''}
                />
                {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                <p className="mt-1 text-xs text-neutral-500">
                  Enter the email address associated with your account, and we'll send you a link to reset your password.
                </p>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-2 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Reset Link'}
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-neutral-600">
                  Remembered your password?{' '}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;