import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CareerPathsSection } from '@/components/CareerPathsSection';
import { SkillAnalysisSection } from '@/components/SkillAnalysisSection';
import { LearningPathSection } from '@/components/LearningPathSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatSidebar } from '@/components/ChatSidebar';
import { FloatingChatButton } from '@/components/FloatingChatButton';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    console.log('Chat opening...'); // Debug log
    console.log('Current isChatOpen state:', isChatOpen);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    console.log('Chat closing...'); // Debug log
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onChatOpen={handleChatOpen}
        onChatClose={handleChatClose}
        isChatOpen={isChatOpen}
      />
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

      {/* Chat Components */}
      {!isChatOpen && <FloatingChatButton onClick={handleChatOpen} />}
      <ChatSidebar isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
};

export default Index;
