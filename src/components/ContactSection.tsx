import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, CheckCircle, Mail, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useInView } from 'react-intersection-observer';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', interest: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="section-content relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Start Your <span className="text-gradient">Career Journey</span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to transform your career? Get personalized guidance from our AI advisor
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <motion.div
              className="glass-strong rounded-2xl p-8"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 glass"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 glass"
                        required
                      />
                    </div>
                    <Input
                      name="interest"
                      placeholder="Career Interest (e.g., Software Engineering)"
                      value={formData.interest}
                      onChange={handleChange}
                      className="glass"
                      required
                    />
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Textarea
                        name="message"
                        placeholder="Tell us about your career goals and background..."
                        value={formData.message}
                        onChange={handleChange}
                        className="pl-10 glass min-h-[120px] resize-none"
                        rows={4}
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full magnetic-btn bg-primary hover:bg-primary-light text-primary-foreground py-6 text-lg relative overflow-hidden"
                    >
                      <motion.div
                        className="flex items-center justify-center"
                        whileHover={{ x: 5 }}
                      >
                        Get Started
                        <Send className="ml-2 h-5 w-5" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <CheckCircle className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your information and will get back to you soon.
                  </p>
                  <motion.div
                    className="mt-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-6 w-6 text-primary mx-auto" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Why Choose Our AI Career Advisor?</h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Personalized Insights",
                      description: "AI analyzes your unique profile for tailored recommendations"
                    },
                    {
                      title: "Market Intelligence",
                      description: "Real-time data on job trends, salaries, and skill demands"
                    },
                    {
                      title: "Actionable Roadmaps",
                      description: "Step-by-step learning paths with resources and milestones"
                    },
                    {
                      title: "Continuous Support",
                      description: "Ongoing guidance as you progress in your career journey"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">94%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Users who followed our AI recommendations achieved their career goals
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};