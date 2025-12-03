import { motion } from "motion/react";
import { Trophy, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface LiveDrop {
  id: number;
  user: string;
  item: string;
  value: number;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  time: string;
}

const mockDrops: LiveDrop[] = [
  { id: 1, user: "Alex", item: "Gaming Headset Pro", value: 89.99, rarity: "legendary", time: "Just now" },
  { id: 2, user: "Jordan", item: "Mechanical Keyboard", value: 45.50, rarity: "epic", time: "1m ago" },
  { id: 3, user: "Sam", item: "Designer Sneakers", value: 120.00, rarity: "mythic", time: "2m ago" },
  { id: 4, user: "Taylor", item: "Wireless Earbuds", value: 65.00, rarity: "legendary", time: "3m ago" },
  { id: 5, user: "Morgan", item: "Smart Watch", value: 199.99, rarity: "mythic", time: "4m ago" },
  { id: 6, user: "Casey", item: "RGB Mouse", value: 35.00, rarity: "epic", time: "5m ago" },
];

const rarityColors = {
  common: "#94a3b8",
  rare: "#3b82f6",
  epic: "#8b5cf6",
  legendary: "#f59e0b",
  mythic: "#ec4899",
};

export function HorizontalLiveDrops() {
  const [drops, setDrops] = useState<LiveDrop[]>(mockDrops);

  // Simulate new drops
  useEffect(() => {
    const interval = setInterval(() => {
      const newDrop: LiveDrop = {
        id: Date.now(),
        user: ["Alex", "Jordan", "Sam", "Taylor", "Morgan", "Casey"][Math.floor(Math.random() * 6)],
        item: ["Gaming Headset", "Keyboard", "Mouse", "Headphones", "Watch"][Math.floor(Math.random() * 5)],
        value: Math.random() * 200 + 10,
        rarity: ["rare", "epic", "legendary", "mythic"][Math.floor(Math.random() * 4)] as any,
        time: "Just now",
      };
      setDrops((prev) => [newDrop, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="sticky top-16 z-40 border-b py-3 backdrop-blur-md"
      style={{
        background: 'rgba(250, 250, 250, 0.8)',
        borderColor: 'var(--lootbox-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 overflow-hidden">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--lootbox-green)' }}
            />
            
          </div>

          {/* Scrolling drops */}
          <div className="flex-1 overflow-hidden relative" style={{ overflowX: 'hidden' }}>
            <motion.div 
              className="flex gap-4"
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop" 
              }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {[...drops, ...drops].map((drop, index) => (
                <div
                  key={`${drop.id}-${index}`}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg flex-shrink-0"
                  style={{
                    background: 'var(--lootbox-bg-card)',
                    border: '1px solid var(--lootbox-border)',
                  }}
                >
                  {/* User avatar */}
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--lootbox-blue-primary)',
                      color: 'white',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                    }}
                  >
                    {drop.user.charAt(0)}
                  </div>

                  {/* Drop info */}
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--lootbox-text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      {drop.user}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--lootbox-text-secondary)',
                      }}
                    >
                      won
                    </span>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        color: rarityColors[drop.rarity],
                        fontWeight: 600,
                      }}
                    >
                      {drop.item}
                    </span>
                  </div>

                  {/* Value */}
                  <div
                    className="px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--lootbox-bg-tertiary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--lootbox-green)',
                    }}
                  >
                    ${drop.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}