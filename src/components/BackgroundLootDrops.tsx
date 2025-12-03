import { motion } from "motion/react";
import { Package, Gift, Box, Star, Sparkles, Gem } from "lucide-react";
import { useMemo } from "react";

const icons = [Package, Gift, Box, Star, Sparkles, Gem];

interface LootDrop {
  id: number;
  icon: typeof Package;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
}

export function BackgroundLootDrops() {
  const lootDrops = useMemo(() => {
    const drops: LootDrop[] = [];
    const colors = [
      '#8b5cf6', // purple
      '#06b6d4', // cyan
      '#ec4899', // pink
      '#f59e0b', // amber
      '#10b981', // emerald
      '#3b82f6', // blue
    ];

    for (let i = 0; i < 15; i++) {
      drops.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        size: 24 + Math.random() * 24,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }
    return drops;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lootDrops.map((drop) => {
        const Icon = drop.icon;
        return (
          <motion.div
            key={drop.id}
            initial={{
              y: -100,
              x: `${drop.x}%`,
              rotate: drop.rotation,
              opacity: 0,
            }}
            animate={{
              y: '110vh',
              rotate: drop.rotation + 360,
              opacity: [0, 0.15, 0.15, 0],
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1],
              }
            }}
            className="absolute"
            style={{
              left: 0,
            }}
          >
            <motion.div
              animate={{
                x: [0, 30, -30, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon
                style={{
                  width: drop.size,
                  height: drop.size,
                  color: drop.color,
                  filter: 'blur(0.5px)',
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Animated Hexagons - Small geometric patterns */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            rotate: {
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          className="absolute"
          style={{
            width: 40 + Math.random() * 30,
            height: 40 + Math.random() * 30,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              stroke={['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'][Math.floor(i % 4)]}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}

      {/* Small Dots Pattern */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'][Math.floor(i % 4)],
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Circuit-like lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{
            x: `${20 + i * 15}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
          className="absolute top-0 w-px h-full"
          style={{
            background: `linear-gradient(180deg, transparent, ${ ['#8b5cf6', '#06b6d4', '#ec4899'][i % 3]}, transparent)`,
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(var(--lootbox-border) 1px, transparent 1px), linear-gradient(90deg, var(--lootbox-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Radial gradient vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--lootbox-bg-primary) 100%)',
          opacity: 0.6
        }}
      />
    </div>
  );
}