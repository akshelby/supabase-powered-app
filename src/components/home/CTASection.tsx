import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get a free consultation and estimate for your granite or marble project. 
            Our experts are ready to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group"
            >
              <Link to="/estimation">
                Get Free Estimation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              <a href="tel:+919876543210">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
