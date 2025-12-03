import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer'
          }}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.div>

          {/* Pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid #8b5cf6',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
