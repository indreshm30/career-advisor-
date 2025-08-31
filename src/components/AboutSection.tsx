import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Users, 
  Award, 
  ChevronDown, 
  CheckCircle, 
  Lock,
  Database,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useInView } from 'react-intersection-observer';

const trustBadges = [
  { icon: Shield, label: 'SOC 2 Compliant', description: 'Enterprise-grade security' },
  { icon: Lock, label: 'Data Encrypted', description: 'End-to-end encryption' },
  { icon: Database, label: 'GDPR Compliant', description: 'Privacy protection' },
  { icon: Award, label: 'ISO Certified', description: 'Quality assurance' },
];

const faqs = [
  {
    question: "How does the AI career advisor work?",
    answer: "Our AI analyzes your skills, experience, and career goals against millions of job market data points. It uses machine learning algorithms to identify the best career paths, skill gaps, and personalized learning recommendations based on current market trends and demand."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and follow strict data protection protocols. Your information is never shared with third parties without explicit consent, and you have full control over your data privacy settings."
  },
  {
    question: "How accurate are the salary predictions?",
    answer: "Our salary data is sourced from verified job postings, industry reports, and real-time market analysis. We update our models weekly and achieve 85%+ accuracy in salary predictions, with regional adjustments for cost of living."
  },
  {
    question: "Can I use this for career changes?",
    answer: "Yes! Our AI specializes in career transition guidance. It identifies transferable skills, suggests bridge roles, and creates customized learning paths to help you transition smoothly into your target career."
  },
  {
    question: "What makes this different from other career tools?",
    answer: "Unlike static career tests, our AI provides dynamic, personalized recommendations that evolve with market conditions. We combine real-time job market data with your unique profile to deliver actionable insights and continuously updated guidance."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the insights and recommendations provided, we'll refund your subscription fee, no questions asked."
  }
];

export const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="about" className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-transparent" />
      
      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Our <span className="text-gradient">AI Platform</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Built by career experts and data scientists to democratize personalized career guidance 
            using cutting-edge AI and real-time market intelligence
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Mission Statement */}
          <motion.div
            className="glass-strong rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe everyone deserves access to personalized career guidance. Our AI-powered platform 
                  democratizes career counseling by providing instant, data-driven insights that were previously 
                  available only to those who could afford expensive career coaches.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By analyzing millions of career trajectories and market trends, we help you make informed 
                  decisions about your professional future, identify the most valuable skills to learn, and 
                  create actionable roadmaps for career success.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How It Works - Technical Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold">How Our AI Works</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Data Collection & Analysis",
                    description: "We analyze 1M+ job postings daily, salary reports, skill requirements, and industry trends from verified sources."
                  },
                  {
                    title: "Machine Learning Models",
                    description: "Our ML algorithms identify patterns in successful career transitions and predict market demand for specific skills."
                  },
                  {
                    title: "Personalization Engine",
                    description: "Your unique profile is matched against our knowledge base to generate tailored recommendations and learning paths."
                  },
                  {
                    title: "Continuous Learning",
                    description: "Our models continuously improve with new data, ensuring recommendations stay current with market changes."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold">Key Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1M+', label: 'Job Postings Analyzed Daily' },
                  { value: '500+', label: 'Career Paths Mapped' },
                  { value: '94%', label: 'User Success Rate' },
                  { value: '50K+', label: 'Professionals Guided' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass rounded-xl p-4 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Explainability Note */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Transparent AI</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  We believe in explainable AI. Every recommendation comes with clear reasoning, 
                  data sources, and confidence levels so you understand why we suggest specific paths.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-center">Security & Compliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  className="glass rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <badge.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-sm mb-1">{badge.label}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="glass rounded-xl border-0">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          {/* Team Note */}
          <motion.div
            className="text-center glass rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Built by Career Experts</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team combines decades of experience in career counseling, data science, and AI 
              to create the most comprehensive career guidance platform available today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};