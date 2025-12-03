import { motion } from "motion/react";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

interface SportBannerProps {
  badge?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
  features?: string[];
  variant?: "primary" | "secondary" | "accent";
  delay?: number;
  icon?: LucideIcon;
}

export function SportBanner({
  badge,
  title,
  description,
  buttonText,
  buttonAction,
  features,
  variant = "primary",
  delay = 0,
  icon,
}: SportBannerProps) {
  const variantStyles = {
    primary: {
      bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)',
      border: 'rgba(59, 130, 246, 0.2)',
      badge: 'var(--lootbox-blue-primary)',
      button: 'var(--lootbox-blue-primary)',
    },
    secondary: {
      bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)',
      border: 'rgba(139, 92, 246, 0.25)',
      badge: '#8b5cf6',
      button: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.1)',
    },
    accent: {
      bg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(20, 184, 166, 0.02) 100%)',
      border: 'rgba(20, 184, 166, 0.2)',
      badge: 'var(--lootbox-teal-primary)',
      button: 'var(--lootbox-teal-primary)',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl p-8 md:p-10"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      {/* Decorative Element for Secondary Variant */}
      {variant === 'secondary' && (
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
      )}
      
      <div className="relative z-10">
        {/* Icon - displayed at top right for visual interest */}
        {icon && (
          <div 
            className="absolute top-0 right-0 opacity-10"
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            {React.createElement(icon, {
              className: "w-full h-full",
              style: { strokeWidth: 1.5 }
            })}
          </div>
        )}
        
        {/* Badge */}
        {badge && (
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full"
              style={{
                background: `${style.badge}15`,
                color: style.badge,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'var(--lootbox-text-primary)',
            letterSpacing: '-0.015em',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mb-6"
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'var(--lootbox-text-secondary)',
            maxWidth: '600px',
          }}
        >
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg"
                style={{
                  background: 'var(--lootbox-bg-tertiary)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--lootbox-text-primary)',
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        {buttonText && (
          <Button
            onClick={buttonAction}
            className="px-6 py-3 rounded-xl"
            style={{
              background: style.button,
              color: 'white',
              fontSize: '0.9375rem',
              fontWeight: 500,
            }}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}