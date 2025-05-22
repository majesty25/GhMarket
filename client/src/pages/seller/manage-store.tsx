import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/user-context';
import { Link, useLocation } from 'wouter';
import { sellers } from '@/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';

const ManageStorePage = () => {
  const { user, role } = useUserContext();
  const [, navigate] = useLocation();
  
  // Find the seller's store if it exists
  const sellerStore = sellers.find(s => s.id === user?.id);
  
  const [storeData, setStoreData] = useState({
    name: sellerStore?.name || '',
    description: sellerStore?.description || '',
    category: sellerStore?.category || '',
    initials: sellerStore?.initials || '',
    bgColor: sellerStore?.bgColor || 'bg-primary'
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    category: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect to seller dashboard if not a seller
    if (role !== 'seller') {
      navigate('/seller-dashboard');
    }
    
    document.title = sellerStore ? 'Manage Store - GhanaMarket' : 'Create Store - GhanaMarket';
  }, [role, navigate, sellerStore]);
  
  const validateForm = () => {
    const errors = {
      name: '',
      description: '',
      category: ''
    };
    let isValid = true;
    
    if (!storeData.name.trim()) {
      errors.name = 'Store name is required';
      isValid = false;
    }
    
    if (!storeData.description.trim()) {
      errors.description = 'Store description is required';
      isValid = false;
    } else if (storeData.description.length < 20) {
      errors.description = 'Description should be at least 20 characters';
      isValid = false;
    }
    
    if (!storeData.category.trim()) {
      errors.category = 'Store category is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: sellerStore ? "Store updated successfully" : "Store created successfully",
        description: sellerStore ? "Your store information has been updated." : "Your store has been created and is now live.",
        duration: 5000,
      });
      
      setIsSubmitting(false);
      
      // In a real app, this would send data to the backend
      // Instead we redirect to the dashboard since we're using hardcoded data
      navigate('/seller-dashboard');
    }, 1000);
  };
  
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
            {sellerStore ? 'Manage Store' : 'Create Store'}
          </li>
        </ol>
      </nav>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h1 className="text-2xl font-bold">
            {sellerStore ? 'Manage Store' : 'Create Store'}
          </h1>
          <p className="text-neutral-600 mt-1">
            {sellerStore 
              ? 'Update your store information to attract more customers.' 
              : 'Set up your store to start selling products on GhanaMarket.'}
          </p>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue="store-info">
            <TabsList className="mb-6">
              <TabsTrigger value="store-info">Store Information</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="policies" disabled={!sellerStore}>
                Store Policies
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="store-info" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Store Name*
                  </label>
                  <Input
                    value={storeData.name}
                    onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                    placeholder="Enter your store name"
                    className={formErrors.name ? 'border-red-500' : ''}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                  <p className="mt-1 text-sm text-neutral-500">
                    This is how customers will identify your store.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Store Description*
                  </label>
                  <Textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                    placeholder="Describe your store and what you sell"
                    className={`min-h-32 ${formErrors.description ? 'border-red-500' : ''}`}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                  )}
                  <p className="mt-1 text-sm text-neutral-500">
                    A good description helps customers understand what you sell and why they should buy from you.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Store Category*
                  </label>
                  <select
                    value={storeData.category}
                    onChange={(e) => setStoreData({...storeData, category: e.target.value})}
                    className={`w-full p-2 border rounded-md ${formErrors.category ? 'border-red-500' : 'border-neutral-300'}`}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                  )}
                  <p className="mt-1 text-sm text-neutral-500">
                    This helps customers find your store when browsing by category.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="branding" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Store Logo
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <div 
                      className={`w-24 h-24 ${storeData.bgColor} rounded-lg flex items-center justify-center text-white font-bold text-2xl`}
                    >
                      {storeData.initials || ''}
                    </div>
                    
                    <div>
                      <Button type="button" variant="outline" className="mb-2">
                        Upload Logo
                      </Button>
                      <p className="text-sm text-neutral-500">
                        Recommended: 200x200px JPG or PNG
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Store Initials (if no logo)
                  </label>
                  <Input
                    value={storeData.initials}
                    onChange={(e) => setStoreData({...storeData, initials: e.target.value.substring(0, 2).toUpperCase()})}
                    placeholder="AT"
                    maxLength={2}
                    className="max-w-xs"
                  />
                  <p className="mt-1 text-sm text-neutral-500">
                    These initials will be displayed if you don't have a logo.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Brand Color
                  </label>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {['bg-primary', 'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600'].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full ${color} ${storeData.bgColor === color ? 'ring-2 ring-offset-2 ring-neutral-400' : ''}`}
                        onClick={() => setStoreData({...storeData, bgColor: color})}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    This color will be used for your store branding.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="policies" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Return Policy
                  </label>
                  <Textarea
                    placeholder="Enter your return policy"
                    className="min-h-32"
                  />
                  <p className="mt-1 text-sm text-neutral-500">
                    Clear return policies help build customer trust.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shipping Policy
                  </label>
                  <Textarea
                    placeholder="Enter your shipping policy"
                    className="min-h-32"
                  />
                  <p className="mt-1 text-sm text-neutral-500">
                    Explain your shipping methods, timeframes, and any applicable fees.
                  </p>
                </div>
              </TabsContent>
              
              <div className="mt-8 flex items-center justify-end gap-4 border-t border-neutral-200 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/seller-dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">
                        <i className="ri-loader-4-line"></i>
                      </span>
                      {sellerStore ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    sellerStore ? 'Update Store' : 'Create Store'
                  )}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ManageStorePage;