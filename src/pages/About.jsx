import { useState } from "react";
import { QuoteModal } from "../components/Layout";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "13px 26px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };

const TEAM_VALUES = [
  { icon: "🛡️", title: "Safety First", desc: "Every job starts with a thorough safety assessment. We never cut corners when it comes to protecting your property and our crew." },
  { icon: "💬", title: "Honest Communication", desc: "No surprises. No hidden fees. You get a straight answer and a fair price before we touch a single branch." },
  { icon: "🏆", title: "Quality Workmanship", desc: "We treat every yard like it's our own. Our crew takes pride in clean, precise work and leaves your property spotless." },
  { icon: "⚡", title: "Reliable & On Time", desc: "We show up when we say we will. Jason personally oversees every job to ensure it meets our high standards." },
];

export default function About() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "radial-gradient(ellipse at 30% 50%, rgba(22,101,52,0.2) 0%, transparent 60%), #050d07", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Our Story</div>
          <h1 className="page-hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 24, lineHeight: 1.1 }}>
            Meet the Team Behind<br />
            <span style={{ background: "linear-gradient(135deg,#4ade80,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ohio's Most Trusted Tree Service</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.7 }}>
            Founded by Jason and built on honest work, fair pricing, and a genuine love for the craft — The Tree Service has become Lorain County's go-to tree care company.
          </p>
        </div>
      </section>

      {/* Jason's Story */}
      <section style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Owner & Founder</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "#fff", marginBottom: 24, lineHeight: 1.2 }}>Jason Built This Business on Trust</h2>
            <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Jason started The Tree Service with one truck, a love for the outdoors, and a simple philosophy: <strong style={{ color: "#e5e7eb" }}>do the job right, charge a fair price, and always leave the yard cleaner than you found it.</strong>
            </p>
            <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Word spread fast. Neighbors told neighbors. Today, The Tree Service has completed thousands of jobs across Lorain County — and Jason still personally shows up to every estimate.
            </p>
            <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
              With <strong style={{ color: "#4ade80" }}>879 five-star Google reviews</strong> and a 4.9 rating, the community has spoken. The Tree Service isn't just a company — it's a neighbor you can count on.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen }} className="btn-hover">Get Free Estimate</button>
              <a href="tel:4404524840" style={{ ...btnOutline }} className="btn-hover">📞 Call Jason</a>
            </div>
          </div>

          {/* Stats card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { value: "4.9★", label: "Google Rating", color: "#fbbf24" },
              { value: "879+", label: "5-Star Reviews", color: "#4ade80" },
              { value: "24/7", label: "Emergency Service", color: "#4ade80" },
              { value: "1,962+", label: "Project Photos", color: "#86efac" },
              { value: "100%", label: "Satisfaction Rate", color: "#4ade80" },
              { value: "Free", label: "Estimates Always", color: "#4ade80" },
            ].map(({ value, label, color }) => (
              <div key={label} className="glass card-hover" style={{ borderRadius: 16, padding: "28px 20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>{value}</div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px", background: "radial-gradient(ellipse at center,rgba(22,101,52,0.12) 0%,transparent 70%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>What We Stand For</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "#fff" }}>Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {TEAM_VALUES.map((v) => (
              <div key={v.title} className="glass card-hover" style={{ borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: 15 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Professional Grade</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "#fff", marginBottom: 16 }}>State-of-the-Art Equipment</h2>
            <p style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>We invest in the best tools so we can tackle jobs that other companies can't — safely and efficiently.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: "🏗️", name: "Boom Crane", desc: "For large tree removals in tight spaces near structures" },
              { icon: "🪚", name: "Industrial Chipper", desc: "High-capacity chipper for fast, clean debris removal" },
              { icon: "⚙️", name: "Stump Grinder", desc: "Grinds stumps flush below ground level, same day" },
              { icon: "🚛", name: "Fleet of Trucks", desc: "Fully equipped trucks ready for any job, any size" },
              { icon: "🎮", name: "Remote Equipment", desc: "Remote-controlled machinery for precision in difficult areas" },
              { icon: "🦺", name: "Full Safety Gear", desc: "ANSI-standard PPE for every crew member on every job" },
            ].map((e) => (
              <div key={e.name} className="glass card-hover" style={{ borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{e.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{e.name}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#052e16,#0f1a12,#166534)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 20 }}>Ready to Work with Jason's Team?</h2>
          <p style={{ color: "#86efac", fontSize: 18, marginBottom: 36, lineHeight: 1.7 }}>Get a free, no-pressure estimate from Ohio's most trusted tree service. We'll be there within 24 hours.</p>
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
