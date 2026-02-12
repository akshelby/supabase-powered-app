import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/database';

const serviceIcons: Record<string, string> = {
  installation: '🔧',
  fabrication: '⚙️',
  polishing: '✨',
  repair: '🛠️',
  consultation: '💬',
  design: '📐',
};

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
      .limit(6);

    if (data && data.length > 0) {
      setServices(data as Service[]);
    } else {
      // Fallback services
      setServices([
        { id: '1', name: 'Installation', slug: 'installation', short_description: 'Professional granite and marble installation', description: null, image_url: null, icon: 'installation', display_order: 1, is_active: true, created_at: '', updated_at: '' },
        { id: '2', name: 'Fabrication', slug: 'fabrication', short_description: 'Custom cutting and shaping', description: null, image_url: null, icon: 'fabrication', display_order: 2, is_active: true, created_at: '', updated_at: '' },
        { id: '3', name: 'Polishing', slug: 'polishing', short_description: 'Restore shine to your surfaces', description: null, image_url: null, icon: 'polishing', display_order: 3, is_active: true, created_at: '', updated_at: '' },
        { id: '4', name: 'Repair', slug: 'repair', short_description: 'Fix chips, cracks, and stains', description: null, image_url: null, icon: 'repair', display_order: 4, is_active: true, created_at: '', updated_at: '' },
      ]);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8 lg:mb-12"
        >
          <span className="text-primary font-medium text-xs sm:text-sm">What We Offer</span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold mt-1 sm:mt-2 mb-1 sm:mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
            From consultation to installation, we provide end-to-end stone solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-3 sm:p-4 lg:p-6 bg-card rounded-lg sm:rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">
                {serviceIcons[service.icon || service.slug] || '🪨'}
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {service.short_description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-10"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
