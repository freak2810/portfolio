import { withBase } from "../lib/base-path";
import { content } from "../content";
import { sectionIds } from "../content/ids";
import { Contact } from "../components/Contact";
import { EasterEggs } from "../components/EasterEggs";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { Divider } from "../components/Divider";
import { Landing } from "../components/Landing";
import { LintelNav } from "../components/LintelNav";
import { Projects } from "../components/Projects";
import { Section } from "../components/Section";
import { TechIconSprite } from "../components/TechIcons";
import { Technology } from "../components/Technology";

const { profile, landing, ui, links, projects, featuredProjectIds, experience, education, certifications, skills, techIcons } = content;

const resumeHref = withBase(links.resumePath);
const featured = featuredProjectIds.flatMap((id) => projects.find((project) => project.id === id) ?? []);
const portfolio = projects.find((project) => project.id === "this-portfolio");

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
  title: profile.title,
  descriptors: landing.descriptors,
  contactLabel: ui.nav.contact,
  scrollCue: landing.scrollCue,
  scrollCueAria: ui.aria.scrollCue,
};

const eggs = landing.easterEggs.map(({ id, tap, message }) => ({ id, target: tap.target, message }));

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
      <TechIconSprite />
      <LintelNav {...nav} />
      <main>
        <Landing {...hero} />
        <Section id="projects" heading={ui.headings.projects}>
          <Projects projects={featured} portfolio={portfolio} />
        </Section>
        <Divider />
        <Section id="experience" heading={ui.headings.experience}>
          <Experience summary={profile.summary} entries={experience} icons={techIcons} />
        </Section>
        <Divider />
        <Section id="education" heading={ui.headings.education}>
          <Education entries={education.entries} majorProject={education.majorProject} certifications={certifications} />
        </Section>
        <Divider />
        <Section id="technology" heading={ui.headings.technology}>
          <Technology groups={skills} languages={profile.languages} icons={techIcons} />
        </Section>
        <Divider />
        <Section id="contact" heading={ui.headings.contact}>
          <Contact {...contact} />
        </Section>
      </main>
      <Footer line={ui.footer} from={profile.origin} to={profile.base} starLabel={ui.aria.heroGraphic} />
      <EasterEggs eggs={eggs} />
    </>
  );
}
