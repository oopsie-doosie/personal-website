// src/components/sections/Projects.tsx
import { motion } from "framer-motion";
import { projects } from "@/data";

const Projects = () => {
  return (
    <section
      id="projects"
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
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-primary-accent/20 transition-shadow duration-300"
            >
              {/* Project Header */}
              <div className="bg-gradient-primary p-6">
                <h3 className="text-2xl font-bold text-text-primary">
                  {project.title}
                </h3>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-text-secondary text-lg mb-6">
                  {project.description}
                </p>

                {/* Project Highlights (if available) */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-primary-accent mb-3">
                      Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start text-text-secondary"
                        >
                          <span className="text-secondary-accent mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Used */}
                <h4 className="text-lg font-semibold text-primary-accent mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-secondary-background text-primary-accent px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
