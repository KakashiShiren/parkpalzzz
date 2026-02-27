import { motion } from "framer-motion";
import { Radio, Bell, ShieldCheck, Trophy, Heart, MessageCircle } from "lucide-react";

const features = [
  { icon: Radio, title: "Real-Time Check-Ins", desc: "See who's at the park right now with live activity feeds and pulsing map markers." },
  { icon: Bell, title: "Instant Notifications", desc: "Get alerted when compatible families check in at your favorite parks nearby." },
  { icon: ShieldCheck, title: "Safety Verified", desc: "Identity verification, community reviews, and easy reporting keep everyone safe." },
  { icon: Trophy, title: "Park Points & Badges", desc: "Earn points for every visit, unlock badges, climb leaderboards, and level up." },
  { icon: Heart, title: "Compatible Matching", desc: "Smart matching connects your kids or dogs with compatible playmates." },
  { icon: MessageCircle, title: "In-App Messaging", desc: "Chat with other parents, schedule playdates, and share park tips." },
];

const FeaturesSection = () => (
  <section id="features" className="py-32 relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Everything You Need to <span className="gradient-text">Love the Park</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Packed with features that make every park visit better.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
            className="glass-card-hover p-7 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <f.icon size={22} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
