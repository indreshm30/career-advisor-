import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CareerPathsSection } from '@/components/CareerPathsSection';
import { SkillAnalysisSection } from '@/components/SkillAnalysisSection';
import { LearningPathSection } from '@/components/LearningPathSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CareerPathsSection />
        <SkillAnalysisSection />
        <LearningPathSection />
        <ResourcesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
