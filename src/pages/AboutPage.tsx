import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Clock, Shield, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '25+', icon: Clock },
  { label: 'Happy Customers', value: '5,000+', icon: Users },
  { label: 'Projects Completed', value: '10,000+', icon: Award },
  { label: 'Quality Guarantee', value: '100%', icon: Shield },
];

const values = [
  {
    title: 'Premium Quality',
    description: 'We source only the finest granite, marble, and quartz from trusted quarries worldwide, ensuring every piece meets our exacting standards.',
  },
  {
    title: 'Expert Craftsmanship',
    description: 'Our team of skilled artisans combines traditional techniques with modern CNC technology to deliver flawless cuts and finishes.',
  },
  {
    title: 'Customer First',
    description: 'From free consultations to after-installation support, we walk with you through every step of your stone project journey.',
  },
  {
    title: 'Timely Delivery',
    description: 'We understand the importance of your timeline. Our dedicated logistics team ensures on-time delivery to your project site.',
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="text-center mb-6 sm:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground font-medium text-xs sm:text-sm uppercase tracking-wide"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl lg:text-4xl font-display font-bold mt-1 mb-2 sm:mb-3"
            data-testid="text-about-title"
          >
            About SP Granites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto"
          >
            Building trust through quality stone craftsmanship since 2000.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-display font-bold" data-testid="text-who-we-are">
              Who We Are
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              SP Granites is a leading provider of premium granite, marble, and natural stone products based in Chennai, Tamil Nadu. For over 25 years, we have been transforming homes, offices, and commercial spaces with our curated collection of high-quality stone surfaces.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              What started as a small family-run stone workshop has grown into a trusted name in the stone industry. Today, we serve thousands of customers across South India, offering everything from raw slabs to fully fabricated countertops, flooring, and custom stonework.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our state-of-the-art fabrication facility is equipped with the latest CNC machinery and diamond cutting tools, allowing us to achieve precision cuts and flawless finishes that meet international standards.
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-display font-bold" data-testid="text-mission">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              To make premium natural stone accessible and affordable for every Indian home, while maintaining the highest standards of quality, craftsmanship, and customer service.
            </p>
            <h2 className="text-lg sm:text-xl font-display font-bold mt-4 sm:mt-6" data-testid="text-vision">
              Our Vision
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              To be South India's most trusted stone partner, known for unmatched quality, innovative design solutions, and a seamless customer experience from selection to installation.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-4 pb-4 px-3">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-lg sm:text-xl font-display font-bold text-center mb-4 sm:mb-6" data-testid="text-values-title">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {values.map((value) => (
              <Card key={value.title} className="hover-elevate transition-all">
                <CardContent className="pt-4 pb-4 px-4 sm:px-5">
                  <h3 className="text-sm sm:text-base font-semibold mb-1">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-card border border-border rounded-lg p-6 sm:p-10"
        >
          <h2 className="text-lg sm:text-xl font-display font-bold mb-2" data-testid="text-cta-title">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            Whether you're renovating your kitchen, building a new home, or designing a commercial space, we're here to help you find the perfect stone.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Button asChild>
              <Link to="/products" data-testid="link-browse-products">
                Browse Products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/estimation" data-testid="link-get-estimate">
                Get Free Estimate
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
