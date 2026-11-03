// src/retro/scenes/SideQuests.tsx
// Interests, as minigames unlocked off the clock.
import type { CSSProperties } from "react";
import { interests } from "@/data/index";
import { pad } from "../hooks";
import { sfx } from "../sound";
import { iconFor } from "../sprites";
import { Heading, Sprite } from "../ui";

export function SideQuests() {
  return (
    <section id="side-quests" className="rx-section" data-stage="SIDE QUESTS" data-unlock="sidequests">
      <Heading kicker="EXTRAS" title="SIDE QUESTS" sub="MINIGAMES UNLOCKED OFF THE CLOCK" />
      <ul className="rx-hobbies">
        {interests.map((interest, i) => (
          <li
            key={interest.name}
            className="rx-hobby rx-reveal"
            style={{ "--i": i } as CSSProperties}
            onMouseEnter={sfx.jump}
          >
            <span className="rx-hobby-no">{pad(i + 1, 2)}</span>
            <Sprite art={iconFor(interest.icon)} />
            <span className="rx-hobby-name">{interest.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
