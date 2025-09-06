import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Trophy,
  PlayCircle,
  FileText,
  Code,
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

const learningPath = [
  {
    id: 1,
    title: 'Foundations',
    duration: '4-6 weeks',
    status: 'completed',
    description: 'Master the basics and core concepts',
    tasks: [
      { name: 'JavaScript Fundamentals', type: 'video', duration: '12h', completed: true },
      { name: 'ES6+ Features Deep Dive', type: 'course', duration: '8h', completed: true },
      { name: 'DOM Manipulation Practice', type: 'project', duration: '6h', completed: true },
      { name: 'Async JavaScript & Promises', type: 'tutorial', duration: '4h', completed: true },
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    id: 2,
    title: 'Core Technologies',
    duration: '6-8 weeks',
    status: 'current',
    description: 'Learn framework fundamentals and tooling',
    tasks: [
      { name: 'React Components & JSX', type: 'course', duration: '10h', completed: true },
      { name: 'State Management with Redux', type: 'tutorial', duration: '8h', completed: true },
      { name: 'Build a Todo App', type: 'project', duration: '12h', completed: false },
      { name: 'Testing with Jest & RTL', type: 'course', duration: '6h', completed: false },
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    title: 'Advanced Concepts',
    duration: '8-10 weeks',
    status: 'upcoming',
    description: 'Performance optimization and advanced patterns',
    tasks: [
      { name: 'Advanced React Patterns', type: 'course', duration: '15h', completed: false },
      { name: 'Performance Optimization', type: 'tutorial', duration: '8h', completed: false },
      { name: 'Build a Dashboard App', type: 'project', duration: '20h', completed: false },
      { name: 'TypeScript Integration', type: 'course', duration: '12h', completed: false },
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    title: 'Professional Projects',
    duration: '10-12 weeks',
    status: 'upcoming',
    description: 'Portfolio projects and interview preparation',
    tasks: [
      { name: 'Full-Stack E-commerce App', type: 'project', duration: '40h', completed: false },
      { name: 'Code Review & Best Practices', type: 'tutorial', duration: '6h', completed: false },
      { name: 'Technical Interview Prep', type: 'course', duration: '15h', completed: false },
      { name: 'Portfolio Website', type: 'project', duration: '12h', completed: false },
    ],
    color: 'from-orange-500 to-orange-600',
  },
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'video': return PlayCircle;
    case 'course': return BookOpen;
    case 'tutorial': return FileText;
    case 'project': return Code;
    default: return BookOpen;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-500 bg-green-500/10';
    case 'current': return 'text-blue-500 bg-blue-500/10';
    case 'upcoming': return 'text-muted-foreground bg-muted';
    default: return 'text-muted-foreground bg-muted';
  }
};

export const LearningPathSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(2);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section id="learning-path" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />

      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Your <span className="text-gradient">Learning Roadmap</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Structured learning path with milestones, projects, and skill validation
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Overview */}
          <motion.div
            className="glass rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Overall Progress</h3>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Level 2 Developer</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>32%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '32%' } : {}}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                12/37 tasks completed
              </div>
            </div>
          </motion.div>

          {/* Learning Path Cards */}
          <div className="space-y-4">
            {learningPath.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                {/* Card Header */}
                <div
                  className="p-6 cursor-pointer transition-colors hover:bg-white/5"
                  onClick={() => toggleCard(stage.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Stage Number */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white font-bold`}>
                        {stage.id}
                      </div>

                      {/* Stage Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-semibold">{stage.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                            {stage.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{stage.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {stage.duration}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stage.tasks.filter(t => t.completed).length}/{stage.tasks.length} tasks
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedCard === stage.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCard === stage.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="p-6 space-y-4">
                        {stage.tasks.map((task, taskIndex) => {
                          const TaskIcon = getTaskIcon(task.type);
                          return (
                            <motion.div
                              key={task.name}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: taskIndex * 0.1 }}
                            >
                              {/* Completion Status */}
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${task.completed
                                  ? 'bg-green-500 text-white'
                                  : 'border-2 border-muted'
                                }`}>
                                {task.completed && <CheckCircle className="h-4 w-4" />}
                              </div>

                              {/* Task Icon */}
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                                <TaskIcon className="h-4 w-4 text-white" />
                              </div>

                              {/* Task Details */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {task.name}
                                  </span>
                                  <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                                    {task.type}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Duration: {task.duration}
                                </div>
                              </div>

                              {/* Action Button */}
                              {!task.completed && stage.status === 'current' && (
                                <Button size="sm" className="magnetic-btn">
                                  <Zap className="h-4 w-4 mr-2" />
                                  Start
                                </Button>
                              )}
                            </motion.div>
                          );
                        })}

                        {/* Stage Completion Reward */}
                        {stage.status === 'completed' && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20">
                            <div className="flex items-center gap-3">
                              <Award className="h-6 w-6 text-green-500" />
                              <div>
                                <div className="font-medium text-green-500">Stage Completed!</div>
                                <div className="text-sm text-muted-foreground">
                                  Earned: Foundation Developer Badge
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button size="lg" className="magnetic-btn bg-primary hover:bg-primary-light px-8">
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning Journey
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};