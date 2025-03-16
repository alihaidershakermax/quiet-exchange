
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const { rtl } = useLanguage();
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen",
      rtl && "font-arabic"
    )}
    dir={rtl ? "rtl" : "ltr"}
    >
      <Header />
      
      <main className={cn(
        "flex-grow py-6 px-4 md:px-6",
        "bg-gradient-to-br from-background to-whisper-light/20",
        "transition-all duration-500 ease-in-out"
      )}>
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
