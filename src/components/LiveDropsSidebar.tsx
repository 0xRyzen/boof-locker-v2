import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, User, DollarSign, Package } from "lucide-react";

interface LiveDrop {
  id: string;
  user: string;
  item: string;
  value: number;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  timestamp: Date;
}

const rarityColors = {
  common: "#9CA3AF",
  rare: "#60A5FA",
  epic: "#A78BFA",
  legendary: "#FBBF24",
  mythic: "#EC4899",
};

// Generate mock live drops
const generateMockDrop = (): LiveDrop => {
  const users = ["Alex", "Sarah", "Mike", "Emma", "David", "Lisa", "Tom", "Kate", "John", "Nina"];
  const items = [
    { name: "Gaming Headset Pro", value: 28.50, rarity: "legendary" as const, image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?w=100" },
    { name: "Wireless Earbuds", value: 65.00, rarity: "mythic" as const, image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=100" },
    { name: "Mechanical Keyboard", value: 35.00, rarity: "legendary" as const, image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100" },
    { name: "Designer Watch", value: 34.50, rarity: "epic" as const, image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=100" },
    { name: "Gaming Mouse", value: 12.00, rarity: "rare" as const, image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?w=100" },
    { name: "Limited Sneakers", value: 58.00, rarity: "legendary" as const, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100" },
    { name: "Smart Watch", value: 42.00, rarity: "legendary" as const, image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=100" },
    { name: "RGB Mousepad", value: 3.50, rarity: "common" as const, image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?w=100" },
  ];
  
  const item = items[Math.floor(Math.random() * items.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    user,
    item: item.name,
    value: item.value,
    image: item.image,
    rarity: item.rarity,
    timestamp: new Date(),
  };
};

export function LiveDropsSidebar() {
  const [drops, setDrops] = useState<LiveDrop[]>(() => 
    Array.from({ length: 10 }, generateMockDrop)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) => {
        const newDrop = generateMockDrop();
        return [newDrop, ...prev].slice(0, 15);
      });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed left-0 top-16 bottom-0 w-80 border-r overflow-hidden z-30 hidden xl:block"
      style={{
        background: 'var(--lootbox-bg-secondary)',
        borderColor: 'var(--lootbox-border)',
      }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 backdrop-blur-xl border-b px-4 py-4"
        style={{
          background: 'rgba(10, 14, 26, 0.95)',
          borderColor: 'var(--lootbox-border)',
        }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Flame 
              className="w-5 h-5" 
              style={{ color: 'var(--lootbox-red)' }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4), transparent)',
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          
          <div>
            <h2 
              style={{
                color: 'var(--lootbox-text-primary)',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              LIVE DROPS
            </h2>
            <p 
              style={{
                color: 'var(--lootbox-text-secondary)',
                fontSize: '0.75rem',
              }}
            >
              Real-time unboxing
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-2.5 rounded-lg"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              border: '1px solid var(--lootbox-border)',
            }}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: 'var(--lootbox-blue-primary)' }} />
              <div>
                <div 
                  style={{
                    color: 'var(--lootbox-text-secondary)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                  }}
                >
                  TOTAL
                </div>
                <div 
                  style={{
                    color: 'var(--lootbox-text-primary)',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                  }}
                >
                  2.4M+
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-2.5 rounded-lg"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              border: '1px solid var(--lootbox-border)',
            }}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" style={{ color: 'var(--lootbox-green)' }} />
              <div>
                <div 
                  style={{
                    color: 'var(--lootbox-text-secondary)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                  }}
                >
                  WON TODAY
                </div>
                <div 
                  style={{
                    color: 'var(--lootbox-green)',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                  }}
                >
                  $842K
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Drops List */}
      <div className="overflow-y-auto h-full pb-32">
        <AnimatePresence mode="popLayout">
          {drops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, x: -50, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 50, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="border-b"
              style={{
                borderColor: 'var(--lootbox-border)',
              }}
            >
              <motion.div
                whileHover={{ 
                  x: 4,
                  background: 'var(--lootbox-bg-tertiary)',
                }}
                className="p-3 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* User Avatar */}
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3))',
                      border: '1px solid var(--lootbox-border)',
                    }}
                  >
                    <User className="w-4 h-4" style={{ color: 'var(--lootbox-text-primary)' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        style={{
                          color: 'var(--lootbox-text-primary)',
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                        }}
                      >
                        {drop.user}
                      </span>
                      <div 
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          background: rarityColors[drop.rarity],
                        }}
                      />
                    </div>
                    <p 
                      className="truncate"
                      style={{
                        color: 'var(--lootbox-text-secondary)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {drop.item}
                    </p>
                  </div>

                  {/* Item Image */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                      style={{
                        border: `2px solid ${rarityColors[drop.rarity]}`,
                        background: 'var(--lootbox-bg-tertiary)',
                      }}
                    >
                      <img 
                        src={drop.image} 
                        alt={drop.item}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Rarity glow */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle, ${rarityColors[drop.rarity]}40, transparent)`,
                        }}
                      />
                    </motion.div>

                    {/* Value badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-white text-xs"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        fontWeight: 800,
                        fontSize: '0.625rem',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                      }}
                    >
                      ${drop.value.toFixed(2)}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
