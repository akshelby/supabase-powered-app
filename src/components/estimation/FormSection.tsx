import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FormSectionProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  isOpen: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function FormSection({
  stepNumber,
  totalSteps,
  title,
  description,
  isOpen,
  isCompleted,
  onToggle,
  children,
}: FormSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="border rounded-lg overflow-hidden bg-card">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              'w-full flex items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50',
              isOpen && 'bg-muted/30'
            )}
          >
            {/* Step Number / Check */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold transition-colors',
                isCompleted
                  ? 'bg-primary text-primary-foreground'
                  : isOpen
                  ? 'bg-primary/20 text-primary border-2 border-primary'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
            </div>

            {/* Title & Description */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground truncate">{description}</p>
            </div>

            {/* Step indicator */}
            <span className="text-xs text-muted-foreground hidden sm:block">
              {stepNumber} of {totalSteps}
            </span>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
        </CollapsibleTrigger>

        <AnimatePresence initial={false}>
          {isOpen && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="p-4 pt-0 border-t">
                  <div className="pt-4">{children}</div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </div>
    </Collapsible>
  );
}
