import { withBase } from "../lib/base-path";
import { content } from "../content";
import { sectionIds } from "../content/ids";
import { Landing } from "../components/Landing";

const { profile, landing, ui, links } = content;

export default function Home() {
  return (
    <main>
      <Landing
        name={profile.name}
        roles={landing.roles}
        heroLine={landing.heroLine}
        from={profile.origin}
        to={profile.base}
        skipLabel={landing.skipLabel}
        scrollCue={landing.scrollCue}
        scrollCueAria={ui.aria.scrollCue}
        heroGraphicAria={ui.aria.heroGraphic}
        resumeHref={withBase(links.resumePath)}
        resumeLabel={ui.resumeLinkLabel}
      />
      {sectionIds
        .filter((id) => id !== "home")
        .map((id) => (
          <section key={id} id={id} className="shell">
            <h2>{ui.headings[id]}</h2>
          </section>
        ))}
    </main>
  );
}
