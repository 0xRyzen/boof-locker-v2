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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            style={{ background: 'var(--lootbox-bg-tertiary)' }}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="lootbox-card overflow-hidden">
            {/* Header with Tabs */}
            <div className="relative lootbox-grid-bg p-6 md:p-8 border-b" style={{ 
              background: 'linear-gradient(135deg, var(--lootbox-blue-primary) 0%, var(--lootbox-teal-primary) 100%)',
              borderColor: 'var(--lootbox-border)'
            }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              }} />
              
              <div className="relative text-center mb-6">
                <h2 className="text-white mb-2 text-2xl md:text-3xl" style={{ fontWeight: 800 }}>
                  {mode === "login" ? "Welcome Back!" : "Join BOOF-LOCKER"}
                </h2>
                <p className="text-white/80 text-sm md:text-base">
                  {mode === "login" 
                    ? "Login to continue your winning streak" 
                    : "Create an account to start winning"}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="relative flex gap-2 p-1 rounded-lg" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2.5 rounded-lg transition-all text-sm md:text-base ${
                    mode === "login" ? "text-white" : "text-white/60"
                  }`}
                  style={mode === "login" ? {
                    background: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 700
                  } : { fontWeight: 600 }}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2.5 rounded-lg transition-all text-sm md:text-base ${
                    mode === "signup" ? "text-white" : "text-white/60"
                  }`}
                  style={mode === "signup" ? {
                    background: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 700
                  } : { fontWeight: 600 }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8 space-y-4 md:space-y-6" style={{ background: 'var(--lootbox-bg-card)' }}>
              {/* Social Login */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all hover:border-opacity-100 text-white text-sm md:text-base"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)'
                  }}
                >
                  <Chrome className="w-5 h-5" />
                  <span style={{ fontWeight: 600 }}>Continue with Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("Steam")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all hover:border-opacity-100 text-white text-sm md:text-base"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)'
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                  </svg>
                  <span style={{ fontWeight: 600 }}>Continue with Steam</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("GitHub")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all hover:border-opacity-100 text-white text-sm md:text-base"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)'
                  }}
                >
                  <Github className="w-5 h-5" />
                  <span style={{ fontWeight: 600 }}>Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'var(--lootbox-border)' }} />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-xs md:text-sm" style={{ 
                    background: 'var(--lootbox-bg-card)',
                    color: 'var(--lootbox-text-secondary)'
                  }}>
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-sm mb-2 text-white" style={{ fontWeight: 600 }}>
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border outline-none text-white placeholder-gray-500 transition-all focus:border-opacity-100 text-sm md:text-base"
                        style={{ 
                          background: 'var(--lootbox-bg-secondary)',
                          borderColor: 'var(--lootbox-border)'
                        }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-2 text-white" style={{ fontWeight: 600 }}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border outline-none text-white placeholder-gray-500 transition-all focus:border-opacity-100 text-sm md:text-base"
                      style={{ 
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: 'var(--lootbox-border)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-white" style={{ fontWeight: 600 }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 rounded-lg border outline-none text-white placeholder-gray-500 transition-all focus:border-opacity-100 text-sm md:text-base"
                      style={{ 
                        background: 'var(--lootbox-bg-secondary)',
                        borderColor: 'var(--lootbox-border)'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="block text-sm mb-2 text-white" style={{ fontWeight: 600 }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--lootbox-text-secondary)' }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border outline-none text-white placeholder-gray-500 transition-all focus:border-opacity-100 text-sm md:text-base"
                        style={{ 
                          background: 'var(--lootbox-bg-secondary)',
                          borderColor: 'var(--lootbox-border)'
                        }}
                      />
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      <span style={{ color: 'var(--lootbox-text-secondary)' }}>Remember me</span>
                    </label>
                    <button type="button" className="hover:underline" style={{ color: 'var(--lootbox-blue-primary)' }}>
                      Forgot password?
                    </button>
                  </div>
                )}

                {mode === "signup" && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded"
                    />
                    <span className="text-xs md:text-sm" style={{ color: 'var(--lootbox-text-secondary)' }}>
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
                  className="w-full py-3 lootbox-gradient-blue hover:opacity-90 text-white border-0 shadow-lg text-sm md:text-base"
                  style={{ fontWeight: 700 }}
                >
                  {mode === "login" ? "Login to Account" : "Create Account"}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center text-xs md:text-sm" style={{ color: 'var(--lootbox-text-secondary)' }}>
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
                <div className="text-center text-xs" style={{ color: 'var(--lootbox-text-muted)' }}>
                  By creating an account, you confirm that you are 18+ years old
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}