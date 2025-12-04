import { motion } from "motion/react";
import { Trophy, Coins } from "lucide-react";

interface TournamentProfileCardProps {
  tournamentName?: string;
  points: number;
  matchesRemaining: number;
  currentReward: number;
}

export function TournamentProfileCard({
  tournamentName = "Gold Tournament",
  points = 15134321,
  matchesRemaining = 672,
  currentReward = 0,
}: TournamentProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden shadow-lg w-full"
      style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
      }}
    >
      {/* Card Content */}
      <div className="p-6 relative">
        {/* Subtle Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Tournament Title with Premium Styling */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
              }}
            >
              {tournamentName}
            </motion.h3>
            <div 
              className="h-0.5 w-12 mt-1.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%)',
              }}
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-9 h-9 rounded-full flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
              border: '1.5px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 2px 8px rgba(251, 191, 36, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
            }}
          >
            <Trophy 
              className="w-4 h-4" 
              style={{ color: 'rgba(245, 158, 11, 0.9)' }}
            />
          </motion.div>
        </div>

        {/* Points Display - Enhanced 3D Card Style */}
        <motion.div 
          className="mb-6 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
            }}
          >
            {/* Shine Effect */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              }}
            />
            
            <div className="flex items-center gap-4 relative z-10">
              {/* TP Badge - Enhanced */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 30, 0.95) 100%)',
                  border: '2.5px solid rgba(251, 191, 36, 0.5)',
                  boxShadow: '0 4px 16px rgba(251, 191, 36, 0.25), inset 0 2px 4px rgba(251, 191, 36, 0.1), 0 0 20px rgba(251, 191, 36, 0.15)',
                }}
              >
                {/* Inner glow ring */}
                <div 
                  className="absolute inset-0.5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
                  }}
                />
                <span
                  style={{
                    color: '#FCD34D',
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    letterSpacing: '0.08em',
                    textShadow: '0 0 10px rgba(251, 191, 36, 0.5), 0 1px 2px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  TP
                </span>
              </motion.div>

              {/* Points Number - Enhanced Typography */}
              <div className="flex-1">
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    color: 'rgba(0, 0, 0, 0.95)',
                    fontWeight: 900,
                    fontSize: '2.25rem',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(255, 255, 255, 0.4)',
                    display: 'inline-block',
                  }}
                >
                  {points.toLocaleString()}
                </motion.span>
                <div 
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginTop: '0.25rem',
                  }}
                >
                  Tournament Points
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Matches Remaining - Enhanced */}
        <motion.div 
          className="mb-5 flex items-center gap-2 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.8) 100%)',
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)',
            }}
          />
          <span
            style={{
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            {matchesRemaining} matches remaining
          </span>
        </motion.div>

        {/* Premium Divider */}
        <div className="mb-5 relative">
          <div
            className="h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)',
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Current Rewards - Enhanced Card */}
        <motion.div 
          className="rounded-lg p-3.5 relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.04) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            boxShadow: '0 2px 8px rgba(251, 191, 36, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'radial-gradient(circle at top right, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
            }}
          />
          
          <div className="flex items-center justify-between relative z-10">
            <span
              style={{
                color: 'rgba(0, 0, 0, 0.75)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              Current Rewards:
            </span>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Coins 
                  className="w-4.5 h-4.5" 
                  style={{ 
                    color: 'rgba(245, 158, 11, 0.9)',
                    filter: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))',
                  }}
                />
              </motion.div>
              <span
                style={{
                  color: 'rgba(0, 0, 0, 0.95)',
                  fontWeight: 800,
                  fontSize: '1.0625rem',
                  letterSpacing: '-0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
                }}
              >
                +{currentReward}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}