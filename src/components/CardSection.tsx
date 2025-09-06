import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface CardSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const CardSection = ({ children, className = '', delay = 0 }: CardSectionProps) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: delay
            }}
            className={`section relative ${className}`}
            style={{
                boxShadow: inView ? '0 20px 40px -12px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)',
                transition: 'box-shadow 0.6s ease-out'
            }}
        >
            {children}
        </motion.section>
    );
};
