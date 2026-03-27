import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "11px 22px", cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "10px 20px", cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" };

const SERVICE_AREAS = ["Elyria", "Lorain", "Avon", "Avon Lake", "North Ridgeville", "Amherst", "Oberlin", "Sheffield Lake", "Bay Village", "Westlake", "Strongsville", "Brunswick"];

export function QuoteModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "13px 16px", color: "#fff", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0f1a12,#122418)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 520, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#9ca3af", fontSize: 24, cursor: "pointer" }}>×</button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🌳</div>
            <h3 style={{ color: "#4ade80", fontSize: 26, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>Request Sent!</h3>
            <p style={{ color: "#9ca3af" }}>Jason and the team will call you within 1 hour.</p>
            <button onClick={onClose} style={{ ...btnGreen, marginTop: 20 }}>Close</button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 6 }}>Get Your Free Estimate</h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>We'll call you within 1 hour · No obligation</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["name","Your Full Name","text"],["phone","Phone Number","tel"],["address","Property Address","text"]].map(([name,ph,type]) => (
                <input key={name} name={name} type={type} placeholder={ph} value={form[name]} onChange={handle} required style={inputStyle} />
              ))}
              <select name="service" value={form.service} onChange={handle} required style={inputStyle}>
                <option value="">Select a Service</option>
                {["Tree Removal","Tree Trimming & Pruning","Stump Grinding","Emergency Storm Cleanup","Land Clearing"].map(s => <option key={s}>{s}</option>)}
              </select>
              <textarea name="message" placeholder="Any additional details? (optional)" value={form.message} onChange={handle} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              <button type="submit" style={{ ...btnGreen, marginTop: 4, fontSize: 16, padding: "14px", width: "100%" }}>Send My Free Estimate Request →</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [location]);

  const navLinks = [
    ["Home", "/"],
    ["Services", "/services/tree-removal"],
    ["About", "/about"],
    ["Service Areas", "/service-areas"],
    ["Blog", "/blog"],
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #050d07; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; max-width: 100%; }
        ::selection { background: #4ade80; color: #052e16; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1a0d; }
        ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 3px; }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
        .btn-hover { transition: all 0.25s ease; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(74,222,128,0.35); }
        .nav-link { color: #9ca3af; text-decoration: none; font-size: 15px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: #4ade80; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); border-color: rgba(74,222,128,0.4) !important; }
        .floating-cta { animation: floatAnim 3s ease-in-out infinite; }
        input::placeholder, textarea::placeholder { color: #6b7280; }
        option { background: #0f1a12; }
        @keyframes floatAnim { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:none;} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(74,222,128,0.3);} 50%{box-shadow:0 0 40px rgba(74,222,128,0.6);} }
        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.3);} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .desktop-nav { display: flex; }
        .dropdown { position: relative; }
        .dropdown-menu { display: none; padding-top: 4px; position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); background: rgba(5,13,7,0.98); border: 1px solid rgba(74,222,128,0.2); padding: 12px; min-width: 220px; backdrop-filter: blur(20px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); z-index: 999; border-radius: 16px; }
        .dropdown:hover .dropdown-menu { display: block; } .dropdown-menu::before { content: ''; position: absolute; top: -14px; left: 0; right: 0; height: 14px; }
        .dropdown-item { display: block; padding: 10px 16px; color: #9ca3af; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 10px; transition: all 0.2s; white-space: nowrap; }
        .dropdown-item:hover { color: #4ade80; background: rgba(74,222,128,0.08); }
        .dropdown-arrow { font-size: 10px; margin-left: 4px; transition: transform 0.2s; display: inline-block; }
        .dropdown:hover .dropdown-arrow { transform: rotate(180deg); }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .page-hero h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, background: scrolled ? "rgba(5,13,7,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(74,222,128,0.12)" : "none", transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70, padding: "0 24px" }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span style={{ fontSize: 28 }}>🌳</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, lineHeight: 1.1, color: "#fff" }}>The Tree Service</div>
              <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Elyria, Ohio</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ gap: 28, alignItems: "center" }}>
            <Link to="/" className={`nav-link${location.pathname === "/" ? " active" : ""}`}>Home</Link>
            <div className="dropdown" style={{ position: "relative" }}>
              <span className={`nav-link${location.pathname.startsWith("/services") ? " active" : ""}`} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                Services <span className="dropdown-arrow">&#9660;</span>
              </span>
              <div className="dropdown-menu">
                {[["🪓","Tree Removal","/services/tree-removal"],["✂️","Tree Trimming","/services/tree-trimming"],["⚙️","Stump Grinding","/services/stump-grinding"],["⛈️","Storm Cleanup","/services/storm-cleanup"],["🏔️","Land Clearing","/services/land-clearing"]].map(([emoji,label,path]) => (
                  <Link key={path} to={path} className="dropdown-item"><span style={{ marginRight: 10 }}>{emoji}</span>{label}</Link>
                ))}
              </div>
            </div>
            <Link to="/about" className={`nav-link${location.pathname === "/about" ? " active" : ""}`}>About</Link>
            <Link to="/service-areas" className={`nav-link${location.pathname === "/service-areas" ? " active" : ""}`}>Service Areas</Link>
            <Link to="/blog" className={`nav-link${location.pathname === "/blog" ? " active" : ""}`}>Blog</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-nav" style={{ gap: 10, alignItems: "center" }}>
            <a href="tel:4404524840" style={{ ...btnOutline, padding: "9px 16px", fontSize: 14 }} className="btn-hover">📞 (440) 452-4840</a>
            <button onClick={() => setShowModal(true)} style={{ ...btnGreen, padding: "10px 18px", fontSize: 14 }} className="btn-hover">Free Estimate</button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ background: "none", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#4ade80", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#4ade80", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#4ade80", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: "rgba(5,13,7,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(74,222,128,0.15)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>Home</Link>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
              <div style={{ color: "#4ade80", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "12px 0 8px" }}>Services</div>
              {[["Tree Removal","/services/tree-removal"],["Tree Trimming","/services/tree-trimming"],["Stump Grinding","/services/stump-grinding"],["Storm Cleanup","/services/storm-cleanup"],["Land Clearing","/services/land-clearing"]].map(([label,path]) => (
                <Link key={path} to={path} onClick={() => setMenuOpen(false)} style={{ color: "#d1fae5", textDecoration: "none", fontSize: 15, fontWeight: 500, padding: "9px 0 9px 12px", display: "block" }}>• {label}</Link>
              ))}
            </div>
            <Link to="/about" onClick={() => setMenuOpen(false)} style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>About</Link>
            <Link to="/service-areas" onClick={() => setMenuOpen(false)} style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>Service Areas</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)} style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>Blog</Link>
            <div style={{ display: "none" }}>{navLinks.map(([label, path]) => (
              <Link key={path} to={path} style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>{label}</Link>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <a href="tel:4404524840" style={{ ...btnOutline, textAlign: "center", padding: "13px", display: "block" }}>📞 (440) 452-4840</a>
              <button onClick={() => { setShowModal(true); setMenuOpen(false); }} style={{ ...btnGreen, marginTop: 0, width: "100%", padding: "14px", fontSize: 15 }}>Get Free Estimate</button>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main style={{ paddingTop: 70 }}>
        {children}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#030a05", borderTop: "1px solid rgba(74,222,128,0.12)", padding: "72px 24px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>🌳</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: "#fff" }}>The Tree Service</div>
                  <div style={{ fontSize: 12, color: "#4ade80", letterSpacing: 1.5, textTransform: "uppercase" }}>Elyria, Ohio</div>
                </div>
              </div>
              <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>Ohio's most trusted tree care experts. Licensed, insured, and dedicated to your property's safety.</p>
              {[["📍","6020 Lake Ave, Elyria, OH 44035"],["📞","(440) 452-4840"],["✉️","info@thetreeserviceoh.com"],["🕐","Open 24/7 · Emergency Available"]].map(([icon,text]) => (
                <div key={text} style={{ display: "flex", gap: 10, color: "#6b7280", fontSize: 14, marginBottom: 10 }}><span>{icon}</span><span>{text}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Services</h4>
              {[["Tree Removal","/services/tree-removal"],["Tree Trimming","/services/tree-trimming"],["Stump Grinding","/services/stump-grinding"],["Storm Cleanup","/services/storm-cleanup"],["Land Clearing","/services/land-clearing"]].map(([label,path]) => (
                <Link key={path} to={path} style={{ display: "block", color: "#4b5563", fontSize: 14, marginBottom: 10, textDecoration: "none" }}>{label}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Service Areas</h4>
              {SERVICE_AREAS.slice(0,8).map(area => (
                <div key={area} style={{ color: "#4b5563", fontSize: 14, marginBottom: 10 }}>{area}</div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Quick Links</h4>
              {[["About Us","/about"],["Service Areas","/service-areas"],["Blog","/blog"],["Contact","/about"]].map(([label,path]) => (
                <Link key={path} to={path} style={{ display: "block", color: "#4b5563", fontSize: 14, marginBottom: 10, textDecoration: "none" }}>{label}</Link>
              ))}
              <div style={{ marginTop: 24 }}>
                <button onClick={() => setShowModal(true)} style={{ ...btnGreen, width: "100%", textAlign: "center", marginBottom: 10 }}>Free Estimate</button>
                <a href="tel:4404524840" style={{ ...btnOutline, display: "block", textAlign: "center", borderColor: "rgba(74,222,128,0.4)", fontSize: 13 }}>Call (440) 452-4840</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 13, color: "#374151" }}>© 2025 The Tree Service — Elyria, OH. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy","Terms of Service","Sitemap"].map(l => <span key={l} style={{ fontSize: 12, color: "#374151", cursor: "pointer" }}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a href="tel:4404524840" className="floating-cta" style={{ position: "fixed", bottom: 24, right: 16, zIndex: 800, background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, fontSize: 14, textDecoration: "none", borderRadius: 50, display: "flex", alignItems: "center", gap: 8, padding: "14px 22px", boxShadow: "0 8px 32px rgba(74,222,128,0.4)" }}>
        📞 Call Now
      </a>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
