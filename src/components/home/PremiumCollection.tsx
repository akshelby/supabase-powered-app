import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

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
  { id: 'fb-9', name: 'Red Granite', slug: 'red-granite', price: 3600, images: [redGraniteImg], is_active: true },
  { id: 'fb-10', name: 'Brown Pearl Granite', slug: 'brown-pearl-granite', price: 3100, images: [brownGraniteImg], is_active: true },
  { id: 'fb-11', name: 'Blue Galaxy Granite', slug: 'blue-galaxy-granite', price: 4800, images: [bluePearlImg], is_active: true },
  { id: 'fb-12', name: 'Forest Green Granite', slug: 'forest-green-granite', price: 3400, images: [greenGraniteImg], is_active: true },
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
  const angleRef = useRef(0);
  const autoRotateRef = useRef(true);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const lastMoveRef = useRef({ x: 0, time: 0 });
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const pointerStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const momentumFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

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
          setProducts(featured.slice(0, 12));
          return;
        }
        const active = allProducts.filter((p: any) => p.is_active);
        if (active.length > 0) {
          setProducts(active.slice(0, 12));
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
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cardCount = products.length;
  const anglePerCard = cardCount > 0 ? 360 / cardCount : 30;

  const radiusX = isMobile ? 160 : 340;
  const radiusY = isMobile ? 100 : 180;
  const cardW = isMobile ? 100 : 180;
  const cardH = isMobile ? 140 : 240;
  const containerH = isMobile ? 340 : 520;

  const applyPositions = useCallback(() => {
    if (!cardsRef.current || cardCount === 0) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardAngle = angleRef.current + i * anglePerCard;
      const rad = (cardAngle * Math.PI) / 180;

      const x = Math.sin(rad) * radiusX;
      const y = -Math.cos(rad) * radiusY;

      const depthFactor = (Math.cos(rad) + 1) / 2;
      const scale = 0.55 + depthFactor * 0.45;
      const zIndex = Math.round(depthFactor * 100);
      const opacity = 0.4 + depthFactor * 0.6;

      card.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${zIndex}`;
      card.style.filter = depthFactor > 0.6 ? 'none' : `brightness(${0.4 + depthFactor * 0.6})`;
    });
  }, [cardCount, anglePerCard, radiusX, radiusY]);

  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (autoRotateRef.current && !isDraggingRef.current && cardCount > 0) {
        angleRef.current += 0.3 * (dt / 16);
        applyPositions();
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    applyPositions();
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cardCount, applyPositions]);

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
      angleRef.current += v;
      applyPositions();
      momentumFrameRef.current = requestAnimationFrame(tick);
    };
    momentumFrameRef.current = requestAnimationFrame(tick);
  }, [stopMomentum, applyPositions]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    stopMomentum();
    autoRotateRef.current = false;
    startXRef.current = e.clientX;
    startAngleRef.current = angleRef.current;
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
    const sensitivity = 0.3;
    angleRef.current = startAngleRef.current + deltaX * sensitivity;
    applyPositions();

    const dt = now - lastMoveRef.current.time;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastMoveRef.current.x) * sensitivity) / Math.max(dt / 16, 1);
    }
    lastMoveRef.current = { x: e.clientX, time: now };
  }, [applyPositions]);

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

  return (
    <section className="py-8 sm:py-14 md:py-16 bg-muted/30 overflow-hidden">
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
          <div
            className="absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0 }}
          >
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
                  willChange: 'transform, opacity',
                  transition: 'filter 0.3s ease',
                }}
              >
                <Link
                  to={`/products/${product.slug || product.id}`}
                  className="block w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
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
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <h3 className="text-white text-[11px] sm:text-sm font-semibold leading-tight">
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-white/80 text-[10px] sm:text-xs mt-0.5">
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
            className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6"
            style={{
              width: `${radiusX * 2 + cardW}px`,
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
