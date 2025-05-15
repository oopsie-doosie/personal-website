// src/components/sections/Contact.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import { SocialIcon } from "@/utils/socialIcons";

if (!import.meta.env.VITE_WEB3FORMS_KEY) {
  console.error(
    "Missing Web3Forms API key. Contact form will not work properly."
  );
}

const Contact = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    });

    // Create FormData from the form
    const formData = new FormData(e.target as HTMLFormElement);

    // Append the access key from environment variable
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    // Add additional fields
    formData.append("subject", "New message from your personal website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: {
            error: true,
            msg: data.message || "Something went wrong. Please try again.",
          },
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Network error. Please try again later." },
      });
    }
  };

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
            {/* Left column - Contact info */}
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

            {/* Right column - Contact form */}
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
              <form onSubmit={handleSubmit}>
                {/* We're not adding hidden input fields for access_key here because we're appending it in the handleSubmit function */}

                {/* Honeypot field for spam prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-text-secondary text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-text-secondary text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-text-secondary text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded bg-secondary-background border border-border text-text-primary focus:outline-none focus:border-primary-accent"
                  ></textarea>
                </div>

                {status.info.msg && (
                  <div
                    className={`mb-4 text-sm ${
                      status.info.error ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {status.info.msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`
                    btn bg-primary-accent hover:bg-secondary-accent text-text-primary 
                    border-none px-6 py-2 rounded-md transition-colors
                    ${status.submitting ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  {status.submitting ? "Sending..." : "Send Message"}
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
