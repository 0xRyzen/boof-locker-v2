import { motion } from "motion/react";
import { Sparkles, TrendingUp, Zap, Gift } from "lucide-react";

export function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl p-12"
      style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
            <span style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}>
              SPECIAL OFFER
            </span>
          </motion.div>

          <h2 style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 900,
            lineHeight: 1.2
          }}>
            Get 20% Bonus on First Deposit
          </h2>

          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.125rem',
            maxWidth: '500px'
          }}>
            New users get extra credits on their first deposit. Start your lootbox journey with a boost!
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl mt-4"
            style={{
              background: 'white',
              color: '#8b5cf6',
              fontWeight: 800,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            Claim Bonus <Zap className="inline w-5 h-5 ml-2" />
          </motion.button>
        </div>

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hidden lg:block"
        >
          <Gift className="w-32 h-32 text-white opacity-20" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function StatsBar() {
  const stats = [
    { label: "Cases Opened Today", value: "24,891", icon: TrendingUp },
    { label: "Active Users", value: "15,429", icon: Sparkles },
    { label: "Total Winnings", value: "$2.8M", icon: Zap },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="rounded-2xl p-6"
            style={{
              background: 'var(--lootbox-bg-card)',
              border: '2px solid var(--lootbox-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p style={{
                  color: 'var(--lootbox-text-secondary)',
                  fontSize: '0.875rem',
                  marginBottom: '8px'
                }}>
                  {stat.label}
                </p>
                <motion.h3
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  style={{
                    color: 'var(--lootbox-text-primary)',
                    fontSize: '2rem',
                    fontWeight: 900
                  }}
                >
                  {stat.value}
                </motion.h3>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: 'var(--lootbox-bg-tertiary)'
                }}
              >
                <Icon className="w-7 h-7" style={{ color: 'var(--lootbox-blue-primary)' }} />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
