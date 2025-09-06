import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
    onClick: () => void;
}

export const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
    const handleClick = () => {
        console.log('FloatingChatButton clicked!'); // Debug log
        onClick();
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 300,
                    delay: 1,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={handleClick}
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground animate-glow-pulse relative"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <MessageCircle className="w-6 h-6" />
                    </motion.div>
                </Button>

                {/* Pulse animation */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30 pointer-events-none"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>
        </div>
    );
};
