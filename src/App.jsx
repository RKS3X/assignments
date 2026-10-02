import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, ExternalLink, Download } from "lucide-react";
import { STUDENT, SLIDES, WORKS } from "./works.js";

const ease = [0.16, 1, 0.3, 1];
const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

// Phone/tablet browsers show only page 1 (or nothing) of a PDF inside an iframe.
const isTouchPdf = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
      <g transform="rotate(-35 12 12)">
        <rect x="4.5" y="3" width="5.5" height="18" rx="2.75" />
        <rect x="14" y="3" width="5.5" height="18" rx="2.75" />
      </g>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <circle cx="3" cy="3" r="1.4" fill="currentColor" />
      <circle cx="9" cy="3" r="1.4" fill="currentColor" />
      <circle cx="3" cy="9" r="1.4" fill="currentColor" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pdf, setPdf] = useState(null);

  const openPdf = (doc) => {
    if (isTouchPdf()) {
      window.open(doc.src, "_blank", "noopener");
      return;
    }
    setMenuOpen(false);
    setPdf(doc);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setPdf(null);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen || !!pdf);
  }, [menuOpen, pdf]);

  // A work pill opens its PDF in the viewer, otherwise its link.
  const workPill = (w) =>
    w.pdf ? (
      <button key={w.no} type="button" className="tag" onClick={() => openPdf(w.pdf)}>
        งานที่ {w.no}
      </button>
    ) : (
      <a key={w.no} className="tag" href={w.href} target="_blank" rel="noopener">
        งานที่ {w.no}
      </a>
    );

  return (
    <div className="hero">
      {/* ---------- Navbar ---------- */}
      <motion.nav
        className="navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="nav-left">
          <a className="logo" href="#" aria-label={STUDENT.name}>
            <Logo />
            <span className="brand">Ratipong</span>
          </a>

          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="works-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="menu-icon">
              <Plus size={12} strokeWidth={3} />
            </span>
            Menu
          </button>

          <div className="nav-tags">
            <span>{STUDENT.id}</span>
            <span>{STUDENT.group}</span>
          </div>
        </div>

        <div className="nav-right">
          <button type="button" className="pill-action" aria-label="สไลด์งานที่ 5" onClick={() => openPdf(SLIDES)}>
            <span className="pill-action-icon">
              <GridIcon />
            </span>
            <span className="pill-action-label">สไลด์งานที่ 5</span>
          </button>
        </div>
      </motion.nav>

      {/* ---------- Background video ---------- */}
      <div className="video-wrap" aria-hidden="true">
        <motion.div
          className="video-frame"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <video src={VIDEO} autoPlay muted loop playsInline />
        </motion.div>
      </div>

      {/* ---------- Footer content ---------- */}
      <motion.footer
        className="footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease }}
      >
        <div className="footer-left">
          <motion.p
            className="subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <span className="dot" />
            นาย{STUDENT.name} {STUDENT.id} {STUDENT.group}
          </motion.p>

          <motion.h1
            className="heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
          >
            รวมลิงก์งาน
            <br />
            Assignments 1–5
          </motion.h1>

          <motion.div
            className="buttons"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
          >
            <button type="button" className="btn btn-dark" onClick={() => setMenuOpen(true)}>
              ดูงานทั้งหมด
            </button>
            <a className="btn btn-outline" href={WORKS[4].href} target="_blank" rel="noopener">
              เปิดเว็บแอปงานที่ 5
            </a>
          </motion.div>
        </div>

        <div className="footer-right">{WORKS.map(workPill)}</div>
      </motion.footer>

      {/* ---------- Works menu ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sheet-backdrop"
            id="works-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
          >
            <motion.div
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="งานทั้งหมด"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="sheet-head">
                <p>งานทั้งหมด</p>
                <button type="button" className="icon-btn" aria-label="ปิดเมนู" onClick={() => setMenuOpen(false)}>
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>

              <ol className="work-list">
                {WORKS.map((w, i) => (
                  <motion.li
                    key={w.no}
                    className="work-row"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease }}
                  >
                    <span className="work-no">{w.no}</span>
                    <div className="work-info">
                      <p className="work-title">งานที่ {w.no}</p>
                      <p className="work-meta">
                        {w.kind}
                        {w.sub ? <span> / {w.sub}</span> : null}
                      </p>
                    </div>
                    <div className="work-actions">
                      {w.pdf && (
                        <button type="button" className="btn btn-dark btn-sm" onClick={() => openPdf(w.pdf)}>
                          เปิดรายงาน
                        </button>
                      )}
                      {w.href && (
                        <a className="btn btn-dark btn-sm" href={w.href} target="_blank" rel="noopener">
                          {w.slides ? "เปิดเว็บแอป" : "เปิดงาน"}
                        </a>
                      )}
                      {w.slides && (
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => openPdf(w.slides)}>
                          ดูสไลด์
                        </button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- PDF viewer ---------- */}
      <AnimatePresence>
        {pdf && (
          <motion.div
            className="viewer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && setPdf(null)}
          >
            <motion.div
              className="viewer"
              role="dialog"
              aria-modal="true"
              aria-label={pdf.title}
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="viewer-bar">
                <p className="viewer-title">{pdf.title}</p>
                <a className="btn btn-outline btn-sm" href={pdf.src} target="_blank" rel="noopener">
                  <ExternalLink size={13} /> เปิดแท็บใหม่
                </a>
                <a className="btn btn-outline btn-sm" href={pdf.src} download>
                  <Download size={13} /> ดาวน์โหลด
                </a>
                <button type="button" className="icon-btn" aria-label="ปิด" onClick={() => setPdf(null)} autoFocus>
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
              <iframe className="viewer-frame" src={`${pdf.src}#view=FitH`} title={pdf.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
