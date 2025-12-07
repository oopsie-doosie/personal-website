import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const RevealOnScroll = ({ children, width = "100%", delay = 0 }: RevealOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealOnScroll;
