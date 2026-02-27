import { motion } from "framer-motion";
import { Trophy, Flame, Award } from "lucide-react";

const badges = [
  { name: "First Check-In", emoji: "📍", rarity: "Common" },
  { name: "Social Starter", emoji: "👋", rarity: "Common" },
  { name: "Week Warrior", emoji: "⚡", rarity: "Rare" },
  { name: "Park Legend", emoji: "👑", rarity: "Legendary" },
  { name: "Dog Whisperer", emoji: "🐕", rarity: "Epic" },
  { name: "Playground Hero", emoji: "🎪", rarity: "Rare" },
];

const rarityColors: Record<string, string> = {
  Common: "border-muted-foreground/30",
  Rare: "border-secondary/50",
  Epic: "border-accent/50",
  Legendary: "border-primary/60",
};

const GamificationPreview = () => (
  <section className="py-32 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Make Every Visit <span className="gradient-text">Rewarding</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Earn Park Points, collect badges, and climb the leaderboard.
        </p>
      </motion.div>

      {/* Badge carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-12">
        {badges.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card min-w-[140px] p-5 flex flex-col items-center gap-3 border-2 ${rarityColors[b.rarity]} flex-shrink-0`}
          >
            <span className="text-3xl">{b.emoji}</span>
            <span className="text-xs font-bold text-foreground text-center">{b.name}</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{b.rarity}</span>
          </motion.div>
        ))}
      </div>

      {/* Sample profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto glass-card p-6 rounded-3xl text-center"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center text-3xl">
          👑
        </div>
        <h3 className="text-lg font-bold text-foreground">Park Legend</h3>
        <p className="text-sm text-muted-foreground mb-4">Level 6</p>
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <Trophy size={16} className="text-primary" />
            <span className="text-sm font-bold text-foreground">4,280</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-destructive" />
            <span className="text-sm font-bold text-foreground">15 day streak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award size={16} className="text-secondary" />
            <span className="text-sm font-bold text-foreground">12 badges</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GamificationPreview;
