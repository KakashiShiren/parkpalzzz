import { motion } from "framer-motion";
import { Target, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const WeeklyChallenge = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const nextMonday = new Date(now);
      nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7 || 7));
      nextMonday.setHours(0, 0, 0, 0);
      const diff = nextMonday.getTime() - now.getTime();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Target size={16} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-foreground">Weekly Challenge</h3>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock size={10} />
            <span>Resets in {timeLeft}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
          <Zap size={12} className="text-primary" />
          <span className="text-xs font-bold text-primary">+50 pts</span>
        </div>
      </div>

      <p className="text-sm text-foreground mb-3">Check in at 3 different parks this week</p>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-foreground">0 / 3</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyChallenge;
