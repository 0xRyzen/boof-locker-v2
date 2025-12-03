import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export function SectionHeader({ icon: Icon, title, subtitle, iconColor, gradientFrom, gradientTo }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-5 relative"
    >
      {/* Animated glow behind icon */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1.1, 1],
          opacity: [0.4, 0.7, 0.5, 0.4],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-0 w-24 h-24 rounded-2xl"
        style={{
          background: `radial-gradient(circle, ${iconColor}60, ${iconColor}30, transparent)`,
          filter: 'blur(25px)'
        }}
      />

      {/* Icon container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ 
          scale: 1, 
          rotate: 0,
        }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        whileHover={{ 
          scale: 1.15,
          rotate: [0, -5, 5, -5, 0],
          transition: { 
            rotate: { duration: 0.5 },
            scale: { duration: 0.2 }
          }
        }}
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          border: `2px solid ${iconColor}33`,
          boxShadow: `0 8px 32px ${iconColor}30`
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Icon className="w-8 h-8" style={{ color: 'white' }} />
        </motion.div>
        
        {/* Pulsing border animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `2px solid ${iconColor}`,
          }}
        />

        {/* Corner accents */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(45deg, ${iconColor}50 0%, transparent 25%, transparent 75%, ${iconColor}50 100%)`,
          }}
        />

        {/* Orbiting particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.25
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background: iconColor,
                boxShadow: `0 0 8px ${iconColor}`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Text content */}
      <div className="relative">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            color: 'var(--lootbox-text-primary)',
            fontSize: '2.25rem',
            fontWeight: 900,
            background: `linear-gradient(135deg, ${iconColor}, var(--lootbox-text-primary))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            color: 'var(--lootbox-text-secondary)',
            fontSize: '1rem',
            marginTop: '4px'
          }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Decorative particles */}
      <div className="absolute right-0 top-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: iconColor,
              right: i * 20,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}