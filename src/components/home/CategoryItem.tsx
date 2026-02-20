import { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  id: string;
  name: string;
  icon: ElementType;
  link: string;
  description: string;
  index: number;
  gradient?: string;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  prominent?: boolean;
  prominentBg?: string;
  onClick?: () => void;
}

export function CategoryItem({ name, icon: Icon, link, iconColor, bgColor, borderColor, prominent, prominentBg, onClick }: CategoryItemProps) {
  const isExternal = link.startsWith('tel:') || link.startsWith('http') || link.startsWith('mailto:');

  const content = (
    <>
      <motion.div
        className={cn(
          'relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20',
          'rounded-2xl sm:rounded-[20px] flex items-center justify-center',
          'transition-all duration-300',
          prominent
            ? cn(prominentBg, 'shadow-lg border-0')
            : cn(bgColor || 'bg-card', borderColor || 'border-border', 'border'),
          // Premium glass highlight overlay via pseudo-like ring
          'ring-1 ring-white/30',
          // Shadow upgrade
          prominent
            ? 'shadow-xl'
            : 'shadow-[0_2px_12px_0_rgba(0,0,0,0.10)] group-hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.18)]',
          'group-hover:scale-110 group-hover:-translate-y-1',
        )}
        whileHover={{ y: -6, scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
        {...(prominent ? {
          animate: { scale: [1, 1.06, 1] },
          transition: { duration: 2.2, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" }
        } : {})}
      >
        {/* Glassy sheen top highlight */}
        {!prominent && (
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl sm:rounded-t-[20px] bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0" />
        )}

        <Icon
          className={cn(
            'w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9',
            'transition-transform duration-300 relative z-10',
            'group-hover:scale-115 drop-shadow-sm',
            prominent ? 'text-white drop-shadow-md' : (iconColor || 'text-foreground/70')
          )}
          strokeWidth={1.6}
        />
      </motion.div>

      <span
        className={cn(
          'text-[10px] sm:text-xs font-semibold text-center leading-tight',
          'max-w-[5rem] sm:max-w-[6rem] tracking-wide',
          'transition-colors duration-300',
          prominent
            ? 'text-foreground font-bold'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {name}
      </span>
    </>
  );

  const wrapperClass = "flex flex-col items-center gap-2.5 sm:gap-3 group focus:outline-none";
  const testId = `link-category-${name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {onClick ? (
        <button type="button" onClick={onClick} className={wrapperClass} data-testid={testId}>
          {content}
        </button>
      ) : isExternal ? (
        <a href={link} className={wrapperClass} data-testid={testId}>
          {content}
        </a>
      ) : (
        <Link to={link} className={wrapperClass} data-testid={testId}>
          {content}
        </Link>
      )}
    </motion.div>
  );
}
