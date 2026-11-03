// src/retro/scenes/Inventory.tsx
// The skills, as an RPG inventory: one bag per skill group.
import { useState } from "react";
import { skills } from "@/data/index";
import { sfx } from "../sound";
import { STAR, iconFor } from "../sprites";
import { Coin, Heading, Sprite, Win } from "../ui";

// RPG names for the skill groups, keyed by their `icon` in src/data
const BAGS: Record<string, string> = {
  bot: "ARCANE ORBS",
  braces: "SPELL SCROLLS",
  server: "ARMORY",
  radar: "SCRYING LENSES",
};

export function Inventory() {
  const total = skills.reduce((sum, group) => sum + group.items.length, 0);
  const [selected, setSelected] = useState<{ item: string; group: string } | null>(null);

  const select = (item: string, group: string) => {
    if (selected?.item !== item) sfx.blip();
    setSelected({ item, group });
  };

  return (
    <section id="inventory" className="rx-section" data-stage="INVENTORY" data-unlock="inventory">
      <Heading kicker="MENU" title="INVENTORY" sub={`${total} ITEMS IN ${skills.length} BAGS`} />
      <div className="rx-bags">
        {skills.map((group) => (
          <Win key={group.group} title={BAGS[group.icon] ?? group.group.toUpperCase()} className="rx-bag rx-reveal">
            <p className="rx-bag-sub">
              {group.group} <span>{group.items.length} ITEMS</span>
            </p>
            <ul className="rx-slots">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rx-slot"
                  tabIndex={0}
                  onMouseEnter={() => select(item, group.group)}
                  onFocus={() => select(item, group.group)}
                >
                  <Sprite art={iconFor(group.icon)} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Win>
        ))}
      </div>
      <Win tone="dark" className="rx-item-info">
        <p aria-live="polite">
          {selected ? (
            <>
              <Sprite art={STAR} /> <strong>{selected.item}</strong> from {selected.group}.{" "}
              <span>STATUS: EQUIPPED</span>
            </>
          ) : (
            "Hover or tab through the bags to inspect an item."
          )}
        </p>
      </Win>
      <Coin id="inventory" style={{ right: "3%", top: "10%" }} />
    </section>
  );
}
