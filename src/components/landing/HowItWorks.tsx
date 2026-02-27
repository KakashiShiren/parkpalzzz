import { motion } from "framer-motion";
import { UserPlus, MapPin, Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    desc: "Add your kids or dogs with photos, ages, and personality traits. Our smart matching starts from day one.",
  },
  {
    num: "02",
    icon: MapPin,
    title: "See Who's at the Park",
    desc: "Real-time check-ins show you exactly who's at nearby parks right now. Never visit an empty park again.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Check In & Connect",
    desc: "Check in when you arrive, meet compatible families, earn Park Points, and build your community.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-32 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Three Steps to <span className="gradient-text">Park Paradise</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Getting started takes less than two minutes. Here's how it works.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
            className="glass-card-hover p-8 flex flex-col items-center text-center gap-5"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <step.icon size={28} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-primary">{step.num}</span>
            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
