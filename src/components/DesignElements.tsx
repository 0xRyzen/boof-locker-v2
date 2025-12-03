import { motion } from "motion/react";
import { Trophy, Star, Zap, Gift, Target, Crown } from "lucide-react";

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated circles */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent)',
          filter: 'blur(40px)'
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-20 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06), transparent)',
          filter: 'blur(50px)'
        }}
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 left-1/3 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent)',
          filter: 'blur(45px)'
        }}
      />

      {/* Additional ambient lights */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05), transparent)',
          filter: 'blur(60px)'
        }}
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04), transparent)',
          filter: 'blur(55px)'
        }}
      />
    </div>
  );
}

export function AchievementBanner() {
  const achievements = [
    { icon: Trophy, value: "$2.8M+", label: "Total Paid Out", color: "#fbbf24" },
    { icon: Star, value: "99.8%", label: "Satisfaction Rate", color: "#8b5cf6" },
    { icon: Target, value: "1M+", label: "Cases Opened", color: "#06b6d4" },
    { icon: Crown, value: "#1", label: "Top Rated Platform", color: "#ec4899" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl p-6 text-center"
            style={{
              background: 'var(--lootbox-bg-card)',
              border: '2px solid var(--lootbox-border)',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${achievement.color}15, transparent)`,
              }}
            />

            <div className="relative z-10 space-y-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                style={{
                  background: `${achievement.color}22`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: achievement.color }} />
              </motion.div>
              
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                style={{
                  color: 'var(--lootbox-text-primary)',
                  fontSize: '1.75rem',
                  fontWeight: 900
                }}
              >
                {achievement.value}
              </motion.h3>
              
              <p style={{
                color: 'var(--lootbox-text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                {achievement.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function FeatureSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-8 md:p-10 my-12"
      style={{
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.08) 0%, rgba(251, 146, 60, 0.02) 100%)',
        border: '1px solid rgba(251, 146, 60, 0.2)',
      }}
    >
      {/* Decorative glow element */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative z-10 text-center space-y-6">
        {/* Large decorative icon */}
        <div 
          className="absolute top-0 right-0 opacity-10"
          style={{
            width: '120px',
            height: '120px',
          }}
        >
          <Crown 
            className="w-full h-full"
            style={{ strokeWidth: 1.5 }}
          />
        </div>
        
        {/* Badge */}
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full"
            style={{
              background: 'rgba(251, 146, 60, 0.15)',
              color: '#fb923c',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            VIP Rewards
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'var(--lootbox-text-primary)',
            letterSpacing: '-0.015em',
          }}
        >
          Unlock Exclusive Rewards
        </h3>

        {/* Description */}
        <p
          className="mb-6"
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'var(--lootbox-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
          }}
        >
          Level up your account to unlock premium cases, bonus credits, and exclusive perks!
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-3 justify-center">
          <div
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--lootbox-text-primary)',
            }}
          >
            Daily Bonuses
          </div>
          <div
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--lootbox-text-primary)',
            }}
          >
            Free Cases
          </div>
          <div
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--lootbox-text-primary)',
            }}
          >
            VIP Access
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--lootbox-border), transparent)'
        }}
      />
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'var(--lootbox-bg-card)',
          border: '2px solid var(--lootbox-border)',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6" style={{ color: 'var(--lootbox-blue-primary)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}