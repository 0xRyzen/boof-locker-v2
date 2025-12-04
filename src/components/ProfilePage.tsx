import { useState } from "react";
import { User, Trophy, Package, TrendingUp, Calendar, Award, Target, Zap, Crown, Star, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import type { LootboxItem } from "../App";
import { TournamentProfileCard } from "./TournamentProfileCard";

interface ProfilePageProps {
  balance: number;
  inventory: LootboxItem[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  total: number;
}

const achievements: Achievement[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Open your first case",
    icon: Package,
    unlocked: true,
    progress: 1,
    total: 1,
  },
  {
    id: "2",
    name: "Case Collector",
    description: "Open 100 cases",
    icon: Zap,
    unlocked: false,
    progress: 23,
    total: 100,
  },
  {
    id: "3",
    name: "Legendary Hunter",
    description: "Win 10 legendary items",
    icon: Crown,
    unlocked: false,
    progress: 3,
    total: 10,
  },
  {
    id: "4",
    name: "Battle Master",
    description: "Win 50 case battles",
    icon: Trophy,
    unlocked: false,
    progress: 12,
    total: 50,
  },
  {
    id: "5",
    name: "Millionaire",
    description: "Reach $10,000 in total winnings",
    icon: DollarSign,
    unlocked: false,
    progress: 2847,
    total: 10000,
  },
  {
    id: "6",
    name: "Lucky Star",
    description: "Win 5 mythic items",
    icon: Star,
    unlocked: false,
    progress: 1,
    total: 5,
  },
];

const stats = [
  { label: "Cases Opened", value: "243", icon: Package, color: "var(--lootbox-blue-primary)" },
  { label: "Battles Won", value: "18", icon: Trophy, color: "var(--lootbox-gold)" },
  { label: "Total Winnings", value: "$2,847", icon: TrendingUp, color: "var(--lootbox-green)" },
  { label: "Win Rate", value: "67%", icon: Target, color: "var(--lootbox-teal-primary)" },
];

const recentActivity = [
  { id: "1", action: "Won", item: "Premium Gaming Headset", value: 28.50, rarity: "legendary", time: "2 hours ago" },
  { id: "2", action: "Won Battle", item: "Epic Showdown", value: 45.00, rarity: "epic", time: "5 hours ago" },
  { id: "3", action: "Opened", item: "Tech Master Case", value: 65.00, rarity: "mythic", time: "1 day ago" },
  { id: "4", action: "Sold", item: "Wireless Earbuds", value: 14.00, rarity: "rare", time: "2 days ago" },
];

const rarityColors = {
  mythic: "#ff4757",
  legendary: "#ffd700",
  epic: "#a855f7",
  rare: "#1e90ff",
  common: "#64748b",
};

export function ProfilePage({ balance, inventory }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "activity">("overview");

  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const memberSince = "January 2024";
  const level = 24;
  const xpProgress = 68;

  const handleEditProfile = () => {
    alert(
      "Edit Profile\n\n" +
      "Customize your profile:\n" +
      "• Change Avatar\n" +
      "• Update Username\n" +
      "• Edit Bio\n" +
      "• Link Social Media\n" +
      "• Privacy Settings\n\n" +
      "Coming soon!"
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
      {/* Main Content - Left Side (takes 8 columns on large screens) */}
      <div className="lg:col-span-8 space-y-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lootbox-card overflow-hidden"
        >
          <div className="h-32 lootbox-gradient-blue lootbox-grid-bg relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            }} />
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl lootbox-gradient-blue flex items-center justify-center text-white border-4 shadow-xl" style={{
                  borderColor: 'var(--lootbox-bg-card)',
                  fontSize: '3rem',
                  fontWeight: 800
                }}>
                  U
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-white mb-2" style={{ fontSize: '2rem', fontWeight: 800 }}>Username</h1>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: 'var(--lootbox-text-secondary)' }} />
                        <span style={{ color: 'var(--lootbox-text-secondary)' }}>Member since {memberSince}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg" style={{
                        background: 'var(--lootbox-bg-secondary)'
                      }}>
                        <Award className="w-4 h-4" style={{ color: 'var(--lootbox-gold)' }} />
                        <span style={{ color: 'var(--lootbox-gold)', fontWeight: 700 }}>Level {level}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="lootbox-gradient-blue hover:opacity-90 text-white border-0" style={{ fontWeight: 700 }} onClick={handleEditProfile}>
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Level Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span style={{ color: 'var(--lootbox-text-secondary)' }}>Level {level}</span>
                    <span style={{ color: 'var(--lootbox-text-secondary)' }}>{xpProgress}% to Level {level + 1}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--lootbox-bg-secondary)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full lootbox-gradient-blue"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: 'var(--lootbox-border)' }}>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--lootbox-bg-secondary)', boxShadow: 'none' }}>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Balance</div>
                <div style={{ color: 'var(--lootbox-green)', fontSize: '1.5rem', fontWeight: 700 }}>${balance.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--lootbox-bg-secondary)', boxShadow: 'none' }}>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Inventory</div>
                <div className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{inventory.length}</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--lootbox-bg-secondary)', boxShadow: 'none' }}>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Inv. Value</div>
                <div style={{ color: 'var(--lootbox-blue-primary)', fontSize: '1.5rem', fontWeight: 700 }}>${totalValue.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'var(--lootbox-bg-secondary)', boxShadow: 'none' }}>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Achievements</div>
                <div style={{ color: 'var(--lootbox-gold)', fontSize: '1.5rem', fontWeight: 700 }}>
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "achievements", label: "Achievements", icon: Award },
            { id: "activity", label: "Recent Activity", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap border ${
                  activeTab === tab.id
                    ? "text-white lootbox-gradient-blue lootbox-glow-blue"
                    : "text-gray-400 hover:text-white"
                }`}
                style={activeTab === tab.id ? {} : {
                  background: 'var(--lootbox-bg-tertiary)',
                  borderColor: 'var(--lootbox-border)'
                }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ fontWeight: 600 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lootbox-card p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--lootbox-bg-secondary)' }}>
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>{stat.label}</div>
                      <div className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              const progress = (achievement.progress / achievement.total) * 100;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`lootbox-card p-6 transition-all ${
                    achievement.unlocked ? "border" : ""
                  }`}
                  style={achievement.unlocked ? {
                    borderColor: 'var(--lootbox-gold)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
                  } : {}}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      achievement.unlocked ? "lootbox-gradient-gold" : ""
                    }`} style={!achievement.unlocked ? {
                      background: 'var(--lootbox-bg-secondary)'
                    } : {}}>
                      <Icon className={`w-7 h-7 ${achievement.unlocked ? "text-white" : ""}`} style={!achievement.unlocked ? {
                        color: 'var(--lootbox-text-muted)'
                      } : {}} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1" style={{ fontWeight: 700 }}>{achievement.name}</h3>
                      <p className="text-sm" style={{ color: 'var(--lootbox-text-secondary)' }}>{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm lootbox-gradient-gold">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>

                  {!achievement.unlocked && (
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span style={{ color: 'var(--lootbox-text-secondary)' }}>Progress</span>
                        <span style={{ color: 'var(--lootbox-text-secondary)' }}>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--lootbox-bg-secondary)' }}>
                        <div className="h-full lootbox-gradient-blue transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lootbox-card p-5 hover:border-opacity-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center border flex-shrink-0" style={{
                    background: `${rarityColors[activity.rarity as keyof typeof rarityColors]}15`,
                    borderColor: rarityColors[activity.rarity as keyof typeof rarityColors],
                  }}>
                    <Package className="w-6 h-6" style={{ color: rarityColors[activity.rarity as keyof typeof rarityColors] }} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: 'var(--lootbox-text-secondary)' }}>{activity.action}</span>
                      <span className="text-white truncate" style={{ fontWeight: 700 }}>{activity.item}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span style={{ color: rarityColors[activity.rarity as keyof typeof rarityColors], fontWeight: 600 }}>
                        {activity.rarity}
                      </span>
                      <span style={{ color: 'var(--lootbox-text-muted)' }}>•</span>
                      <span style={{ color: 'var(--lootbox-text-muted)' }}>{activity.time}</span>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-right flex-shrink-0">
                    <div style={{ color: 'var(--lootbox-green)', fontSize: '1.25rem', fontWeight: 700 }}>
                      ${activity.value.toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Right Side (takes 4 columns on large screens) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Tournament Card */}
        <TournamentProfileCard
          tournamentName="Gold Tournament"
          points={15134321}
          matchesRemaining={672}
          currentReward={0}
        />
      </div>
    </div>
  );
}