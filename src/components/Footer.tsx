
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background/90 backdrop-blur-md border-t py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl gradient-text">Whisper</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              A modern anonymous messaging platform. Share your thoughts freely and securely.
            </p>
            <div className="flex items-center mt-4">
              <span className="text-sm text-muted-foreground">Developed with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span className="text-sm font-medium">by Ali Al-Akbar Haider Shaker</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium text-base mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback?<br />
              <a href="mailto:contact@whisper.com" className="text-whisper-primary hover:underline">
                contact@whisper.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Whisper. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-center md:text-right text-muted-foreground">
              <span className="font-medium text-foreground">Designed & Developed by:</span><br />
              Ali Al-Akbar Haider Shaker
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
