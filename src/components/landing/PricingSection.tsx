import { motion } from "framer-motion";
import { Check, Sparkles, Crown } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for trying out ParkPals",
    features: [
      "Basic check-ins",
      "See who's at nearby parks",
      "Up to 2 kid/dog profiles",
      "In-app messaging",
      "Park reviews",
      "Weekly challenges",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    desc: "For dedicated park-goers",
    features: [
      "Everything in Free",
      "Unlimited profile cards",
      "Advanced filters",
      "ParkPal AI Assistant",
      "See who's online",
      "Exclusive Pro badges",
      "Ad-free experience",
      "Priority matching",
    ],
    cta: "Start Pro Trial",
    highlight: true,
    icon: Sparkles,
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/month",
    desc: "For the whole family",
    features: [
      "Everything in Pro",
      "Up to 10 profile cards",
      "Family group creation",
      "Shared subscription",
      "Premium support",
      "Exclusive Family badges",
    ],
    cta: "Go Family",
    highlight: false,
    icon: Crown,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-32 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Plans for Every <span className="gradient-text">Park Parent</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Start free. Upgrade when you're ready.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl p-8 flex flex-col gap-6 ${
              tier.highlight
                ? "glass-card border-primary/30 glow-primary scale-[1.03]"
                : "glass-card"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                Most Popular
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{tier.desc}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
              <span className="text-muted-foreground text-sm">{tier.period}</span>
            </div>
            <ul className="flex flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-full font-bold text-sm mt-auto ${
                tier.highlight
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "border border-border text-foreground hover:border-primary/40"
              } transition-all`}
            >
              {tier.cta}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
