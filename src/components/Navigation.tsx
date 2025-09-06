import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './UserProfileDropdown';

const navigationItems = [
  { id: 'hero', label: 'Home' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'career-paths', label: 'Career Paths' },
  { id: 'skill-analysis', label: 'Skills' },
  { id: 'learning-path', label: 'Learning' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact' },
];

interface NavigationProps {
  onChatOpen?: () => void;
  onChatClose?: () => void;
  isChatOpen?: boolean;
}

export const Navigation = ({ onChatOpen, onChatClose, isChatOpen }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle visibility based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near the top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      // Handle active section highlighting
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  const handleProfileClick = () => {
    // For now, just show an alert. You can replace this with actual navigation
    alert('Profile page coming soon!');
  };

  const handleLogoutClick = () => {
    // For now, just show confirmation. You can replace this with actual logout logic
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  const handleChatToggle = () => {
    if (isChatOpen) {
      onChatClose?.();
    } else {
      onChatOpen?.();
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: isVisible ? 0 : -100
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Career AI
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`magnetic-btn ${activeSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </Button>
            ))}

            {/* Chat Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChatToggle}
              className={`magnetic-btn ml-2 ${isChatOpen
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>

          {/* Theme Toggle, User Profile & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="magnetic-btn"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Profile Dropdown */}
            <div className="hidden md:block">
              <UserProfileDropdown
                onProfileClick={handleProfileClick}
                onLogoutClick={handleLogoutClick}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden magnetic-btn"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <motion.div
            className="md:hidden mt-4 p-4 glass rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className={`justify-start ${activeSection === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </Button>
              ))}

              {/* Mobile Chat Button */}
              <Button
                variant="ghost"
                onClick={handleChatToggle}
                className={`justify-start ${isChatOpen
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground'
                  }`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>

              {/* Mobile User Profile */}
              <div className="border-t border-border pt-2 mt-2">
                <UserProfileDropdown
                  onProfileClick={handleProfileClick}
                  onLogoutClick={handleLogoutClick}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};