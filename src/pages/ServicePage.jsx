import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuoteModal } from "../components/Layout";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "13px 26px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };

const SERVICES = {
  "tree-removal": {
    emoji: "🪓",
    title: "Tree Removal",
    subtitle: "Safe, Professional Tree Removal in Elyria & Lorain County",
    intro: "Whether it's a dead tree threatening your home, a storm-damaged trunk, or an overgrown tree blocking your view — The Tree Service removes it safely, efficiently, and cleanly. No job is too big or too small.",
    features: [
      "Full tree removal from root to crown",
      "Crane and boom truck for tight spaces",
      "Debris hauled away same day",
      "Stump grinding available as add-on",
      "Works around power lines safely",
      "Residential and commercial properties",
    ],
    faqs: [
      { q: "How much does tree removal cost?", a: "Cost depends on tree size, location, and complexity. We provide free, no-obligation estimates. Most residential removals range from $300 to $2,000." },
      { q: "How long does tree removal take?", a: "Most standard removals take 2–4 hours. Large or complex removals may take a full day. We'll give you a timeline during your estimate." },
      { q: "Do you clean up after removal?", a: "Absolutely. We haul away all wood, branches, and debris. Your yard will be clean when we leave — we take pride in this." },
      { q: "Can you remove trees near power lines?", a: "Yes. Our trained crew and specialized equipment handle trees near utility lines safely. We coordinate with the utility company if needed." },
    ],
    relatedServices: ["tree-trimming", "stump-grinding", "storm-cleanup"],
  },
  "tree-trimming": {
    emoji: "✂️",
    title: "Tree Trimming & Pruning",
    subtitle: "Expert Tree Trimming & Pruning in Elyria & Lorain County",
    intro: "Proper trimming keeps your trees healthy, safe, and beautiful. Our certified crew uses ISA-standard pruning techniques that promote long-term growth while eliminating hazardous dead branches and improving your property's curb appeal.",
    features: [
      "Crown reduction and shaping",
      "Dead branch removal",
      "Hazard limb trimming",
      "Vista pruning for views",
      "Seasonal maintenance programs",
      "Commercial and residential",
    ],
    faqs: [
      { q: "How often should I trim my trees?", a: "Most trees benefit from trimming every 3–5 years. Fast-growing trees or those near structures may need annual attention. We'll recommend the right schedule during your estimate." },
      { q: "What's the best time to trim trees?", a: "Late winter to early spring is ideal for most species — before new growth starts. However, dead or hazardous branches should be removed any time of year." },
      { q: "Will trimming hurt my tree?", a: "Not when done correctly. Our crew uses proper ISA-standard cuts that heal cleanly. Improper trimming by untrained crews can actually damage trees." },
      { q: "Do you offer ongoing maintenance programs?", a: "Yes! We offer seasonal maintenance plans for homeowners who want their trees kept in top shape year-round. Ask us about pricing." },
    ],
    relatedServices: ["tree-removal", "stump-grinding", "land-clearing"],
  },
  "stump-grinding": {
    emoji: "⚙️",
    title: "Stump Grinding",
    subtitle: "Professional Stump Grinding in Elyria & Lorain County",
    intro: "An old stump is more than an eyesore — it's a tripping hazard, a pest magnet, and a waste of your yard space. Our stump grinders eliminate stumps quickly and completely, leaving your yard flat, clean, and ready to use.",
    features: [
      "Ground flush below surface level",
      "All stump debris removed",
      "Any stump size — small to massive",
      "Tight spaces and narrow gates no problem",
      "Same-day service available",
      "Yard ready for grass seed or landscaping",
    ],
    faqs: [
      { q: "How deep do you grind the stump?", a: "We grind 6–12 inches below grade — deep enough to plant grass or landscaping over the top. We can go deeper if you're planning construction." },
      { q: "What happens to the wood chips?", a: "We can leave the chips as mulch (great for garden beds) or haul them away completely — your choice at no extra charge." },
      { q: "Will the stump grow back?", a: "Grinding removes the stump and surface roots, preventing regrowth. Some species may send up sprouts from deep roots — we can treat these if needed." },
      { q: "Can you grind stumps in tight spaces?", a: "Yes! We have compact grinders that fit through standard fence gates and work in narrow side yards. We handle tight-space jobs every week." },
    ],
    relatedServices: ["tree-removal", "tree-trimming", "land-clearing"],
  },
  "storm-cleanup": {
    emoji: "⛈️",
    title: "Emergency Storm Cleanup",
    subtitle: "24/7 Emergency Storm Cleanup in Elyria & Lorain County",
    intro: "Ohio storms don't wait — and neither do we. When a tree falls on your home, blocks your driveway, or creates an urgent hazard, The Tree Service responds fast. We're available 24 hours a day, 7 days a week for emergency calls.",
    features: [
      "24/7 emergency response",
      "Fallen tree removal from structures",
      "Driveway and road clearing",
      "Hazard limb removal",
      "Works with insurance companies",
      "Fast response — usually within 2 hours",
    ],
    faqs: [
      { q: "How fast can you respond to emergencies?", a: "We prioritize emergency calls and typically arrive within 1–2 hours. For severe storms with high call volume, we communicate realistic ETAs." },
      { q: "Do you work with my insurance company?", a: "Yes. We provide detailed documentation, photos, and invoices that work with all major insurance claims. We'll help make the process easy." },
      { q: "What if a tree fell on my house?", a: "Call us immediately at (440) 452-4840. We'll assess the structural risk, safely remove the tree, and coordinate with emergency services if needed." },
      { q: "Do you charge extra for emergency calls?", a: "Emergency rates may apply for after-hours calls. We're always upfront about pricing before we start work — no surprises." },
    ],
    relatedServices: ["tree-removal", "tree-trimming", "land-clearing"],
  },
  "land-clearing": {
    emoji: "🏔️",
    title: "Land Clearing",
    subtitle: "Professional Land Clearing in Elyria & Lorain County",
    intro: "Planning a construction project, expanding your yard, or clearing overgrown land? The Tree Service provides full-scale land clearing for residential lots, commercial sites, and agricultural properties throughout Northeast Ohio.",
    features: [
      "Full lot and acreage clearing",
      "Brush and vegetation removal",
      "Tree and stump removal included",
      "Grading preparation available",
      "Residential and commercial sites",
      "Fast project timelines",
    ],
    faqs: [
      { q: "How is land clearing priced?", a: "Pricing depends on acreage, vegetation density, and access. We provide free site visits and detailed quotes. Most residential lot clearings range from $1,500 to $8,000." },
      { q: "Do you handle permits?", a: "We advise on what permits may be required in your municipality. The homeowner or developer is typically responsible for permit acquisition." },
      { q: "How long does land clearing take?", a: "A typical residential lot takes 1–3 days. Larger commercial projects are quoted with detailed timelines during the estimate." },
      { q: "Can you clear land in winter?", a: "Yes! Winter is actually a great time for land clearing — frozen ground protects your soil, and leafless trees are easier to assess and remove." },
    ],
    relatedServices: ["tree-removal", "stump-grinding", "storm-cleanup"],
  },
};

const SERVICE_LABELS = {
  "tree-removal": "Tree Removal",
  "tree-trimming": "Tree Trimming",
  "stump-grinding": "Stump Grinding",
  "storm-cleanup": "Storm Cleanup",
  "land-clearing": "Land Clearing",
};

export default function ServicePage() {
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const service = SERVICES[slug];

  if (!service) {
    return (
      <div style={{ textAlign: "center", padding: "120px 24px" }}>
        <h2 style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 32 }}>Service Not Found</h2>
        <Link to="/" style={{ color: "#4ade80", marginTop: 20, display: "inline-block" }}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "radial-gradient(ellipse at 30% 50%, rgba(22,101,52,0.2) 0%, transparent 60%), #050d07", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>{service.emoji}</div>
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Our Services</div>
          <h1 className="page-hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>{service.title}</h1>
          <p style={{ color: "#9ca3af", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>{service.subtitle}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 16, padding: "15px 30px" }} className="btn-hover">🌿 Get Free Estimate</button>
            <a href="tel:4404524840" style={{ ...btnOutline, fontSize: 16, padding: "14px 28px" }} className="btn-hover">📞 (440) 452-4840</a>
          </div>
        </div>
      </section>

      {/* Intro + Features */}
      <section style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>Why Homeowners Trust Us for {service.title}</h2>
            <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>{service.intro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {service.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#4ade80", flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#d1fae5", fontSize: 15 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass" style={{ borderRadius: 24, padding: "40px 36px", border: "1px solid rgba(74,222,128,0.2)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 20 }}>Get Your Free Estimate</h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>We respond within 1 hour and arrive within 24 hours. No obligation, ever.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["📞","Call Jason directly","tel:4404524840","(440) 452-4840"],["💬","Text for fastest response","sms:4404524840","Text (440) 452-4840"]].map(([icon,label,href,cta]) => (
                <a key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 12, padding: "16px 18px", textDecoration: "none", transition: "all 0.2s" }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>{label}</div>
                    <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 16 }}>{cta}</div>
                  </div>
                </a>
              ))}
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen, width: "100%", textAlign: "center", padding: "16px", fontSize: 15, marginTop: 8 }}>Fill Out Estimate Form →</button>
            </div>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 20, justifyContent: "center" }}>
              {[["4.9★","Rating"],["879+","Reviews"],["24/7","Available"]].map(([v,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 18 }}>{v}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px", background: "radial-gradient(ellipse at center,rgba(22,101,52,0.12) 0%,transparent 70%)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Common Questions</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "#fff" }}>FAQs About {service.title}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {service.faqs.map((faq, i) => (
              <div key={i} className="glass" style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: 16, textAlign: "left" }}>{faq.q}</span>
                  <span style={{ color: "#4ade80", fontSize: 20, flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 22px", color: "#9ca3af", lineHeight: 1.7, fontSize: 15 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 28, textAlign: "center" }}>Related Services</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {service.relatedServices.map((slug) => (
              <Link key={slug} to={`/services/${slug}`} style={{ textDecoration: "none" }}>
                <div className="glass card-hover" style={{ borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{SERVICES[slug]?.emoji}</div>
                  <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 15 }}>{SERVICE_LABELS[slug]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#052e16,#0f1a12,#166534)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 20 }}>Ready to Get Started?</h2>
          <p style={{ color: "#86efac", fontSize: 18, marginBottom: 36, lineHeight: 1.7 }}>Free estimates · No obligation · We respond within 1 hour</p>
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
