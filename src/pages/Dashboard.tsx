import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Compass, MessageCircle, User, MapPin, Trophy, Flame, Bell, Cloud, Sun, CloudRain, Dog, Baby } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import ParkPalsLogo from "@/components/ParkPalsLogo";
import ParkMap from "@/components/dashboard/ParkMap";
import NearbyParks from "@/components/dashboard/NearbyParks";
import WeeklyChallenge from "@/components/dashboard/WeeklyChallenge";

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Explore" },
  { icon: MapPin, label: "Check In", center: true },
  { icon: MessageCircle, label: "Messages" },
  { icon: User, label: "Profile" },
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 glass-nav px-4 py-3 flex items-center justify-between">
        <ParkPalsLogo size="sm" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
            <Trophy size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">{profile?.park_points ?? 0}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10">
            <Flame size={14} className="text-destructive" />
            <span className="text-xs font-bold text-destructive">{profile?.current_streak ?? 0}</span>
          </div>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </header>

      {/* Weather Strip */}
      <div className="px-4 py-2 flex items-center gap-2 border-b border-border">
        <Sun size={16} className="text-primary" />
        <span className="text-xs text-muted-foreground">72°F — Great day for the park! ☀️</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Map */}
        <div className="h-[55vh] relative">
          <ParkMap />
        </div>

        {/* Content below map */}
        <div className="px-4 space-y-6 mt-4">
          {/* Weekly Challenge */}
          <WeeklyChallenge />

          {/* Nearby Parks */}
          <NearbyParks />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-border">
        <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`relative flex flex-col items-center gap-0.5 py-1 px-3 ${
                tab.center ? "" : ""
              }`}
            >
              {tab.center ? (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 -mt-6 rounded-full gradient-primary flex items-center justify-center glow-primary"
                >
                  <tab.icon size={24} className="text-primary-foreground" />
                </motion.div>
              ) : (
                <>
                  <tab.icon
                    size={20}
                    className={activeTab === i ? "text-primary" : "text-muted-foreground"}
                  />
                  <span
                    className={`text-[10px] font-medium ${
                      activeTab === i ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
              {activeTab === i && !tab.center && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
