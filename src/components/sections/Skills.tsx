// src/components/sections/Skills.tsx
import { motion } from "framer-motion";
import { skills } from "@/data";

const Skills = () => {
  const categories = [
    { key: "languages", title: "Programming Languages" },
    { key: "frontend", title: "Frontend Technologies" },
    { key: "backend", title: "Backend Technologies" },
    { key: "databases", title: "Databases" },
    { key: "tools", title: "Tools & Platforms" },
    { key: "other", title: "Other Skills" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
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
          Technical Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-primary-accent mb-4">
                {category.title}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {skills[category.key as keyof typeof skills].map(
                  (skill, index) => (
                    <motion.span
                      key={index}
                      variants={itemVariants}
                      className={`
                        bg-gradient-primary/20 
                        text-text-primary 
                        border border-primary-accent/30 
                        px-3 py-1.5 
                        rounded-full 
                        text-sm 
                        hover:bg-gradient-primary/40 
                        transition-colors
                        ${
                          skill.isBold
                            ? "font-bold border-primary-accent"
                            : "font-normal"
                        }
                      `}
                    >
                      {skill.name}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
