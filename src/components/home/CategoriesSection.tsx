import { motion } from 'framer-motion';
import { Gem, Bath, Utensils, LayoutGrid, Headset, Store } from 'lucide-react';
import { CategoryItem } from './CategoryItem';
import { BhrundhavanIcon } from './BhrundhavanIcon';
import { ElementType } from 'react';

interface Category {
  id: string;
  name: string;
  icon: ElementType;
  link: string;
  description: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

const categories: Category[] = [
  {
    id: 'kitchen-slab',
    name: 'Kitchen Slab',
    icon: Gem,
    link: '/products?category=kitchen-slab',
    description: 'Premium kitchen countertops',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    id: 'vanity-top',
    name: 'Vanity Top',
    icon: Bath,
    link: '/products?category=vanity-top',
    description: 'Elegant bathroom vanities',
    iconColor: 'text-slate-700 dark:text-slate-400',
    bgColor: 'bg-slate-50 dark:bg-slate-900/30',
    borderColor: 'border-slate-200 dark:border-slate-800',
  },
  {
    id: 'dining-top',
    name: 'Dining Table Top',
    icon: Utensils,
    link: '/products?category=dining-top',
    description: 'Stunning dining surfaces',
    iconColor: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  {
    id: 'bhrundhavan',
    name: 'Bhrundhavan',
    icon: BhrundhavanIcon,
    link: '/products?category=bhrundhavan',
    description: 'Traditional tulsi planters',
    iconColor: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    id: 'tiles-fixing',
    name: 'Tiles Fixing',
    icon: LayoutGrid,
    link: '/services',
    description: 'Professional tile installation',
    iconColor: 'text-zinc-700 dark:text-zinc-400',
    bgColor: 'bg-zinc-50 dark:bg-zinc-900/30',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
  },
  {
    id: 'contact-us',
    name: 'Contact Us',
    icon: Headset,
    link: '/contact',
    description: 'Get in touch with us',
    iconColor: 'text-teal-700 dark:text-teal-400',
    bgColor: 'bg-teal-50 dark:bg-teal-900/30',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  {
    id: 'offline-stores',
    name: 'Offline Stores',
    icon: Store,
    link: '/stores',
    description: 'Visit our showrooms',
    iconColor: 'text-neutral-700 dark:text-neutral-400',
    bgColor: 'bg-neutral-50 dark:bg-neutral-900/30',
    borderColor: 'border-neutral-200 dark:border-neutral-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function CategoriesSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background" data-testid="categories-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-foreground" data-testid="text-categories-title">
            Explore Categories
          </h2>
          <p className="mt-1 text-xs sm:text-sm md:text-base text-muted-foreground">
            Premium stone surfaces for every space
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-6 md:gap-10"
        >
          {categories.map((category, index) => (
            <CategoryItem
              key={category.id}
              {...category}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
