import Image from "next/image";
import inventory from "../../content/site-inventory.json";
import diary from "../../content/photo-diary.json";
import SiteNav from "./site-nav";

type Page = (typeof inventory.pages)[number];

const sectionNames: Record<string, string> = {
  direccion: "Dirección",
  asistencias: "Asistencias de dirección",
  "otros-servicios": "Otros servicios",
};

const sectionDescriptions: Record<string, string> = {
  direccion: "Videoclips, spots publicitarios y piezas propias.",
  asistencias: "Asistencia de dirección en ficción, publicidad y videoclip.",
  "otros-servicios": "Segunda y tercera asistencia, runner, vestuario, producción y realización.",
};

const pages = inventory.pages.filter((page) => page.section !== "inicio") as Page[];
const youtubeId = (url: string) => url.match(/youtube\.com\/embed\/([^?]+)/)?.[1] ?? null;
const videosFor = (page: Page) => [...new Set(page.videos.map(youtubeId).filter((id): id is string => Boolean(id)))];

const areas = pages.map((page) => ({ href: `#${page.section}`, label: sectionNames[page.section] }));
const strip = ["/media/002-inicio.webp", "/media/019-inicio.webp", "/media/046-asistencias.webp"];
const portrait = diary.photos.find((photo) => photo.height > photo.width) ?? diary.photos[0];

const credits: [string, string][] = [
  ["Base", "Montevideo, Uruguay"],
  ["Jornadas de rodaje", "+1000"],
  ["Formación", "Tecnicatura audiovisual UTU Arrayanes · IENBA"],
  ["Herramientas", "Premiere · Photoshop · Movie Magic · Final Draft"],
  ["Extras", "Libreta de conducción categoría A"],
];

export default function Home() {
  return (
    <main>
      <SiteNav areas={areas} />

      <section className="hero" id="inicio">
        <p className="eyebrow">Directora · Técnica audiovisual</p>
        <h1>
          Micaela
          <br />
          <em>Wallace</em>
        </h1>
        <div className="hero-foot">
          <p className="hero-roles">
            Dirección <span>/</span> Asistencia de dirección <span>/</span> Foto fija
          </p>
          <a className="scroll-cue" href="#trabajos">
            <span>Ver trabajos</span>
            <i aria-hidden>↓</i>
          </a>
          <p className="hero-place">
            Montevideo
            <br />
            Uruguay
          </p>
        </div>
      </section>

      <div className="filmstrip" aria-hidden>
        {strip.map((src) => (
          <div className="frame" key={src}>
            <Image src={src} alt="" width={1280} height={720} sizes="34vw" />
          </div>
        ))}
      </div>

      <section className="work-section" id="trabajos">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2>
              Trabajos
              <br />
              <em>audiovisuales.</em>
            </h2>
          </div>
          <p className="section-count">
            Tres áreas
            <br />
            de trabajo
          </p>
        </div>

        <div className="category-nav">
          {pages.map((page, index) => (
            <a href={`#${page.section}`} key={page.section}>
              <span className="tick">{String(index + 1).padStart(2, "0")}</span>
              {sectionNames[page.section]}
              <i aria-hidden>↘</i>
            </a>
          ))}
        </div>

        {pages.map((page, index) => (
          <section className="portfolio-category" id={page.section} key={page.section}>
            <div className="category-heading reveal">
              <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{sectionNames[page.section]}</h3>
                <p>{sectionDescriptions[page.section]}</p>
              </div>
            </div>
            <div className="video-grid">
              {videosFor(page).map((id, position) => (
                <article className="video-item reveal" key={id}>
                  <div className="video-frame">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title={`Video ${position + 1} de ${sectionNames[page.section]}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-meta">
                    <span>Pieza {String(position + 1).padStart(2, "0")}</span>
                    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">
                      YouTube ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="diary-section" id="diario">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Fotografía</p>
            <h2>
              Diario
              <br />
              <em>fotográfico.</em>
            </h2>
          </div>
          <p className="section-count">
            Frames, retratos
            <br />y foto fija
          </p>
        </div>
        <div className="photo-diary">
          {diary.photos.map((photo, index) => (
            <figure className="photo reveal" key={photo.src}>
              <Image
                src={photo.src}
                alt={`Diario fotográfico · frame ${index + 1}`}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw"
              />
              <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="profile-section" id="perfil">
        <figure className="profile-portrait reveal">
          <Image
            src={portrait.src}
            alt="Registro de rodaje"
            width={portrait.width}
            height={portrait.height}
            sizes="(max-width: 900px) 92vw, 36vw"
          />
          <figcaption>Registro de rodaje</figcaption>
        </figure>
        <div className="profile-copy reveal">
          <p className="eyebrow">Perfil</p>
          <h2>
            Dirigir es mirar
            <br />
            <em>con intención.</em>
          </h2>
          <p>
            Micaela Wallace es directora y técnica audiovisual radicada en Montevideo. Seis años en el rubro y más de mil
            jornadas de rodaje entre ficción, publicidad y videoclip: primero desde la asistencia de dirección, después
            desde su propia mirada.
          </p>
          <p>
            Trabaja con precisión de set y sensibilidad de autora. Conoce el oficio desde adentro —el plan de rodaje, el
            equipo, los tiempos— y usa ese conocimiento para que cada pieza diga exactamente lo que tiene que decir.
          </p>
          <dl className="credits">
            {credits.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <p className="eyebrow">Contacto</p>
        <div className="contact-copy">
          <h2>
            ¿Tenés una historia?
            <br />
            <em>Hablemos.</em>
          </h2>
          <a className="contact-mail" href="mailto:mclguion@gmail.com">
            mclguion@gmail.com
          </a>
          <div className="contact-links">
            <a href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="https://www.youtube.com/@micaelawallace208" target="_blank" rel="noreferrer">
              YouTube ↗
            </a>
            <a href="https://www.imdb.com/es/name/nm13642693/" target="_blank" rel="noreferrer">
              IMDb ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span className="wordmark">
          Micaela Wallace<span>.</span>
        </span>
        <p className="copyright">© {new Date().getFullYear()} · Montevideo, Uruguay</p>
      </footer>
    </main>
  );
}
