// src/components/sections/Skills.tsx
import { motion } from "framer-motion";
import { skills } from "@/data";

const Skills = () => {
  // Updated categories to include deployment
  const categories = [
    { key: "languages", title: "Programming Languages" },
    { key: "frontend", title: "Frontend Technologies" },
    { key: "backend", title: "Backend Technologies" },
    { key: "databases", title: "Databases" },
    { key: "deployment", title: "Deployment & DevOps" },
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
          {categories.map((category) => {
            // Check if the category exists in the skills object
            const categorySkills =
              skills[category.key as keyof typeof skills] || [];

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 text-primary-accent">
                  {category.title}
                </h3>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {categorySkills.map((skill, index) => (
                    <motion.span
                      key={`${category.key}-${index}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`
                        inline-block
                        px-3 py-1.5 
                        rounded-md
                        text-sm
                        transition-all duration-200
                        ${
                          skill.isBold
                            ? "bg-primary-accent/10 text-primary-accent border border-primary-accent/30 font-semibold"
                            : "bg-secondary-background/30 text-text-secondary"
                        }
                      `}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
