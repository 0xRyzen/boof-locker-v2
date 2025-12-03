import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Radio, Zap } from "lucide-react";

interface Drop {
  id: string;
  user: string;
  item: string;
  value: number;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  case: string;
  timestamp: number;
}

const mockDrops: Omit<Drop, "id" | "timestamp">[] = [
  { user: "CryptoKing", item: "Premium Gaming Headset", value: 28.50, rarity: "legendary", case: "Hyper Strike" },
  { user: "LootMaster", item: "Premium Wireless Earbuds", value: 65.00, rarity: "mythic", case: "Tech Master" },
  { user: "xPlayer99", item: "Limited Edition Sneakers", value: 58.00, rarity: "legendary", case: "Street Supreme" },
  { user: "GamerPro", item: "Next-Gen Console", value: 125.00, rarity: "mythic", case: "Console Elite" },
  { user: "WinnerX", item: "Studio Headphones", value: 48.00, rarity: "legendary", case: "Audio Premium" },
  { user: "LuckyOne", item: "Luxury Timepiece", value: 250.00, rarity: "mythic", case: "Luxury Collection" },
];

const rarityColors = {
  mythic: "#ff4757",
  legendary: "#ffd700",
  epic: "#a855f7",
  rare: "#1e90ff",
  common: "#64748b",
};

export function LiveDrops() {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    // Add initial drops
    const initialDrops = mockDrops.slice(0, 6).map((drop, index) => ({
      ...drop,
      id: `drop-${Date.now()}-${index}`,
      timestamp: Date.now() - index * 3000,
    }));
    setDrops(initialDrops);

    // Simulate new drops
    const interval = setInterval(() => {
      const randomDrop = mockDrops[Math.floor(Math.random() * mockDrops.length)];
      const newDrop: Drop = {
        ...randomDrop,
        id: `drop-${Date.now()}`,
        timestamp: Date.now(),
      };
      
      setDrops(prev => [newDrop, ...prev].slice(0, 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl lootbox-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg lootbox-gradient-blue flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full lootbox-pulse-glow" style={{ background: 'var(--lootbox-red)' }} />
          </div>
          <div>
            <h3 className="text-white" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Live Unboxings</h3>
            <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Real-time player wins</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid rgba(0, 255, 136, 0.2)'
        }}>
          <div className="w-2 h-2 rounded-full lootbox-pulse-glow" style={{ background: 'var(--lootbox-green)' }} />
          <span style={{ color: 'var(--lootbox-green)', fontSize: '0.875rem', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {drops.map((drop) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg p-4 border transition-all hover:border-opacity-100"
              style={{
                background: 'var(--lootbox-bg-secondary)',
                borderColor: 'var(--lootbox-border)'
              }}
            >
              {/* Rarity Accent */}
              <div className="absolute top-0 left-0 bottom-0 w-1" style={{
                background: rarityColors[drop.rarity],
                boxShadow: `0 0 10px ${rarityColors[drop.rarity]}`
              }} />
              
              <div className="flex items-center gap-4 ml-3">
                {/* User Avatar */}
                <div className="flex-shrink-0 w-11 h-11 rounded-lg lootbox-gradient-blue flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                  {drop.user[0]}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white truncate" style={{ fontWeight: 600 }}>{drop.user}</span>
                    <span style={{ color: 'var(--lootbox-text-muted)' }}>unboxed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="truncate" style={{ color: rarityColors[drop.rarity], fontWeight: 600 }}>
                      {drop.item}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--lootbox-text-muted)' }}>
                    <span>from</span>
                    <span style={{ color: 'var(--lootbox-text-secondary)' }}>{drop.case}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="flex-shrink-0 text-right">
                  <div className="px-3 py-1.5 rounded-lg" style={{
                    background: 'rgba(0, 255, 136, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.2)'
                  }}>
                    <div style={{ color: 'var(--lootbox-green)', fontWeight: 700, fontSize: '1.125rem' }}>
                      ${drop.value.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs capitalize mt-1" style={{ 
                    color: rarityColors[drop.rarity],
                    fontWeight: 600
                  }}>
                    <Zap className="w-3 h-3 inline mr-1" />
                    {drop.rarity}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
