import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CollectionProduct {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  images: string[];
  is_active: boolean;
}

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

const fallbackProducts: CollectionProduct[] = [
  { id: 'fb-1', name: 'Black Galaxy Granite', slug: 'black-galaxy-granite', price: 4500, images: [blackGraniteImg], is_active: true },
  { id: 'fb-2', name: 'Absolute Black Granite', slug: 'absolute-black-granite', price: 3800, images: [blackGraniteImg], is_active: true },
  { id: 'fb-3', name: 'Tan Brown Granite', slug: 'tan-brown-granite', price: 2800, images: [brownGraniteImg], is_active: true },
  { id: 'fb-4', name: 'Blue Pearl Granite', slug: 'blue-pearl-granite', price: 5200, images: [bluePearlImg], is_active: true },
  { id: 'fb-5', name: 'Green Galaxy Granite', slug: 'green-galaxy-granite', price: 3500, images: [greenGraniteImg], is_active: true },
  { id: 'fb-6', name: 'Imperial Red Granite', slug: 'imperial-red-granite', price: 4000, images: [redGraniteImg], is_active: true },
  { id: 'fb-7', name: 'Kashmir White Granite', slug: 'kashmir-white-granite', price: 3200, images: [greyGraniteImg], is_active: true },
  { id: 'fb-8', name: 'Steel Grey Granite', slug: 'steel-grey-granite', price: 2900, images: [greyGraniteImg], is_active: true },
];

function getProductImage(product: CollectionProduct): string {
  const slug = product.name?.toLowerCase().replace(/\s+/g, '-') || '';
  if (productImages[slug]) return productImages[slug];
  if (product.images?.[0] && product.images[0] !== '/placeholder.svg') return product.images[0];
  return blackGraniteImg;
}

export function PremiumCollection() {
  const [products, setProducts] = useState<CollectionProduct[]>(fallbackProducts);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const autoRotateRef = useRef(true);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const lastMoveRef = useRef({ x: 0, time: 0 });
  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const pointerStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const momentumFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async (attempt = 0) => {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false });
        if (error) throw error;
        if (cancelled) return;
        const allProducts = data || [];
        const featured = allProducts.filter((p: any) => p.is_featured && p.is_active);
        if (featured.length > 0) {
          setProducts(featured.slice(0, 8));
          return;
        }
        const active = allProducts.filter((p: any) => p.is_active);
        if (active.length > 0) {
          setProducts(active.slice(0, 8));
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err: any) {
        if (!cancelled && attempt < 2 && (err?.message?.includes('bort') || err?.message?.includes('Abort'))) {
          setTimeout(() => fetchProducts(attempt + 1), 500 * (attempt + 1));
          return;
        }
        if (!cancelled) setProducts(fallbackProducts);
      }
    };
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1280);
      setIsLargeDesktop(w >= 1280);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cardCount = products.length;
  const anglePerCard = cardCount > 0 ? 360 / cardCount : 36;

  const getRadius = useCallback(() => {
    const cardW = isMobile ? 140 : isLargeDesktop ? 280 : isTablet ? 230 : 200;
    const halfCard = cardW / 2;
    const gap = isMobile ? 10 : isLargeDesktop ? 14 : isTablet ? 12 : 10;
    const minR = Math.ceil((halfCard + gap) / Math.sin(Math.PI / Math.max(cardCount, 1)));
    return Math.max(minR, isMobile ? 200 : isLargeDesktop ? 450 : isTablet ? 360 : 280);
  }, [isMobile, isTablet, isLargeDesktop, cardCount]);

  const applyRotation = useCallback(() => {
    if (!cardsRef.current || cardCount === 0) return;
    const radius = getRadius();

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardAngle = i * anglePerCard;
      const totalAngle = rotationRef.current + cardAngle;
      const radians = (totalAngle * Math.PI) / 180;
      const x = Math.sin(radians) * radius;
      const z = Math.cos(radians) * radius;

      const normalizedZ = (z + radius) / (2 * radius);
      const scale = 0.6 + normalizedZ * 0.4;
      const opacity = 0.3 + normalizedZ * 0.7;
      const zIndex = Math.round(normalizedZ * 100);

      card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${zIndex}`;
      card.style.filter = normalizedZ > 0.7 ? 'none' : `brightness(${0.5 + normalizedZ * 0.5})`;
    });
  }, [cardCount, anglePerCard, getRadius]);

  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (autoRotateRef.current && !isDraggingRef.current && cardCount > 0) {
        rotationRef.current -= 0.25 * (dt / 16);
        applyRotation();
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    applyRotation();
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cardCount, applyRotation]);

  const stopMomentum = useCallback(() => {
    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = null;
    }
  }, []);

  const startMomentum = useCallback(() => {
    stopMomentum();
    let v = velocityRef.current;
    const friction = 0.95;
    const tick = () => {
      v *= friction;
      if (Math.abs(v) < 0.05) {
        setTimeout(() => { autoRotateRef.current = true; }, 2000);
        return;
      }
      rotationRef.current += v;
      applyRotation();
      momentumFrameRef.current = requestAnimationFrame(tick);
    };
    momentumFrameRef.current = requestAnimationFrame(tick);
  }, [stopMomentum, applyRotation]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    stopMomentum();
    autoRotateRef.current = false;
    startXRef.current = e.clientX;
    startRotRef.current = rotationRef.current;
    velocityRef.current = 0;
    lastMoveRef.current = { x: e.clientX, time: performance.now() };
    pointerStartY.current = e.clientY;
    isHorizontalSwipe.current = null;
  }, [stopMomentum]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isHorizontalSwipe.current === false) return;

    const dx = Math.abs(e.clientX - startXRef.current);
    const dy = Math.abs(e.clientY - pointerStartY.current);

    if (isHorizontalSwipe.current === null) {
      if (dx + dy < 8) return;
      if (dx > dy) {
        isHorizontalSwipe.current = true;
        isDraggingRef.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      } else {
        isHorizontalSwipe.current = false;
        return;
      }
    }

    e.preventDefault();
    const now = performance.now();
    const deltaX = e.clientX - startXRef.current;
    const sensitivity = 0.4;
    rotationRef.current = startRotRef.current + deltaX * sensitivity;
    applyRotation();

    const dt = now - lastMoveRef.current.time;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastMoveRef.current.x) * sensitivity) / Math.max(dt / 16, 1);
    }
    lastMoveRef.current = { x: e.clientX, time: now };
  }, [applyRotation]);

  const handlePointerUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      startMomentum();
    } else {
      setTimeout(() => { autoRotateRef.current = true; }, 2000);
    }
    isHorizontalSwipe.current = null;
  }, [startMomentum]);

  if (cardCount === 0) return null;

  const cardW = isMobile ? 140 : isLargeDesktop ? 280 : isTablet ? 230 : 200;
  const cardH = isMobile ? 200 : isLargeDesktop ? 380 : isTablet ? 320 : 270;
  const containerH = isMobile ? 300 : isLargeDesktop ? 520 : isTablet ? 440 : 380;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-red-600">
            Premium Collection
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
            Swipe to rotate
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative mx-auto select-none"
          style={{
            height: `${containerH}px`,
            cursor: 'grab',
            touchAction: 'pan-y',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          data-testid="premium-collection-carousel"
        >
          <div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ transformStyle: 'preserve-3d' }}>
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="absolute"
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  left: `${-cardW / 2}px`,
                  top: `${-cardH / 2}px`,
                  transition: 'filter 0.3s ease',
                  willChange: 'transform, opacity',
                }}
              >
                <Link
                  to={`/products/${product.slug || product.id}`}
                  className={cn(
                    'block w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow',
                  )}
                  onClick={(e) => { if (isDraggingRef.current) e.preventDefault(); }}
                  data-testid={`collection-card-${product.id}`}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                      onError={(e) => { (e.target as HTMLImageElement).src = blackGraniteImg; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-white text-sm sm:text-lg font-semibold leading-tight">
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-white/80 text-xs sm:text-base mt-0.5 sm:mt-1">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-8 rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3">Swipe or drag to explore</p>
      </div>
    </section>
  );
}
