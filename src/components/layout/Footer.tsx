// src/components/layout/Footer.tsx
import { personalInfo } from "@/data";
import { SocialIcon } from "@/utils/socialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-background py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-primary-accent mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-text-tertiary">{personalInfo.title}</p>
          </div>

          {/* Social Links - Moved up for better visibility */}
          <div className="flex space-x-8 mb-6 md:mb-0">
            {/* GitHub Icon */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary-accent transition-colors flex items-center"
              aria-label="GitHub"
            >
              <SocialIcon name="github" size="lg" />
              <span className="ml-2 hidden md:inline">GitHub</span>
            </a>

            {/* LinkedIn Icon */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary-accent transition-colors flex items-center"
              aria-label="LinkedIn"
            >
              <SocialIcon name="linkedin" size="lg" />
              <span className="ml-2 hidden md:inline">LinkedIn</span>
            </a>

            {/* Email Icon */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-text-tertiary hover:text-primary-accent transition-colors flex items-center"
              aria-label="Email"
            >
              <SocialIcon name="email" size="lg" />
              <span className="ml-2 hidden md:inline">Email</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-tertiary text-sm mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
