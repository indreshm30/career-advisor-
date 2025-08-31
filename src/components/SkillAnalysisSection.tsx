import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart3, Target, Upload, Plus, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useInView } from 'react-intersection-observer';

const sampleSkills = ['JavaScript', 'Python', 'React', 'SQL', 'Git', 'AWS', 'Docker', 'Node.js'];

const skillGapData = [
  { skill: 'JavaScript', current: 85, required: 90, impact: 'High' },
  { skill: 'React', current: 75, required: 95, impact: 'Very High' },
  { skill: 'TypeScript', current: 40, required: 85, impact: 'High' },
  { skill: 'Node.js', current: 60, required: 80, impact: 'Medium' },
  { skill: 'AWS', current: 25, required: 75, impact: 'Very High' },
];

export const SkillAnalysisSection = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [analysisMethod, setAnalysisMethod] = useState<'paste' | 'checklist'>('checklist');
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const runAnalysis = () => {
    if (skills.length > 0) {
      setShowResults(true);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'text-red-500 bg-red-500/10';
      case 'High': return 'text-orange-500 bg-orange-500/10';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-green-500 bg-green-500/10';
    }
  };

  return (
    <section id="skill-analysis" className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />
      
      <div className="section-content relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Skill Gap</span> Analysis
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Understand your current skills and identify what you need to learn next
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Brain className="h-6 w-6 text-primary mr-2" />
                  Input Your Skills
                </h3>

                {/* Method Selection */}
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={analysisMethod === 'checklist' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAnalysisMethod('checklist')}
                    className="magnetic-btn"
                  >
                    Quick Select
                  </Button>
                  <Button
                    variant={analysisMethod === 'paste' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAnalysisMethod('paste')}
                    className="magnetic-btn"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Paste Resume
                  </Button>
                </div>

                {analysisMethod === 'checklist' ? (
                  <div className="space-y-4">
                    {/* Add Custom Skill */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                        className="glass"
                      />
                      <Button
                        onClick={() => addSkill(newSkill)}
                        size="icon"
                        className="magnetic-btn"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Sample Skills */}
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Popular Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {sampleSkills.map((skill) => (
                          <Button
                            key={skill}
                            variant="outline"
                            size="sm"
                            onClick={() => addSkill(skill)}
                            className="magnetic-btn"
                            disabled={skills.includes(skill)}
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Skills */}
                    {skills.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Your Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <motion.div
                              key={skill}
                              className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              {skill}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Textarea
                      placeholder="Paste your resume or skill list here..."
                      className="glass min-h-[200px] resize-none"
                      rows={8}
                    />
                  </div>
                )}

                <Button
                  onClick={runAnalysis}
                  className="w-full mt-6 magnetic-btn bg-primary hover:bg-primary-light"
                  disabled={skills.length === 0 && analysisMethod === 'checklist'}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analyze Skills
                </Button>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatePresence>
                {showResults ? (
                  <motion.div
                    className="glass-strong rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <Target className="h-6 w-6 text-primary mr-2" />
                      Skill Gap Analysis
                    </h3>

                    <div className="space-y-4">
                      {skillGapData.map((item, index) => (
                        <motion.div
                          key={item.skill}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.skill}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(item.impact)}`}>
                              {item.impact} Impact
                            </span>
                          </div>
                          
                          {/* Progress Bars */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Current: {item.current}%</span>
                              <span>Required: {item.required}%</span>
                            </div>
                            <div className="relative">
                              {/* Required Level Background */}
                              <div className="w-full h-2 bg-muted rounded-full" />
                              {/* Current Level */}
                              <motion.div
                                className="absolute top-0 h-2 bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.current}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                              {/* Required Level Indicator */}
                              <div
                                className="absolute top-0 w-0.5 h-2 bg-red-500"
                                style={{ left: `${item.required}%` }}
                              />
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Gap: {item.required - item.current} points
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Top Skills to Learn */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Sparkles className="h-5 w-5 text-primary mr-2" />
                        Top Priority Skills
                      </h4>
                      <div className="space-y-2">
                        {skillGapData.slice(0, 3).map((item, index) => (
                          <div key={item.skill} className="flex items-center justify-between">
                            <span className="text-sm">{item.skill}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>~2-4 weeks</span>
                              <div className={`w-2 h-2 rounded-full ${
                                item.impact === 'Very High' ? 'bg-red-500' : 
                                item.impact === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="glass rounded-2xl p-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Ready for Analysis</h3>
                    <p className="text-muted-foreground">
                      Add your skills to see personalized gap analysis and learning recommendations
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};