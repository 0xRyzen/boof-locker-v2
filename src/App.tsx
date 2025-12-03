import { useState } from "react";
import { Button } from "./components/ui/button";
import { Box, Package, Swords, Trophy, TrendingUp, Bell, Search, Wallet, User, Menu, X, ChevronDown, LogOut, Sun, Moon } from "lucide-react";
import { MainPage } from "./components/MainPage";
import { BattlesPage } from "./components/BattlesPage";
import { InventoryPage } from "./components/InventoryPage";
import { ProfilePage } from "./components/ProfilePage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { ProvablyFairPage } from "./components/ProvablyFairPage";
import { AuthModal } from "./components/AuthModal";
import { MinimalLiveDrops } from "./components/MinimalLiveDrops";
import { MinimalBackground } from "./components/MinimalBackground";
import { motion } from "motion/react";

type Page = "main" | "battles" | "inventory" | "profile" | "leaderboard" | "provably-fair";

export interface LootboxItem {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  value: number;
  category: string;
}

export interface Lootbox {
  id: string;
  name: string;
  price: number;
  image: string;
  items: LootboxItem[];
  category: string;
  featured?: boolean;
  color?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("main");
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState<LootboxItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode class on document
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const addToInventory = (item: LootboxItem) => {
    setInventory([...inventory, item]);
  };

  const removeFromInventory = (itemId: string) => {
    setInventory(inventory.filter(item => item.id !== itemId));
  };

  const handleAddFunds = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    const amount = prompt("Enter amount to add (e.g., 100):");
    if (amount && !isNaN(parseFloat(amount))) {
      setBalance(balance + parseFloat(amount));
      alert(`Successfully added $${parseFloat(amount).toFixed(2)} to your balance!`);
    }
  };

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setUserName(email.split('@')[0] || 'User');
    setBalance(0);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("Guest");
    setBalance(0);
    setInventory([]);
    setShowProfileMenu(false);
    setCurrentPage("main");
    alert("You have been logged out successfully!");
  };

  const handleSearch = () => {
    const query = prompt("Search for cases, items, or users:");
    if (query) {
      alert(`Searching for: "${query}"\n\nThis would show search results in a real implementation.`);
    }
  };

  const notifications = [
    { id: 1, type: "win", message: "You won Premium Gaming Headset!", time: "2 min ago", read: false },
    { id: 2, type: "battle", message: "Battle 'Epic Showdown' started!", time: "15 min ago", read: false },
    { id: 3, type: "sale", message: "Item sold for $24.50", time: "1 hour ago", read: true },
    { id: 4, type: "achievement", message: "Achievement unlocked: Case Opener!", time: "2 hours ago", read: true },
    { id: 5, type: "system", message: "New cases added to the store!", time: "1 day ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { id: "main", label: "Cases", icon: Box },
    { id: "battles", label: "Case Battles", icon: Swords },
    { id: "inventory", label: "Inventory", icon: Package, badge: inventory.length },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--lootbox-bg-primary)' }}>
      {/* Animated Background */}
      <MinimalBackground />

      {/* Live Drops Sidebar */}
      <MinimalLiveDrops />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ 
        background: 'var(--lootbox-bg-primary)',
        borderColor: 'var(--lootbox-border)'
      }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation - Left Side */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage("main")}>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'var(--lootbox-blue-primary)',
                  }}
                >
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span 
                  className="text-xl" 
                  style={{ 
                    fontWeight: 700,
                    color: 'var(--lootbox-text-primary)',
                  }}
                >
                  BOOF-LOCKER
                </span>
              </div>

              {/* Desktop Navigation - Left Side */}
              <nav className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id as Page)}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all`}
                      style={{
                        color: currentPage === item.id ? 'var(--lootbox-text-primary)' : 'var(--lootbox-text-secondary)',
                        background: currentPage === item.id ? 'var(--lootbox-bg-tertiary)' : 'transparent',
                        fontWeight: currentPage === item.id ? 600 : 400,
                        fontSize: '0.875rem',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span 
                          className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" 
                          style={{
                            background: 'var(--lootbox-red)',
                            fontSize: '0.625rem',
                            fontWeight: 700,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage("leaderboard")}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    color: currentPage === "leaderboard" ? 'var(--lootbox-text-primary)' : 'var(--lootbox-text-secondary)',
                    background: currentPage === "leaderboard" ? 'var(--lootbox-bg-tertiary)' : 'transparent',
                    fontWeight: currentPage === "leaderboard" ? 600 : 400,
                    fontSize: '0.875rem',
                  }}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard</span>
                </button>
                <button
                  onClick={() => setCurrentPage("provably-fair")}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    color: currentPage === "provably-fair" ? 'var(--lootbox-text-primary)' : 'var(--lootbox-text-secondary)',
                    background: currentPage === "provably-fair" ? 'var(--lootbox-bg-tertiary)' : 'transparent',
                    fontWeight: currentPage === "provably-fair" ? 600 : 400,
                    fontSize: '0.875rem',
                  }}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Provably Fair</span>
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800" 
                style={{ 
                  color: 'var(--lootbox-text-secondary)'
                }}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Search */}
              <button 
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowNotifications(false);
                }}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800" 
                style={{ 
                  color: showSearch ? 'var(--lootbox-text-primary)' : 'var(--lootbox-text-secondary)'
                }}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Notifications */}
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSearch(false);
                }}
                className="relative hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800" 
                style={{ 
                  color: showNotifications ? 'var(--lootbox-text-primary)' : 'var(--lootbox-text-secondary)'
                }}
              >
                <Bell className="w-4 h-4" />
                <span 
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white" 
                  style={{ 
                    background: 'var(--lootbox-red)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                  }}
                >
                  3
                </span>
              </button>
              
              {/* Balance */}
              <Button
                onClick={() => handleAddFunds()}
                className="hidden sm:flex px-4 py-2 rounded-lg border-0"
                style={{ 
                  background: 'var(--lootbox-blue-primary)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                <Wallet className="w-4 h-4 mr-2" />
                ${balance.toFixed(2)}
              </Button>
              
              {/* User Profile */}
              <Button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="hidden sm:flex gap-2 px-3 py-2 rounded-lg border"
                variant="outline"
                style={{ 
                  borderColor: 'var(--lootbox-border)',
                  background: 'transparent',
                  color: 'var(--lootbox-text-primary)',
                  fontSize: '0.875rem',
                }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white" 
                  style={{
                    background: 'var(--lootbox-blue-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {isAuthenticated ? userName.charAt(0).toUpperCase() : 'G'}
                </div>
                <ChevronDown className="w-3 h-3" style={{ color: 'var(--lootbox-text-secondary)' }} />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                className="lg:hidden"
                style={{ color: 'var(--lootbox-text-primary)' }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t" style={{ borderColor: 'var(--lootbox-border)' }}>
              <nav className="flex flex-col gap-2 mb-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id as Page);
                        setIsMenuOpen(false);
                      }}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        currentPage === item.id
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      style={currentPage === item.id ? {
                        background: 'var(--lootbox-bg-tertiary)'
                      } : {}}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="ml-auto lootbox-gradient-blue text-white text-xs rounded-full px-2 py-1">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleAddFunds()}
                  className="w-full lootbox-gradient-blue hover:opacity-90"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  ${balance.toFixed(2)}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentPage("profile");
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border"
                  style={{ borderColor: 'var(--lootbox-border)' }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Panel */}
      {showSearch && (
        <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 lootbox-card p-6 shadow-2xl" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontWeight: 700, fontSize: '1.125rem' }}>Search</h3>
            <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--lootbox-text-secondary)' }} />
            <input
              type="text"
              placeholder="Search cases, items, or users..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border outline-none text-white placeholder-gray-500 transition-all focus:border-opacity-100"
              style={{ 
                background: 'var(--lootbox-bg-secondary)',
                borderColor: 'var(--lootbox-border)'
              }}
            />
          </div>
          <div className="space-y-3">
            <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>POPULAR SEARCHES</div>
            {['Gaming Cases', 'Legendary Items', 'Tech Gadgets', 'Fashion Drops'].map((term) => (
              <button 
                key={term}
                className="w-full text-left px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-all flex items-center gap-3"
                style={{ background: 'var(--lootbox-bg-secondary)' }}
              >
                <Search className="w-4 h-4" style={{ color: 'var(--lootbox-text-secondary)' }} />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 lootbox-card p-6 shadow-2xl" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-white" style={{ fontWeight: 700, fontSize: '1.125rem' }}>Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs text-white lootbox-gradient-blue">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded-lg transition-all cursor-pointer hover:border-opacity-100 border ${notif.read ? '' : 'border-opacity-50'}`}
                style={{ 
                  background: notif.read ? 'var(--lootbox-bg-secondary)' : 'var(--lootbox-bg-tertiary)',
                  borderColor: notif.read ? 'transparent' : 'var(--lootbox-blue-primary)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ 
                    background: notif.read ? 'var(--lootbox-text-muted)' : 'var(--lootbox-blue-primary)'
                  }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white mb-1" style={{ fontWeight: notif.read ? 400 : 600 }}>
                      {notif.message}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--lootbox-text-secondary)' }}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-center rounded-lg transition-all hover:bg-white/5" style={{ color: 'var(--lootbox-blue-primary)', fontWeight: 600 }}>
            Mark all as read
          </button>
        </div>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 lootbox-card p-6 shadow-2xl" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontWeight: 700, fontSize: '1.125rem' }}>Profile</h3>
            <button onClick={() => setShowProfileMenu(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full lootbox-gradient-blue flex items-center justify-center text-white text-sm">
                {isAuthenticated ? userName.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 600 }}>{userName}</p>
                <p className="text-xs" style={{ color: 'var(--lootbox-text-secondary)' }}>
                  {isAuthenticated ? 'User Profile' : 'Guest Account'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setCurrentPage("profile");
                setShowProfileMenu(false);
              }}
              variant="outline"
              className="w-full border"
              style={{ borderColor: 'var(--lootbox-border)' }}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            {isAuthenticated ? (
              <Button
                onClick={() => handleLogout()}
                variant="outline"
                className="w-full border"
                style={{ borderColor: 'var(--lootbox-border)' }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowProfileMenu(false);
                  setShowAuthModal(true);
                }}
                className="w-full lootbox-gradient-blue"
                style={{ fontWeight: 700 }}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 xl:ml-80">
        {currentPage === "main" && (
          <MainPage
            balance={balance}
            setBalance={setBalance}
            addToInventory={addToInventory}
          />
        )}
        {currentPage === "battles" && (
          <BattlesPage
            balance={balance}
            setBalance={setBalance}
            addToInventory={addToInventory}
          />
        )}
        {currentPage === "inventory" && (
          <InventoryPage
            inventory={inventory}
            removeFromInventory={removeFromInventory}
            setBalance={setBalance}
          />
        )}
        {currentPage === "profile" && (
          <ProfilePage
            balance={balance}
            inventory={inventory}
          />
        )}
        {currentPage === "leaderboard" && (
          <LeaderboardPage />
        )}
        {currentPage === "provably-fair" && (
          <ProvablyFairPage />
        )}
      </main>

      {/* Footer Stats */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t px-4 py-3 hidden xl:block z-40" style={{ 
        background: 'rgba(10, 14, 26, 0.95)',
        borderColor: 'var(--lootbox-border)'
      }}>
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full lootbox-pulse-glow" style={{ background: 'var(--lootbox-green)' }} />
              <span style={{ color: 'var(--lootbox-text-secondary)' }}>Online:</span>
              <span className="text-white" style={{ fontWeight: 600 }}>15,429</span>
            </div>
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" style={{ color: 'var(--lootbox-blue-primary)' }} />
              <span style={{ color: 'var(--lootbox-text-secondary)' }}>Cases Opened:</span>
              <span className="text-white" style={{ fontWeight: 600 }}>2.4M+</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" style={{ color: 'var(--lootbox-gold)' }} />
              <span style={{ color: 'var(--lootbox-text-secondary)' }}>Total Winnings:</span>
              <span style={{ color: 'var(--lootbox-green)', fontWeight: 600 }}>$8,429,847</span>
            </div>
          </div>
          <div className="flex items-center gap-4" style={{ color: 'var(--lootbox-text-muted)' }}>
            <span className="hover:text-white cursor-pointer transition-colors">Help Center</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Provably Fair</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">18+ Responsible Gaming</span>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}