import { Trophy, Medal, Crown, TrendingUp, Zap, Star, Award, Flame, Users, Target, Gift, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  prize: number;
  spent: number;
  avatarColor: string;
  casesOpened: number;
  winRate: number;
}

const fullLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "1lagemfonseca", avatar: "1", prize: 1250, spent: 46629.50, avatarColor: "#A855F7", casesOpened: 892, winRate: 68 },
  { rank: 2, username: "Masking", avatar: "M", prize: 400, spent: 52935.15, avatarColor: "#3B82F6", casesOpened: 1034, winRate: 64 },
  { rank: 3, username: "scarfedodds51", avatar: "S", prize: 150, spent: 25118.13, avatarColor: "#10B981", casesOpened: 567, winRate: 71 },
  { rank: 4, username: "GoldenLuck", avatar: "G", prize: 100, spent: 18450.20, avatarColor: "#F59E0B", casesOpened: 423, winRate: 59 },
  { rank: 5, username: "ProUnboxer", avatar: "P", prize: 75, spent: 15230.80, avatarColor: "#EF4444", casesOpened: 389, winRate: 62 },
  { rank: 6, username: "MythicHunter", avatar: "M", prize: 50, spent: 12890.45, avatarColor: "#8B5CF6", casesOpened: 312, winRate: 57 },
  { rank: 7, username: "CaseWizard", avatar: "C", prize: 40, spent: 11245.90, avatarColor: "#14B8A6", casesOpened: 298, winRate: 66 },
  { rank: 8, username: "LegendaryPro", avatar: "L", prize: 35, spent: 10120.30, avatarColor: "#F97316", casesOpened: 267, winRate: 54 },
  { rank: 9, username: "RNGesus", avatar: "R", prize: 30, spent: 9450.75, avatarColor: "#06B6D4", casesOpened: 245, winRate: 69 },
  { rank: 10, username: "UnboxKing", avatar: "U", prize: 25, spent: 8920.60, avatarColor: "#EC4899", casesOpened: 229, winRate: 61 },
  { rank: 11, username: "LootMaster", avatar: "L", prize: 20, spent: 7825.40, avatarColor: "#84CC16", casesOpened: 198, winRate: 58 },
  { rank: 12, username: "CrateChaser", avatar: "C", prize: 15, spent: 6789.20, avatarColor: "#D946EF", casesOpened: 176, winRate: 52 },
];

export function LeaderboardPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 10,
    minutes: 7,
    seconds: 37
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const topThree = fullLeaderboard.slice(0, 3);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: "#FFD700", gradient: "linear-gradient(135deg, #FFD700, #FFA500)", label: "Champion" };
    if (rank === 2) return { icon: Medal, color: "#C0C0C0", gradient: "linear-gradient(135deg, #E8E8E8, #A0A0A0)", label: "Runner-up" };
    if (rank === 3) return { icon: Medal, color: "#CD7F32", gradient: "linear-gradient(135deg, #F4A460, #8B4513)", label: "3rd Place" };
    return { icon: Award, color: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)", label: `#${rank}` };
  };

  const getTrendIcon = () => {
    const random = Math.random();
    if (random > 0.7) return { icon: ChevronUp, color: "#10B981" };
    if (random > 0.3) return { icon: ChevronUp, color: "#10B981" };
    return { icon: ChevronDown, color: "#EF4444" };
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Enhanced Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lootbox-card relative overflow-hidden border-2" 
        style={{ 
          borderColor: 'var(--lootbox-blue-primary)',
          background: 'linear-gradient(135deg, var(--lootbox-bg-secondary), var(--lootbox-bg-tertiary))'
        }}
      >
        <div className="absolute inset-0 lootbox-grid-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Title Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-1.5 rounded-full border-2 flex items-center gap-2" style={{ 
                  borderColor: 'var(--lootbox-green)',
                  background: 'rgba(16, 185, 129, 0.1)'
                }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--lootbox-green)' }} />
                  <span style={{ color: 'var(--lootbox-green)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    WEEK 48 • LIVE
                  </span>
                </div>
                <div className="px-4 py-1.5 rounded-full border-2" style={{ 
                  borderColor: 'var(--lootbox-gold)',
                  background: 'rgba(251, 191, 36, 0.1)'
                }}>
                  <span style={{ color: 'var(--lootbox-gold)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    $2,500 POOL
                  </span>
                </div>
              </div>
              <h1 className="text-white mb-3" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Weekly Leaderboard
              </h1>
              <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                Compete with the best players for <span style={{ color: 'var(--lootbox-gold)', fontWeight: 700 }}>$2,500</span> in prizes. Top 12 players get rewarded!
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-center">
                <div className="lootbox-card px-5 py-4 mb-2 min-w-[80px] border-2" style={{ 
                  background: 'var(--lootbox-bg-primary)',
                  borderColor: 'var(--lootbox-border)'
                }}>
                  <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  DAYS
                </div>
              </div>
              <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.2, marginBottom: '1.5rem' }}>:</div>
              <div className="text-center">
                <div className="lootbox-card px-5 py-4 mb-2 min-w-[80px] border-2" style={{ 
                  background: 'var(--lootbox-bg-primary)',
                  borderColor: 'var(--lootbox-border)'
                }}>
                  <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  HRS
                </div>
              </div>
              <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.2, marginBottom: '1.5rem' }}>:</div>
              <div className="text-center">
                <div className="lootbox-card px-5 py-4 mb-2 min-w-[80px] border-2" style={{ 
                  background: 'var(--lootbox-bg-primary)',
                  borderColor: 'var(--lootbox-border)'
                }}>
                  <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  MIN
                </div>
              </div>
              <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.2, marginBottom: '1.5rem' }}>:</div>
              <div className="text-center">
                <div className="lootbox-card px-5 py-4 mb-2 min-w-[80px] border-2" style={{ 
                  background: 'var(--lootbox-bg-primary)',
                  borderColor: 'var(--lootbox-border)'
                }}>
                  <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  SEC
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lootbox-card p-6 relative overflow-hidden border-2 hover:border-blue-500 transition-all group" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ 
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                borderColor: 'rgba(59, 130, 246, 0.3)'
              }}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <Star className="w-5 h-5" style={{ color: 'var(--lootbox-blue-primary)', opacity: 0.3 }} />
            </div>
            <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Prize Pool
            </div>
            <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              $2,500
            </div>
          </div>
        </div>

        <div className="lootbox-card p-6 relative overflow-hidden border-2 hover:border-purple-500 transition-all group" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ 
                background: 'linear-gradient(135deg, #A855F7, #9333EA)',
                borderColor: 'rgba(168, 85, 247, 0.3)'
              }}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <Target className="w-5 h-5" style={{ color: '#A855F7', opacity: 0.3 }} />
            </div>
            <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Participants
            </div>
            <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              1,247
            </div>
          </div>
        </div>

        <div className="lootbox-card p-6 relative overflow-hidden border-2 hover:border-teal-500 transition-all group" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ 
                background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
                borderColor: 'rgba(20, 184, 166, 0.3)'
              }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <Gift className="w-5 h-5" style={{ color: '#14B8A6', opacity: 0.3 }} />
            </div>
            <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Total Spent
            </div>
            <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              $285K
            </div>
          </div>
        </div>

        <div className="lootbox-card p-6 relative overflow-hidden border-2 hover:border-orange-500 transition-all group" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ 
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                borderColor: 'rgba(245, 158, 11, 0.3)'
              }}>
                <Flame className="w-6 h-6 text-white" />
              </div>
              <Trophy className="w-5 h-5" style={{ color: '#F59E0B', opacity: 0.3 }} />
            </div>
            <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Cases Opened
            </div>
            <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
              5,834
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Winners - Enhanced Podium Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((entry) => {
          const badge = getRankBadge(entry.rank);
          const BadgeIcon = badge.icon;
          
          return (
            <div 
              key={entry.rank}
              className="lootbox-card relative overflow-hidden group hover:scale-105 transition-all border-2"
              style={{
                order: entry.rank === 1 ? 1 : entry.rank === 2 ? 0 : 2,
                borderColor: badge.color,
                background: 'var(--lootbox-bg-secondary)'
              }}
            >
              {/* Rank Badge - Top Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rotate-45 flex items-start justify-center pt-6"
                  style={{ background: badge.gradient }}
                >
                  <BadgeIcon className="w-6 h-6 text-white -rotate-45" />
                </div>
              </div>

              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: `linear-gradient(135deg, ${entry.avatarColor}, transparent 50%)` }}
              />
              
              <div className="relative p-8">
                {/* Avatar */}
                <div className="mb-6 text-center">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 border-4 group-hover:scale-110 transition-transform"
                    style={{ 
                      background: badge.gradient,
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      borderColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    {entry.avatar}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full border mb-3" style={{ 
                    borderColor: badge.color,
                    background: `${badge.color}20`
                  }}>
                    <span style={{ color: badge.color, fontSize: '0.875rem', fontWeight: 700 }}>
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="text-white truncate mb-1" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    {entry.username}
                  </h3>
                  <div className="text-white" style={{ fontSize: '2rem', fontWeight: 900, color: badge.color }}>
                    ${entry.prize}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3 pt-6 border-t-2" style={{ borderColor: 'var(--lootbox-border)' }}>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Total Spent</span>
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      ${entry.spent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Cases Opened</span>
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      {entry.casesOpened}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Win Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full overflow-hidden border" style={{ 
                        background: 'var(--lootbox-bg-primary)',
                        borderColor: 'var(--lootbox-border)'
                      }}>
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${entry.winRate}%`,
                            background: entry.winRate >= 65 ? 'var(--lootbox-green)' : 'var(--lootbox-blue-primary)'
                          }}
                        />
                      </div>
                      <span style={{ color: 'var(--lootbox-green)', fontWeight: 700, fontSize: '0.875rem' }}>
                        {entry.winRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Rankings Table - Enhanced */}
      <div className="lootbox-card overflow-hidden border-2" style={{ borderColor: 'var(--lootbox-border)' }}>
        {/* Table Header */}
        <div className="p-6 border-b-2 flex items-center justify-between" style={{ 
          borderColor: 'var(--lootbox-border)', 
          background: 'var(--lootbox-bg-secondary)' 
        }}>
          <div>
            <h2 className="text-white mb-1" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Complete Rankings
            </h2>
            <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem' }}>
              Top 12 players earn rewards
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border-2" style={{ 
            borderColor: 'var(--lootbox-blue-primary)',
            background: 'rgba(59, 130, 246, 0.1)'
          }}>
            <Trophy className="w-4 h-4" style={{ color: 'var(--lootbox-blue-primary)' }} />
            <span style={{ color: 'var(--lootbox-blue-primary)', fontSize: '0.875rem', fontWeight: 700 }}>
              LIVE RANKINGS
            </span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: 'var(--lootbox-border)', background: 'var(--lootbox-bg-tertiary)' }}>
                <th className="text-left p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  RANK
                </th>
                <th className="text-left p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  PLAYER
                </th>
                <th className="text-right p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  PRIZE
                </th>
                <th className="text-right p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  SPENT
                </th>
                <th className="text-right p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  CASES
                </th>
                <th className="text-right p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  WIN RATE
                </th>
                <th className="text-right p-4" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  TREND
                </th>
              </tr>
            </thead>
            <tbody>
              {fullLeaderboard.map((entry, index) => {
                const badge = getRankBadge(entry.rank);
                const BadgeIcon = badge.icon;
                const trend = getTrendIcon();
                const TrendIcon = trend.icon;
                
                return (
                  <tr 
                    key={entry.rank}
                    className="border-b hover:bg-white/5 transition-all group"
                    style={{ 
                      borderColor: 'var(--lootbox-border)',
                      background: entry.rank <= 3 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                    }}
                  >
                    {/* Rank */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2" style={{ 
                          background: entry.rank <= 3 ? badge.gradient : 'var(--lootbox-bg-tertiary)',
                          borderColor: entry.rank <= 3 ? badge.color : 'transparent'
                        }}>
                          <BadgeIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white" style={{ fontSize: '1.125rem', fontWeight: entry.rank <= 3 ? 900 : 700 }}>
                          #{entry.rank}
                        </span>
                      </div>
                    </td>

                    {/* Player */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform border-2"
                          style={{ 
                            background: `linear-gradient(135deg, ${entry.avatarColor}, ${entry.avatarColor}dd)`,
                            fontSize: '1rem',
                            fontWeight: 800,
                            borderColor: 'rgba(255,255,255,0.1)'
                          }}
                        >
                          {entry.avatar}
                        </div>
                        <span className="text-white" style={{ fontSize: '1rem', fontWeight: 600 }}>
                          {entry.username}
                        </span>
                      </div>
                    </td>

                    {/* Prize */}
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2" style={{ 
                        borderColor: entry.rank <= 3 ? badge.color : 'var(--lootbox-border)',
                        background: entry.rank <= 3 ? `${badge.color}20` : 'var(--lootbox-bg-tertiary)'
                      }}>
                        <Trophy className="w-4 h-4" style={{ color: entry.rank <= 3 ? badge.color : 'var(--lootbox-green)' }} />
                        <span 
                          style={{ 
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: entry.rank <= 3 ? badge.color : 'var(--lootbox-green)'
                          }}
                        >
                          ${entry.prize}
                        </span>
                      </div>
                    </td>

                    {/* Spent */}
                    <td className="p-4 text-right">
                      <span className="text-white" style={{ fontWeight: 600 }}>
                        ${entry.spent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Cases */}
                    <td className="p-4 text-right">
                      <span className="text-white" style={{ fontWeight: 600 }}>
                        {entry.casesOpened.toLocaleString()}
                      </span>
                    </td>

                    {/* Win Rate */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-2.5 rounded-full overflow-hidden border-2" style={{ 
                          background: 'var(--lootbox-bg-primary)',
                          borderColor: 'var(--lootbox-border)'
                        }}>
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${entry.winRate}%`,
                              background: entry.winRate >= 65 ? 'var(--lootbox-green)' : entry.winRate >= 55 ? 'var(--lootbox-blue-primary)' : 'var(--lootbox-gold)'
                            }}
                          />
                        </div>
                        <span className="text-white min-w-[3rem]" style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                          {entry.winRate}%
                        </span>
                      </div>
                    </td>

                    {/* Trend */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2" style={{ 
                          background: 'var(--lootbox-bg-tertiary)',
                          borderColor: trend.color
                        }}>
                          <TrendIcon className="w-4 h-4" style={{ color: trend.color }} />
                          <span style={{ color: trend.color, fontSize: '0.875rem', fontWeight: 700 }}>
                            {Math.floor(Math.random() * 5) + 1}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Enhanced */}
        <div className="lg:hidden divide-y-2" style={{ borderColor: 'var(--lootbox-border)' }}>
          {fullLeaderboard.map((entry) => {
            const badge = getRankBadge(entry.rank);
            const BadgeIcon = badge.icon;
            const trend = getTrendIcon();
            const TrendIcon = trend.icon;
            
            return (
              <div key={entry.rank} className="p-5 hover:bg-white/5 transition-all" style={{ 
                background: entry.rank <= 3 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
              }}>
                <div className="flex items-start gap-4 mb-4">
                  {/* Rank Badge */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center border-2" style={{ 
                    background: entry.rank <= 3 ? badge.gradient : 'var(--lootbox-bg-tertiary)',
                    borderColor: entry.rank <= 3 ? badge.color : 'var(--lootbox-border)'
                  }}>
                    <BadgeIcon className="w-5 h-5 text-white" />
                  </div>

                  {/* Avatar */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white border-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${entry.avatarColor}, ${entry.avatarColor}dd)`,
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      borderColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {entry.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white truncate" style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {entry.username}
                      </h3>
                      <span className="text-white ml-2" style={{ fontSize: '1rem', fontWeight: 900 }}>
                        #{entry.rank}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2" style={{ 
                      borderColor: entry.rank <= 3 ? badge.color : 'var(--lootbox-border)',
                      background: entry.rank <= 3 ? `${badge.color}20` : 'var(--lootbox-bg-tertiary)'
                    }}>
                      <Trophy className="w-3 h-3" style={{ color: entry.rank <= 3 ? badge.color : 'var(--lootbox-green)' }} />
                      <span style={{ color: entry.rank <= 3 ? badge.color : 'var(--lootbox-green)', fontSize: '0.875rem', fontWeight: 700 }}>
                        ${entry.prize}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                    <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                      Spent
                    </div>
                    <div className="text-white" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      ${entry.spent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                    <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                      Cases
                    </div>
                    <div className="text-white" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      {entry.casesOpened}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                    <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                      Win Rate
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full overflow-hidden border" style={{ 
                        background: 'var(--lootbox-bg-primary)',
                        borderColor: 'var(--lootbox-border)'
                      }}>
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${entry.winRate}%`,
                            background: entry.winRate >= 65 ? 'var(--lootbox-green)' : 'var(--lootbox-blue-primary)'
                          }}
                        />
                      </div>
                      <span style={{ color: 'var(--lootbox-green)', fontWeight: 700, fontSize: '0.875rem' }}>
                        {entry.winRate}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                    <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>
                      Trend
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendIcon className="w-4 h-4" style={{ color: trend.color }} />
                      <span style={{ color: trend.color, fontWeight: 700, fontSize: '0.875rem' }}>
                        {Math.floor(Math.random() * 5) + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
