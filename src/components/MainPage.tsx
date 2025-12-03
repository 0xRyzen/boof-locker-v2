import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Star, Zap, Gift, ChevronRight, ChevronLeft, Sparkles, TrendingUp, Clock, ArrowRight, Gamepad2, Cpu, Shirt, Swords, Users, Trophy as TrophyIcon } from "lucide-react";
import { LiveDrops } from "./LiveDrops";
import { SportOpeningModal } from "./SportOpeningModal";
import { PromoBanner, StatsBar } from "./PromoBanner";
import { MinimalCaseCard } from "./MinimalCaseCard";
import { FloatingShapes, AchievementBanner, FeatureSpotlight, SectionDivider } from "./DesignElements";
import { SectionHeader } from "./SectionHeader";
import { ScrollToTop } from "./ScrollToTop";
import { BackgroundLootDrops } from "./BackgroundLootDrops";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { LiveDropsTicker } from "./LiveDropsTicker";
import { SportBanner } from "./SportBanner";
import { HorizontalLiveDrops } from "./HorizontalLiveDrops";
import type { Lootbox, LootboxItem } from "../App";

// Helper to convert all image URLs to PNG
const toPng = (url: string) => url.replace(/fm=jpg/g, 'fm=png');

const lootboxes: Lootbox[] = [
  {
    id: "1",
    name: "Starter Pack",
    price: 0.99,
    image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "1-1", name: "Premium Gaming Headset", image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 28.50, category: "audio" },
      { id: "1-2", name: "RGB Mechanical Keyboard", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ1MzQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 16.75, category: "peripheral" },
      { id: "1-3", name: "Gaming Mouse Pro", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 9.25, category: "peripheral" },
      { id: "1-4", name: "Mouse Pad XL", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 2.50, category: "accessory" },
    ],
  },
  {
    id: "2",
    name: "Gamer Pro",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ1MzQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    featured: true,
    color: "blue",
    items: [
      { id: "2-1", name: "Mechanical Keyboard Elite", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ1MzQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 35.00, category: "peripheral" },
      { id: "2-2", name: "Gaming Headset Pro", image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 22.50, category: "audio" },
      { id: "2-3", name: "Pro Gaming Mouse", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 12.00, category: "peripheral" },
      { id: "2-4", name: "Gaming Mousepad", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 3.50, category: "accessory" },
    ],
  },
  {
    id: "3",
    name: "Tech Bundle",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    featured: true,
    color: "teal",
    items: [
      { id: "3-1", name: "Premium Wireless Earbuds", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 65.00, category: "audio" },
      { id: "3-2", name: "Smart Watch Elite", image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 42.00, category: "wearable" },
      { id: "3-3", name: "Portable Charger", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 18.50, category: "accessory" },
      { id: "3-4", name: "USB-C Cable", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 4.75, category: "accessory" },
    ],
  },
  {
    id: "4",
    name: "Streetwear Drop",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    featured: true,
    color: "purple",
    items: [
      { id: "4-1", name: "Limited Edition Sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 58.00, category: "footwear" },
      { id: "4-2", name: "Designer Watch", image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 34.50, category: "accessory" },
      { id: "4-3", name: "Streetwear Cap", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 15.00, category: "apparel" },
      { id: "4-4", name: "Logo Socks Pack", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 6.25, category: "apparel" },
    ],
  },
  {
    id: "5",
    name: "Console Masters",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDQ4NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "5-1", name: "Next-Gen Console", image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDQ4NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 125.00, category: "console" },
      { id: "5-2", name: "Pro Controller", image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDQ4NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 38.00, category: "peripheral" },
      { id: "5-3", name: "Game Pass 12 Months", image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDQ4NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 18.00, category: "digital" },
      { id: "5-4", name: "Controller Skin", image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDQ4NDUxOXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 7.50, category: "accessory" },
    ],
  },
  {
    id: "6",
    name: "Audio Elite",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "6-1", name: "Studio Headphones", image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 48.00, category: "audio" },
      { id: "6-2", name: "Portable Speaker", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 24.50, category: "audio" },
      { id: "6-3", name: "Wireless Earbuds", image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY0NTQ3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 14.00, category: "audio" },
      { id: "6-4", name: "Audio Cable Pro", image: "https://images.unsplash.com/photo-1677086813101-496781a0f327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0fGVufDF8fHx8MTc2NDUwOTkwNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 3.75, category: "accessory" },
    ],
  },
  {
    id: "7",
    name: "Luxury Premium",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "gold",
    items: [
      { id: "7-1", name: "Luxury Timepiece", image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 250.00, category: "accessory" },
      { id: "7-2", name: "Premium Sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 95.00, category: "footwear" },
      { id: "7-3", name: "Designer Accessories", image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 52.00, category: "accessory" },
      { id: "7-4", name: "Gift Card $25", image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjQ0NjEwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 28.00, category: "digital" },
    ],
  },
  {
    id: "8",
    name: "Drone Tech",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NTUzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "8-1", name: "4K Action Drone", image: "https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NTUzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 78.00, category: "tech" },
      { id: "8-2", name: "Action Camera", image: "https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NTUzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 32.00, category: "tech" },
      { id: "8-3", name: "Drone Battery Pack", image: "https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NTUzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 14.00, category: "accessory" },
      { id: "8-4", name: "Drone Case", image: "https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0NTUzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 8.00, category: "accessory" },
    ],
  },
  {
    id: "9",
    name: "PC Builder Ultimate",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc2NDY1OTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    featured: true,
    color: "blue",
    items: [
      { id: "9-1", name: "RTX 4080 Graphics Card", image: "https://images.unsplash.com/photo-1652754271476-0b6cf297b827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBncmFwaGljcyUyMGNhcmR8ZW58MXx8fHwxNzY0NjU5NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 180.00, category: "hardware" },
      { id: "9-2", name: "RGB Gaming PC Case", image: "https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc2NDY1OTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 68.00, category: "hardware" },
      { id: "9-3", name: "Gaming RAM 32GB", image: "https://images.unsplash.com/photo-1652754271476-0b6cf297b827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBncmFwaGljcyUyMGNhcmR8ZW58MXx8fHwxNzY0NjU5NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 28.00, category: "hardware" },
      { id: "9-4", name: "RGB Fans Pack", image: "https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwJTIwcmdifGVufDF8fHx8MTc2NDY1OTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 12.00, category: "accessory" },
    ],
  },
  {
    id: "10",
    name: "Esports Champion",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1759701546851-1d903ac1a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NjQ2MDQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "10-1", name: "Pro Gaming Monitor 240Hz", image: "https://images.unsplash.com/photo-1759701546851-1d903ac1a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NjQ2MDQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 95.00, category: "hardware" },
      { id: "10-2", name: "Tournament Keyboard", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NjQ1MzQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 42.00, category: "peripheral" },
      { id: "10-3", name: "Pro Gaming Mouse", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 18.00, category: "peripheral" },
      { id: "10-4", name: "Team Jersey", image: "https://images.unsplash.com/photo-1759701546851-1d903ac1a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NjQ2MDQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 8.50, category: "apparel" },
    ],
  },
  {
    id: "11",
    name: "Gaming Setup Pro",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1612011213721-3936d387f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY0NjU5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "11-1", name: "Gaming Chair Pro", image: "https://images.unsplash.com/photo-1612011213721-3936d387f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY0NjU5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 115.00, category: "furniture" },
      { id: "11-2", name: "Gaming Desk RGB", image: "https://images.unsplash.com/photo-1612011213721-3936d387f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY0NjU5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 52.00, category: "furniture" },
      { id: "11-3", name: "Monitor Stand Dual", image: "https://images.unsplash.com/photo-1612011213721-3936d387f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY0NjU5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 24.00, category: "accessory" },
      { id: "11-4", name: "Cable Management Kit", image: "https://images.unsplash.com/photo-1612011213721-3936d387f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGRlc2t8ZW58MXx8fHwxNzY0NjU5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 6.00, category: "accessory" },
    ],
  },
  {
    id: "12",
    name: "VR Experience",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1658555012297-edb48f0c2d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NjQ1NzMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "12-1", name: "VR Headset Pro", image: "https://images.unsplash.com/photo-1658555012297-edb48f0c2d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NjQ1NzMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 195.00, category: "vr" },
      { id: "12-2", name: "VR Controller Set", image: "https://images.unsplash.com/photo-1658555012297-edb48f0c2d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NjQ1NzMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 75.00, category: "vr" },
      { id: "12-3", name: "VR Game Bundle", image: "https://images.unsplash.com/photo-1658555012297-edb48f0c2d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NjQ1NzMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 38.00, category: "digital" },
      { id: "12-4", name: "VR Charging Station", image: "https://images.unsplash.com/photo-1658555012297-edb48f0c2d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NjQ1NzMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 15.00, category: "accessory" },
    ],
  },
  {
    id: "13",
    name: "Gaming Laptop Elite",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ2MjUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "13-1", name: "Gaming Laptop RTX", image: "https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ2MjUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 225.00, category: "hardware" },
      { id: "13-2", name: "Laptop Cooling Pad", image: "https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ2MjUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 35.00, category: "accessory" },
      { id: "13-3", name: "Gaming Backpack", image: "https://images.unsplash.com/photo-1606625000171-fa7d471da28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQ2MjUxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 22.00, category: "accessory" },
      { id: "13-4", name: "Wireless Mouse Compact", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 9.00, category: "peripheral" },
    ],
  },
  {
    id: "14",
    name: "Streamer Bundle",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1764557207230-1d16b0aec533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlcXVpcG1lbnQlMjBtaWNyb3Bob25lfGVufDF8fHx8MTc2NDY1OTcxNHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "14-1", name: "Streaming Microphone Pro", image: "https://images.unsplash.com/photo-1764557207230-1d16b0aec533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlcXVpcG1lbnQlMjBtaWNyb3Bob25lfGVufDF8fHx8MTc2NDY1OTcxNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 88.00, category: "audio" },
      { id: "14-2", name: "Ring Light LED", image: "https://images.unsplash.com/photo-1764557207230-1d16b0aec533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlcXVpcG1lbnQlMjBtaWNyb3Bob25lfGVufDF8fHx8MTc2NDY1OTcxNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 48.00, category: "lighting" },
      { id: "14-3", name: "Stream Deck Controller", image: "https://images.unsplash.com/photo-1764557207230-1d16b0aec533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlcXVpcG1lbnQlMjBtaWNyb3Bob25lfGVufDF8fHx8MTc2NDY1OTcxNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 26.00, category: "peripheral" },
      { id: "14-4", name: "Green Screen", image: "https://images.unsplash.com/photo-1764557207230-1d16b0aec533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlcXVpcG1lbnQlMjBtaWNyb3Bob25lfGVufDF8fHx8MTc2NDY1OTcxNHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 11.00, category: "accessory" },
    ],
  },
  {
    id: "15",
    name: "Retro Classics",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjQ1NTg5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "15-1", name: "Retro Gaming Console", image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjQ1NTg5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 72.00, category: "console" },
      { id: "15-2", name: "Classic Controller Set", image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjQ1NTg5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 38.00, category: "peripheral" },
      { id: "15-3", name: "Arcade Joystick", image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjQ1NTg5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 19.00, category: "peripheral" },
      { id: "15-4", name: "Retro Game Bundle", image: "https://images.unsplash.com/photo-1698273300787-f698a50bb250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZyUyMGFyY2FkZXxlbnwxfHx8fDE3NjQ1NTg5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 7.00, category: "digital" },
    ],
  },
  {
    id: "16",
    name: "FPS Dominator",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "16-1", name: "FPS Gaming Mouse", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 58.00, category: "peripheral" },
      { id: "16-2", name: "Pro Mousepad XXL", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 28.00, category: "accessory" },
      { id: "16-3", name: "Gaming Wrist Rest", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 14.00, category: "accessory" },
      { id: "16-4", name: "Mouse Bungee", image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjQ1NjMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 5.00, category: "accessory" },
    ],
  },
  {
    id: "17",
    name: "Elite Gaming Laptop",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY0NjQ4MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "17-1", name: "Gaming Laptop RTX 4090", image: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY0NjQ4MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 285.00, category: "hardware" },
      { id: "17-2", name: "Gaming Laptop Bag", image: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY0NjQ4MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 25.00, category: "accessory" },
      { id: "17-3", name: "Cooling Pad RGB", image: "https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY0NjQ4MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 8.00, category: "accessory" },
    ],
  },
  {
    id: "18",
    name: "RGB Keyboard Elite",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzY0NjYzMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "18-1", name: "Mechanical RGB Keyboard", image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzY0NjYzMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 45.00, category: "peripheral" },
      { id: "18-2", name: "Custom Keycaps Set", image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzY0NjYzMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 22.00, category: "accessory" },
      { id: "18-3", name: "Wrist Rest Premium", image: "https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjByZ2J8ZW58MXx8fHwxNzY0NjYzMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 6.50, category: "accessory" },
    ],
  },
  {
    id: "19",
    name: "Gaming Monitor Pro",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2NDU1NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "19-1", name: "4K Gaming Monitor 144Hz", image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2NDU1NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 125.00, category: "hardware" },
      { id: "19-2", name: "Monitor Arm Mount", image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2NDU1NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 18.00, category: "accessory" },
      { id: "19-3", name: "Screen Cleaning Kit", image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yfGVufDF8fHx8MTc2NDU1NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 4.00, category: "accessory" },
    ],
  },
  {
    id: "20",
    name: "Console Controller Deluxe",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc2NDU4NDI4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "20-1", name: "Elite Wireless Controller", image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc2NDU4NDI4Mnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 68.00, category: "peripheral" },
      { id: "20-2", name: "Charging Dock Dual", image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc2NDU4NDI4Mnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 24.00, category: "accessory" },
      { id: "20-3", name: "Thumbstick Grips", image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc2NDU4NDI4Mnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 3.50, category: "accessory" },
    ],
  },
  {
    id: "21",
    name: "Smartphone Pro",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1557817683-5cfe3620b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2MjE4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "21-1", name: "Latest Smartphone Pro", image: "https://images.unsplash.com/photo-1557817683-5cfe3620b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2MjE4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 195.00, category: "tech" },
      { id: "21-2", name: "Premium Phone Case", image: "https://images.unsplash.com/photo-1557817683-5cfe3620b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2MjE4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 18.00, category: "accessory" },
      { id: "21-3", name: "Wireless Charger Fast", image: "https://images.unsplash.com/photo-1557817683-5cfe3620b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2MjE4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 7.50, category: "accessory" },
    ],
  },
  {
    id: "22",
    name: "Premium Headphones",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0NjI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "22-1", name: "Noise Canceling Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0NjI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 88.00, category: "audio" },
      { id: "22-2", name: "Headphone Stand", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0NjI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 12.00, category: "accessory" },
      { id: "22-3", name: "Carrying Case", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0NjI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 5.00, category: "accessory" },
    ],
  },
  {
    id: "23",
    name: "Smartwatch Collection",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3NjQ2NDg0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "23-1", name: "Smartwatch Pro Series", image: "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3NjQ2NDg0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 125.00, category: "wearable" },
      { id: "23-2", name: "Watch Bands Collection", image: "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3NjQ2NDg0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 28.00, category: "accessory" },
      { id: "23-3", name: "Screen Protector", image: "https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3NjQ2NDg0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 4.50, category: "accessory" },
    ],
  },
  {
    id: "24",
    name: "Tablet Pro Bundle",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY0NjQ5MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "24-1", name: "Premium Tablet Pro", image: "https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY0NjQ5MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 165.00, category: "tech" },
      { id: "24-2", name: "Tablet Keyboard Case", image: "https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY0NjQ5MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 35.00, category: "accessory" },
      { id: "24-3", name: "Stylus Pen Pro", image: "https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY0NjQ5MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 15.00, category: "accessory" },
    ],
  },
  {
    id: "25",
    name: "Sneaker Hype",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY0NjYxNDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "25-1", name: "Limited Sneakers Collab", image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY0NjYxNDU1fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 115.00, category: "footwear" },
      { id: "25-2", name: "Sneaker Cleaning Kit", image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY0NjYxNDU1fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 14.00, category: "accessory" },
      { id: "25-3", name: "Shoe Laces Premium", image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY0NjYxNDU1fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 5.00, category: "accessory" },
    ],
  },
  {
    id: "26",
    name: "Designer Backpack",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1575376653281-1632fc9c61f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWNrcGFja3xlbnwxfHx8fDE3NjQ2NjMxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "26-1", name: "Luxury Backpack Designer", image: "https://images.unsplash.com/photo-1575376653281-1632fc9c61f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWNrcGFja3xlbnwxfHx8fDE3NjQ2NjMxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 85.00, category: "accessory" },
      { id: "26-2", name: "Travel Pouch Set", image: "https://images.unsplash.com/photo-1575376653281-1632fc9c61f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWNrcGFja3xlbnwxfHx8fDE3NjQ2NjMxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 22.00, category: "accessory" },
      { id: "26-3", name: "Keychain Designer", image: "https://images.unsplash.com/photo-1575376653281-1632fc9c61f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWNrcGFja3xlbnwxfHx8fDE3NjQ2NjMxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 3.50, category: "accessory" },
    ],
  },
  {
    id: "27",
    name: "Sunglasses Collection",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NjIxMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "27-1", name: "Designer Sunglasses Premium", image: "https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NjIxMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 65.00, category: "accessory" },
      { id: "27-2", name: "Sunglasses Case Leather", image: "https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NjIxMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 8.00, category: "accessory" },
      { id: "27-3", name: "Cleaning Cloth Premium", image: "https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NjIxMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 2.00, category: "accessory" },
    ],
  },
  {
    id: "28",
    name: "Streetwear Essentials",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllfGVufDF8fHx8MTc2NDU4MzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "28-1", name: "Premium Hoodie Collection", image: "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllfGVufDF8fHx8MTc2NDU4MzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 98.00, category: "apparel" },
      { id: "28-2", name: "Streetwear Cap Limited", image: "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllfGVufDF8fHx8MTc2NDU4MzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 28.00, category: "apparel" },
      { id: "28-3", name: "Streetwear Socks Pack", image: "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwaG9vZGllfGVufDF8fHx8MTc2NDU4MzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 7.50, category: "apparel" },
    ],
  },
  {
    id: "29",
    name: "Battle Station",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBiYXR0bGUlMjBzZXR1cHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "29-1", name: "RGB Battle Station Desk", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBiYXR0bGUlMjBzZXR1cHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 92.00, category: "furniture" },
      { id: "29-2", name: "LED Strip Kit", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBiYXR0bGUlMjBzZXR1cHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 38.00, category: "lighting" },
      { id: "29-3", name: "Gaming Chair Cushion", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBiYXR0bGUlMjBzZXR1cHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 9.50, category: "accessory" },
    ],
  },
  {
    id: "30",
    name: "Pro Gamer Arsenal",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "30-1", name: "Pro Gaming Gear Bundle", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 78.00, category: "peripheral" },
      { id: "30-2", name: "Gaming Gloves", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 16.00, category: "accessory" },
      { id: "30-3", name: "Cable Organizer Pro", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 4.50, category: "accessory" },
    ],
  },
  {
    id: "31",
    name: "Racing Sim Pro",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjB3aGVlbHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "gaming",
    color: "blue",
    items: [
      { id: "31-1", name: "Racing Wheel & Pedals", image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjB3aGVlbHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 215.00, category: "peripheral" },
      { id: "31-2", name: "Racing Seat Pro", image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjB3aGVlbHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 58.00, category: "furniture" },
      { id: "31-3", name: "Shifter Add-on", image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjB3aGVlbHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 19.00, category: "accessory" },
    ],
  },
  {
    id: "32",
    name: "Wireless Earbuds Pro",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "32-1", name: "Premium True Wireless Earbuds", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 72.00, category: "audio" },
      { id: "32-2", name: "Charging Case Pro", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 12.00, category: "accessory" },
      { id: "32-3", name: "Ear Tips Set", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 3.00, category: "accessory" },
    ],
  },
  {
    id: "33",
    name: "Camera Gear Pro",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "33-1", name: "Professional Camera Kit", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 145.00, category: "tech" },
      { id: "33-2", name: "Tripod & Gimbal", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 42.00, category: "accessory" },
      { id: "33-3", name: "Camera Bag Premium", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 18.00, category: "accessory" },
    ],
  },
  {
    id: "34",
    name: "Power Bank Bundle",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmt8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "34-1", name: "Ultra Capacity Power Bank", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmt8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 58.00, category: "tech" },
      { id: "34-2", name: "Fast Charging Cables", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmt8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 9.00, category: "accessory" },
      { id: "34-3", name: "Travel Adapter", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGJhbmt8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 5.50, category: "accessory" },
    ],
  },
  {
    id: "35",
    name: "Gaming Keyboard Pro Max",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "35-1", name: "Wireless Mechanical Keyboard", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 135.00, category: "peripheral" },
      { id: "35-2", name: "Artisan Keycaps", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 45.00, category: "accessory" },
      { id: "35-3", name: "Switch Puller Tool", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 6.00, category: "accessory" },
    ],
  },
  {
    id: "36",
    name: "Smart Home Hub",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1558089687-12db5b643002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWV8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tech",
    color: "teal",
    items: [
      { id: "36-1", name: "Smart Home Control Hub", image: "https://images.unsplash.com/photo-1558089687-12db5b643002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWV8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 98.00, category: "tech" },
      { id: "36-2", name: "Smart Lights Set", image: "https://images.unsplash.com/photo-1558089687-12db5b643002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWV8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 32.00, category: "lighting" },
      { id: "36-3", name: "Smart Plug Bundle", image: "https://images.unsplash.com/photo-1558089687-12db5b643002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWV8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 11.00, category: "tech" },
    ],
  },
  {
    id: "37",
    name: "Designer Jacket",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGphY2tldHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "37-1", name: "Limited Edition Designer Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGphY2tldHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 185.00, category: "apparel" },
      { id: "37-2", name: "Designer Scarf", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGphY2tldHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 48.00, category: "accessory" },
      { id: "37-3", name: "Pin Badge Set", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGphY2tldHxlbnwxfHx8fDE3MzM0MDAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 8.00, category: "accessory" },
    ],
  },
  {
    id: "38",
    name: "Jewelry Collection",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbmVja2xhY2V8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "38-1", name: "Diamond Pendant Necklace", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbmVja2xhY2V8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 148.00, category: "accessory" },
      { id: "38-2", name: "Gold Bracelet", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbmVja2xhY2V8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 52.00, category: "accessory" },
      { id: "38-3", name: "Ring Set", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbmVja2xhY2V8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 22.00, category: "accessory" },
    ],
  },
  {
    id: "39",
    name: "Handbag Luxury",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "gold",
    items: [
      { id: "39-1", name: "Designer Handbag Premium", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "mythic", value: 225.00, category: "accessory" },
      { id: "39-2", name: "Wallet Luxury", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 78.00, category: "accessory" },
      { id: "39-3", name: "Charm Keychain", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 15.00, category: "accessory" },
    ],
  },
  {
    id: "40",
    name: "Belt Collection Premium",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1624222247344-b8c8cc27ca08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJlbHR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "40-1", name: "Leather Belt Designer", image: "https://images.unsplash.com/photo-1624222247344-b8c8cc27ca08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJlbHR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 88.00, category: "accessory" },
      { id: "40-2", name: "Buckle Collection", image: "https://images.unsplash.com/photo-1624222247344-b8c8cc27ca08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJlbHR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "epic", value: 28.00, category: "accessory" },
      { id: "40-3", name: "Belt Care Kit", image: "https://images.unsplash.com/photo-1624222247344-b8c8cc27ca08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJlbHR8ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 6.50, category: "accessory" },
    ],
  },
  {
    id: "41",
    name: "Hat Collection",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGF0fGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "41-1", name: "Designer Hat Premium", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGF0fGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 72.00, category: "apparel" },
      { id: "41-2", name: "Beanie Collection", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGF0fGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 18.00, category: "apparel" },
      { id: "41-3", name: "Cap Clips", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGF0fGVufDF8fHx8MTczMzQwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 4.00, category: "accessory" },
    ],
  },
  {
    id: "42",
    name: "Premium Boots",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib290cyUyMGZhc2hpb258ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fashion",
    color: "purple",
    items: [
      { id: "42-1", name: "Designer Boots Limited", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib290cyUyMGZhc2hpb258ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "legendary", value: 125.00, category: "footwear" },
      { id: "42-2", name: "Boot Care Set", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib290cyUyMGZhc2hpb258ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "rare", value: 16.00, category: "accessory" },
      { id: "42-3", name: "Shoe Horn Premium", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib290cyUyMGZhc2hpb258ZW58MXx8fHwxNzMzNDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080", rarity: "common", value: 5.00, category: "accessory" },
    ],
  },
];

interface MainPageProps {
  balance: number;
  setBalance: (balance: number) => void;
  addToInventory: (item: LootboxItem) => void;
}

export function MainPage({ balance, setBalance, addToInventory }: MainPageProps) {
  const [selectedLootbox, setSelectedLootbox] = useState<Lootbox | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const gamingCases = lootboxes.filter(box => box.category === "gaming");
  const techCases = lootboxes.filter(box => box.category === "tech");
  const fashionCases = lootboxes.filter(box => box.category === "fashion");
  const featuredCases = lootboxes.filter(box => box.featured);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredCases.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCases.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCases.length) % featuredCases.length);
  };

  return (
    <div className="relative space-y-8 sm:space-y-10 md:space-y-12 pb-0">
      {/* Background Loot Drops */}
      <BackgroundLootDrops />

      {/* Floating Background Shapes */}
      <FloatingShapes />

      {/* Hero Carousel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl mb-12"
        style={{ 
          background: 'var(--lootbox-bg-card)',
          border: '1px solid var(--lootbox-border)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
            style={{
              background: 'transparent',
            }}
          >
            <div className="px-6 sm:px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="flex-1 max-w-xl z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block mb-4"
                >
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'var(--lootbox-blue-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Featured Case
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 3rem)', 
                    fontWeight: 600, 
                    lineHeight: 1.2, 
                    letterSpacing: '-0.025em',
                    color: 'var(--lootbox-text-primary)'
                  }}
                >
                  {featuredCases[currentSlide]?.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                  style={{ 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    color: 'var(--lootbox-text-secondary)'
                  }}
                >
                  Unbox premium items worth up to $250. Every case guarantees a win!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Button
                    onClick={() => setSelectedLootbox(featuredCases[currentSlide])}
                    className="px-6 py-3 rounded-xl"
                    style={{
                      background: 'var(--lootbox-blue-primary)',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '1rem',
                      border: 'none'
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Open for ${featuredCases[currentSlide]?.price.toFixed(2)}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                  <div 
                    className="px-4 py-2 rounded-lg"
                    style={{
                      background: 'var(--lootbox-bg-tertiary)',
                      color: 'var(--lootbox-text-secondary)',
                      fontWeight: 500,
                      fontSize: '0.875rem'
                    }}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    <span>Limited Time</span>
                  </div>
                </motion.div>
              </div>

              {/* Case Image Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex-shrink-0 relative"
                style={{
                  width: 'clamp(200px, 30vw, 320px)',
                  height: 'clamp(200px, 30vw, 320px)'
                }}
              >
                <img
                  src={toPng(featuredCases[currentSlide]?.image)}
                  alt={featuredCases[currentSlide]?.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-100"
          style={{
            background: 'var(--lootbox-bg-tertiary)',
            border: '1px solid var(--lootbox-border)',
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: 'var(--lootbox-text-primary)' }} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-100"
          style={{
            background: 'var(--lootbox-bg-tertiary)',
            border: '1px solid var(--lootbox-border)',
          }}
        >
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--lootbox-text-primary)' }} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {featuredCases.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="rounded-full transition-all"
              style={{
                width: currentSlide === index ? '24px' : '8px',
                height: '8px',
                background: currentSlide === index ? 'var(--lootbox-blue-primary)' : 'var(--lootbox-border)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Gaming Cases Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative space-y-8"
      >
        <SectionHeader
          icon={Gamepad2}
          title="Gaming Cases"
          subtitle={`${gamingCases.length} premium gaming cases available`}
          iconColor="#8b5cf6"
          gradientFrom="#8b5cf6"
          gradientTo="#6366f1"
        />

        {/* Cases Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {gamingCases.map((lootbox, index) => (
            <MinimalCaseCard
              key={lootbox.id}
              lootbox={lootbox}
              index={index}
              delay={0.3}
              onClick={() => setSelectedLootbox(lootbox)}
            />
          ))}
        </div>
      </motion.div>

      {/* Section Divider */}
      <SectionDivider />

      {/* Tech Cases Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative space-y-8"
      >
        <SectionHeader
          icon={Cpu}
          title="Tech Cases"
          subtitle={`${techCases.length} cutting-edge technology cases`}
          iconColor="#06b6d4"
          gradientFrom="#06b6d4"
          gradientTo="#3b82f6"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {techCases.map((lootbox, index) => (
            <MinimalCaseCard
              key={lootbox.id}
              lootbox={lootbox}
              index={index}
              delay={0.5}
              onClick={() => setSelectedLootbox(lootbox)}
            />
          ))}
        </div>
      </motion.div>

      {/* Section Divider */}
      <SectionDivider />

      {/* Fashion Cases Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative space-y-8"
      >
        <SectionHeader
          icon={Shirt}
          title="Fashion Cases"
          subtitle={`${fashionCases.length} exclusive fashion and streetwear cases`}
          iconColor="#ec4899"
          gradientFrom="#ec4899"
          gradientTo="#f43f5e"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {fashionCases.map((lootbox, index) => (
            <MinimalCaseCard
              key={lootbox.id}
              lootbox={lootbox}
              index={index}
              delay={0.7}
              onClick={() => setSelectedLootbox(lootbox)}
            />
          ))}
        </div>
      </motion.div>

      {/* Feature Spotlight */}
      <FeatureSpotlight />

      {/* Enhanced Sport.fun Style Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <SportBanner
          badge="New Feature"
          title="Battle Mode Coming Soon"
          description="Challenge other players in epic case battles. Winner takes all!"
          features={["1v1 Battles", "Team Battles", "Tournaments"]}
          variant="secondary"
          delay={0}
          icon={Swords}
        />

        <SportBanner
          badge="Special Offer"
          title="Get 20% Bonus on First Deposit"
          description="New users get extra credits on their first deposit. Start your lootbox journey with a boost!"
          buttonText="Claim Bonus"
          buttonAction={() => alert("Sign in to claim your bonus!")}
          variant="accent"
          delay={0.1}
          icon={Gift}
        />
      </div>

      {/* Section Divider */}
      <SectionDivider />

      {/* Footer */}
      <Footer />

      {/* Opening Modal */}
      {selectedLootbox && (
        <SportOpeningModal
          lootbox={selectedLootbox}
          onClose={() => setSelectedLootbox(null)}
          balance={balance}
          setBalance={setBalance}
          addToInventory={addToInventory}
        />
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
