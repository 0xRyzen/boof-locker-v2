import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Circle } from "lucide-react";

interface LiveDrop {
  id: string;
  user: string;
  item: string;
  value: number;
  timestamp: Date;
}

const generateMockDrop = (): LiveDrop => {
  const users = ["Alex", "Sarah", "Mike", "Emma", "David", "Lisa", "Tom", "Kate"];
  const items = [
    { name: "Gaming Headset", value: 28.50 },
    { name: "Wireless Earbuds", value: 65.00 },
    { name: "Mechanical Keyboard", value: 35.00 },
    { name: "Designer Watch", value: 34.50 },
    { name: "Gaming Mouse", value: 12.00 },
    { name: "Limited Sneakers", value: 58.00 },
  ];
  
  const item = items[Math.floor(Math.random() * items.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    user,
    item: item.name,
    value: item.value,
    timestamp: new Date(),
  };
};

export function MinimalLiveDrops() {
  const [drops, setDrops] = useState<LiveDrop[]>(() => 
    Array.from({ length: 8 }, generateMockDrop)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) => {
        const newDrop = generateMockDrop();
        return [newDrop, ...prev].slice(0, 12);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed left-0 top-16 bottom-0 w-72 border-r overflow-hidden z-30 hidden xl:block"
      style={{
        background: 'var(--lootbox-bg-primary)',
        borderColor: 'var(--lootbox-border)',
      }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-6 py-4 border-b"
        style={{
          background: 'var(--lootbox-bg-primary)',
          borderColor: 'var(--lootbox-border)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Circle 
            className="w-2 h-2 fill-current animate-pulse" 
            style={{ color: 'var(--lootbox-red)' }}
          />
          <h2 
            style={{
              color: 'var(--lootbox-text-primary)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Live Drops
          </h2>
        </div>
        <p 
          style={{
            color: 'var(--lootbox-text-secondary)',
            fontSize: '0.6875rem',
          }}
        >
          Real-time unboxing
        </p>
      </div>

      {/* Drops List */}
      <div 
        className="overflow-y-auto h-full pb-32"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <AnimatePresence mode="popLayout">
          {drops.map((drop) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b"
              style={{
                borderColor: 'var(--lootbox-border)',
              }}
            >
              <div className="px-6 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span 
                    style={{
                      color: 'var(--lootbox-text-primary)',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                    }}
                  >
                    {drop.user}
                  </span>
                  <span 
                    style={{
                      color: 'var(--lootbox-green)',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                    }}
                  >
                    ${drop.value.toFixed(2)}
                  </span>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
