import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/database';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
      .limit(3);

    if (data && data.length > 0) {
      setTestimonials(data as Testimonial[]);
    } else {
      // Fallback testimonials
      setTestimonials([
        { id: '1', customer_name: 'Rajesh Kumar', company: 'Home Owner', designation: null, review_text: 'Excellent quality granite and professional installation. The team was punctual and the work was completed perfectly.', rating: 5, image_url: null, is_active: true, display_order: 1, created_at: '', updated_at: '' },
        { id: '2', customer_name: 'Priya Sharma', company: 'Interior Designer', designation: 'Lead Designer', review_text: 'I recommend SP Granites to all my clients. Their marble collection is stunning and the craftsmanship is top-notch.', rating: 5, image_url: null, is_active: true, display_order: 2, created_at: '', updated_at: '' },
        { id: '3', customer_name: 'Anand Builders', company: 'Construction Company', designation: 'Project Manager', review_text: 'We have been working with SP Granites for over 5 years. Reliable, quality products, and excellent customer service.', rating: 5, image_url: null, is_active: true, display_order: 3, created_at: '', updated_at: '' },
      ]);
    }
  };

  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with SP Granites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl border border-border relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'text-primary fill-primary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 line-clamp-4">
                "{testimonial.review_text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.customer_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.customer_name}</h4>
                  {testimonial.company && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.designation && `${testimonial.designation}, `}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
