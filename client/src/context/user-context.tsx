import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: any;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (isOpen: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Demo users for all roles
const demoUsers: Record<string, User> = {
  'user@example.com': {
    id: '1',
    name: 'Demo Buyer',
    email: 'user@example.com',
    phone: '+233 20 123 4567',
    role: 'seller'
  },
  'seller@example.com': {
    id: '2',
    name: 'Demo Seller',
    email: 'seller@example.com',
    phone: '+233 20 123 4568',
    role: 'seller'
  },
  'delivery@example.com': {
    id: '3',
    name: 'Demo Delivery',
    email: 'delivery@example.com',
    phone: '+233 20 123 4569',
    role: 'delivery'
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('buyer'); // Default role
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('userRole');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Use the role from the saved user
        if (parsedUser.role) {
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    } else if (savedRole && (savedRole === 'buyer' || savedRole === 'seller' || savedRole === 'delivery')) {
      // If no user but role exists, just set the role
      setRole(savedRole as UserRole);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      
      // Update user in localStorage
      if (isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (password === 'password' && demoUsers[email]) {
      const loggedInUser = demoUsers[email];
      setUser(loggedInUser);
      setRole(loggedInUser.role); // Set the correct role
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('userRole', loggedInUser.role);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    // Keep the role in localStorage for UX purposes
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      role,
      switchRole,
      isRoleModalOpen,
      setIsRoleModalOpen,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
