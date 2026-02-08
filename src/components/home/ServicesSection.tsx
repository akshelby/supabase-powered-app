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
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From consultation to installation, we provide end-to-end stone solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">
                {serviceIcons[service.icon || service.slug] || '🪨'}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.short_description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
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
