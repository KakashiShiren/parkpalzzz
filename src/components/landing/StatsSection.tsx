import { motion } from "framer-motion";
import CountUp from "@/components/landing/CountUp";
import { Users, MapPin, Handshake, PawPrint } from "lucide-react";

const stats = [
  { icon: Users, value: 12400, label: "Active Parents" },
  { icon: MapPin, value: 850, label: "Parks" },
  { icon: Handshake, value: 34000, label: "Connections" },
  { icon: PawPrint, value: 8200, label: "Happy Dogs" },
];

const StatsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex flex-col items-center gap-3"
            >
              <s.icon size={28} className="text-primary" />
              <div className="text-3xl md:text-4xl font-extrabold text-foreground">
                <CountUp end={s.value} />+
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
