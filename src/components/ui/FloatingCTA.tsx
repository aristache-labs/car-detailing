'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/40700000000"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: '0 0 20px rgba(37,211,102,0.4)',
          }}
          aria-label="Contact us on WhatsApp"
          title="WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
