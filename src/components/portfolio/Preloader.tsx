import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ width: 80, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel glow-ring relative h-16 overflow-hidden rounded-full"
          >
            <div className="flex h-full items-center justify-center overflow-hidden">
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: [40, 0, 0, -40] }}
                transition={{ duration: 1.4, delay: 0.7, times: [0, 0.2, 0.75, 1] }}
                className="font-display text-sm tracking-[0.35em] text-foreground uppercase"
              >
                Malik Kashif Farooq
              </motion.div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
              style={{ background: "var(--gradient-violet)" }}
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
