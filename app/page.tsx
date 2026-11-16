import { withBase } from "../lib/base-path";
import { content } from "../content";
import { sectionIds } from "../content/ids";
import { Contact } from "../components/Contact";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Landing } from "../components/Landing";
import { LintelNav } from "../components/LintelNav";
import { Projects } from "../components/Projects";
import { Section } from "../components/Section";
import { Technology } from "../components/Technology";

const { profile, landing, ui, links, projects, featuredProjectIds, experience, education, certifications, skills } = content;

const resumeHref = withBase(links.resumePath);
const featured = featuredProjectIds.flatMap((id) => projects.find((project) => project.id === id) ?? []);

const nav = {
  name: profile.name,
  homeLabel: ui.nav.home,
  navLabel: ui.aria.nav,
  items: sectionIds.filter((id) => id !== "home").map((id) => ({ id, label: ui.nav[id] })),
  resumeHref,
  resumeLabel: ui.resumeLinkLabel,
};

const hero = {
  name: profile.name,
  roles: landing.roles,
  heroLine: landing.heroLine,
  from: profile.origin,
  to: profile.base,
  skipLabel: landing.skipLabel,
  scrollCue: landing.scrollCue,
  scrollCueAria: ui.aria.scrollCue,
  heroGraphicAria: ui.aria.heroGraphic,
};

const contact = {
  email: links.email,
  linkedin: links.linkedin,
  github: links.github,
  resumeHref,
  resumeLabel: ui.resumeLinkLabel,
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#experience">
        {landing.skipLabel}
      </a>
      <LintelNav {...nav} />
      <main>
        <Landing {...hero} />
        <Section id="projects" heading={ui.headings.projects}>
          <Projects projects={featured} />
        </Section>
        <Section id="experience" heading={ui.headings.experience}>
          <Experience summary={profile.summary} entries={experience} />
        </Section>
        <Section id="education" heading={ui.headings.education}>
          <Education entries={education.entries} majorProject={education.majorProject} certifications={certifications} />
        </Section>
        <Section id="technology" heading={ui.headings.technology}>
          <Technology groups={skills} languages={profile.languages} />
        </Section>
        <Section id="contact" heading={ui.headings.contact}>
          <Contact {...contact} />
        </Section>
      </main>
    </>
  );
}
