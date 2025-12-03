import { motion } from "motion/react";
import { ArrowRight, Sparkles, Star, Crown, Zap } from "lucide-react";
import type { Lootbox } from "../App";

interface CaseCardProps {
  lootbox: Lootbox;
  index: number;
  delay: number;
  onClick: () => void;
}

export function CaseCard({ lootbox, index, delay, onClick }: CaseCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.5,
        ease: "easeOut"
      }}
      onClick={onClick}
      className="group relative overflow-visible text-left"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Main card container with 3D transform */}
      <motion.div
        whileHover={{
          rotateX: 2,
          rotateY: -2,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'var(--lootbox-bg-card)',
          border: '2px solid var(--lootbox-border)',
          transformStyle: "preserve-3d",
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(6, 182, 212, 0.4))',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Premium shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ x: '-100%' }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transform: 'skewX(-20deg)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.div>

        {/* Featured Badge with premium styling */}
        {lootbox.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + index * 0.05 + 0.3, type: "spring" }}
            className="absolute top-3 right-3 z-10"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent)',
                  filter: 'blur(8px)',
                  transform: 'scale(1.5)',
                }}
              />
              
              {/* Badge */}
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
                  boxShadow: '0 4px 16px rgba(251, 191, 36, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                }}
              >
                <Crown className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Image container with parallax effect */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          <motion.img
            src={lootbox.image}
            alt={lootbox.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Premium gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{ 
              background: 'linear-gradient(to top, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
              transition: 'opacity 0.4s ease-out',
            }}
          />

          {/* Animated particles on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: 0,
                  opacity: 0,
                }}
                whileHover={{
                  y: [null, `${Math.random() * -50 - 20}%`],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </motion.div>
            ))}
          </div>

          {/* Premium "Open Now" button on hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative px-8 py-3 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Animated shine */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-black tracking-wide" style={{ fontSize: '0.875rem' }}>
                  OPEN NOW
                </span>
                <Star className="w-4 h-4 text-yellow-300" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content section with premium styling */}
        <div className="relative p-4 space-y-3">
          {/* Subtle gradient background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.05))',
            }}
          />

          <div className="relative z-10">
            {/* Case name with gradient on hover */}
            <motion.h3
              className="relative overflow-hidden"
              style={{
                color: 'var(--lootbox-text-primary)',
                fontWeight: 800,
                fontSize: '1rem',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              <span className="relative z-10">{lootbox.name}</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                transition={{ duration: 0.3 }}
              >
                {lootbox.name}
              </motion.div>
            </motion.h3>

            {/* Price and action button */}
            <div className="flex items-center justify-between mt-3">
              {/* Premium price display */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <div
                    style={{
                      color: 'var(--lootbox-green)',
                      fontWeight: 900,
                      fontSize: '1.125rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    ${lootbox.price.toFixed(2)}
                  </div>
                </div>
              </motion.div>
              
              {/* Animated arrow button */}
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                  border: '2px solid var(--lootbox-border)',
                }}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4))',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  animate={{
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5 relative z-10" style={{ color: 'var(--lootbox-blue-primary)' }} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Shadow that expands on hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)',
          filter: 'blur(20px)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
