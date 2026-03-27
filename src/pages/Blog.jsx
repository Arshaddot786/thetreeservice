import { useState } from "react";
import { QuoteModal } from "../components/Layout";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", fontSize: 15, textDecoration: "none", display: "inline-block" };

const POSTS = [
  {
    emoji: "⛈️",
    category: "Storm Safety",
    title: "How to Tell If a Tree Is Dangerous After an Ohio Storm",
    excerpt: "Ohio storms can leave trees looking fine on the outside while hiding serious internal damage. Here are the warning signs every homeowner needs to know before the next storm season hits.",
    date: "March 15, 2025",
    readTime: "4 min read",
    tags: ["Storm Damage", "Safety", "Tree Health"],
  },
  {
    emoji: "✂️",
    category: "Tree Care Tips",
    title: "The Best Time of Year to Trim Your Trees in Northeast Ohio",
    excerpt: "Timing matters when it comes to tree trimming. Cut at the wrong time and you could invite disease, pests, or stress your tree right before Ohio's harsh winters.",
    date: "February 28, 2025",
    readTime: "5 min read",
    tags: ["Trimming", "Seasonal", "Ohio Trees"],
  },
  {
    emoji: "🪓",
    category: "Tree Removal",
    title: "5 Signs Your Tree Needs to Be Removed (Before It Falls On Its Own)",
    excerpt: "Dead trees don't announce themselves. Learn the five warning signs Jason and his crew look for when assessing whether a tree is a risk to your property.",
    date: "February 10, 2025",
    readTime: "6 min read",
    tags: ["Tree Removal", "Safety", "Property Protection"],
  },
  {
    emoji: "⚙️",
    category: "Stump Grinding",
    title: "Why Leaving a Tree Stump in Your Yard is a Bigger Problem Than You Think",
    excerpt: "That old stump isn't just ugly — it's actively attracting termites, carpenter ants, and fungi that can spread to your healthy trees and even your home's foundation.",
    date: "January 22, 2025",
    readTime: "4 min read",
    tags: ["Stump Grinding", "Pest Control", "Yard Health"],
  },
  {
    emoji: "🌱",
    category: "Tree Health",
    title: "How to Keep Your Trees Healthy Through Ohio's Winter",
    excerpt: "Ohio winters are brutal on trees. From salt damage to ice load stress, here's what Lorain County homeowners can do right now to protect their trees before temperatures drop.",
    date: "January 8, 2025",
    readTime: "5 min read",
    tags: ["Tree Health", "Winter", "Prevention"],
  },
  {
    emoji: "💰",
    category: "Homeowner Tips",
    title: "Does Tree Removal Increase Your Home's Value? Here's the Answer.",
    excerpt: "Counterintuitively, removing the right tree at the right time can significantly increase your property value and curb appeal. Here's what real estate experts say.",
    date: "December 18, 2024",
    readTime: "5 min read",
    tags: ["Property Value", "Tree Removal", "Real Estate"],
  },
];

const CATEGORIES = ["All", "Storm Safety", "Tree Care Tips", "Tree Removal", "Stump Grinding", "Tree Health", "Homeowner Tips"];

export default function Blog() {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", background: "radial-gradient(ellipse at 30% 50%, rgba(22,101,52,0.2) 0%, transparent 60%), #050d07", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Tree Care Knowledge</div>
          <h1 className="page-hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, color: "#fff", marginBottom: 24, lineHeight: 1.1 }}>
            The Tree Service{" "}
            <span style={{ background: "linear-gradient(135deg,#4ade80,#86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.7 }}>
            Expert tree care tips, seasonal advice, and local guides from Jason and the team — written for Ohio homeowners.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: "32px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: activeCategory === cat ? "linear-gradient(135deg,#16a34a,#4ade80)" : "rgba(255,255,255,0.05)", color: activeCategory === cat ? "#052e16" : "#9ca3af", border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "8px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding: "48px 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 28 }}>
            {filtered.map((post) => (
              <div key={post.title} className="glass card-hover" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                {/* Post image placeholder */}
                <div style={{ height: 180, background: "linear-gradient(135deg,#052e16,#14532d)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 64 }}>{post.emoji}</span>
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#4ade80", fontWeight: 600 }}>{post.category}</div>
                </div>

                <div style={{ padding: "28px 24px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    <span style={{ fontSize: 13, color: "#4b5563" }}>{post.date}</span>
                    <span style={{ fontSize: 13, color: "#4b5563" }}>·</span>
                    <span style={{ fontSize: 13, color: "#4b5563" }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", marginBottom: 14, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {post.tags.map(tag => (
                      <span key={tag} style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "#86efac" }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ background: "none", border: "none", color: "#4ade80", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>Read Article →</button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", color: "#6b7280" }}>
              No posts in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section style={{ padding: "80px 24px", background: "radial-gradient(ellipse at center,rgba(22,101,52,0.15) 0%,transparent 70%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="glass" style={{ borderRadius: 24, padding: "48px", border: "1px solid rgba(74,222,128,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🌳</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", color: "#fff", marginBottom: 16 }}>Need a Tree Looked At?</h2>
            <p style={{ color: "#9ca3af", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Reading about tree care is great — but nothing beats a free assessment from Jason himself. We'll tell you exactly what your trees need and how much it'll cost.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setShowModal(true)} style={{ ...btnGreen, fontSize: 16, padding: "15px 30px" }} className="btn-hover">🌿 Get Free Estimate</button>
              <a href="tel:4404524840" style={{ color: "#4ade80", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 24px", border: "2px solid rgba(74,222,128,0.4)", borderRadius: 12 }} className="btn-hover">📞 (440) 452-4840</a>
            </div>
          </div>
        </div>
      </section>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
