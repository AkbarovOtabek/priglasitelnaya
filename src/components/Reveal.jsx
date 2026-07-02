import { motion } from 'framer-motion';

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 54, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } },
  down:  { hidden: { opacity: 0, y: -42 },             show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -72, scale: 0.97 }, show: { opacity: 1, x: 0, scale: 1 } },
  right: { hidden: { opacity: 0, x: 72, scale: 0.97 },  show: { opacity: 1, x: 0, scale: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.7 },           show: { opacity: 1, scale: 1 } },
  flip:  { hidden: { opacity: 0, rotateX: 55, y: 24, scale: 0.96 }, show: { opacity: 1, rotateX: 0, y: 0, scale: 1 } },
  blur:  { hidden: { opacity: 0, filter: 'blur(14px)', y: 18 }, show: { opacity: 1, filter: 'blur(0px)', y: 0 } },
  zoom:  { hidden: { opacity: 0, scale: 1.12 },          show: { opacity: 1, scale: 1 } },
};

// Обёртка появления через IntersectionObserver (Framer Motion whileInView).
export function Reveal({ children, delay = 0, variant = 'up', y, className = '', once = true }) {
  // Legacy: if 'y' prop passed, override with simple up animation
  const v = y !== undefined
    ? { hidden: { opacity: 0, y, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }
    : (VARIANTS[variant] ?? VARIANTS.up);

  return (
    <motion.div
      className={className}
      initial={v.hidden}
      whileInView={v.show}
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: variant === 'flip' ? 1.15 : variant === 'blur' ? 1.1 : 0.95,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Контейнер со стаггером для дочерних Reveal-элементов.
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
