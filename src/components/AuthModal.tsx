import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Eye, EyeOff, Chrome, Github } from "lucide-react";
import { Button } from "./ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup") {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (!agreeToTerms) {
        alert("Please agree to the Terms of Service and Privacy Policy");
        return;
      }
      if (!username || username.length < 3) {
        alert("Username must be at least 3 characters");
        return;
      }
    }

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate successful login/signup
    onLogin(mode === "signup" ? username : email, password);
    onClose();
    
    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setAgreeToTerms(false);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login would be implemented here.\n\nThis would redirect to ${provider} OAuth flow.`);
    // In production, this would redirect to OAuth provider
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ 
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="relative w-full max-w-md max-h-[95vh] overflow-hidden rounded-2xl"
          style={{ 
            background: 'var(--lootbox-bg-primary)',
            border: '1px solid var(--lootbox-border)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable Container */}
          <div className="max-h-[95vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-black/10 dark:hover:bg-white/10"
              style={{ 
                background: 'var(--lootbox-bg-tertiary)',
                color: 'var(--lootbox-text-secondary)',
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Tabs */}
            <div className="relative p-6 sm:p-8 border-b" style={{ 
              background: 'var(--lootbox-blue-primary)',
              borderColor: 'var(--lootbox-border)'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              }} />
              
              <div className="relative text-center mb-6">
                <h2 className="text-white mb-2" style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 1.875rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}>
                  {mode === "login" ? "Welcome Back!" : "Join BOOF-LOCKER"}
                </h2>
                <p className="text-white/80" style={{ 
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                }}>
                  {mode === "login" 
                    ? "Login to continue your winning streak" 
                    : "Create an account to start winning"}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="relative flex gap-2 p-1 rounded-lg" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2.5 rounded-lg transition-all ${
                    mode === "login" ? "text-white" : "text-white/60"
                  }`}
                  style={mode === "login" ? {
                    background: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  } : { 
                    fontWeight: 600,
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2.5 rounded-lg transition-all ${
                    mode === "signup" ? "text-white" : "text-white/60"
                  }`}
                  style={mode === "signup" ? {
                    background: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  } : { 
                    fontWeight: 600,
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4" style={{ background: 'var(--lootbox-bg-primary)' }}>
              {/* Social Login */}
              <div className="space-y-2">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all hover:border-blue-500"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)',
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  <Chrome className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span style={{ 
                    fontWeight: 600,
                    fontSize: 'clamp(0.8125rem, 3vw, 0.875rem)',
                  }}>Continue with Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("Steam")}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all hover:border-blue-500"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)',
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                  </svg>
                  <span style={{ 
                    fontWeight: 600,
                    fontSize: 'clamp(0.8125rem, 3vw, 0.875rem)',
                  }}>Continue with Steam</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("GitHub")}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all hover:border-blue-500"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)',
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span style={{ 
                    fontWeight: 600,
                    fontSize: 'clamp(0.8125rem, 3vw, 0.875rem)',
                  }}>Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'var(--lootbox-border)' }} />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 sm:px-4" style={{ 
                    background: 'var(--lootbox-bg-primary)',
                    color: 'var(--lootbox-text-secondary)',
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                  }}>
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block mb-2" style={{ 
                      fontWeight: 600,
                      color: 'var(--lootbox-text-primary)',
                      fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
                    }}>
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg border outline-none placeholder-gray-500 transition-all focus:border-blue-500"
                        style={{ 
                          background: 'var(--lootbox-bg-secondary)',
                          borderColor: 'var(--lootbox-border)',
                          color: 'var(--lootbox-text-primary)',
                          fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block mb-2" style={{ 
                    fontWeight: 600,
                    color: 'var(--lootbox-text-primary)',
                    fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
                  }}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg border outline-none placeholder-gray-500 transition-all focus:border-blue-500"
                      style={{ 
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: 'var(--lootbox-border)',
                        color: 'var(--lootbox-text-primary)',
                        fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={{ 
                    fontWeight: 600,
                    color: 'var(--lootbox-text-primary)',
                    fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
                  }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg border outline-none placeholder-gray-500 transition-all focus:border-blue-500"
                      style={{ 
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: 'var(--lootbox-border)',
                        color: 'var(--lootbox-text-primary)',
                        fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: 'var(--lootbox-text-secondary)' }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="block mb-2" style={{ 
                      fontWeight: 600,
                      color: 'var(--lootbox-text-primary)',
                      fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
                    }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg border outline-none placeholder-gray-500 transition-all focus:border-blue-500"
                        style={{ 
                          background: 'var(--lootbox-bg-secondary)',
                          borderColor: 'var(--lootbox-border)',
                          color: 'var(--lootbox-text-primary)',
                          fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between" style={{ 
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                  }}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded" />
                      <span style={{ color: 'var(--lootbox-text-secondary)' }}>Remember me</span>
                    </label>
                    <button type="button" className="hover:underline" style={{ color: 'var(--lootbox-blue-primary)' }}>
                      Forgot password?
                    </button>
                  </div>
                )}

                {mode === "signup" && (
                  <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 rounded flex-shrink-0"
                    />
                    <span style={{ 
                      color: 'var(--lootbox-text-secondary)',
                      fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                    }}>
                      I agree to the{" "}
                      <button type="button" className="hover:underline" style={{ color: 'var(--lootbox-blue-primary)' }}>
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button type="button" className="hover:underline" style={{ color: 'var(--lootbox-blue-primary)' }}>
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                )}

                <Button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 border-0 rounded-lg"
                  style={{ 
                    background: 'var(--lootbox-blue-primary)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  }}
                >
                  {mode === "login" ? "Login to Account" : "Create Account"}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center pt-2" style={{ 
                color: 'var(--lootbox-text-secondary)',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              }}>
                {mode === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="hover:underline"
                      style={{ color: 'var(--lootbox-blue-primary)', fontWeight: 600 }}
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="hover:underline"
                      style={{ color: 'var(--lootbox-blue-primary)', fontWeight: 600 }}
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <div className="text-center pt-2" style={{ 
                  color: 'var(--lootbox-text-muted)',
                  fontSize: 'clamp(0.6875rem, 2vw, 0.75rem)',
                }}>
                  By creating an account, you confirm that you are 18+ years old
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}