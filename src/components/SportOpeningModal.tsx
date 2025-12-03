import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import type { Lootbox, LootboxItem } from "../App";
import confetti from "canvas-confetti";

interface SportOpeningModalProps {
  lootbox: Lootbox;
  onClose: () => void;
  balance: number;
  setBalance: (balance: number) => void;
  addToInventory: (item: LootboxItem) => void;
}

const rarityColors = {
  mythic: "#ec4899",
  legendary: "#f59e0b",
  epic: "#8b5cf6",
  rare: "#3b82f6",
  common: "#94a3b8",
};

export function SportOpeningModal({
  lootbox,
  onClose,
  balance,
  setBalance,
  addToInventory,
}: SportOpeningModalProps) {
  const [phase, setPhase] = useState<"preview" | "opening" | "result">("preview");
  const [wonItem, setWonItem] = useState<LootboxItem | null>(null);
  const [rollItems, setRollItems] = useState<LootboxItem[]>([]);
  const [canOpen, setCanOpen] = useState(true);

  const handleOpen = () => {
    if (balance < lootbox.price) {
      alert("Insufficient balance!");
      return;
    }

    if (!canOpen) return;
    setCanOpen(false);

    setBalance(balance - lootbox.price);
    setPhase("opening");

    // Generate roll items
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
    
    items[45] = winner;
    setRollItems(items);
    setWonItem(winner);

    // Show result after animation
    setTimeout(() => {
      setPhase("result");
      addToInventory(winner);
      setCanOpen(true);
      
      // Trigger confetti for rare items
      if (winner.rarity === "legendary" || winner.rarity === "mythic") {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: [rarityColors[winner.rarity]],
        });
      }
    }, 4000);
  };

  const handleClose = () => {
    setPhase("preview");
    setWonItem(null);
    setRollItems([]);
    setCanOpen(true);
    onClose();
  };

  const handleOpenAgain = () => {
    setPhase("preview");
    setWonItem(null);
    setRollItems([]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      style={{ 
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ 
            background: 'var(--lootbox-bg-primary)',
            border: '1px solid var(--lootbox-border)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{ 
              background: 'var(--lootbox-bg-tertiary)',
              color: 'var(--lootbox-text-secondary)',
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Preview Phase */}
          {phase === "preview" && (
            <div className="p-8">
              {/* Case Header */}
              <div className="text-center mb-8">
                <h2 
                  className="mb-2"
                  style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  {lootbox.name}
                </h2>
                <p 
                  style={{ 
                    color: 'var(--lootbox-text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  {lootbox.items.length} possible items
                </p>
              </div>

              {/* Items Grid - Clean Layout */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {lootbox.items.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                    style={{
                      background: 'var(--lootbox-bg-secondary)',
                      border: '1px solid var(--lootbox-border)',
                    }}
                  >
                    {/* Rarity Indicator */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: rarityColors[item.rarity] }}
                    />
                    
                    {/* Item Content */}
                    <div className="p-3 space-y-2">
                      <div 
                        className="aspect-square rounded flex items-center justify-center mb-2"
                        style={{
                          background: 'var(--lootbox-bg-tertiary)',
                        }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ background: rarityColors[item.rarity] }}
                        />
                      </div>
                      <div 
                        className="text-xs truncate"
                        style={{ 
                          color: 'var(--lootbox-text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ 
                          color: 'var(--lootbox-green)',
                          fontWeight: 600,
                        }}
                      >
                        ${item.value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Open Button */}
              <div 
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'var(--lootbox-bg-secondary)' }}
              >
                <div>
                  <div 
                    style={{ 
                      color: 'var(--lootbox-text-secondary)',
                      fontSize: '0.75rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Price
                  </div>
                  <div 
                    style={{ 
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--lootbox-text-primary)',
                    }}
                  >
                    ${lootbox.price.toFixed(2)}
                  </div>
                </div>
                <Button
                  onClick={handleOpen}
                  disabled={balance < lootbox.price || !canOpen}
                  className="px-6 py-3 rounded-lg border-0"
                  style={{ 
                    background: balance < lootbox.price || !canOpen ? 'var(--lootbox-bg-tertiary)' : 'var(--lootbox-blue-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    opacity: balance < lootbox.price || !canOpen ? 0.5 : 1,
                  }}
                >
                  Open Pack
                </Button>
              </div>
            </div>
          )}

          {/* Opening Phase */}
          {phase === "opening" && (
            <div className="p-8">
              <h3 
                className="text-center mb-8"
                style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--lootbox-text-primary)',
                }}
              >
                Opening...
              </h3>
              
              {/* Minimal Rolling Animation */}
              <div 
                className="relative h-32 overflow-hidden rounded-xl mb-8"
                style={{ background: 'var(--lootbox-bg-secondary)' }}
              >
                {/* Center Indicator */}
                <div 
                  className="absolute left-1/2 top-0 bottom-0 w-0.5 -ml-px z-10"
                  style={{ background: 'var(--lootbox-blue-primary)' }}
                />
                
                {/* Rolling Items */}
                <motion.div
                  className="flex gap-3 h-full items-center px-3"
                  initial={{ x: 0 }}
                  animate={{ x: -((rollItems.length - 5) * 120) }}
                  transition={{ duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {rollItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-24 h-24 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'var(--lootbox-bg-tertiary)',
                        border: `1px solid ${rarityColors[item.rarity]}`,
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: rarityColors[item.rarity] }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}

          {/* Result Phase */}
          {phase === "result" && wonItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <h3 
                className="mb-6"
                style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--lootbox-text-primary)',
                }}
              >
                You won!
              </h3>

              {/* Won Item Card */}
              <div 
                className="relative w-64 mx-auto mb-8 rounded-xl overflow-hidden"
                style={{
                  background: 'var(--lootbox-bg-secondary)',
                  border: `2px solid ${rarityColors[wonItem.rarity]}`,
                }}
              >
                {/* Rarity Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: rarityColors[wonItem.rarity] }}
                />
                
                <div className="p-8 space-y-4">
                  {/* Icon */}
                  <div 
                    className="w-24 h-24 mx-auto rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'var(--lootbox-bg-tertiary)',
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full animate-pulse"
                      style={{ background: rarityColors[wonItem.rarity] }}
                    />
                  </div>
                  
                  {/* Item Name */}
                  <h4 
                    style={{ 
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--lootbox-text-primary)',
                    }}
                  >
                    {wonItem.name}
                  </h4>
                  
                  {/* Value & Rarity */}
                  <div className="flex items-center justify-center gap-3">
                    <span 
                      style={{ 
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--lootbox-green)',
                      }}
                    >
                      ${wonItem.value.toFixed(2)}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: rarityColors[wonItem.rarity],
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {wonItem.rarity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-6 py-2.5 rounded-lg"
                  style={{ 
                    borderColor: 'var(--lootbox-border)',
                    background: 'transparent',
                    color: 'var(--lootbox-text-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={handleOpenAgain}
                  disabled={!canOpen}
                  className="px-6 py-2.5 rounded-lg border-0"
                  style={{ 
                    background: canOpen ? 'var(--lootbox-blue-primary)' : 'var(--lootbox-bg-tertiary)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    opacity: canOpen ? 1 : 0.5,
                  }}
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
