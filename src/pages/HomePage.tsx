import { MainLayout } from '@/components/layout';
import {
  HeroSection,
  PremiumCollection,
  ServicesSection,
  StatsSection,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <PremiumCollection />
      <ServicesSection />
      <StatsSection />
      <CTASection />
    </MainLayout>
  );
}
