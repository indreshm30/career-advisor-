import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Lenis from 'lenis';

interface PageTransitionProps {
  children: React.ReactNode[];
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {children.map((child, index) => (
        <PageWrapper key={index} index={index}>
          {child}
        </PageWrapper>
      ))}
    </main>
  );
};

interface PageWrapperProps {
  children: React.ReactNode;
  index: number;
}

const PageWrapper = ({ children, index }: PageWrapperProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1
        }
      }}
      viewport={{ 
        once: false, 
        amount: 0.2,
        margin: "-100px 0px -100px 0px"
      }}
    >
      {children}
    </motion.div>
  );
};