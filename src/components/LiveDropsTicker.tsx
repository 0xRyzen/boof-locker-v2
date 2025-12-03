import { motion, useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Drop {
  id: number;
  username: string;
  item: string;
  value: number;
  avatar: string;
  itemImage: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const MOCK_DROPS: Drop[] = [
  { id: 1, username: "ProGamer99", item: "Dragon Lore AWP", value: 1247.50, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", itemImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop", rarity: 'legendary' },
  { id: 2, username: "LuckyCharm", item: "Golden Knife", value: 890.25, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", itemImage: "https://images.unsplash.com/photo-1592840062661-773f94e4df05?w=100&h=100&fit=crop", rarity: 'epic' },
  { id: 3, username: "CaseKing", item: "Rare Skin Pack", value: 456.80, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", itemImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop", rarity: 'rare' },
  { id: 4, username: "DropMaster", item: "Elite Gloves", value: 678.90, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", itemImage: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=100&h=100&fit=crop", rarity: 'epic' },
  { id: 5, username: "XxNoobSlayerxX", item: "Butterfly Knife", value: 1500.00, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", itemImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop", rarity: 'legendary' },
  { id: 6, username: "SneakyNinja", item: "Neon Rider M4A4", value: 345.60, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6", itemImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop", rarity: 'rare' },
  { id: 7, username: "GhostReaper", item: "Asiimov Collection", value: 789.40, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7", itemImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=100&h=100&fit=crop", rarity: 'epic' },
  { id: 8, username: "SilverFox", item: "Rare Sticker Set", value: 234.20, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8", itemImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=100&h=100&fit=crop", rarity: 'common' },
  { id: 9, username: "DiamondHands", item: "Karambit Fade", value: 2100.00, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9", itemImage: "https://images.unsplash.com/photo-1589652717406-1c69efaf1ff8?w=100&h=100&fit=crop", rarity: 'legendary' },
  { id: 10, username: "SpeedDemon", item: "Lightning AK-47", value: 567.30, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10", itemImage: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?w=100&h=100&fit=crop", rarity: 'epic' },
];

const rarityColors = {
  common: '#94a3b8',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b'
};

export function LiveDropsTicker() {
  const [position, setPosition] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate drops for seamless loop
  const drops = [...MOCK_DROPS, ...MOCK_DROPS, ...MOCK_DROPS];

  useAnimationFrame((t, delta) => {
    setPosition((prev) => {
      const newPosition = prev - (delta * 0.05); // Adjust speed here (higher = faster)
      // Reset when first set of drops is off screen
      if (Math.abs(newPosition) >= (MOCK_DROPS.length * 320)) {
        return 0;
      }
      return newPosition;
    });
  });

  return (
    <div className="relative overflow-hidden py-2" style={{ background: 'var(--lootbox-bg-secondary)' }}>
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{
        background: 'linear-gradient(to right, var(--lootbox-bg-secondary), transparent)'
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{
        background: 'linear-gradient(to left, var(--lootbox-bg-secondary), transparent)'
      }} />

      {/* Ticker Container */}
      <motion.div
        ref={tickerRef}
        className="flex gap-4"
        style={{
          x: position,
        }}
      >
        {drops.map((drop, index) => (
          <DropCard key={`${drop.id}-${index}`} drop={drop} />
        ))}
      </motion.div>
    </div>
  );
}

function DropCard({ drop }: { drop: Drop }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex-shrink-0 rounded-lg p-2 flex items-center gap-2"
      style={{
        width: '280px',
        background: 'var(--lootbox-bg-card)',
        border: `1px solid ${rarityColors[drop.rarity]}30`,
        boxShadow: `0 4px 12px ${rarityColors[drop.rarity]}15`
      }}
    >
      {/* User Avatar */}
      <div className="relative">
        <ImageWithFallback
          src={drop.avatar}
          alt={drop.username}
          className="w-9 h-9 rounded-full"
          style={{ border: '2px solid var(--lootbox-border)' }}
        />
        <div 
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
          style={{ 
            background: rarityColors[drop.rarity],
            borderColor: 'var(--lootbox-bg-card)'
          }}
        />
      </div>

      {/* Drop Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p 
            className="truncate"
            style={{
              color: 'var(--lootbox-text-primary)',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            {drop.username}
          </p>
          <span style={{ color: 'var(--lootbox-text-tertiary)', fontSize: '0.6875rem' }}>won</span>
        </div>
        <p 
          className="truncate"
          style={{
            color: rarityColors[drop.rarity],
            fontSize: '0.6875rem',
            fontWeight: 600,
            marginTop: '1px'
          }}
        >
          {drop.item}
        </p>
      </div>

      {/* Item Image & Value */}
      <div className="flex items-center gap-1.5">
        <ImageWithFallback
          src={drop.itemImage}
          alt={drop.item}
          className="w-9 h-9 rounded object-cover"
          style={{ border: `1px solid ${rarityColors[drop.rarity]}50` }}
        />
        <div 
          className="px-1.5 py-0.5 rounded"
          style={{
            background: 'var(--lootbox-green)20',
            color: 'var(--lootbox-green)',
            fontSize: '0.6875rem',
            fontWeight: 700
          }}
        >
          ${drop.value.toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
}
