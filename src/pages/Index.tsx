
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Shield, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text animate-float">
            Anonymous Messaging Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share thoughts, feedback, and connect anonymously with secure messaging.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/messages">
              <Button size="lg" className="bg-gradient-whisper hover:opacity-90">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Messages
              </Button>
            </Link>
            {currentUser ? (
              <Link to="/profile">
                <Button size="lg" variant="outline">
                  <User className="mr-2 h-5 w-5" />
                  View Profile
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" variant="outline">
                  <User className="mr-2 h-5 w-5" />
                  Sign Up Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm rounded-2xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our platform provides a secure and intuitive way to communicate anonymously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-whisper-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <MessageSquare className="h-6 w-6 text-whisper-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Anonymous Messaging</h3>
            <p className="text-muted-foreground text-center">
              Send and receive messages without revealing your identity. Perfect for honest feedback.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-whisper-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="h-6 w-6 text-whisper-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">User Profiles</h3>
            <p className="text-muted-foreground text-center">
              Customizable profiles for students, administrators, and platform owners.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-whisper-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-whisper-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Secure Platform</h3>
            <p className="text-muted-foreground text-center">
              Built with security in mind. Your privacy is our top priority.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 mb-8">
        <div className="bg-gradient-whisper rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our community today and experience the freedom of anonymous communication.
          </p>
          <Link to={currentUser ? "/messages" : "/register"}>
            <Button size="lg" variant="secondary" className="bg-white text-whisper-primary hover:bg-gray-100">
              {currentUser ? "Send a Message" : "Create Your Account"}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Developed By</h2>
        <p className="text-xl font-medium gradient-text mb-2">Ali Al-Akbar Haider Shaker</p>
        <p className="text-muted-foreground">
          Creating innovative solutions for modern communication
        </p>
      </section>
    </Layout>
  );
};

export default Index;
