import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, Package, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import type { Lootbox, LootboxItem } from "../App";
import confetti from "canvas-confetti";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OpeningModalProps {
  lootbox: Lootbox;
  onClose: () => void;
  balance: number;
  setBalance: (balance: number) => void;
  addToInventory: (item: LootboxItem) => void;
}

const rarityColors = {
  mythic: { bg: "#ff4757", glow: "rgba(255, 71, 87, 0.5)", name: "Mythic" },
  legendary: { bg: "#ffd700", glow: "rgba(255, 215, 0, 0.5)", name: "Legendary" },
  epic: { bg: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", name: "Epic" },
  rare: { bg: "#1e90ff", glow: "rgba(30, 144, 255, 0.5)", name: "Rare" },
  common: { bg: "#64748b", glow: "rgba(100, 116, 139, 0.5)", name: "Common" },
};

export function OpeningModal({
  lootbox,
  onClose,
  balance,
  setBalance,
  addToInventory,
}: OpeningModalProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<LootboxItem | null>(null);
  const [rollItems, setRollItems] = useState<LootboxItem[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleOpen = () => {
    if (balance < lootbox.price) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(balance - lootbox.price);
    setIsOpening(true);

    // Generate roll items (duplicate items for rolling effect)
    const items: LootboxItem[] = [];
    for (let i = 0; i < 50; i++) {
      items.push(lootbox.items[Math.floor(Math.random() * lootbox.items.length)]);
    }

    // Determine winner (weighted by rarity)
    const rarityWeights = {
      mythic: 1,
      legendary: 5,
      epic: 15,
      rare: 30,
      common: 49,
    };

    const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    let selectedRarity: keyof typeof rarityWeights = "common";

    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      random -= weight;
      if (random <= 0) {
        selectedRarity = rarity as keyof typeof rarityWeights;
        break;
      }
    }

    const eligibleItems = lootbox.items.filter(item => item.rarity === selectedRarity);
    const winner = eligibleItems[Math.floor(Math.random() * eligibleItems.length)] || lootbox.items[0];
    
    // Place winner near the end
    items[45] = winner;
    setRollItems(items);
    setWonItem(winner);

    // Show result after animation
    setTimeout(() => {
      setShowResult(true);
      addToInventory(winner);
      
      // Trigger confetti for rare items
      if (winner.rarity === "legendary" || winner.rarity === "mythic") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [rarityColors[winner.rarity].bg],
        });
      }
    }, 5000);
  };

  const handleClose = () => {
    setIsOpening(false);
    setShowResult(false);
    setWonItem(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl lootbox-card p-6 md:p-8"
          style={{ background: 'var(--lootbox-bg-secondary)' }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            style={{ background: 'var(--lootbox-bg-tertiary)' }}
          >
            <X className="w-5 h-5" />
          </button>

          {!isOpening && !showResult && (
            <div className="space-y-6">
              {/* Case Info */}
              <div className="text-center space-y-4">
                <div className="relative w-64 h-64 mx-auto">
                  <ImageWithFallback
                    src={lootbox.image}
                    alt={lootbox.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl" style={{
                    background: 'linear-gradient(to top, var(--lootbox-bg-secondary), transparent 50%)',
                  }} />
                </div>
                <h2 className="text-white" style={{ fontSize: '2rem', fontWeight: 700 }}>{lootbox.name}</h2>
                <p style={{ color: 'var(--lootbox-text-secondary)' }}>
                  Open this case to win one of {lootbox.items.length} exclusive items
                </p>
              </div>

              {/* Items Grid */}
              <div>
                <h3 className="text-white mb-4" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Possible Items</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                  {lootbox.items.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-xl border transition-all hover:border-opacity-100"
                      style={{
                        background: 'var(--lootbox-bg-card)',
                        borderColor: rarityColors[item.rarity].bg,
                        overflow: 'hidden'
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: rarityColors[item.rarity].bg }} />
                      <div className="p-4 space-y-2">
                        <div className="aspect-square rounded-lg flex items-center justify-center" style={{
                          background: `${rarityColors[item.rarity].bg}20`,
                        }}>
                          <Package className="w-8 h-8" style={{ color: rarityColors[item.rarity].bg }} />
                        </div>
                        <div className="text-xs text-white truncate" style={{ fontWeight: 600 }}>{item.name}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: rarityColors[item.rarity].bg, fontWeight: 600 }}>{rarityColors[item.rarity].name}</span>
                          <span style={{ color: 'var(--lootbox-green)', fontWeight: 600 }}>${item.value.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Button */}
              <div className="flex items-center justify-between p-6 rounded-xl" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
                <div>
                  <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Case Price</div>
                  <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>${lootbox.price.toFixed(2)}</div>
                </div>
                <Button
                  onClick={handleOpen}
                  disabled={balance < lootbox.price}
                  className="px-8 py-6 lootbox-gradient-blue hover:opacity-90 disabled:opacity-50 text-white border-0 shadow-lg"
                  style={{ fontWeight: 700 }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Open Case
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {isOpening && !showResult && (
            <div className="py-12">
              <h2 className="text-center text-white mb-8" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                Opening {lootbox.name}...
              </h2>
              
              {/* Rolling Animation */}
              <div className="relative h-48 overflow-hidden rounded-xl" style={{ background: 'var(--lootbox-bg-card)' }}>
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 z-10" style={{ background: 'var(--lootbox-blue-primary)' }} />
                
                {/* Rolling Items */}
                <motion.div
                  className="flex gap-4 h-full items-center px-4"
                  initial={{ x: 0 }}
                  animate={{ x: -((rollItems.length - 5) * 160) }}
                  transition={{ duration: 5, ease: "easeOut" }}
                >
                  {rollItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-36 h-36 rounded-xl border-2 flex flex-col items-center justify-center p-3"
                      style={{
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: rarityColors[item.rarity].bg,
                        boxShadow: `0 0 20px ${rarityColors[item.rarity].glow}`,
                      }}
                    >
                      <div className="w-16 h-16 rounded-lg mb-2 flex items-center justify-center" style={{
                        background: `${rarityColors[item.rarity].bg}20`,
                      }}>
                        <Package className="w-8 h-8" style={{ color: rarityColors[item.rarity].bg }} />
                      </div>
                      <div className="text-xs text-white text-center truncate w-full" style={{ fontWeight: 600 }}>
                        {item.name}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}

          {showResult && wonItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{
                background: `${rarityColors[wonItem.rarity].bg}20`,
                border: `2px solid ${rarityColors[wonItem.rarity].bg}`,
              }}>
                <TrendingUp className="w-4 h-4" style={{ color: rarityColors[wonItem.rarity].bg }} />
                <span style={{ color: rarityColors[wonItem.rarity].bg, fontWeight: 700 }}>
                  {rarityColors[wonItem.rarity].name.toUpperCase()} WIN!
                </span>
              </div>

              <h2 className="text-white mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                Congratulations!
              </h2>

              <div className="relative w-80 h-80 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl animate-pulse" style={{
                  background: `radial-gradient(circle, ${rarityColors[wonItem.rarity].glow}, transparent)`,
                }} />
                <div className="relative w-full h-full rounded-2xl border-4 flex flex-col items-center justify-center p-6" style={{
                  background: 'var(--lootbox-bg-card)',
                  borderColor: rarityColors[wonItem.rarity].bg,
                  boxShadow: `0 0 40px ${rarityColors[wonItem.rarity].glow}`,
                }}>
                  <div className="w-32 h-32 rounded-2xl mb-4 flex items-center justify-center" style={{
                    background: `${rarityColors[wonItem.rarity].bg}30`,
                  }}>
                    <Package className="w-16 h-16" style={{ color: rarityColors[wonItem.rarity].bg }} />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{wonItem.name}</h3>
                  <div className="text-2xl mb-2" style={{ color: 'var(--lootbox-green)', fontWeight: 700 }}>
                    ${wonItem.value.toFixed(2)}
                  </div>
                  <div className="text-sm" style={{ color: rarityColors[wonItem.rarity].bg, fontWeight: 600 }}>
                    {rarityColors[wonItem.rarity].name}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-6 py-3 border"
                  style={{ borderColor: 'var(--lootbox-border)' }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowResult(false);
                    setIsOpening(false);
                    setWonItem(null);
                  }}
                  className="px-6 py-3 lootbox-gradient-blue hover:opacity-90 text-white border-0"
                  style={{ fontWeight: 700 }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open Again
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}