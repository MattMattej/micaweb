import Image from "next/image";
import inventory from "../../content/site-inventory.json";
import diary from "../../content/photo-diary.json";

type Page = (typeof inventory.pages)[number];

const sectionNames: Record<string, string> = {
  direccion: "Dirección",
  asistencias: "Asistencias de dirección",
  "otros-servicios": "Otros servicios",
};

const sectionDescriptions: Record<string, string> = {
  direccion: "Proyectos dirigidos, videoclips y spots.",
  asistencias: "Proyectos como asistente de dirección.",
  "otros-servicios": "Segunda y tercera asistencia, runner, vestuario, producción y realización.",
};

const pages = inventory.pages.filter((page) => page.section !== "inicio") as Page[];
const youtubeId = (url: string) => url.match(/youtube\.com\/embed\/([^?]+)/)?.[1] ?? null;
const videosFor = (page: Page) => [...new Set(page.videos.map(youtubeId).filter((id): id is string => Boolean(id)))];

function VideoGrid({ page }: { page: Page }) {
  return <div className="video-grid">{videosFor(page).map((id, index) => <article className="video-item" key={id}><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={`Video ${index + 1} de ${sectionNames[page.section]}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="video-meta"><span>Pieza {String(index + 1).padStart(2, "0")}</span><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Abrir en YouTube ↗</a></div></article>)}</div>;
}

export default function Home() {
  return <main>
    <nav className="site-nav" aria-label="Navegación principal">
      <a className="wordmark" href="#inicio">MW<span>.</span></a>
      <div className="nav-links">
        <div className="nav-dropdown"><a href="#trabajos">Portfolio <span aria-hidden>↓</span></a><div className="nav-menu">{pages.map((page) => <a href={`#${page.section}`} key={page.section}>{sectionNames[page.section]}</a>)}</div></div>
        <a href="#perfil">Perfil</a>
        <a href="#diario">Diario fotográfico</a>
        <a href="#contacto">Contacto</a>
      </div>
      <a className="nav-social" href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">Instagram ↗</a>
    </nav>
    <section className="hero" id="inicio"><p className="eyebrow">Directora · Técnica audiovisual · Montevideo</p><h1>Micaela<br /><em>Wallace</em></h1><div className="hero-bottom"><a className="scroll-cue" href="#trabajos" aria-label="Ver portfolio">↓<span>Explorar</span></a></div></section>
    <section className="work-section" id="trabajos"><div className="section-heading"><div><p className="eyebrow">Portfolio completo</p><h2>Trabajos<br /><em>audiovisuales.</em></h2></div><p className="section-count">{pages.length} áreas</p></div><div className="category-nav">{pages.map((page) => <a href={`#${page.section}`} key={page.section}>{sectionNames[page.section]} <span>↘</span></a>)}</div>{pages.map((page) => <section className="portfolio-category" id={page.section} key={page.section}><div className="category-heading"><span className="category-number">0{pages.indexOf(page) + 1}</span><div><h3>{sectionNames[page.section]}</h3><p>{sectionDescriptions[page.section]}</p></div></div><VideoGrid page={page} /></section>)}</section>
    <section className="diary-section" id="diario"><div className="section-heading"><div><p className="eyebrow">Fotografía</p><h2>Diario<br /><em>fotográfico.</em></h2></div><p className="section-count">Frames, retratos y foto fija</p></div><div className="photo-diary">{diary.photos.map((photo, index) => <figure className="photo" key={photo.src}><Image src={photo.src} alt={`Diario fotográfico · imagen ${index + 1}`} width={photo.width} height={photo.height} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" /></figure>)}</div></section>
    <section className="profile-section" id="perfil"><p className="eyebrow">Perfil</p><div className="profile-copy"><h2>Directora audiovisual<br /><em>con oficio y curiosidad.</em></h2><p>Seis años trabajando en el rubro y más de 1000 jornadas de rodaje. Desde Montevideo, Micaela acompaña cada proyecto con una mirada atenta, precisa y humana.</p><p>Bachillerato y tecnicatura audiovisual en UTU Arrayanes, primer año de la Licenciatura en Medios Audiovisuales del IENBA, y formación continua en asistencia de dirección, dirección de actores, documental y escritura creativa.</p></div></section>
    <section className="contact-section" id="contacto"><p className="eyebrow">Contacto</p><div className="contact-copy"><h2>Hablemos de<br /><em>tu próximo rodaje.</em></h2><a className="contact-mail" href="mailto:mclguion@gmail.com">mclguion@gmail.com</a><div className="contact-links"><a href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@micaelawallace208" target="_blank" rel="noreferrer">YouTube ↗</a><a href="https://www.imdb.com/es/name/nm13642693/" target="_blank" rel="noreferrer">IMDb ↗</a></div></div></section>
    <footer><div><span className="wordmark">MW<span>.</span></span><p>Historias en movimiento.</p></div><p className="copyright">© {new Date().getFullYear()} Micaela Wallace<br />Montevideo, Uruguay</p></footer>
  </main>;
}
