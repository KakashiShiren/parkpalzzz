import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import CountUp from "@/components/landing/CountUp";
import heroImage from "@/assets/hero-park.jpg";

const stats = [
  { value: 12400, label: "Parents Joined", suffix: "+" },
  { value: 850, label: "Parks Covered", suffix: "+" },
  { value: 34000, label: "Connections Made", suffix: "+" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.12, type: "spring" as const, stiffness: 100 },
  }),
};

const HeroSection = () => {
  const headline = ["Your Park,", "Your Pack,", "Your People."];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold text-primary">Now Live in Beta</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`block ${i === 2 ? "gradient-text" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Know who's at the park before you go. Connect with nearby parents, schedule playdates, and never visit an empty park again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg glow-primary flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-lg hover:border-primary/40 transition-colors flex items-center gap-2"
            >
              <Play size={18} />
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-8 mt-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-foreground">
                  <CountUp end={stat.value} />{stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
          className="relative hidden lg:block"
        >
          <div className="animate-float">
            <div className="relative rounded-3xl overflow-hidden glass-card p-2">
              <img
                src={heroImage}
                alt="Parents, kids and dogs enjoying a park together at sunset"
                className="w-full rounded-2xl"
              />
              {/* Overlay glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
