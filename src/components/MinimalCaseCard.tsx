import { motion } from "motion/react";
import type { Lootbox } from "../App";

// Helper to convert image URLs to PNG
const toPng = (url: string) => url.replace(/fm=jpg/g, 'fm=png');

interface MinimalCaseCardProps {
  lootbox: Lootbox;
  index: number;
  delay: number;
  onClick: () => void;
}

export function MinimalCaseCard({ lootbox, index, delay, onClick }: MinimalCaseCardProps) {
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
        className="relative overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: 'var(--lootbox-bg-card)',
          border: '1px solid var(--lootbox-border)',
        }}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
          <motion.img
            src={toPng(lootbox.image)}
            alt={lootbox.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Subtle overlay on hover */}
          <div 
            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="mb-2 truncate"
            style={{
              color: 'var(--lootbox-text-primary)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              lineHeight: 1.4,
            }}
          >
            {lootbox.name}
          </h3>

          <div className="flex items-center justify-between">
            <div
              style={{
                color: 'var(--lootbox-blue-primary)',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.01em',
              }}
            >
              ${lootbox.price.toFixed(2)}
            </div>
            
            {lootbox.featured && (
              <div
                className="px-2 py-1 rounded-md text-xs"
                style={{
                  background: 'var(--lootbox-bg-tertiary)',
                  color: 'var(--lootbox-text-secondary)',
                  fontWeight: 600,
                }}
              >
                HOT
              </div>
            )}
          </div>
        </div>

        {/* Hover effect border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: '2px solid var(--lootbox-blue-primary)',
          }}
        />
      </div>
    </motion.button>
  );
}