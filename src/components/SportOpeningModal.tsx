import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
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

    // Generate roll items (100 items for smoother animation)
    const items: LootboxItem[] = [];
    for (let i = 0; i < 100; i++) {
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
    
    // Place winner at position 95 (near the end)
    items[95] = winner;
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
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 6000);
  };

  const handleClose = () => {
    if (phase === "opening") return; // Prevent closing during animation
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
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      style={{ 
        background: 'rgba(0, 0, 0, 0.85)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-6xl mx-4"
        style={{ 
          background: 'var(--lootbox-bg-primary)',
          border: '1px solid var(--lootbox-border)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={phase === "opening"}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-opacity-80"
          style={{ 
            background: 'var(--lootbox-bg-tertiary)',
            color: 'var(--lootbox-text-secondary)',
            opacity: phase === "opening" ? 0.3 : 1,
            cursor: phase === "opening" ? 'not-allowed' : 'pointer',
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {/* Opening Phase */}
          {phase === "opening" && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              {/* Rolling Container */}
              <div className="relative h-48 overflow-hidden mb-8">
                {/* Center Selector Line */}
                <div 
                  className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-10"
                  style={{ 
                    background: 'linear-gradient(to bottom, transparent, var(--lootbox-blue-primary) 20%, var(--lootbox-blue-primary) 80%, transparent)',
                    boxShadow: '0 0 20px var(--lootbox-blue-primary)',
                  }}
                />

                {/* Rolling Items Track */}
                <div className="relative h-full">
                  <motion.div
                    className="flex gap-4 h-full items-center absolute left-0"
                    style={{ paddingLeft: 'calc(50vw - 64px)' }}
                    initial={{ x: 0 }}
                    animate={{ x: -(95 * 136) }}
                    transition={{ 
                      duration: 5.5, 
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {rollItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-32 h-full rounded-lg flex flex-col items-center justify-center p-3 relative"
                        style={{
                          background: 'var(--lootbox-bg-secondary)',
                          border: '1px solid var(--lootbox-border)',
                        }}
                      >
                        {/* Item Image */}
                        <div className="w-20 h-20 flex items-center justify-center mb-2">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Item Info */}
                        <div 
                          className="text-xs text-center truncate w-full"
                          style={{ 
                            color: 'var(--lootbox-text-secondary)',
                            fontSize: '0.625rem',
                          }}
                        >
                          {item.name}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Opening Message */}
              <div className="text-center">
                <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>
                  Opening {lootbox.name}...
                </p>
              </div>
            </motion.div>
          )}

          {/* Result Phase */}
          {phase === "result" && wonItem && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <motion.h2 
                  style={{ 
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--lootbox-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  You Won!
                </motion.h2>
              </div>

              {/* Won Item Display */}
              <motion.div 
                className="max-w-md mx-auto mb-8 rounded-xl p-8"
                style={{
                  background: 'var(--lootbox-bg-secondary)',
                  border: '1px solid var(--lootbox-border)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Item Image */}
                <div className="w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-6"
                  style={{ background: 'var(--lootbox-bg-tertiary)' }}
                >
                  <img 
                    src={wonItem.image}
                    alt={wonItem.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>
                
                {/* Item Details */}
                <div className="text-center space-y-3">
                  <h3 
                    style={{ 
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--lootbox-text-primary)',
                    }}
                  >
                    {wonItem.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-6">
                    <div>
                      <div 
                        style={{ 
                          fontSize: '0.75rem',
                          color: 'var(--lootbox-text-secondary)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        VALUE
                      </div>
                      <div 
                        style={{ 
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'var(--lootbox-green)',
                        }}
                      >
                        ${wonItem.value.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="w-px h-12" style={{ background: 'var(--lootbox-border)' }} />
                    
                    <div>
                      <div 
                        style={{ 
                          fontSize: '0.75rem',
                          color: 'var(--lootbox-text-secondary)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        RARITY
                      </div>
                      <div 
                        className="px-3 py-1 rounded"
                        style={{ 
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--lootbox-text-primary)',
                          textTransform: 'uppercase',
                          background: 'var(--lootbox-bg-tertiary)',
                        }}
                      >
                        {wonItem.rarity}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-6 py-2 rounded-lg"
                  style={{ 
                    borderColor: 'var(--lootbox-border)',
                    background: 'transparent',
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={handleOpenAgain}
                  disabled={!canOpen || balance < lootbox.price}
                  className="px-6 py-2 rounded-lg"
                  style={{ 
                    background: canOpen && balance >= lootbox.price ? 'var(--lootbox-blue-primary)' : 'var(--lootbox-bg-tertiary)',
                    color: 'white',
                    border: 'none',
                    opacity: canOpen && balance >= lootbox.price ? 1 : 0.5,
                  }}
                >
                  Open Another (${lootbox.price})
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Preview Phase */}
          {phase === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid var(--lootbox-border)' }}>
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: 'var(--lootbox-bg-secondary)' }}>
                  <img 
                    src={lootbox.image}
                    alt={lootbox.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--lootbox-text-primary)',
                    marginBottom: '0.25rem',
                  }}>
                    {lootbox.name}
                  </h2>
                  <p style={{ 
                    fontSize: '1.125rem',
                    color: 'var(--lootbox-text-secondary)',
                    fontWeight: 600,
                  }}>
                    ${lootbox.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={handleOpen}
                  disabled={balance < lootbox.price || !canOpen}
                  className="px-8 py-3 rounded-lg"
                  style={{ 
                    background: balance < lootbox.price || !canOpen ? 'var(--lootbox-bg-tertiary)' : 'var(--lootbox-blue-primary)',
                    color: 'white',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    opacity: balance < lootbox.price || !canOpen ? 0.5 : 1,
                  }}
                >
                  Open Case
                </Button>
              </div>

              {/* Items Grid */}
              <div>
                <h3 style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--lootbox-text-secondary)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Contains {lootbox.items.length} Items
                </h3>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {lootbox.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="relative group"
                    >
                      <div 
                        className="aspect-square rounded-lg p-3 flex flex-col items-center justify-center transition-all hover:scale-105"
                        style={{
                          background: 'var(--lootbox-bg-secondary)',
                          border: '1px solid var(--lootbox-border)',
                        }}
                      >
                        {/* Item Image */}
                        <div className="w-full h-3/4 flex items-center justify-center mb-2">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Item Name */}
                        <div 
                          className="text-xs text-center truncate w-full"
                          style={{ 
                            color: 'var(--lootbox-text-secondary)',
                            fontSize: '0.625rem',
                          }}
                        >
                          {item.name}
                        </div>
                      </div>

                      {/* Price */}
                      <div 
                        className="text-center mt-1"
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--lootbox-green)',
                          fontWeight: 600,
                        }}
                      >
                        ${item.value.toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
