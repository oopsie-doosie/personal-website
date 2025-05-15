// src/components/sections/Interests/Interests.tsx
import { motion } from "framer-motion";
import { interests } from "../../data";

const Interests = () => {
  return (
    <section
      id="interests"
      className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-700 hover:border-blue-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-3">
                {interest.name}
              </h3>
              <p className="text-slate-300">{interest.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30 max-w-3xl mx-auto"
        >
          <p className="text-lg text-center text-slate-300 leading-relaxed">
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
