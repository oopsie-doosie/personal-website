// src/components/sections/Interests/Interests.tsx
import { motion } from "framer-motion";
import { interests } from "@/data";
import { InterestIcon } from "@/utils/interestIcons";

const Interests = () => {
  return (
    <section
      id="interests"
      className="py-20 bg-gradient-to-b from-primary-background via-secondary-background to-primary-background"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Personal Interests
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary-accent/30 transform hover:-translate-y-2 transition-all duration-200 ease-out"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <InterestIcon name={interest.icon} />
                </div>
                <h3 className="text-xl font-bold text-primary-accent">
                  {interest.name}
                </h3>
              </div>
              <p className="text-text-secondary">{interest.description}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-primary/20 rounded-xl p-8 border border-primary-accent/30 max-w-3xl mx-auto"
        >
          <p className="text-lg text-center text-text-secondary leading-relaxed">
            I believe in maintaining a healthy work-life balance. My personal
            interests help me stay creative, energized, and bring fresh
            perspectives to my professional work.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Interests;
