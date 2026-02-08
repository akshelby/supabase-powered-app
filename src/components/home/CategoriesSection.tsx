import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from '@/types/database';

// Import category images
import kitchenCountertopsImg from '@/assets/categories/kitchen-countertops.jpg';
import flooringImg from '@/assets/categories/flooring.jpg';
import bathroomImg from '@/assets/categories/bathroom.jpg';
import staircasesImg from '@/assets/categories/staircases.jpg';

const categoryImages: Record<string, string> = {
  'kitchen-countertops': kitchenCountertopsImg,
  'flooring': flooringImg,
  'bathroom': bathroomImg,
  'staircases': staircasesImg,
  'wall-cladding': bathroomImg,
};

const categoryIcons: Record<string, string> = {
  'kitchen-countertops': '🍳',
  'flooring': '🏢',
  'bathroom': '🚿',
  'staircases': '📐',
  'wall-cladding': '🧱',
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
        { id: '1', name: 'Kitchen Countertops', slug: 'kitchen-countertops', description: 'Premium kitchen countertops', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '2', name: 'Flooring', slug: 'flooring', description: 'Premium stone flooring', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '3', name: 'Bathroom', slug: 'bathroom', description: 'Elegant bathroom solutions', image_url: null, is_active: true, created_at: '', updated_at: '' },
        { id: '4', name: 'Staircases', slug: 'staircases', description: 'Grand staircase designs', image_url: null, is_active: true, created_at: '', updated_at: '' },
      ]);
    }
  };

  const getCategoryImage = (category: ProductCategory) => {
    if (category.image_url && category.image_url !== '/placeholder.svg') {
      return category.image_url;
    }
    return categoryImages[category.slug] || kitchenCountertopsImg;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                className="group block overflow-hidden rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-2xl mb-1">
                      {categoryIcons[category.slug] || '🪨'}
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
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
