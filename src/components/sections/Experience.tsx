// src/components/sections/Experience.tsx
import { motion } from "framer-motion";
import { experience } from "@/data";

const Experience = () => {
  return (
    <section
      id="experience"
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
          Professional Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg mb-10 relative"
            >
              {/* Decorative line connecting experiences */}
              {index < experience.length - 1 && (
                <div className="absolute h-10 w-1 bg-primary-accent/30 left-1/2 transform -translate-x-1/2 top-full z-0"></div>
              )}

              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {job.position}
                  </h3>
                  <h4 className="text-xl text-primary-accent mt-1">
                    {job.company}
                  </h4>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="text-text-tertiary font-medium bg-secondary-background/50 px-4 py-1 rounded-full">
                    {job.duration}
                  </span>
                </div>
              </div>

              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                {job.description}
              </p>

              <div>
                <h5 className="text-lg font-semibold text-primary-accent mb-3">
                  Key Responsibilities
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.responsibilities.map((responsibility, i) => (
                    <li
                      key={i}
                      className="flex items-start text-text-secondary"
                    >
                      <span className="text-primary-accent mr-2">›</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
