import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Gem, Ruler, Clock } from 'lucide-react';
import { EstimationForm } from '@/components/estimation/EstimationForm';

const features = [
  {
    icon: Calculator,
    title: 'Free Estimation',
    description: 'Get a detailed quote at no cost',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    description: 'Quality granite, marble & quartz',
  },
  {
    icon: Ruler,
    title: 'Custom Sizing',
    description: 'Tailored to your exact dimensions',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Quote within 24-48 hours',
  },
];

export default function EstimationPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium"
          >
            Free Quote
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4"
          >
            Get Your Free Estimation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Fill out the form below with your project details and our team will
            provide you with a comprehensive estimation.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardContent className="p-6">
              <EstimationForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
