import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah M.", role: "Dog Mom", quote: "ParkPals completely changed how I socialize my puppy. We've made so many friends!", rating: 5 },
  { name: "James K.", role: "Dad of 2", quote: "No more driving to an empty playground. I always know where the action is.", rating: 5 },
  { name: "Priya R.", role: "Dog & Kid Parent", quote: "The AI assistant helped me find the perfect park for my shy toddler and energetic corgi.", rating: 5 },
  { name: "Marcus T.", role: "Dog Dad", quote: "I'm addicted to earning badges. Park Legend here I come! 🏆", rating: 5 },
  { name: "Emily C.", role: "Mom of 3", quote: "The playdate scheduling feature is a lifesaver for our busy family.", rating: 5 },
];

const TestimonialsSection = () => (
  <section id="community" className="py-32 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Loved by <span className="gradient-text">Real Parents</span>
        </h2>
      </motion.div>

      {/* Scrolling row */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 rounded-2xl min-w-[300px] max-w-[340px] snap-center flex flex-col gap-4 flex-shrink-0"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">"{t.quote}"</p>
              <div className="mt-auto">
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
