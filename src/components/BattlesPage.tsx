import { useState } from "react";
import { Swords, Users, Trophy, Plus, Play, Eye, ChevronRight, Crown, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import type { LootboxItem } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Battle {
  id: string;
  name: string;
  mode: "1v1" | "2v2" | "1v1v1v1";
  caseName: string;
  caseImage: string;
  casePrice: number;
  rounds: number;
  totalValue: number;
  players: {
    id: string;
    name: string;
    avatar: string;
    value: number;
  }[];
  maxPlayers: number;
  status: "waiting" | "active" | "finished";
  createdBy: string;
}

const mockBattles: Battle[] = [
  {
    id: "1",
    name: "Epic Showdown",
    mode: "1v1",
    caseName: "Hyper Strike",
    caseImage: "https://images.unsplash.com/photo-1677086813101-496781a0f327?w=400",
    casePrice: 4.99,
    rounds: 3,
    totalValue: 29.94,
    maxPlayers: 2,
    status: "waiting",
    createdBy: "ProGamer",
    players: [
      { id: "1", name: "ProGamer", avatar: "P", value: 0 },
    ],
  },
  {
    id: "2",
    name: "Tech Warriors",
    mode: "2v2",
    caseName: "Tech Master",
    caseImage: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=400",
    casePrice: 12.99,
    rounds: 5,
    totalValue: 129.90,
    maxPlayers: 4,
    status: "active",
    createdBy: "TechKing",
    players: [
      { id: "1", name: "TechKing", avatar: "T", value: 45.50 },
      { id: "2", name: "GamerX", avatar: "G", value: 38.25 },
      { id: "3", name: "LootMaster", avatar: "L", value: 52.00 },
    ],
  },
  {
    id: "3",
    name: "Luxury Battle",
    mode: "1v1v1v1",
    caseName: "Luxury Collection",
    caseImage: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=400",
    casePrice: 59.99,
    rounds: 3,
    totalValue: 719.88,
    maxPlayers: 4,
    status: "finished",
    createdBy: "RichPlayer",
    players: [
      { id: "1", name: "RichPlayer", avatar: "R", value: 425.00 },
      { id: "2", name: "MoneyMaker", avatar: "M", value: 180.50 },
      { id: "3", name: "WealthWinner", avatar: "W", value: 95.38 },
      { id: "4", name: "CashCollector", avatar: "C", value: 19.00 },
    ],
  },
];

interface BattlesPageProps {
  balance: number;
  setBalance: (balance: number) => void;
  addToInventory: (item: LootboxItem) => void;
}

const modeColors = {
  "1v1": { bg: "var(--lootbox-blue-primary)", label: "1 vs 1" },
  "2v2": { bg: "var(--lootbox-teal-primary)", label: "2 vs 2" },
  "1v1v1v1": { bg: "var(--lootbox-purple)", label: "4 Players" },
};

const statusColors = {
  waiting: { bg: "rgba(255, 215, 0, 0.1)", border: "var(--lootbox-gold)", text: "var(--lootbox-gold)" },
  active: { bg: "rgba(0, 255, 136, 0.1)", border: "var(--lootbox-green)", text: "var(--lootbox-green)" },
  finished: { bg: "rgba(100, 116, 139, 0.1)", border: "var(--lootbox-text-muted)", text: "var(--lootbox-text-muted)" },
};

export function BattlesPage({ balance, setBalance, addToInventory }: BattlesPageProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "waiting" | "active" | "finished">("all");
  const [battles] = useState<Battle[]>(mockBattles);

  const filteredBattles = activeFilter === "all" 
    ? battles 
    : battles.filter(b => b.status === activeFilter);

  const handleJoinBattle = (battle: Battle) => {
    const totalCost = battle.casePrice * battle.rounds;
    if (balance < totalCost) {
      alert("Insufficient balance!");
      return;
    }
    alert(`Joined battle: ${battle.name}`);
    setBalance(balance - totalCost);
  };

  const handleCreateBattle = () => {
    alert(
      "Create Battle\n\n" +
      "Choose your settings:\n" +
      "• Battle Mode: 1v1, 2v2, or 4-player\n" +
      "• Select Case: Choose which case to battle with\n" +
      "• Number of Rounds: 1-10 rounds\n" +
      "• Entry Fee: Automatically calculated\n\n" +
      "Create custom battles and invite friends!"
    );
  };

  const handleSpectate = (battle: Battle) => {
    alert(
      `Spectating: ${battle.name}\n\n` +
      `Mode: ${modeColors[battle.mode].label}\n` +
      `Case: ${battle.caseName}\n` +
      `Rounds: ${battle.rounds}\n\n` +
      "You would now see the live battle in progress!"
    );
  };

  const handleViewResults = (battle: Battle) => {
    const winner = battle.players[0];
    alert(
      `Battle Results: ${battle.name}\n\n` +
      `🏆 Winner: ${winner.name}\n` +
      `💰 Total Won: $${winner.value.toFixed(2)}\n\n` +
      `Final Standings:\n` +
      battle.players.map((p, i) => `${i + 1}. ${p.name} - $${p.value.toFixed(2)}`).join('\n')
    );
  };

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
            Case Battles
          </h1>
          <p style={{ color: 'var(--lootbox-text-secondary)' }}>
            Compete with other players to win the best items
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="px-6 py-6 lootbox-gradient-blue hover:opacity-90 text-white border-0 shadow-lg" style={{ fontWeight: 700 }} onClick={handleCreateBattle}>
            <Plus className="w-5 h-5 mr-2" />
            Create Battle
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg lootbox-gradient-blue flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Active Battles</div>
              <div className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                {battles.filter(b => b.status === "active").length}
              </div>
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
              <Users className="w-6 h-6" style={{ color: 'var(--lootbox-teal-primary)' }} />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Players Online</div>
              <div className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>2,847</div>
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
              <Trophy className="w-6 h-6" style={{ color: 'var(--lootbox-gold)' }} />
            </div>
            <div>
              <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>Total Wagered</div>
              <div style={{ color: 'var(--lootbox-green)', fontSize: '1.75rem', fontWeight: 700 }}>$42,891</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-3 overflow-x-auto pb-2"
      >
        {[
          { id: "all", label: "All Battles", icon: Swords },
          { id: "waiting", label: "Waiting", icon: Users },
          { id: "active", label: "Active", icon: Play },
          { id: "finished", label: "Finished", icon: Trophy },
        ].map((filter, index) => {
          const Icon = filter.icon;
          return (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap border ${
                activeFilter === filter.id
                  ? "text-white lootbox-gradient-blue lootbox-glow-blue"
                  : "text-gray-400 hover:text-white"
              }`}
              style={activeFilter === filter.id ? {} : {
                background: 'var(--lootbox-bg-tertiary)',
                borderColor: 'var(--lootbox-border)'
              }}
            >
              <Icon className="w-4 h-4" />
              <span style={{ fontWeight: 600 }}>{filter.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Battles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBattles.map((battle) => (
          <motion.div
            key={battle.id}
            whileHover={{ y: -4 }}
            className="lootbox-card overflow-hidden"
          >
            {/* Battle Header */}
            <div className="p-6 border-b" style={{ borderColor: 'var(--lootbox-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{battle.name}</h3>
                    {battle.status === "active" && (
                      <div className="w-2 h-2 rounded-full lootbox-pulse-glow" style={{ background: 'var(--lootbox-green)' }} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: 'var(--lootbox-text-secondary)' }}>by</span>
                    <span className="text-white" style={{ fontWeight: 600 }}>{battle.createdBy}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg text-xs text-white" style={{ 
                    background: modeColors[battle.mode].bg,
                    fontWeight: 700
                  }}>
                    {modeColors[battle.mode].label}
                  </div>
                  <div className="px-3 py-1.5 rounded-lg text-xs border" style={{
                    background: statusColors[battle.status].bg,
                    borderColor: statusColors[battle.status].border,
                    color: statusColors[battle.status].text,
                    fontWeight: 700
                  }}>
                    {battle.status.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Case Info */}
              <div className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'var(--lootbox-bg-secondary)' }}>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={battle.caseImage} alt={battle.caseName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-white mb-1" style={{ fontWeight: 600 }}>{battle.caseName}</div>
                  <div className="text-sm" style={{ color: 'var(--lootbox-text-secondary)' }}>
                    {battle.rounds} rounds • ${battle.casePrice.toFixed(2)} per round
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: 'var(--lootbox-text-secondary)' }}>Total Value</div>
                  <div style={{ color: 'var(--lootbox-green)', fontWeight: 700 }}>${battle.totalValue.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Players */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: 'var(--lootbox-text-secondary)' }} />
                  <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>
                    Players: {battle.players.length}/{battle.maxPlayers}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {Array.from({ length: battle.maxPlayers }).map((_, index) => {
                  const player = battle.players[index];
                  
                  if (player) {
                    return (
                      <div key={`player-${battle.id}-${player.id}`} className="relative p-4 rounded-lg border" style={{
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: index === 0 && battle.status === "finished" ? 'var(--lootbox-gold)' : 'var(--lootbox-border)'
                      }}>
                        {index === 0 && battle.status === "finished" && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-8 h-8 rounded-full lootbox-gradient-gold flex items-center justify-center">
                              <Crown className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg lootbox-gradient-blue flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                            {player.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white truncate" style={{ fontWeight: 600 }}>{player.name}</div>
                            {battle.status !== "waiting" && (
                              <div className="text-sm" style={{ color: 'var(--lootbox-green)', fontWeight: 600 }}>
                                ${player.value.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={`empty-${battle.id}-${index}`} className="p-4 rounded-lg border-2 border-dashed flex items-center justify-center" style={{
                      background: 'var(--lootbox-bg-secondary)',
                      borderColor: 'var(--lootbox-border)'
                    }}>
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--lootbox-text-muted)' }} />
                        <div style={{ color: 'var(--lootbox-text-muted)', fontSize: '0.75rem' }}>Waiting...</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {battle.status === "waiting" && (
                  <Button
                    onClick={() => handleJoinBattle(battle)}
                    className="flex-1 py-3 lootbox-gradient-blue hover:opacity-90 text-white border-0"
                    style={{ fontWeight: 700 }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Join Battle
                  </Button>
                )}
                {battle.status === "active" && (
                  <Button
                    onClick={() => handleSpectate(battle)}
                    className="flex-1 py-3 border text-white hover:bg-white/5"
                    variant="outline"
                    style={{ borderColor: 'var(--lootbox-border)' }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Spectate
                  </Button>
                )}
                {battle.status === "finished" && (
                  <Button
                    onClick={() => handleViewResults(battle)}
                    className="flex-1 py-3 border text-white hover:bg-white/5"
                    variant="outline"
                    style={{ borderColor: 'var(--lootbox-border)' }}
                  >
                    View Results
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBattles.length === 0 && (
        <div className="text-center py-16">
          <Swords className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--lootbox-text-muted)' }} />
          <h3 className="text-white mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>No battles found</h3>
          <p style={{ color: 'var(--lootbox-text-secondary)' }}>Try adjusting your filters or create a new battle</p>
        </div>
      )}
    </div>
  );
}