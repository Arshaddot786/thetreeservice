import { useState, useEffect, useRef, useCallback } from "react";

// ─── Floating Particles (leaves) ───────────────────────────────────────────
function Leaf({ style }) {
  return (
    <div className="leaf-particle" style={style}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2z"/>
      </svg>
    </div>
  );
}

function LeafParticles() {
  const leaves = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 16 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 8 + 10,
    opacity: Math.random() * 0.5 + 0.15,
    hue: Math.random() > 0.5 ? "#4ade80" : "#86efac",
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {leaves.map((l) => (
        <Leaf
          key={l.id}
          style={{
            position: "absolute",
            left: `${l.left}%`,
            top: "-40px",
            width: l.size,
            height: l.size,
            color: l.hue,
            opacity: l.opacity,
            animation: `leafFall ${l.duration}s ${l.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}

// ─── 3D Animated Tree (SVG/CSS) ────────────────────────────────────────────
function AnimatedTree({ size = 340 }) {
  return (
    <div style={{ width: size, height: size, position: "relative", filter: "drop-shadow(0 0 40px rgba(74,222,128,0.18))" }}>
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", animation: "treeSway 6s ease-in-out infinite" }}>
        {/* Trunk */}
        <rect x="88" y="170" width="24" height="45" rx="6" fill="#5c3d1e" />
        <rect x="93" y="170" width="6" height="45" rx="3" fill="#7a5230" opacity="0.5" />
        {/* Shadow canopy */}
        <ellipse cx="100" cy="200" rx="52" ry="12" fill="rgba(0,0,0,0.18)" />
        {/* Back branches */}
        <ellipse cx="100" cy="135" rx="62" ry="55" fill="#166534" opacity="0.5" />
        {/* Main canopy layers */}
        <ellipse cx="100" cy="145" rx="70" ry="58" fill="#15803d" />
        <ellipse cx="100" cy="125" rx="58" ry="52" fill="#16a34a" />
        <ellipse cx="100" cy="108" rx="46" ry="44" fill="#22c55e" />
        <ellipse cx="100" cy="94" rx="34" ry="36" fill="#4ade80" />
        <ellipse cx="100" cy="83" rx="22" ry="26" fill="#86efac" opacity="0.7" />
        {/* Highlight */}
        <ellipse cx="88" cy="78" rx="10" ry="14" fill="white" opacity="0.08" />
        {/* Tiny fruit/nodes */}
        {[[72,130],[128,118],[85,105],[115,100],[100,88]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#fbbf24" opacity="0.7" style={{ animation: `pulse ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </svg>
    </div>
  );
}

// ─── Stars ──────────────────────────────────────────────────────────────────
function Stars({ count = 5, filled = 5 }) {
  return (
    <span style={{ color: "#fbbf24", fontSize: 18, letterSpacing: 2 }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>{i < filled ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

// ─── Section Fade-in ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transform = visible ? "none" : direction === "up" ? "translateY(38px)" : direction === "left" ? "translateX(-38px)" : "translateX(38px)";

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform, transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

// ─── Quote Form Modal ───────────────────────────────────────────────────────
function QuoteModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0f1a12,#122418)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 520, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#9ca3af", fontSize: 24, cursor: "pointer" }}>×</button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🌳</div>
            <h3 style={{ color: "#4ade80", fontSize: 26, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>Request Sent!</h3>
            <p style={{ color: "#9ca3af" }}>Jason and the team will call you within 1 hour. Expect a free, no-pressure estimate.</p>
            <button onClick={onClose} style={btnGreen}>Close</button>
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
              <button type="submit" style={{ ...btnGreen, marginTop: 4, fontSize: 16 }}>Send My Free Estimate Request →</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "13px 16px", color: "#fff", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box" };
const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, display: "inline-block", marginTop: 16, letterSpacing: 0.3 };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "13px 26px", cursor: "pointer", fontSize: 15, display: "inline-block", letterSpacing: 0.3 };

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES = [
  { emoji: "🪓", title: "Tree Removal", desc: "Safe, efficient removal of dead, diseased, or hazardous trees of any size — including cranes for tight spaces.", color: "#166534" },
  { emoji: "✂️", title: "Tree Trimming & Pruning", desc: "Shape your trees for health, safety, and curb appeal. ISA-standard cuts that promote long-term growth.", color: "#15803d" },
  { emoji: "⚙️", title: "Stump Grinding", desc: "Eliminate unsightly stumps flush with the ground. Fast, clean, and reclaim your yard same day.", color: "#16a34a" },
  { emoji: "⛈️", title: "Emergency Storm Cleanup", desc: "24/7 rapid response to storm damage. We're on-call and arrive fast when it matters most.", color: "#14532d" },
  { emoji: "🏔️", title: "Land Clearing", desc: "Full-scale clearing for residential lots, construction sites, and commercial properties.", color: "#166534" },
];

const REVIEWS = [
  { name: "Pete S.", text: "Jason and his team are absolutely amazing. Fair pricing, no hidden surprises, and the cleanup was exceptional. Best in Lorain County!", stars: 5, location: "Elyria, OH" },
  { name: "Maria T.", text: "First time homeowner and they made everything stress-free. Used the boom truck in my small yard perfectly. 100% would call again.", stars: 5, location: "North Ridgeville, OH" },
  { name: "Bob K.", text: "Had 4 large trees removed. Friendly, professional, great price. They went above and beyond with the cleanup. Highly recommend!", stars: 5, location: "Amherst, OH" },
  { name: "Linda R.", text: "Called for emergency service after a storm. Jason's crew was there within 2 hours. Professional and fast. Saved my roof!", stars: 5, location: "Lorain, OH" },
  { name: "Mike H.", text: "The best tree service in the area, period. Used them 3 times now. Consistent, reliable, fair. Jason really cares about his customers.", stars: 5, location: "Avon, OH" },
];

const WHY_US = [
  { icon: "🛡️", title: "Fully Licensed & Insured", desc: "Your property is always protected. We carry full liability insurance on every job." },
  { icon: "⚡", title: "Fast Response Times", desc: "24/7 emergency availability. Most calls returned within 30 minutes." },
  { icon: "💰", title: "Transparent Pricing", desc: "Free estimates with zero pressure. You know the cost before we touch a single branch." },
  { icon: "🏆", title: "4.9★ Rated — 879 Reviews", desc: "Ohio's most trusted local tree service, verified by real homeowners across Lorain County." },
  { icon: "🚁", title: "State-of-the-Art Equipment", desc: "Boom trucks, cranes, stump grinders — we handle jobs others won't." },
  { icon: "🌱", title: "Local Experts Since Day One", desc: "Jason and crew live here. We know Ohio trees, Ohio storms, and Ohio homeowners." },
];

const PROCESS = [
  { step: "01", title: "Free Estimate", desc: "Call or fill out our form. Jason personally visits your property and gives you a detailed, honest quote — no pressure." },
  { step: "02", title: "We Schedule Fast", desc: "We work around your schedule. Emergency calls get same-day response. Standard jobs typically within 48 hours." },
  { step: "03", title: "Expert Service", desc: "Our certified crew arrives on time, works safely, and treats your yard like their own." },
  { step: "04", title: "Clean & Gone", desc: "We haul everything away and leave your property spotless. You won't even know we were there — except the tree is gone." },
];

const SERVICE_AREAS = ["Elyria", "Lorain", "Avon", "Avon Lake", "North Ridgeville", "Amherst", "Oberlin", "Sheffield Lake", "Bay Village", "Westlake", "Strongsville", "Brunswick"];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { overflow-x: hidden; max-width: 100%; }
        body { background: #050d07; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; max-width: 100%; position: relative; }
        ::selection { background: #4ade80; color: #052e16; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a1a0d; }
        ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 3px; }

        @keyframes leafFall {
          0% { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(60px); opacity: 0; }
        }
        @keyframes treeSway {
          0%,100% { transform: rotate(-1.5deg) skewX(-0.5deg); }
          50% { transform: rotate(1.5deg) skewX(0.5deg); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px);} to { opacity:1; transform:none;} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(74,222,128,0.3);} 50%{box-shadow:0 0 40px rgba(74,222,128,0.6);} }

        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
        .btn-hover { transition: all 0.25s ease; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(74,222,128,0.35); }
        .service-card:hover { transform: translateY(-6px); border-color: rgba(74,222,128,0.4) !important; }
        .service-card { transition: all 0.3s ease; }
        .why-card:hover { background: rgba(74,222,128,0.07) !important; border-color: rgba(74,222,128,0.3) !important; }
        .why-card { transition: all 0.3s ease; }
        .nav-link { color: #9ca3af; text-decoration:none; font-size:15px; font-weight:500; transition:color 0.2s; }
        .nav-link:hover { color: #4ade80; }
        .floating-cta { animation: float 3s ease-in-out infinite; }
        input::placeholder, textarea::placeholder, select { color: #6b7280; }
        option { background: #0f1a12; }
        @media (max-width:768px) {
          .hero-grid { flex-direction: column !important; text-align: center; }
          .hero-tree { display: none !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-wrap: wrap; gap: 20px !important; }
          .hero-btns { justify-content: center !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .reviews-card { padding: 28px 20px !important; }
        }
        @media (max-width:480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          h1 { font-size: clamp(2.2rem, 9vw, 3.8rem) !important; }
        }
      `}</style>

      <LeafParticles />

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(5,13,7,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(74,222,128,0.12)" : "none",
        transition: "all 0.4s ease",
        padding: "0 16px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🌳</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, lineHeight: 1.1, color: "#fff" }}>The Tree Service</div>
              <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Elyria, Ohio</div>
            </div>
          </div>

          {/* Nav desktop */}
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {[["Services","services"],["Why Us","whyus"],["Gallery","gallery"],["Reviews","reviews"],["Contact","contact"]].map(([label,id]) => (
              <a key={id} href={`#${id}`} className="nav-link" onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>
            ))}
          </nav>

          {/* Header CTA */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="tel:4404524840" style={{ ...btnOutline, padding: "9px 16px", fontSize: 14, textDecoration: "none" }} className="btn-hover">
              📞 (440) 452-4840
            </a>
            <button onClick={() => setShowModal(true)} style={{ ...btnGreen, padding: "10px 18px", fontSize: 14, marginTop: 0 }} className="btn-hover">
              Free Estimate
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
        background: "radial-gradient(ellipse at 20% 50%, rgba(22,101,52,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(5,46,22,0.4) 0%, transparent 50%), #050d07",
        overflow: "hidden", paddingTop: 70,
      }}>
        {/* Bg grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px", zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "space-between" }} className="hero-grid">
            {/* Left */}
            <div style={{ flex: 1, maxWidth: 620 }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 28, animation: "slideDown 0.6s ease" }}>
                <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
                <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, letterSpacing: 0.5 }}>Ohio's #1 Rated Tree Service · 879 Reviews</span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem,5.5vw,4.8rem)",
                fontWeight: 900, lineHeight: 1.06,
                color: "#fff", marginBottom: 24,
                animation: "slideDown 0.7s 0.1s ease both",
              }}>
                Ohio's Most{" "}
                <span style={{
                  background: "linear-gradient(135deg,#4ade80,#86efac,#22c55e)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundSize: "200%", animation: "gradientShift 4s ease infinite",
                }}>
                  Trusted
                </span>{" "}
                Tree Experts
              </h1>

              <p style={{ fontSize: 19, color: "#9ca3af", lineHeight: 1.7, marginBottom: 36, animation: "slideDown 0.7s 0.2s ease both" }}>
                Dangerous trees removed. Yards transformed. Properties protected.<br />
                <strong style={{ color: "#e5e7eb" }}>Serving Elyria & all of Lorain County</strong> — 24/7, licensed & fully insured.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }} className="hero-btns">
                <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 17, padding: "16px 32px", marginTop: 0, animation: "glow 3s ease-in-out infinite" }} className="btn-hover">
                  🌿 Get Free Estimate
                </button>
                <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 17, padding: "15px 30px", textDecoration: "none" }} className="btn-hover">
                  📞 Call Now
                </a>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }} className="stats-row">
                {[
                  ["4.9★", "Google Rating"],
                  ["879+", "5-Star Reviews"],
                  ["24/7", "Emergency Service"],
                  ["🛡️", "Licensed & Insured"],
                ].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "'Playfair Display', serif" }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 3D Tree */}
            <div style={{ flexShrink: 0, animation: "float 5s ease-in-out infinite" }} className="hero-tree">
              <AnimatedTree size={380} />
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.1)", borderRadius: 50, padding: "6px 18px", border: "1px solid rgba(74,222,128,0.2)" }}>
                  <Stars count={5} filled={5} />
                  <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 4 }}>4.9 · 879 Google Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 12, color: "#4ade80", letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#4ade80,transparent)" }} />
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section style={{ background: "rgba(74,222,128,0.07)", borderTop: "1px solid rgba(74,222,128,0.15)", borderBottom: "1px solid rgba(74,222,128,0.15)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
          {[
            { icon: "⭐", text: "4.9/5 Average Rating" },
            { icon: "📋", text: "879 Verified Google Reviews" },
            { icon: "🖼️", text: "1,962+ Project Photos" },
            { icon: "🏠", text: "Elyria's #1 Tree Service" },
            { icon: "✅", text: "100% Satisfaction Guarantee" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "#d1fae5", fontSize: 14, fontWeight: 500 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>What We Do</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 16 }}>Complete Tree Care Services</h2>
              <p style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>From routine trimming to emergency removals, we handle every job with the same care and professionalism.</p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }} className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="glass service-card" style={{ borderRadius: 20, padding: "32px 28px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 42, marginBottom: 18 }}>{s.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{s.desc}</p>
                  <button onClick={() => setShowModal(true)} style={{ background: "none", border: "none", color: "#4ade80", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
                    Get a Quote →
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="whyus" style={{ padding: "100px 24px", background: "radial-gradient(ellipse at center,rgba(22,101,52,0.15) 0%,transparent 70%)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Why Homeowners Trust Us</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>The Jason Difference</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="why-grid">
            {WHY_US.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.08}>
                <div className="glass why-card" style={{ borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{w.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{w.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Google Reviews</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 12 }}>Real Homeowners. Real Results.</h2>
              <Stars count={5} filled={5} />
              <span style={{ color: "#9ca3af", marginLeft: 10, fontSize: 15 }}>4.9 average · 879 reviews</span>
            </div>
          </FadeIn>

          {/* Carousel */}
          <div className="glass reviews-card" style={{ borderRadius: 24, padding: "48px 48px", textAlign: "center", border: "1px solid rgba(74,222,128,0.15)", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#16a34a,#4ade80,#86efac)" }} />
            <div style={{ fontSize: 52, color: "#4ade80", fontFamily: "Georgia", lineHeight: 0.7, marginBottom: 24, opacity: 0.4 }}>"</div>
            <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#e5e7eb", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>
              {REVIEWS[reviewIdx].text}
            </p>
            <Stars count={5} filled={REVIEWS[reviewIdx].stars} />
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{REVIEWS[reviewIdx].name}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{REVIEWS[reviewIdx].location}</div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setReviewIdx(i)} style={{ width: i === reviewIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === reviewIdx ? "#4ade80" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
          </div>

          {/* Google attribution */}
          <div style={{ textAlign: "center", marginTop: 24, color: "#4b5563", fontSize: 13 }}>
            All reviews from Google Business Profile · <span style={{ color: "#4ade80" }}>The Tree Service — Elyria, OH</span>
          </div>
        </div>
      </section>

      {/* ── GALLERY / BEFORE-AFTER ── */}
      <section id="gallery" style={{ padding: "100px 24px", background: "rgba(0,0,0,0.2)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Our Work</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 12 }}>1,962+ Completed Projects</h2>
              <p style={{ color: "#6b7280" }}>Browse real jobs from real Ohio homeowners</p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { label: "Large Oak Removal", loc: "Elyria, OH", emoji: "🌳", bg: "linear-gradient(135deg,#052e16,#14532d)", tag: "Tree Removal" },
              { label: "Storm Cleanup", loc: "Lorain, OH", emoji: "⛈️", bg: "linear-gradient(135deg,#0c1a0e,#166534)", tag: "Emergency" },
              { label: "Stump Grinding", loc: "North Ridgeville, OH", emoji: "⚙️", bg: "linear-gradient(135deg,#0f1a10,#15803d)", tag: "Stump Grinding" },
              { label: "Crown Trimming", loc: "Avon Lake, OH", emoji: "✂️", bg: "linear-gradient(135deg,#052e16,#14532d)", tag: "Trimming" },
              { label: "Land Clearing", loc: "Amherst, OH", emoji: "🏔️", bg: "linear-gradient(135deg,#0a1a0d,#166534)", tag: "Land Clearing" },
              { label: "Residential Cleanup", loc: "Sheffield Lake, OH", emoji: "🏡", bg: "linear-gradient(135deg,#0f1a10,#15803d)", tag: "Cleanup" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.07}>
                <div className="service-card" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}>
                  <div style={{ height: 180, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span style={{ fontSize: 64 }}>{item.emoji}</span>
                    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#4ade80", fontWeight: 600 }}>{item.tag}</div>
                  </div>
                  <div style={{ padding: "16px 18px", background: "#0a1a0d" }}>
                    <div style={{ fontWeight: 600, color: "#fff", fontSize: 15, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "#4b5563" }}>📍 {item.loc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <p style={{ color: "#6b7280", marginBottom: 20 }}>See all 1,962+ photos on our Google Business Profile</p>
              <a href="https://maps.app.goo.gl/V9XDZXSVTqqmhZvs9" target="_blank" rel="noopener noreferrer" style={{ ...btnOutline, textDecoration: "none" }} className="btn-hover">
                View Google Profile →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>How It Works</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>Simple. Fast. Stress-Free.</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="process-grid">
            {/* Connecting line */}
            <div style={{ position: "absolute", top: 36, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.3),rgba(74,222,128,0.5),rgba(74,222,128,0.3),transparent)", zIndex: 0 }} className="desktop-only" />

            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.12}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#4ade80)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#052e16", boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
                    {p.step}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#052e16 0%,#0f1a12 40%,#166534 100%)", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%,rgba(74,222,128,0.15) 0%,transparent 60%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🚨</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>
              Don't Wait Until It's Too Late
            </h2>
            <p style={{ fontSize: 18, color: "#86efac", lineHeight: 1.7, marginBottom: 40 }}>
              That leaning tree. That rotting trunk. That storm-damaged branch.<br />
              Every day you wait is one day closer to a disaster. <strong style={{ color: "#fff" }}>Call Jason today — it's free.</strong>
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 18, padding: "18px 36px", marginTop: 0, animation: "glow 2.5s ease-in-out infinite" }} className="btn-hover">
                🌿 Get My Free Estimate Now
              </button>
              <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 17, padding: "17px 32px", textDecoration: "none", borderColor: "#86efac", color: "#86efac" }} className="btn-hover">
                📞 (440) 452-4840
              </a>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "#6b7280" }}>
              ✓ Free estimate &nbsp;·&nbsp; ✓ No pressure &nbsp;·&nbsp; ✓ Same-day availability &nbsp;·&nbsp; ✓ 24/7 Emergency
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact" style={{ background: "#030a05", borderTop: "1px solid rgba(74,222,128,0.12)", padding: "72px 24px 36px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>🌳</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: "#fff" }}>The Tree Service</div>
                  <div style={{ fontSize: 12, color: "#4ade80", letterSpacing: 1.5, textTransform: "uppercase" }}>Elyria, Ohio</div>
                </div>
              </div>
              <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>
                Ohio's most trusted tree care experts. Licensed, insured, and dedicated to your property's safety since day one.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["📍", "6020 Lake Ave, Elyria, OH 44035"],["📞", "(440) 452-4840"],["✉️", "info@thetreeserviceoh.com"],["🕐", "Open 24/7 · Emergency Available"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#6b7280", fontSize: 14 }}>
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Services</h4>
              {["Tree Removal","Tree Trimming","Stump Grinding","Storm Cleanup","Land Clearing"].map(s => (
                <div key={s} style={{ color: "#4b5563", fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#4ade80"}
                  onMouseLeave={e => e.target.style.color = "#4b5563"}>{s}</div>
              ))}
            </div>

            {/* Service Areas */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Service Areas</h4>
              {SERVICE_AREAS.slice(0, 8).map(area => (
                <div key={area} style={{ color: "#4b5563", fontSize: 14, marginBottom: 10 }}>{area}</div>
              ))}
            </div>

            {/* Quick CTA */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Get a Free Quote</h4>
              <p style={{ color: "#4b5563", fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>Ready to get started? Get your free, no-obligation estimate today.</p>
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen, width: "100%", textAlign: "center", marginTop: 0, marginBottom: 14 }}>
                Free Estimate
              </button>
              <a href="tel:4404524840" style={{ ...btnOutline, display: "block", textAlign: "center", textDecoration: "none", borderColor: "rgba(74,222,128,0.4)" }} className="btn-hover">
                Call (440) 452-4840
              </a>
              <div style={{ marginTop: 20 }}>
                <Stars count={5} filled={5} />
                <div style={{ fontSize: 12, color: "#4b5563", marginTop: 6 }}>4.9 · 879 Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 13, color: "#374151" }}>
              © 2025 The Tree Service — Elyria, OH. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {["Privacy Policy","Terms of Service","Sitemap"].map(link => (
                <span key={link} style={{ fontSize: 12, color: "#374151", cursor: "pointer" }}>{link}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CALL BUTTON ── */}
      <a href="tel:4404524840" className="floating-cta" style={{
        position: "fixed", bottom: 28, right: 20, zIndex: 800,
        background: "linear-gradient(135deg,#16a34a,#4ade80)",
        color: "#052e16", fontWeight: 800, fontSize: 14,
        textDecoration: "none", borderRadius: 50,
        display: "flex", alignItems: "center", gap: 8,
        padding: "14px 22px",
        boxShadow: "0 8px 32px rgba(74,222,128,0.4)",
      }}>
        📞 Call Now
      </a>

      {/* ── MODAL ── */}
      {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
