import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/database';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// Import product images
import blackGraniteImg from '@/assets/products/black-granite.jpg';
import brownGraniteImg from '@/assets/products/brown-granite.jpg';
import greenGraniteImg from '@/assets/products/green-granite.jpg';
import bluePearlImg from '@/assets/products/blue-pearl.jpg';
import redGraniteImg from '@/assets/products/red-granite.jpg';
import greyGraniteImg from '@/assets/products/grey-granite.jpg';

const productImages: Record<string, string> = {
  'black-galaxy-granite': blackGraniteImg,
  'absolute-black-granite': blackGraniteImg,
  'kashmir-white-granite': greyGraniteImg,
  'tan-brown-granite': brownGraniteImg,
  'blue-pearl-granite': bluePearlImg,
  'imperial-red-granite': redGraniteImg,
  'steel-grey-granite': greyGraniteImg,
  'green-galaxy-granite': greenGraniteImg,
};

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(8);

    if (data) {
      setProducts(data as Product[]);
    }
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0 && product.images[0] !== '/placeholder.svg') {
      return product.images[0];
    }
    return productImages[product.slug] || blackGraniteImg;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: getProductImage(product),
    });
  };

  const handleWishlistToggle = async (productId: string) => {
    if (!user) return;
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8 lg:mb-12"
        >
          <span className="text-primary font-medium text-xs sm:text-sm">Featured Collection</span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold mt-1 sm:mt-2 mb-1 sm:mb-4">
            Best Sellers
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
            Explore our most popular granite and marble products loved by customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-lg sm:rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.compare_price && product.compare_price > product.price && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-medium rounded">
                    {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                  </span>
                )}
                {user && (
                  <button
                    onClick={() => handleWishlistToggle(product.id)}
                    className={cn(
                      'absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center transition-colors',
                      isInWishlist(product.id) ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
                    )}
                  >
                    <Heart className={cn('h-3.5 w-3.5', isInWishlist(product.id) && 'fill-current')} />
                  </button>
                )}
              </div>
              <div className="p-2.5 sm:p-4">
                <Link to={`/products/${product.slug}`}>
                  <h3 className="text-xs sm:text-sm font-semibold hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between gap-1 mt-1.5 sm:mt-3">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.compare_price && product.compare_price > product.price && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground line-through ml-1">
                        {formatPrice(product.compare_price)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-10"
        >
          <Button asChild size="default">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
