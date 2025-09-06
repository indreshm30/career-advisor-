import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface CardSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export const CardSection = ({ children, className = '', delay = 0, id }: CardSectionProps) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section
            id={id}
            ref={ref}
            className={`h-screen relative flex items-center justify-center ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: delay
                }}
                className="w-full max-w-7xl mx-auto px-4"
            >
                {children}
            </motion.div>
        </section>
    );
};
