import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { QuoteModal } from "../components/Layout";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "13px 26px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };

function Leaf({ style }) {
  return (
    <div style={style}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2z"/>
      </svg>
    </div>
  );
}

function LeafParticles() {
  const leaves = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: Math.random() * 16 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 8 + 10,
    opacity: Math.random() * 0.4 + 0.1,
    hue: Math.random() > 0.5 ? "#4ade80" : "#86efac",
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {leaves.map((l) => (
        <Leaf key={l.id} style={{ position: "absolute", left: `${l.left}%`, top: "-40px", width: l.size, height: l.size, color: l.hue, opacity: l.opacity, animation: `leafFall ${l.duration}s ${l.delay}s infinite linear` }} />
      ))}
      <style>{`
        @keyframes leafFall {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(50px); opacity: 0; }
        }
        @keyframes treeSway { 0%,100%{transform:rotate(-1.5deg);} 50%{transform:rotate(1.5deg);} }
        @keyframes floatTree { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
        @keyframes glowAnim { 0%,100%{box-shadow:0 0 20px rgba(74,222,128,0.3);} 50%{box-shadow:0 0 40px rgba(74,222,128,0.6);} }
        @keyframes gradShift { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
        @keyframes pulseAnim { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.3);} }
        @media (max-width:768px) {
          .hero-flex { flex-direction: column !important; text-align: center !important; }
          .hero-tree-wrap { display: none !important; }
          .hero-btns { justify-content: center !important; }
          .stats-row { flex-wrap: wrap; gap: 20px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width:480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function AnimatedTree({ size = 340 }) {
  return (
    <div style={{ width: size, height: size, filter: "drop-shadow(0 0 40px rgba(74,222,128,0.18))", animation: "floatTree 5s ease-in-out infinite" }}>
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", animation: "treeSway 6s ease-in-out infinite" }}>
        <rect x="88" y="170" width="24" height="45" rx="6" fill="#5c3d1e" />
        <rect x="93" y="170" width="6" height="45" rx="3" fill="#7a5230" opacity="0.5" />
        <ellipse cx="100" cy="200" rx="52" ry="12" fill="rgba(0,0,0,0.18)" />
        <ellipse cx="100" cy="145" rx="70" ry="58" fill="#15803d" />
        <ellipse cx="100" cy="125" rx="58" ry="52" fill="#16a34a" />
        <ellipse cx="100" cy="108" rx="46" ry="44" fill="#22c55e" />
        <ellipse cx="100" cy="94" rx="34" ry="36" fill="#4ade80" />
        <ellipse cx="100" cy="83" rx="22" ry="26" fill="#86efac" opacity="0.7" />
        <ellipse cx="88" cy="78" rx="10" ry="14" fill="white" opacity="0.08" />
        {[[72,130],[128,118],[85,105],[115,100],[100,88]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#fbbf24" opacity="0.7" style={{ animation: `pulseAnim ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </svg>
    </div>
  );
}

function Stars({ count = 5 }) {
  return <span style={{ color: "#fbbf24", fontSize: 18, letterSpacing: 2 }}>{"★".repeat(count)}</span>;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(38px)", transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

const SERVICES = [
  { emoji: "🪓", title: "Tree Removal", desc: "Safe, efficient removal of any size tree. Cranes for tight spaces, full cleanup included.", slug: "tree-removal" },
  { emoji: "✂️", title: "Tree Trimming & Pruning", desc: "Shape your trees for health, safety, and curb appeal with ISA-standard cuts.", slug: "tree-trimming" },
  { emoji: "⚙️", title: "Stump Grinding", desc: "Eliminate stumps flush with the ground. Fast, clean, same-day available.", slug: "stump-grinding" },
  { emoji: "⛈️", title: "Emergency Storm Cleanup", desc: "24/7 rapid response. We arrive fast when you need us most.", slug: "storm-cleanup" },
  { emoji: "🏔️", title: "Land Clearing", desc: "Full-scale clearing for lots, construction sites, and commercial properties.", slug: "land-clearing" },
];

const REVIEWS = [
  { name: "Pete S.", text: "Jason and his team are absolutely amazing. Fair pricing, no hidden surprises, and the cleanup was exceptional. Best in Lorain County!", stars: 5, location: "Elyria, OH" },
  { name: "Maria T.", text: "First time homeowner and they made everything stress-free. Used the boom truck in my small yard perfectly. 100% would call again.", stars: 5, location: "North Ridgeville, OH" },
  { name: "Bob K.", text: "Had 4 large trees removed. Friendly, professional, great price. They went above and beyond with the cleanup. Highly recommend!", stars: 5, location: "Amherst, OH" },
  { name: "Linda R.", text: "Called for emergency service after a storm. Jason's crew was there within 2 hours. Professional and fast. Saved my roof!", stars: 5, location: "Lorain, OH" },
  { name: "Mike H.", text: "The best tree service in the area, period. Used them 3 times now. Consistent, reliable, fair. Jason really cares about his customers.", stars: 5, location: "Avon, OH" },
];

const WHY_US = [
  { icon: "🛡️", title: "Fully Licensed & Insured", desc: "Your property is always protected with full liability coverage on every job." },
  { icon: "⚡", title: "24/7 Fast Response", desc: "Emergency calls returned within 30 minutes. We're always available." },
  { icon: "💰", title: "Transparent Pricing", desc: "Free estimates with zero pressure. You know the cost before we start." },
  { icon: "🏆", title: "4.9★ — 879 Reviews", desc: "Ohio's most trusted local tree service, verified by real homeowners." },
  { icon: "🚁", title: "State-of-the-Art Equipment", desc: "Boom trucks, cranes, stump grinders — we handle jobs others won't." },
  { icon: "🌱", title: "Local Experts", desc: "Jason and crew live here. We know Ohio trees and Ohio homeowners." },
];

const PROCESS = [
  { step: "01", title: "Free Estimate", desc: "Call or fill out our form. Jason personally visits and gives you a detailed, honest quote." },
  { step: "02", title: "We Schedule Fast", desc: "We work around your schedule. Emergency calls get same-day response." },
  { step: "03", title: "Expert Service", desc: "Our crew arrives on time, works safely, and treats your yard like their own." },
  { step: "04", title: "Clean & Gone", desc: "We haul everything away and leave your property spotless." },
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <LeafParticles />

      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", background: "radial-gradient(ellipse at 20% 50%, rgba(22,101,52,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(5,46,22,0.4) 0%, transparent 50%), #050d07", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px", zIndex: 0 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "space-between" }} className="hero-flex">
            <div style={{ flex: 1, maxWidth: 620 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 28 }}>
                <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block", animation: "pulseAnim 1.5s ease-in-out infinite" }} />
                <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>Ohio's #1 Rated Tree Service · 879 Reviews</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.06, color: "#fff", marginBottom: 24 }}>
                Ohio's Most{" "}
                <span style={{ background: "linear-gradient(135deg,#4ade80,#86efac,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "gradShift 4s ease infinite" }}>Trusted</span>{" "}
                Tree Experts
              </h1>
              <p style={{ fontSize: 19, color: "#9ca3af", lineHeight: 1.7, marginBottom: 36 }}>
                Dangerous trees removed. Yards transformed. Properties protected.<br />
                <strong style={{ color: "#e5e7eb" }}>Serving Elyria & all of Lorain County</strong> — 24/7, licensed & fully insured.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }} className="hero-btns">
                <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 17, padding: "16px 32px", animation: "glowAnim 3s ease-in-out infinite" }} className="btn-hover">🌿 Get Free Estimate</button>
                <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 17, padding: "15px 30px" }} className="btn-hover">📞 Call Now</a>
              </div>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }} className="stats-row">
                {[["4.9★","Google Rating"],["879+","5-Star Reviews"],["24/7","Emergency Service"],["🛡️","Licensed & Insured"]].map(([v,l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "'Playfair Display', serif" }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-tree-wrap" style={{ flexShrink: 0 }}>
              <AnimatedTree size={380} />
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.1)", borderRadius: 50, padding: "6px 18px", border: "1px solid rgba(74,222,128,0.2)" }}>
                  <Stars count={5} />
                  <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 4 }}>4.9 · 879 Google Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 12, color: "#4ade80", letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#4ade80,transparent)" }} />
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section style={{ background: "rgba(74,222,128,0.07)", borderTop: "1px solid rgba(74,222,128,0.15)", borderBottom: "1px solid rgba(74,222,128,0.15)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
          {[["⭐","4.9/5 Average Rating"],["📋","879 Verified Google Reviews"],["🖼️","1,962+ Project Photos"],["🏠","Elyria's #1 Tree Service"],["✅","100% Satisfaction Guarantee"]].map(([icon,text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "#d1fae5", fontSize: 14, fontWeight: 500 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>What We Do</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 16 }}>Complete Tree Care Services</h2>
              <p style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>From routine trimming to emergency removals — every job done right.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }} className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="glass card-hover" style={{ borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                  <div style={{ fontSize: 42, marginBottom: 18 }}>{s.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Link to={`/services/${s.slug}`} style={{ background: "none", border: "none", color: "#4ade80", fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "none" }}>Learn More →</Link>
                    <button onClick={() => setShowModal(true)} style={{ background: "none", border: "none", color: "#6b7280", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Get Quote</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
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
                <div className="glass card-hover" style={{ borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{w.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{w.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Google Reviews</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 12 }}>Real Homeowners. Real Results.</h2>
              <Stars count={5} />
              <span style={{ color: "#9ca3af", marginLeft: 10, fontSize: 15 }}>4.9 average · 879 reviews</span>
            </div>
          </FadeIn>
          <div className="glass" style={{ borderRadius: 24, padding: "48px", textAlign: "center", border: "1px solid rgba(74,222,128,0.15)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#16a34a,#4ade80,#86efac)", borderRadius: "24px 24px 0 0" }} />
            <div style={{ fontSize: 52, color: "#4ade80", lineHeight: 0.7, marginBottom: 24, opacity: 0.4 }}>"</div>
            <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "#e5e7eb", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>{REVIEWS[reviewIdx].text}</p>
            <Stars count={5} />
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{REVIEWS[reviewIdx].name}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{REVIEWS[reviewIdx].location}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setReviewIdx(i)} style={{ width: i === reviewIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === reviewIdx ? "#4ade80" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "100px 24px", background: "rgba(0,0,0,0.2)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Our Work</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 12 }}>1,962+ Completed Projects</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="gallery-grid">
            {[["🌳","Large Oak Removal","Elyria, OH","Tree Removal","tree-removal"],["⛈️","Storm Cleanup","Lorain, OH","Emergency","storm-cleanup"],["⚙️","Stump Grinding","North Ridgeville, OH","Stump Grinding","stump-grinding"],["✂️","Crown Trimming","Avon Lake, OH","Trimming","tree-trimming"],["🏔️","Land Clearing","Amherst, OH","Land Clearing","land-clearing"],["🏡","Residential Cleanup","Sheffield Lake, OH","Cleanup","tree-removal"]].map(([emoji,label,loc,tag,slug]) => (
              <FadeIn key={label}>
                <Link to={`/services/${slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div className="card-hover" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ height: 180, background: "linear-gradient(135deg,#052e16,#15803d)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <span style={{ fontSize: 64 }}>{emoji}</span>
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#4ade80", fontWeight: 600 }}>{tag}</div>
                    </div>
                    <div style={{ padding: "16px 18px", background: "#0a1a0d" }}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: 15, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#4b5563" }}>📍 {loc}</div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>How It Works</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>Simple. Fast. Stress-Free.</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="process-grid">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.12}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#4ade80)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#052e16", boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}>{p.step}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#052e16 0%,#0f1a12 40%,#166534 100%)", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%,rgba(74,222,128,0.15) 0%,transparent 60%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🚨</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>Don't Wait Until It's Too Late</h2>
            <p style={{ fontSize: 18, color: "#86efac", lineHeight: 1.7, marginBottom: 40 }}>That leaning tree. That rotting trunk. That storm-damaged branch.<br />Every day you wait is one day closer to a disaster. <strong style={{ color: "#fff" }}>Call Jason today — it's free.</strong></p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 18, padding: "18px 36px", animation: "glowAnim 2.5s ease-in-out infinite" }} className="btn-hover">🌿 Get My Free Estimate Now</button>
              <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 17, padding: "17px 32px", borderColor: "#86efac", color: "#86efac" }} className="btn-hover">📞 (440) 452-4840</a>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "#6b7280" }}>✓ Free estimate &nbsp;·&nbsp; ✓ No pressure &nbsp;·&nbsp; ✓ Same-day availability &nbsp;·&nbsp; ✓ 24/7 Emergency</p>
          </FadeIn>
        </div>
      </section>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
