import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

const sampleMessages = [
  { role: "user" as const, text: "Is Riverside Park good for a one-year-old Labrador?" },
  {
    role: "assistant" as const,
    text: "Great choice! 🐕 Riverside Park has a fenced dog area perfect for puppies. It's moderately busy right now with 3 dogs checked in — two friendly golden retrievers and a calm beagle. Low crowd levels make it ideal for a first visit!",
  },
  { role: "user" as const, text: "What parks near me are best for a shy five-year-old?" },
  {
    role: "assistant" as const,
    text: "For shy kiddos, I'd recommend Willow Creek Park 🌿 — it has a smaller, quieter playground area. Two families with kids aged 4-6 are there now. It's also got great shade and benches for you!",
  },
];

const AIPreview = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
          <Sparkles size={14} className="text-accent" />
          <span className="text-xs font-semibold text-accent">AI-Powered</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Meet Your Personal <span className="gradient-text">Park Assistant</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Ask anything about parks, breeds, playdates, or points. Your AI assistant knows your family.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto glass-card p-6 rounded-3xl"
      >
        {/* Chat header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
            <Bot size={20} className="text-foreground" />
          </div>
          <div>
            <span className="font-bold text-foreground">ParkPal AI</span>
            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">PRO</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-4">
          {sampleMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "self-end bg-primary/15 text-foreground"
                  : "self-start bg-muted/60 backdrop-blur text-foreground border border-border"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm glow-primary"
          >
            Get Pro Access
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AIPreview;
