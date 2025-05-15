// src/utils/interestIcons.tsx
import React from "react";

/**
 * Returns an SVG icon based on the provided icon name
 * Used to display interest icons in the Interests section
 */
export const getInterestIcon = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case "yoga":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M12 2a4 4 0 0 1 4 4c0 1.7-1.4 3.2-2 4-.6.8-1 1.9-1 3 0 1.1.6 2 1 3 .6.8 2 2.3 2 4a4 4 0 0 1-8 0c0-1.7 1.4-3.2 2-4 .6-.8 1-1.9 1-3 0-1.1-.6-2-1-3-.6-.8-2-2.3-2-4a4 4 0 0 1 4-4Z" />
        </svg>
      );
    case "swimming":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M2 12h1a7 7 0 0 1 6 3.5 7 7 0 0 0 6 3.5h1" />
          <path d="M22 12h-1a7 7 0 0 0-6-3.5 7 7 0 0 1-6-3.5H8" />
          <path d="m6 15 2 2" />
          <path d="m15 15 2 2" />
          <path d="M9 13v-3h6v3" />
        </svg>
      );
    case "tennis":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 12a4 4 0 0 1-8 0" />
          <path d="M12 15a4 4 0 0 1 0-8" />
          <path d="M12 8a4 4 0 0 0-4 4" />
          <path d="M12 16a4 4 0 0 0 4-4" />
        </svg>
      );
    case "ping-pong":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M9 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          <path d="M13 14h5a3 3 0 0 0 3-3 2 2 0 0 0-2-2h-6" />
          <path d="M13 14v6" />
          <path d="m3 9 5 1" />
          <path d="M13 5v3" />
        </svg>
      );
    case "mountain":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    case "book-open":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
};

// Optionally: Create a component wrapper for the icons if needed
export const InterestIcon: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="bg-primary-accent/20 p-3 rounded-full text-primary-accent">
      {getInterestIcon(name)}
    </div>
  );
};
