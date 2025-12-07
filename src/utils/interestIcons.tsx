// src/utils/interestIcons.tsx
import React from "react";
import {
  Flower2,
  Waves,
  Trophy,
  Activity,
  Mountain,
  BookOpen,
  Bitcoin,
  TrendingUp,
  Car,
  HelpCircle,
  Snowflake,
  Martini,
} from "lucide-react";

/**
 * Returns a Lucide icon component based on the provided icon name
 */
export const getInterestIcon = (iconName: string) => {
  const props = { className: "w-6 h-6" };

  switch (iconName) {
    case "yoga":
      return <Flower2 {...props} />;
    case "swimming":
      return <Waves {...props} />;
    case "tennis":
      return <Activity {...props} />; // Or Trophy
    case "pickleball":
      return <Trophy {...props} />;
    case "hiking":
      return <Mountain {...props} />;
    case "reading":
      return <BookOpen {...props} />;
    case "crypto":
      return <Bitcoin {...props} />;
    case "finance":
      return <TrendingUp {...props} />;
    case "f1":
      return <Car {...props} />;
    case "snowboarding":
      return <Snowflake {...props} />;
    case "cocktails":
      return <Martini {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};

export const InterestIcon: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="bg-primary-accent/20 p-3 rounded-full text-primary-accent transition-transform hover:scale-110 duration-300">
      {getInterestIcon(name)}
    </div>
  );
};
