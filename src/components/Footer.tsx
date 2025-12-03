import { motion } from "motion/react";
import { Box, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Cases", href: "#" },
      { name: "Battles", href: "#" },
      { name: "Provably Fair", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "#" },
    ],
    legal: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "Discord" },
  ];

  return (
    <footer 
      className="relative mt-24 border-t"
      style={{
        background: 'var(--lootbox-bg-primary)',
        borderColor: 'var(--lootbox-border)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--lootbox-blue-primary)',
                }}
              >
                <Box className="w-5 h-5 text-white" />
              </div>
              <span 
                style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--lootbox-text-primary)',
                }}
              >
                BOOF-LOCKER
              </span>
            </div>
            <p 
              className="mb-6 max-w-sm"
              style={{ 
                color: 'var(--lootbox-text-secondary)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              Premium lootbox platform with provably fair mechanics and instant rewards.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-opacity-80"
                  style={{
                    background: 'var(--lootbox-bg-tertiary)',
                    color: 'var(--lootbox-text-secondary)',
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 
                className="mb-4 capitalize"
                style={{ 
                  color: 'var(--lootbox-text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-primary"
                      style={{ 
                        color: 'var(--lootbox-text-secondary)',
                        fontSize: '0.875rem',
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div 
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <p
            style={{ 
              color: 'var(--lootbox-text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            © {currentYear} BOOF-LOCKER. All rights reserved.
          </p>
          
          <p
            style={{ 
              color: 'var(--lootbox-text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            <strong style={{ color: 'var(--lootbox-text-primary)' }}>18+</strong> Play responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}