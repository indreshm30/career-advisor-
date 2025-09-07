import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import BlendText from './BlendText';
import Threads from './Threads';

export const HeroSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleAnimationComplete = () => {
    console.log('Hero animation completed!');
  };

  const kpiData = [
    { icon: Users, label: '500+ Career Paths', value: '500+' },
    { icon: BookOpen, label: 'Learning Resources', value: '10K+' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%' },
  ];

  return (
    <section id="hero" className="section relative overflow-hidden pt-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-light/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Threads Animation Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-60">
        <Threads
          amplitude={1.5}
          distance={0.2}
          enableMouseInteraction={true}
          color={[0.2, 0.8, 0.4]} // Green theme color
        />
      </div>

      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <BlendText
              text="Your Career Guide"
              delay={0.3}
              duration={0.8}
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BlendText
              text="Get personalized career paths, skill insights, and learning roadmaps tailored to your goals and market trends"
              delay={0.8}
              duration={0.6}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="magnetic-btn bg-primary hover:bg-primary-light text-primary-foreground px-8 py-6 text-lg animate-glow-pulse"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="magnetic-btn border-2 border-primary/20 hover:border-primary/40 px-8 py-6 text-lg"
            >
              Explore Careers
            </Button>
          </motion.div>

          {/* KPI Strip */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                className="float-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <kpi.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {kpi.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-primary-light/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};