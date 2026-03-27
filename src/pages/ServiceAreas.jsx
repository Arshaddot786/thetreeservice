import { useState } from "react";
import { QuoteModal } from "../components/Layout";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "13px 26px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };

const AREAS = [
  { city: "Elyria", county: "Lorain County", desc: "Our home base. We know every street, every tree, and every homeowner in Elyria. Same-day service available.", primary: true },
  { city: "Lorain", county: "Lorain County", desc: "Serving all of Lorain with fast response times and expert tree care for both residential and commercial properties." },
  { city: "Avon", county: "Lorain County", desc: "Premium tree services for Avon's growing residential neighborhoods. Free estimates within 24 hours." },
  { city: "Avon Lake", county: "Lorain County", desc: "Expert tree removal and trimming for Avon Lake lakefront and residential properties." },
  { city: "North Ridgeville", county: "Lorain County", desc: "Trusted by hundreds of North Ridgeville homeowners for safe, clean tree removal and maintenance." },
  { city: "Amherst", county: "Lorain County", desc: "Full tree care services in Amherst — from routine pruning to emergency storm cleanup." },
  { city: "Oberlin", county: "Lorain County", desc: "Serving Oberlin with professional tree services and environmentally conscious practices." },
  { city: "Sheffield Lake", county: "Lorain County", desc: "Complete tree care for Sheffield Lake properties, including lakefront and residential lots." },
  { city: "Bay Village", county: "Cuyahoga County", desc: "Premium tree services for Bay Village's beautiful lakefront homes and residential neighborhoods." },
  { city: "Westlake", county: "Cuyahoga County", desc: "Expert tree removal, trimming, and stump grinding for Westlake's residential and commercial properties." },
  { city: "Strongsville", county: "Cuyahoga County", desc: "Trusted tree care for Strongsville homeowners — fast, professional, and always on time." },
  { city: "Brunswick", county: "Medina County", desc: "Serving Brunswick with the same high-quality tree services that made us #1 in Lorain County." },
];

export default function ServiceAreas() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "radial-gradient(ellipse at 30% 50%, rgba(22,101,52,0.2) 0%, transparent 60%), #050d07", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Where We Work</div>
          <h1 className="page-hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 24, lineHeight: 1.1 }}>
            Serving All of{" "}
            <span style={{ background: "linear-gradient(135deg,#4ade80,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Northeast Ohio</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.7 }}>
            From Elyria to Brunswick, we bring the same 4.9★ service to every city we serve. Licensed, insured, and available 24/7.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 50, padding: "8px 20px", marginTop: 28 }}>
            <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, letterSpacing: 0.5 }}>📍 Based in Elyria, OH · Serving 3 Counties</span>
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {AREAS.map((area) => (
              <div key={area.city} className="glass card-hover" style={{ borderRadius: 20, padding: "32px 28px", border: area.primary ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                {area.primary && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#4ade80", fontWeight: 700, letterSpacing: 1 }}>HOME BASE</div>
                )}
                <div style={{ fontSize: 36, marginBottom: 16 }}>📍</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 6 }}>{area.city}</h3>
                <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 16 }}>{area.county}</div>
                <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{area.desc}</p>
                <button onClick={() => setShowModal(true)} style={{ background: "none", border: "none", color: "#4ade80", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>
                  Get Free Estimate in {area.city} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage map callout */}
      <section style={{ padding: "60px 24px", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="glass" style={{ borderRadius: 24, padding: "48px", border: "1px solid rgba(74,222,128,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🗺️</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", color: "#fff", marginBottom: 16 }}>Not Sure If We Cover Your Area?</h2>
            <p style={{ color: "#9ca3af", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              We serve all of Lorain County, most of Cuyahoga County, and parts of Medina County. If you're within 40 miles of Elyria — <strong style={{ color: "#fff" }}>we've got you covered.</strong>
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:4404524840" style={{ ...btnGreen, fontSize: 17, padding: "16px 32px" }} className="btn-hover">📞 Call to Check Your Area</a>
              <button onClick={() => setShowModal(true)} style={{ ...btnOutline, fontSize: 16 }} className="btn-hover">Get Free Estimate</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#052e16,#0f1a12,#166534)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 20 }}>Ready to Get Started?</h2>
          <p style={{ color: "#86efac", fontSize: 18, marginBottom: 36, lineHeight: 1.7 }}>Free estimates for all service areas. We respond within 1 hour and arrive within 24 hours.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 17, padding: "16px 32px" }} className="btn-hover">🌿 Get Free Estimate</button>
            <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 17, padding: "15px 30px", borderColor: "#86efac", color: "#86efac" }} className="btn-hover">📞 (440) 452-4840</a>
          </div>
        </div>
      </section>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
