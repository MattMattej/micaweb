import Image from "next/image";
import inventory from "../../content/site-inventory.json";

type Page = (typeof inventory.pages)[number];

const sectionNames: Record<string, string> = {
  direccion: "Dirección",
  asistencias: "Asistencias de dirección",
  "otros-servicios": "Otros servicios",
};

const sectionDescriptions: Record<string, string> = {
  direccion: "Proyectos dirigidos, videoclips, spots y trabajos de foto fija.",
  asistencias: "Proyectos como asistente de dirección.",
  "otros-servicios": "Segunda y tercera asistencia, runner, vestuario, producción y realización.",
};

const pages = inventory.pages.filter((page) => page.section !== "inicio") as Page[];
const cleanImages = (page: Page) => page.images.filter((image) => !image.source.includes("sociallinks") && !image.local.endsWith("045-direccion.webp"));
const youtubeId = (url: string) => url.match(/youtube\.com\/embed\/([^?]+)/)?.[1] ?? null;
const videosFor = (page: Page) => page.videos.map(youtubeId).filter((id): id is string => Boolean(id));

function Gallery({ page }: { page: Page }) {
  const images = cleanImages(page);
  return <div className="full-gallery">{images.map((image, index) => <figure className="gallery-item" key={image.local}><Image src={image.local} alt={`${sectionNames[page.section]} - registro visual ${index + 1}`} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" /><figcaption>{sectionNames[page.section]} · registro {String(index + 1).padStart(2, "0")}</figcaption></figure>)}</div>;
}

function VideoGrid({ page }: { page: Page }) {
  const videos = [...new Set(videosFor(page))];
  return <div className="video-grid">{videos.map((id, index) => <a className="video-item" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer" key={id}><div className="video-frame"><Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`Video ${index + 1} de ${sectionNames[page.section]}`} fill sizes="(max-width: 700px) 92vw, 30vw" /><span className="play-mark">▶</span></div><span>Ver pieza {String(index + 1).padStart(2, "0")} ↗</span></a>)}</div>;
}

export default function Home() {
  const totalImages = pages.reduce((sum, page) => sum + cleanImages(page).length, 0);
  const totalVideos = new Set(pages.flatMap(videosFor)).size;

  return <main>
    <nav className="site-nav" aria-label="Navegación principal"><a className="wordmark" href="#inicio">MW<span>.</span></a><div className="nav-links"><a href="#trabajos">Portfolio</a><a href="#perfil">Perfil</a><a href="#contacto">Contacto</a></div><a className="nav-social" href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">Instagram ↗</a></nav>
    <section className="hero" id="inicio"><p className="eyebrow">Directora · Técnica audiovisual · Montevideo</p><h1>Micaela<br /><em>Wallace</em></h1><div className="hero-bottom"><p>Directora y técnica<br />audiovisual.</p><a className="scroll-cue" href="#trabajos" aria-label="Ver portfolio">↓<span>Explorar</span></a><p className="hero-index">{String(totalImages).padStart(2, "0")} fotos<br />{String(totalVideos).padStart(2, "0")} videos</p></div></section>
    <section className="work-section" id="trabajos"><div className="section-heading"><div><p className="eyebrow">Portfolio completo</p><h2>Trabajos<br /><em>audiovisuales.</em></h2></div><p className="section-count">{pages.length} áreas</p></div><div className="category-nav">{pages.map((page) => <a href={`#${page.section}`} key={page.section}>{sectionNames[page.section]} <span>↘</span></a>)}</div>{pages.map((page) => <section className="portfolio-category" id={page.section} key={page.section}><div className="category-heading"><span className="category-number">0{pages.indexOf(page) + 1}</span><div><h3>{sectionNames[page.section]}</h3><p>{sectionDescriptions[page.section]}</p><small>{cleanImages(page).length} fotografías · {videosFor(page).length} videos</small></div><a href={page.url} target="_blank" rel="noreferrer">Ver fuente ↗</a></div><Gallery page={page} /><div className="video-heading"><p className="eyebrow">Piezas audiovisuales</p><span>Todos los trabajos de esta sección</span></div><VideoGrid page={page} /></section>)}</section>
    <section className="profile-section" id="perfil"><p className="eyebrow">Perfil</p><div className="profile-copy"><h2>Directora audiovisual<br /><em>con oficio y curiosidad.</em></h2><p>Seis años trabajando en el rubro y más de 1000 jornadas de rodaje. Desde Montevideo, Micaela acompaña cada proyecto con una mirada atenta, precisa y humana.</p><a className="text-link" href="mailto:mclguion@gmail.com">Hablemos <span>↗</span></a></div></section>
    <footer id="contacto"><div><span className="wordmark">MW<span>.</span></span><p>Historias en movimiento.</p></div><div className="footer-links"><a href="mailto:mclguion@gmail.com">Email ↗</a><a href="https://www.youtube.com/@micaelawallace208" target="_blank" rel="noreferrer">YouTube ↗</a><a href="https://www.imdb.com/es/name/nm13642693/" target="_blank" rel="noreferrer">IMDb ↗</a></div><p className="copyright">© {new Date().getFullYear()} Micaela Wallace<br />Montevideo, Uruguay</p></footer>
  </main>;
}
