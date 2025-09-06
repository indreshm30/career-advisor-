import { motion } from 'framer-motion';
import { User, MapPin, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { CardSection } from './CardSection';

const steps = [
  {
    icon: User,
    title: 'Create Your Profile',
    description: 'Tell us about your background, interests, and career goals',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: MapPin,
    title: 'Skill Mapping',
    description: 'AI analyzes your current skills and identifies gaps',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Target,
    title: 'Career Matching',
    description: 'Get personalized career paths based on market demand',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: BookOpen,
    title: 'Learning Plan',
    description: 'Receive a customized roadmap with resources and milestones',
    color: 'from-orange-500 to-orange-600',
  },
];

export const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <CardSection id="how-it-works" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />

      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            How It <span className="text-gradient">Works</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Four simple steps to transform your career journey with AI-powered insights
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 z-0" />
              )}

              {/* Step Card */}
              <motion.div
                className="float-card text-center relative z-10 h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Elements */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="glass rounded-full inline-flex items-center px-6 py-3 text-sm text-muted-foreground">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            AI processes over 1M+ job market data points daily
          </div>
        </motion.div>
      </div>
    </CardSection>
  );
};