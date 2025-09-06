import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileDropdownProps {
    onProfileClick?: () => void;
    onLogoutClick?: () => void;
}

export const UserProfileDropdown = ({ onProfileClick, onLogoutClick }: UserProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileClick = () => {
        console.log('Navigate to profile...');
        onProfileClick?.();
        setIsOpen(false);
    };

    const handleLogoutClick = () => {
        console.log('Logging out...');
        onLogoutClick?.();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="magnetic-btn flex items-center space-x-2 p-2"
            >
                <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                        <User className="w-4 h-4" />
                    </AvatarFallback>
                </Avatar>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                            className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-lg p-2 z-20"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <div className="flex items-center space-x-3 p-3 border-b border-border">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        <User className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-foreground">John Doe</p>
                                    <p className="text-sm text-muted-foreground">john@example.com</p>
                                </div>
                            </div>

                            <div className="py-2">
                                <Button
                                    variant="ghost"
                                    onClick={handleProfileClick}
                                    className="w-full justify-start text-foreground hover:bg-primary/10"
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    Your Profile
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full justify-start text-foreground hover:bg-primary/10"
                                >
                                    <Settings className="w-4 h-4 mr-3" />
                                    Settings
                                </Button>

                                <div className="border-t border-border my-2" />

                                <Button
                                    variant="ghost"
                                    onClick={handleLogoutClick}
                                    className="w-full justify-start text-destructive hover:bg-destructive/10"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
