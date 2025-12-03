import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
          filter: 'blur(60px)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12), transparent 70%)',
          filter: 'blur(60px)',
          bottom: '-15%',
          left: '-10%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%)',
          filter: 'blur(50px)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--lootbox-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--lootbox-border) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.05))`,
            borderRadius: Math.random() > 0.5 ? '50%' : '20%',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Subtle scan lines effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)',
        }}
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
