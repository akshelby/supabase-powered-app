import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Briefcase, Clock } from 'lucide-react';

const stats = [
  { icon: Clock, value: 25, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 500, suffix: '+', label: 'Happy Clients' },
  { icon: Briefcase, value: 1000, suffix: '+', label: 'Projects Completed' },
  { icon: Award, value: 50, suffix: '+', label: 'Industry Awards' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-display mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
