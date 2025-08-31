import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Palette, Shield, Cloud, Briefcase, Search, Filter, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';

const careerPaths = [
  {
    id: 1,
    title: 'Software Engineer',
    domain: 'Software',
    icon: Code,
    description: 'Build scalable applications and systems',
    demand: 'High',
    salary: '$95K - $180K',
    timeToReady: '6-12 months',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Data Scientist',
    domain: 'Data',
    icon: Database,
    description: 'Extract insights from complex datasets',
    demand: 'Very High',
    salary: '$110K - $200K',
    timeToReady: '8-18 months',
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 3,
    title: 'UX Designer',
    domain: 'Design',
    icon: Palette,
    description: 'Create intuitive user experiences',
    demand: 'High',
    salary: '$85K - $150K',
    timeToReady: '4-10 months',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    title: 'Cybersecurity Analyst',
    domain: 'Cyber',
    icon: Shield,
    description: 'Protect systems from security threats',
    demand: 'Very High',
    salary: '$100K - $170K',
    timeToReady: '6-14 months',
    skills: ['Network Security', 'Incident Response', 'Risk Assessment', 'Compliance'],
    color: 'from-red-500 to-red-600',
  },
  {
    id: 5,
    title: 'Cloud Architect',
    domain: 'Cloud',
    icon: Cloud,
    description: 'Design scalable cloud infrastructure',
    demand: 'Very High',
    salary: '$120K - $220K',
    timeToReady: '12-24 months',
    skills: ['AWS', 'Kubernetes', 'DevOps', 'Terraform'],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 6,
    title: 'Product Manager',
    domain: 'Product',
    icon: Briefcase,
    description: 'Drive product strategy and development',
    demand: 'High',
    salary: '$105K - $190K',
    timeToReady: '8-16 months',
    skills: ['Product Strategy', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    color: 'from-orange-500 to-orange-600',
  },
];

const domains = ['All', 'Software', 'Data', 'Design', 'Cyber', 'Cloud', 'Product'];

export const CareerPathsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const filteredPaths = careerPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || path.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-green-500';
      case 'High': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section id="career-paths" className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
      
      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Explore <span className="text-gradient">Career Paths</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover in-demand careers with AI-powered insights on market trends and salary expectations
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <Button
                key={domain}
                variant={selectedDomain === domain ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDomain(domain)}
                className="magnetic-btn"
              >
                <Filter className="h-4 w-4 mr-2" />
                {domain}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPaths.map((path, index) => (
              <motion.div
                key={path.id}
                className="float-card cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCard(selectedCard === path.id ? null : path.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${path.color}`} />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-3`}>
                    <path.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(path.demand)} bg-current/10`}>
                    {path.demand} Demand
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {path.description}
                </p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-muted-foreground">{path.salary}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-muted-foreground">{path.timeToReady}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {path.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {path.skills.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{path.skills.length - 2} more
                    </span>
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedCard === path.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border pt-4 mt-4"
                    >
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {path.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button size="sm" className="w-full magnetic-btn">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Learning Path
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPaths.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground">
              No career paths found matching your criteria
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};