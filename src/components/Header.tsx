
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/context/NotificationContext';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import {
  Bell,
  User,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Users,
  Settings,
  Home
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { t, rtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-whisper-primary" />
          <span className="font-bold text-xl gradient-text">{t.appName}</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-whisper-primary transition-colors">
            {t.home}
          </Link>
          <Link to="/messages" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-whisper-primary transition-colors">
            {t.messages}
          </Link>
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'owner') && (
            <Link to="/admin" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-whisper-primary transition-colors">
              {t.dashboard}
            </Link>
          )}
        </nav>

        {/* User Menu - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageToggle />
          
          {currentUser ? (
            <>
              {/* Notification Bell */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-whisper-primary">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t.notifications}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/notifications">{t.notifications}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                      <AvatarFallback className="bg-whisper-primary text-white">
                        {currentUser.displayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={rtl ? "start" : "end"} className="w-56">
                  <DropdownMenuLabel>{currentUser.displayName}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {t[currentUser.role as keyof typeof t]}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t.profile}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">{t.login}</Button>
              </Link>
              <Link to="/register">
                <Button>{t.register}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="p-2">
              <LanguageToggle />
            </div>
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-whisper-light hover:text-whisper-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4" /> {t.home}
              </div>
            </Link>
            <Link 
              to="/messages" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-whisper-light hover:text-whisper-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> {t.messages}
              </div>
            </Link>
            {currentUser && (
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-whisper-light hover:text-whisper-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> {t.profile}
                </div>
              </Link>
            )}
            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'owner') && (
              <Link 
                to="/admin" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-whisper-light hover:text-whisper-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" /> {t.dashboard}
                </div>
              </Link>
            )}
            {currentUser && (
              <button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} 
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> {t.logout}
                </div>
              </button>
            )}
            {!currentUser && (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-whisper-light hover:text-whisper-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.login}
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-whisper-primary text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.register}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
