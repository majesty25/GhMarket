import { useUserContext } from '@/context/user-context';
import { UserRole } from '@/types';

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoleSwitchModal = ({ isOpen, onClose }: RoleSwitchModalProps) => {
  const { role, switchRole } = useUserContext();

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="font-bold font-poppins">Switch Role</h3>
          <button className="text-neutral-500 hover:text-neutral-700" onClick={onClose}>
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                role === 'buyer' 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border border-neutral-200 hover:bg-neutral-50'
              } text-left`}
              onClick={() => handleRoleChange('buyer')}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                role === 'buyer' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <i className="ri-user-line"></i>
              </div>
              <div>
                <div className="font-medium">Buyer</div>
                <div className="text-sm text-neutral-500">Shop and purchase products</div>
              </div>
            </button>
            
            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                role === 'seller' 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border border-neutral-200 hover:bg-neutral-50'
              } text-left`}
              onClick={() => handleRoleChange('seller')}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                role === 'seller' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <i className="ri-store-2-line"></i>
              </div>
              <div>
                <div className="font-medium">Seller</div>
                <div className="text-sm text-neutral-500">Manage your store and products</div>
              </div>
            </button>
            
            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                role === 'delivery' 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border border-neutral-200 hover:bg-neutral-50'
              } text-left`}
              onClick={() => handleRoleChange('delivery')}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                role === 'delivery' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <i className="ri-truck-line"></i>
              </div>
              <div>
                <div className="font-medium">Delivery Agent</div>
                <div className="text-sm text-neutral-500">Deliver orders and earn money</div>
              </div>
            </button>

            <button 
              className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                role === 'admin' 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border border-neutral-200 hover:bg-neutral-50'
              } text-left`}
              onClick={() => handleRoleChange('admin')}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                role === 'admin' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <i className="ri-admin-line"></i>
              </div>
              <div>
                <div className="font-medium">Admin</div>
                <div className="text-sm text-neutral-500">Monitor and manage system activities</div>
              </div>
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-neutral-200 flex justify-end">
          <button 
            className="bg-primary text-white px-4 py-2 rounded font-medium"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitchModal;
