import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingActionButton() {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat-widget'));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.button
        onClick={handleOpenChat}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        title="Chat with us"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
