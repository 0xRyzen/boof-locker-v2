import { useState } from "react";
import { Package, DollarSign, Trash2, Filter, TrendingUp, Grid3x3, List } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import type { LootboxItem } from "../App";

interface InventoryPageProps {
  inventory: LootboxItem[];
  removeFromInventory: (itemId: string) => void;
  setBalance: (balance: number) => void;
}

const rarityColors = {
  mythic: { bg: "#ff4757", glow: "rgba(255, 71, 87, 0.3)", name: "Mythic" },
  legendary: { bg: "#ffd700", glow: "rgba(255, 215, 0, 0.3)", name: "Legendary" },
  epic: { bg: "#a855f7", glow: "rgba(168, 85, 247, 0.3)", name: "Epic" },
  rare: { bg: "#1e90ff", glow: "rgba(30, 144, 255, 0.3)", name: "Rare" },
  common: { bg: "#64748b", glow: "rgba(100, 116, 139, 0.2)", name: "Common" },
};

export function InventoryPage({
  inventory,
  removeFromInventory,
  setBalance,
}: InventoryPageProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "value" | "rarity">("recent");

  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const selectedValue = inventory
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.value, 0);

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSellSelected = () => {
    if (selectedItems.length === 0) return;
    
    selectedItems.forEach(id => removeFromInventory(id));
    setBalance(prev => prev + selectedValue);
    setSelectedItems([]);
  };

  const filteredInventory = inventory.filter(item =>
    filterRarity === "all" ? true : item.rarity === filterRarity
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === "value") return b.value - a.value;
    if (sortBy === "rarity") {
      const rarityOrder = { mythic: 5, legendary: 4, epic: 3, rare: 2, common: 1 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }
    return 0; // recent (default order)
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-white mb-2" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            My Inventory
          </h1>
          <p style={{ color: 'var(--lootbox-text-secondary)' }}>
            Manage and sell your items
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg lootbox-gradient-blue flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Total Items</div>
              <div className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{inventory.length}</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
              <DollarSign className="w-6 h-6" style={{ color: 'var(--lootbox-green)' }} />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Total Value</div>
              <div style={{ color: 'var(--lootbox-green)', fontSize: '1.75rem', fontWeight: 700 }}>
                ${totalValue.toFixed(2)}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--lootbox-blue-primary)' }} />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Selected</div>
              <div className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{selectedItems.length}</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
              <DollarSign className="w-6 h-6" style={{ color: 'var(--lootbox-teal-primary)' }} />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Sel. Value</div>
              <div style={{ color: 'var(--lootbox-teal-primary)', fontSize: '1.75rem', fontWeight: 700 }}>
                ${selectedValue.toFixed(2)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Items" },
            { id: "mythic", label: "Mythic" },
            { id: "legendary", label: "Legendary" },
            { id: "epic", label: "Epic" },
            { id: "rare", label: "Rare" },
            { id: "common", label: "Common" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterRarity(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                filterRarity === filter.id
                  ? "text-white lootbox-gradient-blue"
                  : "text-gray-400 hover:text-white"
              }`}
              style={filterRarity === filter.id ? {} : {
                background: 'var(--lootbox-bg-tertiary)',
                borderColor: 'var(--lootbox-border)'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort & View */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-lg text-white border transition-all outline-none"
            style={{
              background: 'var(--lootbox-bg-tertiary)',
              borderColor: 'var(--lootbox-border)'
            }}
          >
            <option value="recent">Most Recent</option>
            <option value="value">Highest Value</option>
            <option value="rarity">Rarity</option>
          </select>

          <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-all ${viewMode === "grid" ? "lootbox-gradient-blue" : ""}`}
            >
              <Grid3x3 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-all ${viewMode === "list" ? "lootbox-gradient-blue" : ""}`}
            >
              <List className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Sell Selected Bar */}
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 xl:bottom-4 left-4 right-4 z-30 mx-auto max-w-4xl"
        >
          <div className="lootbox-card p-6 lootbox-glow-blue">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg lootbox-gradient-blue flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white" style={{ fontWeight: 700 }}>
                    {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
                  </div>
                  <div style={{ color: 'var(--lootbox-green)', fontWeight: 600 }}>
                    Total value: ${selectedValue.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedItems([])}
                  variant="outline"
                  className="border"
                  style={{ borderColor: 'var(--lootbox-border)' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSellSelected}
                  className="px-6 lootbox-gradient-blue hover:opacity-90 text-white border-0"
                  style={{ fontWeight: 700 }}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sell Selected
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Inventory Grid/List */}
      {sortedInventory.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--lootbox-text-muted)' }} />
          <h3 className="text-white mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {filterRarity === "all" ? "No items in inventory" : `No ${filterRarity} items`}
          </h3>
          <p style={{ color: 'var(--lootbox-text-secondary)' }}>
            {filterRarity === "all" 
              ? "Open some cases to start collecting items"
              : "Try adjusting your filters"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedInventory.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className={`relative cursor-pointer lootbox-card overflow-hidden transition-all ${
                selectedItems.includes(item.id) ? "ring-2" : ""
              }`}
              onClick={() => toggleItem(item.id)}
              style={selectedItems.includes(item.id) ? {
                ringColor: rarityColors[item.rarity].bg
              } : {}}
            >
              {/* Rarity Border */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: rarityColors[item.rarity].bg }} />
              
              <div className="p-5 space-y-4">
                {/* Item Display */}
                <div className="aspect-square rounded-xl flex items-center justify-center border" style={{
                  background: `${rarityColors[item.rarity].bg}10`,
                  borderColor: rarityColors[item.rarity].bg,
                }}>
                  <Package className="w-16 h-16" style={{ color: rarityColors[item.rarity].bg }} />
                </div>

                {/* Item Info */}
                <div>
                  <div className="text-white mb-2 truncate" style={{ fontWeight: 700 }}>{item.name}</div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span style={{ color: rarityColors[item.rarity].bg, fontWeight: 600 }}>
                      {rarityColors[item.rarity].name}
                    </span>
                    <span style={{ color: 'var(--lootbox-green)', fontWeight: 700 }}>
                      ${item.value.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--lootbox-text-muted)' }}>{item.category}</div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromInventory(item.id);
                      setBalance(prev => prev + item.value);
                    }}
                    className="flex-1 py-2 text-sm lootbox-gradient-blue hover:opacity-90 text-white border-0"
                    style={{ fontWeight: 600 }}
                  >
                    <DollarSign className="w-3 h-3 mr-1" />
                    Sell
                  </Button>
                </div>
              </div>

              {/* Selected Overlay */}
              {selectedItems.includes(item.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{
                  background: rarityColors[item.rarity].bg,
                  fontWeight: 700
                }}>
                  ✓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedInventory.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 4 }}
              className={`lootbox-card p-4 cursor-pointer transition-all ${
                selectedItems.includes(item.id) ? "ring-2" : ""
              }`}
              onClick={() => toggleItem(item.id)}
              style={selectedItems.includes(item.id) ? {
                ringColor: rarityColors[item.rarity].bg
              } : {}}
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selectedItems.includes(item.id) ? "text-white" : ""
                }`} style={{
                  borderColor: selectedItems.includes(item.id) ? rarityColors[item.rarity].bg : 'var(--lootbox-border)',
                  background: selectedItems.includes(item.id) ? rarityColors[item.rarity].bg : 'transparent'
                }}>
                  {selectedItems.includes(item.id) && <span className="text-xs">✓</span>}
                </div>

                {/* Item Icon */}
                <div className="w-14 h-14 rounded-lg flex items-center justify-center border flex-shrink-0" style={{
                  background: `${rarityColors[item.rarity].bg}10`,
                  borderColor: rarityColors[item.rarity].bg,
                }}>
                  <Package className="w-7 h-7" style={{ color: rarityColors[item.rarity].bg }} />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate mb-1" style={{ fontWeight: 700 }}>{item.name}</div>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ color: rarityColors[item.rarity].bg, fontWeight: 600 }}>
                      {rarityColors[item.rarity].name}
                    </span>
                    <span style={{ color: 'var(--lootbox-text-muted)' }}>•</span>
                    <span style={{ color: 'var(--lootbox-text-secondary)' }}>{item.category}</span>
                  </div>
                </div>

                {/* Value & Actions */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div style={{ color: 'var(--lootbox-green)', fontSize: '1.25rem', fontWeight: 700 }}>
                      ${item.value.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromInventory(item.id);
                      setBalance(prev => prev + item.value);
                    }}
                    className="lootbox-gradient-blue hover:opacity-90 text-white border-0"
                    style={{ fontWeight: 600 }}
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    Sell
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
