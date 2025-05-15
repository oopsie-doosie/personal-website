// src/components/sections/Contact.tsx
import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import { SocialIcon } from "@/utils/socialIcons";

const Contact = () => {
  return (
    <section
      id="contact"
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
          Connect With Me
        </motion.h2>

        <div className="max-w-3xl mx-auto bg-card rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary-accent mb-4">
                Get In Touch
              </h3>
              <p className="text-text-secondary mb-6">
                I'm always open to discussing new projects, opportunities or
                partnerships.
              </p>

              <ul className="space-y-4">
                <li className="text-text-secondary">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center hover:text-primary-accent transition-colors"
                  >
                    <span className="mr-3 text-primary-accent">
                      <SocialIcon name="email" />
                    </span>
                    {personalInfo.email}
                  </a>
                </li>
                <li className="text-text-secondary">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary-accent transition-colors"
                  >
                    <span className="mr-3 text-primary-accent">
                      <SocialIcon name="github" />
                    </span>
                    GitHub
                  </a>
                </li>
                <li className="text-text-secondary">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary-accent transition-colors"
                  >
                    <span className="mr-3 text-primary-accent">
                      <SocialIcon name="linkedin" />
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-secondary-background/30 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-primary-accent mb-4">
                Quick Message
              </h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Yuksel Polat Akbiyik"
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn bg-primary-accent hover:bg-secondary-accent text-text-primary border-none px-6 py-2 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-text-tertiary mt-12"
        >
          Looking forward to connecting with you!
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
