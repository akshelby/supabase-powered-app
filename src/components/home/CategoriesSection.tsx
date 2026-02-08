import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from '@/types/database';

const categoryIcons: Record<string, string> = {
  countertops: '🏠',
  flooring: '🏢',
  kitchen: '🍳',
  bathroom: '🚿',
  staircases: '📐',
  monuments: '🏛️',
};

export function CategoriesSection() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (data && data.length > 0) {
      setCategories(data);
    } else {
      // Fallback categories
      setCategories([
        { id: '1', name: 'Countertops', slug: 'countertops', description: 'Kitchen & bathroom countertops', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '2', name: 'Flooring', slug: 'flooring', description: 'Premium stone flooring', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '3', name: 'Kitchen Slabs', slug: 'kitchen', description: 'Durable kitchen slabs', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '4', name: 'Bathroom', slug: 'bathroom', description: 'Elegant bathroom solutions', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '5', name: 'Staircases', slug: 'staircases', description: 'Grand staircase designs', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '6', name: 'Monuments', slug: 'monuments', description: 'Memorial monuments', image_url: null, is_active: true, created_at: '', updated_at: '' },
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
          <span className="text-primary font-medium">Our Categories</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2 mb-4">
            Explore Our Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of premium granite and marble solutions 
            for every space in your home or business.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="group block p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-4">
                  {categoryIcons[category.slug] || '🪨'}
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {category.description}
                </p>
              </Link>
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
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
