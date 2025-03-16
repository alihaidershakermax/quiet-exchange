
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, displayName: string, password: string, role: UserRole) => Promise<void>;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'student1',
    displayName: 'Student User',
    role: 'student',
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'admin1',
    displayName: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: '3',
    username: 'owner1',
    displayName: 'Owner User',
    role: 'owner',
    createdAt: new Date(),
  },
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('whisper_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('whisper_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication
      const user = mockUsers.find(u => u.username === username);
      
      if (user) {
        // In a real app, you would validate the password here
        setCurrentUser(user);
        localStorage.setItem('whisper_user', JSON.stringify(user));
        toast.success(`Welcome back, ${user.displayName}!`);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed: ' + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, displayName: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Check if username already exists
      if (mockUsers.some(u => u.username === username)) {
        throw new Error('Username already taken');
      }

      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        username,
        displayName,
        role,
        createdAt: new Date(),
      };

      mockUsers.push(newUser);
      setCurrentUser(newUser);
      localStorage.setItem('whisper_user', JSON.stringify(newUser));
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed: ' + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('whisper_user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
