import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type BlendTextProps = {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    threshold?: number;
    rootMargin?: string;
    onAnimationComplete?: () => void;
};

const BlendText: React.FC<BlendTextProps> = ({
    text,
    className = '',
    delay = 0,
    duration = 0.8,
    threshold = 0.1,
    rootMargin = '0px',
    onAnimationComplete,
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current as Element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const words = text.split(' ');

    return (
        <div ref={ref} className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-2">
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            className="inline-block"
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(8px)',
                                rotateX: 90,
                                transformOrigin: 'center bottom',
                                color: 'transparent',
                            }}
                            animate={
                                inView
                                    ? {
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px)',
                                        rotateX: 0,
                                        color: 'inherit',
                                    }
                                    : {
                                        opacity: 0,
                                        y: 20,
                                        filter: 'blur(8px)',
                                        rotateX: 90,
                                        color: 'transparent',
                                    }
                            }
                            transition={{
                                duration,
                                delay: delay + (wordIndex * 0.1) + (charIndex * 0.02),
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            onAnimationComplete={
                                wordIndex === words.length - 1 && charIndex === word.length - 1
                                    ? onAnimationComplete
                                    : undefined
                            }
                            style={{
                                perspective: '1000px',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </div>
    );
};

export default BlendText;
