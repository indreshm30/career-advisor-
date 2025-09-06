import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Filter,
  Star,
  Clock,
  DollarSign,
  Bookmark,
  Search,
  Youtube,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';

const resources = [
  {
    id: 1,
    title: 'Complete JavaScript Course',
    type: 'course',
    provider: 'Udemy',
    rating: 4.8,
    duration: '52 hours',
    price: 'Paid',
    level: 'Beginner',
    description: 'Master JavaScript with projects, challenges and theory',
    tags: ['JavaScript', 'Web Development', 'Programming'],
    color: 'from-yellow-500 to-yellow-600',
    icon: GraduationCap,
  },
  {
    id: 2,
    title: 'React Official Documentation',
    type: 'documentation',
    provider: 'React Team',
    rating: 4.9,
    duration: 'Self-paced',
    price: 'Free',
    level: 'All Levels',
    description: 'Comprehensive guide to React concepts and patterns',
    tags: ['React', 'Frontend', 'Documentation'],
    color: 'from-blue-500 to-blue-600',
    icon: FileText,
  },
  {
    id: 3,
    title: 'JavaScript Mastery Channel',
    type: 'video',
    provider: 'YouTube',
    rating: 4.7,
    duration: '100+ videos',
    price: 'Free',
    level: 'Intermediate',
    description: 'Modern JavaScript tutorials and project walkthroughs',
    tags: ['JavaScript', 'Projects', 'Modern JS'],
    color: 'from-red-500 to-red-600',
    icon: Youtube,
  },
  {
    id: 4,
    title: 'You Don\'t Know JS Book Series',
    type: 'book',
    provider: 'Kyle Simpson',
    rating: 4.6,
    duration: '6 books',
    price: 'Free',
    level: 'Advanced',
    description: 'Deep dive into JavaScript core mechanisms',
    tags: ['JavaScript', 'Advanced', 'Concepts'],
    color: 'from-green-500 to-green-600',
    icon: BookOpen,
  },
  {
    id: 5,
    title: 'freeCodeCamp Full Stack',
    type: 'course',
    provider: 'freeCodeCamp',
    rating: 4.8,
    duration: '300 hours',
    price: 'Free',
    level: 'All Levels',
    description: 'Complete web development curriculum with certificates',
    tags: ['Full Stack', 'Certificates', 'Projects'],
    color: 'from-purple-500 to-purple-600',
    icon: GraduationCap,
  },
  {
    id: 6,
    title: 'MDN Web Docs',
    type: 'documentation',
    provider: 'Mozilla',
    rating: 4.9,
    duration: 'Reference',
    price: 'Free',
    level: 'All Levels',
    description: 'Definitive resource for web technologies',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web APIs'],
    color: 'from-indigo-500 to-indigo-600',
    icon: FileText,
  },
];

const filters = {
  type: ['All', 'course', 'video', 'book', 'documentation'],
  price: ['All', 'Free', 'Paid'],
  level: ['All', 'Beginner', 'Intermediate', 'Advanced'],
};

export const ResourcesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: 'All',
    price: 'All',
    level: 'All',
  });
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = activeFilters.type === 'All' || resource.type === activeFilters.type;
    const matchesPrice = activeFilters.price === 'All' || resource.price === activeFilters.price;
    const matchesLevel = activeFilters.level === 'All' || resource.level === activeFilters.level;

    return matchesSearch && matchesType && matchesPrice && matchesLevel;
  });

  const toggleBookmark = (resourceId: number) => {
    setBookmarkedItems(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return GraduationCap;
      case 'video': return Video;
      case 'book': return BookOpen;
      case 'documentation': return FileText;
      default: return BookOpen;
    }
  };

  return (
    <section id="resources" className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent" />

      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Learning <span className="text-gradient">Resources</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Curated collection of courses, books, videos, and documentation to accelerate your learning
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <motion.div
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {Object.entries(filters).map(([filterType, options]) => (
                <div key={filterType} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground capitalize">{filterType}:</span>
                  <div className="flex gap-1">
                    {options.map((option) => (
                      <Button
                        key={option}
                        variant={activeFilters[filterType as keyof typeof activeFilters] === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilters({
                          ...activeFilters,
                          [filterType]: option
                        })}
                        className="magnetic-btn text-xs"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              const isBookmarked = bookmarkedItems.includes(resource.id);

              return (
                <motion.div
                  key={resource.id}
                  className="float-card group relative overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${resource.color}`} />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(resource.id)}
                      className={`magnetic-btn ${isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {resource.provider}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${resource.price === 'Free'
                          ? 'text-green-500 bg-green-500/10'
                          : 'text-blue-500 bg-blue-500/10'
                        }`}>
                        {resource.price}
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div>
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                        {resource.level}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button className="w-full magnetic-btn group">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Access Resource
                    </Button>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <div className="text-muted-foreground">
                No resources found matching your criteria
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { label: 'Free Resources', value: '80%', icon: DollarSign },
              { label: 'Expert Curated', value: '100%', icon: Star },
              { label: 'Updated Weekly', value: 'Fresh', icon: Clock },
            ].map((stat, index) => (
              <div key={stat.label} className="glass rounded-xl p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};