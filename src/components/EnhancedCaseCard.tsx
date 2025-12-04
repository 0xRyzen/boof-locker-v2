import { motion } from "motion/react";
import type { Lootbox } from "../App";
import { Rocket } from "lucide-react";
import gamingCaseImage from "figma:asset/f5d7ac68abc5a92416dbc469acd0512f027f4c04.png";
import techCaseImage from "figma:asset/aa58e12f7e5d75870cf213d06af6a9cbee2c1033.png";

interface EnhancedCaseCardProps {
  lootbox: Lootbox;
  index: number;
  delay: number;
  onClick: () => void;
}

// Rarity levels with colors and amounts - varies by case
const getRarityLevels = (price: number) => {
  // Different rarity sets based on price
  if (price < 7) {
    return [
      { name: 'L', color: '#FDE047', borderColor: '#FACC15', glowColor: '#EAB308', bgColor: '#713F12', label: 'Legendary', amount: 29 },
      { name: 'E', color: '#C084FC', borderColor: '#A855F7', glowColor: '#9333EA', bgColor: '#581C87', label: 'Epic', amount: 17 },
      { name: 'R', color: '#60A5FA', borderColor: '#3B82F6', glowColor: '#2563EB', bgColor: '#1E3A8A', label: 'Rare', amount: 9 },
      { name: 'C', color: '#94A3B8', borderColor: '#64748B', glowColor: '#475569', bgColor: '#334155', label: 'Common', amount: 3 },
    ];
  } else if (price < 15) {
    return [
      { name: 'M', color: '#F472B6', borderColor: '#EC4899', glowColor: '#DB2777', bgColor: '#831843', label: 'Mythic', amount: 65 },
      { name: 'L', color: '#FDE047', borderColor: '#FACC15', glowColor: '#EAB308', bgColor: '#713F12', label: 'Legendary', amount: 42 },
      { name: 'E', color: '#C084FC', borderColor: '#A855F7', glowColor: '#9333EA', bgColor: '#581C87', label: 'Epic', amount: 23 },
      { name: 'R', color: '#60A5FA', borderColor: '#3B82F6', glowColor: '#2563EB', bgColor: '#1E3A8A', label: 'Rare', amount: 5 },
    ];
  } else {
    return [
      { name: 'L', color: '#FDE047', borderColor: '#FACC15', glowColor: '#EAB308', bgColor: '#713F12', label: 'Legendary', amount: 96 },
      { name: 'E', color: '#C084FC', borderColor: '#A855F7', glowColor: '#9333EA', bgColor: '#581C87', label: 'Epic', amount: 33 },
      { name: 'R', color: '#60A5FA', borderColor: '#3B82F6', glowColor: '#2563EB', bgColor: '#1E3A8A', label: 'Rare', amount: 15 },
      { name: 'C', color: '#94A3B8', borderColor: '#64748B', glowColor: '#475569', bgColor: '#334155', label: 'Common', amount: 6 },
    ];
  }
};

export function EnhancedCaseCard({ lootbox, index, delay, onClick }: EnhancedCaseCardProps) {
  // Calculate max win based on price
  const maxWin = (lootbox.price * 5.7).toFixed(2);
  const rarityLevels = getRarityLevels(lootbox.price);
  
  // Use different images based on category
  const caseImage = lootbox.category === 'tech' ? techCaseImage : gamingCaseImage;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4,
        ease: "easeOut"
      }}
      onClick={onClick}
      className="group relative w-full text-left"
    >
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-300 bg-card"
        style={{
          border: '1px solid var(--lootbox-border)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Trending Badge */}
        {lootbox.featured && (
          <div
            className="absolute top-3 left-3 z-10 px-2 py-1 rounded flex items-center gap-1"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 7L7 1M7 1H2M7 1V6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '0.5625rem',
                letterSpacing: '0.05em',
              }}
            >
              TRENDING
            </span>
          </div>
        )}

        {/* Image container - Full width, no padding */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <motion.img
            src={caseImage}
            alt={lootbox.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-3">
          {/* Case Name */}
          <h3
            className="truncate mb-2"
            style={{
              color: 'var(--lootbox-text-primary)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              lineHeight: 1.2,
            }}
          >
            {lootbox.name}
          </h3>

          {/* Max Win */}
          <div className="flex items-center gap-2 mb-2.5">
            <span
              style={{
                color: 'var(--lootbox-text-secondary)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              MAX WIN:
            </span>
            <span
              style={{
                color: 'var(--lootbox-text-primary)',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              ${maxWin}
            </span>
          </div>

          {/* Rarity Badges - Glass pane effect */}
          <div className="flex items-stretch gap-1 mb-2">
            {rarityLevels.map((rarity) => (
              <div
                key={rarity.name}
                className="relative flex-1 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  aspectRatio: '1',
                  background: `linear-gradient(145deg, ${rarity.bgColor}40 0%, rgba(0, 0, 0, 0.3) 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${rarity.borderColor}60`,
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Content - centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Letter */}
                  <span
                    style={{
                      color: rarity.color,
                      fontWeight: 900,
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {rarity.name}
                  </span>
                  {/* Amount */}
                  <span
                    style={{
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      marginTop: '4px',
                    }}
                  >
                    ${rarity.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Underglow bars - Compressed spacing to match boxes */}
          <div className="flex items-center gap-1 mb-3">
            {rarityLevels.map((rarity) => (
              <div
                key={`glow-${rarity.name}`}
                className="flex-1 rounded-full overflow-hidden"
                style={{
                  height: '4px',
                  background: `linear-gradient(90deg, ${rarity.glowColor} 0%, ${rarity.borderColor} 100%)`,
                }}
              />
            ))}
          </div>

          {/* Price and Open Button */}
          <div className="flex items-center justify-between pt-1">
            {/* Price - Left Aligned */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Rocket 
                  className="w-3 h-3" 
                  style={{ color: 'var(--lootbox-text-secondary)' }} 
                />
                <span
                  style={{
                    color: 'var(--lootbox-text-secondary)',
                    fontSize: '0.5625rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                  }}
                >
                  CASE PRICE
                </span>
              </div>
              <span
                style={{
                  color: 'var(--lootbox-blue-primary)',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                ${lootbox.price.toFixed(2)}
              </span>
            </div>
            
            {/* Open Button */}
            <motion.div
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 transition-all duration-200"
              style={{
                color: 'var(--lootbox-text-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.025em',
                cursor: 'pointer',
              }}
            >
              <span>OPEN</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Hover effect border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: '1px solid var(--lootbox-blue-primary)',
            boxShadow: '0 0 24px var(--lootbox-blue-primary)40',
          }}
        />
      </div>
    </motion.button>
  );
}