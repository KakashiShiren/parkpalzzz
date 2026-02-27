import { motion } from "framer-motion";
import { Shield, Star, AlertTriangle } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Verified Profiles", desc: "Identity verification builds trust and keeps the community safe for everyone." },
  { icon: Star, title: "Community Reviews", desc: "Rate and review other parents so the best community members shine." },
  { icon: AlertTriangle, title: "Easy Reporting", desc: "Report concerns instantly. Our moderation team acts quickly to keep parks safe." },
];

const SafetySection = () => (
  <section id="safety" className="py-32 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center"
        >
          <Shield size={36} className="text-primary-foreground" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Safety <span className="gradient-text">Comes First</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Every feature is built with your family's safety in mind.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-7 text-center flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <p.icon size={22} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SafetySection;
