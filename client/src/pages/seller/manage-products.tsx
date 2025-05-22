import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/user-context';
import { Link, useLocation } from 'wouter';
import { products, categories, sellers } from '@/data';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';
import { Product, Category } from '@/types';

const ProductItem = ({ 
  product, 
  onEdit, 
  onDelete 
}: { 
  product: Product, 
  onEdit: (product: Product) => void, 
  onDelete: (productId: string) => void 
}) => {
  return (
    <div className="flex items-center border-b border-neutral-200 py-4">
      <div className="w-16 h-16 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{product.name}</h3>
        <div className="text-sm text-neutral-500">
          {product.category.name} • {product.stock} in stock
        </div>
        <div className="flex items-center mt-1">
          <span className="text-accent font-semibold">
            GH₵ {(product.discountPrice || product.price).toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-neutral-500 line-through ml-2">
              GH₵ {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const ManageProductsPage = () => {
  const { user, role } = useUserContext();
  const [, navigate] = useLocation();
  
  // Find the seller's store
  const sellerStore = sellers.find(s => s.id === user?.id);
  
  // Get all products belonging to this seller
  const sellerProducts = products.filter(p => p.seller.id === user?.id);
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(sellerProducts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state for adding/editing products
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    categoryId: '',
    featured: false
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect to seller dashboard if not a seller
    if (role !== 'seller') {
      navigate('/seller-dashboard');
    }
    
    document.title = 'Manage Products - GhanaMarket';
  }, [role, navigate]);
  
  // Reset form when editing status changes
  useEffect(() => {
    if (editingProduct) {
      setProductForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        discountPrice: editingProduct.discountPrice ? editingProduct.discountPrice.toString() : '',
        stock: editingProduct.stock.toString(),
        categoryId: editingProduct.category.id,
        featured: editingProduct.featured || false
      });
    } else {
      setProductForm({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        stock: '',
        categoryId: '',
        featured: false
      });
    }
  }, [editingProduct]);
  
  // Filter products when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(sellerProducts);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredProducts(
        sellerProducts.filter(
          product => 
            product.name.toLowerCase().includes(lowerSearch) ||
            product.description.toLowerCase().includes(lowerSearch) ||
            product.category.name.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, sellerProducts]);
  
  const validateForm = () => {
    const errors = {
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: ''
    };
    let isValid = true;
    
    if (!productForm.name.trim()) {
      errors.name = 'Product name is required';
      isValid = false;
    }
    
    if (!productForm.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    } else if (productForm.description.length < 10) {
      errors.description = 'Description should be at least 10 characters';
      isValid = false;
    }
    
    if (!productForm.price.trim()) {
      errors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(productForm.price)) || Number(productForm.price) <= 0) {
      errors.price = 'Price must be a positive number';
      isValid = false;
    }
    
    if (!productForm.stock.trim()) {
      errors.stock = 'Stock quantity is required';
      isValid = false;
    } else if (isNaN(Number(productForm.stock)) || Number(productForm.stock) < 0 || !Number.isInteger(Number(productForm.stock))) {
      errors.stock = 'Stock must be a non-negative integer';
      isValid = false;
    }
    
    if (!productForm.categoryId) {
      errors.categoryId = 'Category is required';
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
      if (editingProduct) {
        toast({
          title: "Product updated",
          description: `${productForm.name} has been updated successfully.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Product added",
          description: `${productForm.name} has been added to your store.`,
          duration: 3000,
        });
      }
      
      setIsSubmitting(false);
      setIsAddingProduct(false);
      setEditingProduct(null);
      
      // In a real app, we would send the product data to the API
      // Since we're using hardcoded data, we just reset the form
    }, 1000);
  };
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingProduct(true);
  };
  
  const handleDelete = (productId: string) => {
    // In a real app, we would call an API to delete the product
    // For this demo, we'll just show a toast
    toast({
      title: "Product deleted",
      description: "The product has been removed from your store.",
      duration: 3000,
    });
    
    // Filter out the deleted product from the UI
    setFilteredProducts(prevProducts => 
      prevProducts.filter(p => p.id !== productId)
    );
  };
  
  // Check if seller has a store
  // if (!sellerStore) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="bg-white rounded-lg shadow p-6 text-center">
  //         <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
  //           <i className="ri-store-2-line text-2xl text-neutral-400"></i>
  //         </div>
  //         <h1 className="text-2xl font-bold mb-4">Create Your Store First</h1>
  //         <p className="text-neutral-600 mb-6">
  //           You need to create a store before you can start adding products.
  //         </p>
  //         <Link href="/seller/manage-store" className="bg-primary text-white px-6 py-2 rounded-md">
  //           Create Store
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }
  
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
            Manage Products
          </li>
        </ol>
      </nav>
      
      {isAddingProduct ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-neutral-600 mt-1">
                {editingProduct 
                  ? 'Update your product information.' 
                  : 'Complete the form below to add a new product to your store.'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
            >
              <i className="ri-close-line text-xl"></i>
            </Button>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Product Name*
                  </label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    placeholder="Enter product name"
                    className={formErrors.name ? 'border-red-500' : ''}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Category*
                  </label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})}
                    className={`w-full p-2 border rounded-md ${formErrors.categoryId ? 'border-red-500' : 'border-neutral-300'}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.categoryId}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Price (GH₵)*
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    placeholder="0.00"
                    className={formErrors.price ? 'border-red-500' : ''}
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.price}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Discount Price (GH₵)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({...productForm, discountPrice: e.target.value})}
                    placeholder="Leave empty if no discount"
                  />
                  <p className="mt-1 text-sm text-neutral-500">
                    Optional. Leave empty if there's no discount.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Stock Quantity*
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    placeholder="0"
                    className={formErrors.stock ? 'border-red-500' : ''}
                  />
                  {formErrors.stock && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.stock}</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-neutral-700 mb-1">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                      className="rounded border-neutral-300"
                    />
                    <span>Featured Product</span>
                  </label>
                  <p className="mt-1 text-sm text-neutral-500">
                    Featured products appear at the top of search results and category pages.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Description*
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  placeholder="Describe your product in detail"
                  className={`w-full p-2 border rounded-md min-h-32 ${formErrors.description ? 'border-red-500' : 'border-neutral-300'}`}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-md p-6 text-center">
                  <div className="space-y-1 text-center">
                    <i className="ri-upload-2-line text-3xl text-neutral-400"></i>
                    <div className="flex text-sm text-neutral-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500">
                      PNG, JPG, GIF up to 5MB (max. 5 images)
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-500">
                  The first image will be used as the product thumbnail.
                </p>
              </div>
              
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
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
                      {editingProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingProduct ? 'Update Product' : 'Add Product'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-neutral-600 mt-1">
                Manage your product listings for {sellerStore?.name}
              </p>
            </div>
            <Button onClick={() => setIsAddingProduct(true)}>
              <i className="ri-add-line mr-1"></i> Add New Product
            </Button>
          </div>
          
          <div className="p-4 border-b border-neutral-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <i className="ri-search-line"></i>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-shopping-bag-line text-2xl text-neutral-400"></i>
                </div>
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                {searchTerm ? (
                  <p className="text-neutral-500 mb-6">
                    No products match your search criteria.
                  </p>
                ) : (
                  <p className="text-neutral-500 mb-6">
                    You haven't added any products to your store yet.
                  </p>
                )}
                {!searchTerm && (
                  <Button onClick={() => setIsAddingProduct(true)}>
                    <i className="ri-add-line mr-1"></i> Add Your First Product
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {filteredProducts.map(product => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
            Showing {filteredProducts.length} of {sellerProducts.length} products
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProductsPage;