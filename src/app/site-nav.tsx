"use client";

import { useEffect, useState } from "react";

type Link = { href: string; label: string };

export default function SiteNav({ areas }: { areas: Link[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <a className="wordmark" href="#inicio" onClick={() => setOpen(false)}>
        Micaela Wallace<span>.</span>
      </a>

      <nav className="nav-links" aria-label="Navegación principal">
        <div className="nav-dropdown">
          <a href="#trabajos" onClick={() => setOpen(false)}>
            Portfolio<i aria-hidden>+</i>
          </a>
          <div className="nav-menu">
            {areas.map((area) => (
              <a href={area.href} key={area.href} onClick={() => setOpen(false)}>
                {area.label}
              </a>
            ))}
          </div>
        </div>
        <a href="#diario" onClick={() => setOpen(false)}>Diario fotográfico</a>
        <a href="#perfil" onClick={() => setOpen(false)}>Perfil</a>
        <a href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
      </nav>

      <button className="nav-burger" type="button" aria-expanded={open} aria-controls="nav-panel" onClick={() => setOpen((value) => !value)}>
        <span className="nav-burger-label">{open ? "Cerrar" : "Menú"}</span>
        <span className="nav-burger-bars" aria-hidden><i /><i /></span>
      </button>

      <div className="nav-panel" id="nav-panel" hidden={!open}>
        <a href="#trabajos" onClick={() => setOpen(false)}>Portfolio</a>
        <div className="nav-panel-sub">
          {areas.map((area) => (
            <a href={area.href} key={area.href} onClick={() => setOpen(false)}>
              {area.label}
            </a>
          ))}
        </div>
        <a href="#diario" onClick={() => setOpen(false)}>Diario fotográfico</a>
        <a href="#perfil" onClick={() => setOpen(false)}>Perfil</a>
        <a href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
        <a className="nav-panel-social" href="https://www.instagram.com/parcaph_/" target="_blank" rel="noreferrer">Instagram ↗</a>
      </div>
    </header>
  );
}
