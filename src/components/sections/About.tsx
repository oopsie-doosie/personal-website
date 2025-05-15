// src/components/sections/About.tsx
import { motion } from "framer-motion";
import { personalInfo, education } from "@/data"; // Updated import path

const About = () => {
  return (
    <section
      id="about"
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
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary-accent">
              Professional Profile
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="mt-6 text-text-tertiary">
              <p>
                <span className="font-semibold text-text-primary">Email: </span>
                {personalInfo.email}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-text-primary">
                  GitHub:{" "}
                </span>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-accent hover:text-secondary-accent transition-colors"
                >
                  {personalInfo.github.replace("https://github.com/", "")}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary-accent">
              Education
            </h3>

            {education.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="text-xl font-medium text-text-primary">
                  {item.degree}
                </h4>
                <p className="text-lg text-primary-accent mt-1">
                  {item.institution}
                </p>
                <p className="text-text-tertiary mt-1">{item.duration}</p>
                <p className="text-text-secondary mt-3">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Personal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-primary/20 rounded-xl p-8 border border-primary-accent/30"
        >
          <p className="text-xl italic text-center text-text-secondary leading-relaxed">
            "I believe in combining technical expertise with creative
            problem-solving to build solutions that make a meaningful impact. My
            background in both Computer Science and Economics gives me a unique
            perspective on developing technology that delivers value."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
