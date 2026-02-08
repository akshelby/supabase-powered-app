import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial, CustomerReview } from '@/types/database';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [testimonialsRes, reviewsRes] = await Promise.all([
      supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order'),
      supabase
        .from('customer_reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false }),
    ]);

    if (testimonialsRes.data) setTestimonials(testimonialsRes.data as Testimonial[]);
    if (reviewsRes.data) setCustomerReviews(reviewsRes.data as CustomerReview[]);
    setLoading(false);
  };

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
            What People Say
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4"
          >
            Testimonials & Reviews
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from our satisfied customers about their experience with SP Granites.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Testimonials */}
            {testimonials.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Featured Testimonials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                      <p className="text-muted-foreground mb-6">
                        "{testimonial.review_text}"
                      </p>
                      <div className="flex items-center gap-3">
                        {testimonial.image_url ? (
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.customer_name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {testimonial.customer_name.charAt(0)}
                          </div>
                        )}
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
              </section>
            )}

            {/* Customer Reviews */}
            {customerReviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Customer Reviews
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customerReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card p-6 rounded-xl border border-border"
                    >
                      <div className="flex items-start gap-4">
                        {review.profile_photo_url ? (
                          <img
                            src={review.profile_photo_url}
                            alt={review.customer_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {review.customer_name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.customer_name}</h4>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? 'text-primary fill-primary'
                                      : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {(review.city || review.area_name) && (
                            <p className="text-xs text-muted-foreground mb-2">
                              {[review.area_name, review.city].filter(Boolean).join(', ')}
                            </p>
                          )}
                          <p className="text-muted-foreground text-sm">
                            {review.review_text}
                          </p>
                          {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mt-4 overflow-x-auto">
                              {review.photos.map((photo, i) => (
                                <img
                                  key={i}
                                  src={photo}
                                  alt={`Review photo ${i + 1}`}
                                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {testimonials.length === 0 && customerReviews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No reviews available yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
