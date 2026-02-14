import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.button
        onClick={() => {}}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-80 cursor-default"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        title="AI Assistant - Coming Soon"
      >
        <Bot className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
