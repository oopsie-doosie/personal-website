// src/utils/icons.tsx
// Maps the icon keys used in src/data to Lucide icons
import {
  Activity,
  Bitcoin,
  BookOpen,
  Bot,
  Boxes,
  Braces,
  Car,
  FileSearch,
  FlaskConical,
  Flower2,
  Gauge,
  HelpCircle,
  Layers,
  ListChecks,
  Martini,
  Mountain,
  Network,
  Radar,
  Server,
  ShieldCheck,
  Snowflake,
  TestTube2,
  TrendingUp,
  Trophy,
  Users,
  Waves,
  Workflow,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  // Experience
  boxes: Boxes,
  users: Users,
  layers: Layers,
  flask: FlaskConical,
  checks: ListChecks,
  workflow: Workflow,
  shield: ShieldCheck,
  network: Network,
  gauge: Gauge,
  fileSearch: FileSearch,
  testTube: TestTube2,
  // Skills
  bot: Bot,
  braces: Braces,
  server: Server,
  radar: Radar,
  // Interests
  yoga: Flower2,
  swimming: Waves,
  tennis: Activity,
  pickleball: Trophy,
  hiking: Mountain,
  reading: BookOpen,
  crypto: Bitcoin,
  finance: TrendingUp,
  f1: Car,
  snowboarding: Snowflake,
  cocktails: Martini,
};

export const Icon = ({ name, ...props }: { name: string } & LucideProps) => {
  const Component = icons[name] ?? HelpCircle;
  return <Component aria-hidden="true" {...props} />;
};
