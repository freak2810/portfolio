import { withBase } from "../lib/base-path";
import { content, sectionIds } from "../content";
import { Contact } from "../components/Contact";
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

const { profile, about, landing, ui, links, projects, featuredProjectIds, experience, education, certifications, skills, techIcons } = content;

const resumeHref = withBase(links.resumePath);
const featured = featuredProjectIds.flatMap((id) => projects.find((project) => project.id === id) ?? []);
const portfolio = projects.find((project) => project.id === "this-portfolio");
const plates = portfolio ? [...featured, portfolio] : featured;

const nav = {
  name: profile.name,
  homeLabel: ui.nav.home,
  navLabel: ui.aria.nav,
  menuLabel: ui.labels.menu,
  items: sectionIds.filter((id) => id !== "home").map((id) => ({ id, label: ui.nav[id] })),
};

const hero = {
  name: profile.name,
  title: profile.title,
  descriptors: landing.descriptors,
  social: {
    github: links.github,
    linkedin: links.linkedin,
    resumeHref,
    resumeFilename: `${profile.name} - Resume.pdf`,
    labels: ui.social,
  },
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        {landing.skipLabel}
      </a>
      <TechIconSprite />
      <LintelNav {...nav} />
      <main id="main">
        <Landing {...hero} />
        <Section id="projects" heading={ui.headings.projects}>
          <Projects projects={plates} icons={techIcons} labels={ui.labels} />
        </Section>
        <Divider />
        <Section id="experience" heading={ui.headings.experience}>
          <Experience summary={profile.summary} entries={experience} icons={techIcons} labels={ui.labels} />
        </Section>
        <Divider />
        <Section id="education" heading={ui.headings.education}>
          <Education entries={education.entries} majorProject={education.majorProject} certifications={certifications} icons={techIcons} labels={ui.labels} />
        </Section>
        <Divider />
        <Section id="technology" heading={ui.headings.technology}>
          <Technology groups={skills} languages={profile.languages} icons={techIcons} labels={ui.labels} />
        </Section>
        <Divider />
        <Section id="contact" heading={ui.headings.contact}>
          <Contact about={about} linkedinHref={links.linkedin} />
        </Section>
      </main>
      <Footer line={ui.footer} />
    </>
  );
}
