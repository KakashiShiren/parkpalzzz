import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-32 relative">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
    </div>
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
          Ready to Find Your <span className="gradient-text">Park Pack?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
          Join thousands of parents making every park visit count.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg glow-primary inline-flex items-center gap-3"
        >
          Get Started Free
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
