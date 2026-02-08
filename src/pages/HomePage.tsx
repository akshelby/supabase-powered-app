import { MainLayout } from '@/components/layout';
import {
  HeroSection,
  StatsSection,
  CategoriesSection,
  FeaturedProducts,
  ServicesSection,
  TestimonialsSection,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
}
