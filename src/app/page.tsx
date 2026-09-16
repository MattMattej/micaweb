import Image from "next/image";

const projects = [
  { title: "Bagno & Company", type: "Spot publicitario", image: "/media/001-inicio.webp", className: "feature" },
  { title: "Sirian", type: "Videoclip", image: "/media/002-inicio.webp", className: "portrait" },
  { title: "Frames", type: "Retratos y foto fija", image: "/media/003-inicio.webp", className: "wide" },
];

export default function Home() {
  return <main>
    <nav className="site-nav" aria-label="Navegación principal"><a className="wordmark" href="#inicio">MW<span>.</span></a><div className="nav-links"><a href="#trabajos">Trabajos</a><a href="#perfil">Perfil</a><a href="#contacto">Contacto</a></div><a className="nav-social" href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">Instagram ↗</a></nav>
    <section className="hero" id="inicio"><p className="eyebrow">Directora · Técnica audiovisual · Montevideo</p><h1>Micaela<br /><em>Wallace</em></h1><div className="hero-bottom"><p>Una mirada sensible para<br />historias en movimiento.</p><a className="scroll-cue" href="#trabajos" aria-label="Ver trabajos">↓<span>Explorar</span></a><p className="hero-index">01 / 03</p></div></section>
    <section className="work-section" id="trabajos"><div className="section-heading"><p className="eyebrow">Selección de obra</p><p className="section-count">01 — 03</p></div><div className="project-grid">{projects.map((project, index) => <a className={`project ${project.className}`} href={index === 0 ? "#contacto" : "https://www.youtube.com/@micaelawallace208"} target={index === 0 ? undefined : "_blank"} rel={index === 0 ? undefined : "noreferrer"} key={project.title}><div className="project-image"><Image src={project.image} alt={`${project.title}, ${project.type}`} fill priority={index === 0} sizes="(max-width: 700px) 92vw, 58vw" /></div><div className="project-meta"><span>{project.title}</span><span>{project.type} ↗</span></div></a>)}</div></section>
    <section className="profile-section" id="perfil"><p className="eyebrow">Perfil</p><div className="profile-copy"><h2>Directora audiovisual<br /><em>con oficio y curiosidad.</em></h2><p>Seis años trabajando en el rubro y más de 1000 jornadas de rodaje. Desde Montevideo, Micaela acompaña cada proyecto con una mirada atenta, precisa y humana.</p><a className="text-link" href="mailto:mclguion@gmail.com">Hablemos <span>↗</span></a></div></section>
    <footer id="contacto"><div><span className="wordmark">MW<span>.</span></span><p>Historias en movimiento.</p></div><div className="footer-links"><a href="mailto:mclguion@gmail.com">Email ↗</a><a href="https://www.youtube.com/@micaelawallace208" target="_blank" rel="noreferrer">YouTube ↗</a><a href="https://www.imdb.com/es/name/nm13642693/" target="_blank" rel="noreferrer">IMDb ↗</a></div><p className="copyright">© {new Date().getFullYear()} Micaela Wallace<br />Montevideo, Uruguay</p></footer>
  </main>;
}
