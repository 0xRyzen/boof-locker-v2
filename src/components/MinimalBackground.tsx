import { motion } from "motion/react";

export function MinimalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08), transparent 70%)',
          filter: 'blur(80px)',
          top: '-10%',
          right: '10%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)',
          filter: 'blur(80px)',
          bottom: '10%',
          left: '5%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
