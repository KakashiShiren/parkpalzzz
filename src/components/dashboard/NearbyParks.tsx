import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Dog, Baby, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NearbyParks = () => {
  const [parks, setParks] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("parks").select("*").limit(5).then(({ data }) => {
      if (data) setParks(data);
    });
  }, []);

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-3">Nearby Parks</h2>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide mb-4">
        {parks.map((park, i) => (
          <motion.div
            key={park.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover min-w-[240px] p-4 flex-shrink-0 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-sm text-foreground">{park.name}</h3>
              <div className="flex items-center gap-0.5">
                <Star size={12} className="text-primary fill-primary" />
                <span className="text-xs font-semibold text-foreground">
                  {park.average_rating?.toFixed(1) || "New"}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{park.address}</p>
            <div className="flex items-center gap-3">
              {park.has_dog_run && (
                <div className="flex items-center gap-1 text-xs text-secondary">
                  <Dog size={12} />
                  <span>Dog Run</span>
                </div>
              )}
              {park.has_restrooms && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>🚻</span>
                  <span>Restrooms</span>
                </div>
              )}
              {park.has_parking && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>🅿️</span>
                  <span>Parking</span>
                </div>
              )}
            </div>
            {/* Active indicator */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
              <span className="text-[10px] text-muted-foreground">0 active now</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vertical list */}
      <div className="space-y-3">
        {parks.map((park, i) => (
          <motion.div
            key={park.id + "-list"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:border-primary/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground">{park.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{park.address}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-0.5 justify-end">
                <Star size={12} className="text-primary fill-primary" />
                <span className="text-xs font-bold text-foreground">
                  {park.average_rating?.toFixed(1) || "—"}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{park.total_reviews || 0} reviews</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NearbyParks;
