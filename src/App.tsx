import LogoLoop from "../components/LogoLoop/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

function App() {
  return (
    <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={techLogos}
        speed={40}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="rgba(255, 255, 255, 0)"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
export default App;
