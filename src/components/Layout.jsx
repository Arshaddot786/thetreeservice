import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const btnGreen = { background: "linear-gradient(135deg,#16a34a,#4ade80)", color: "#052e16", fontWeight: 800, border: "none", borderRadius: 12, padding: "11px 22px", cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" };
const btnOutline = { background: "transparent", color: "#4ade80", fontWeight: 700, border: "2px solid #4ade80", borderRadius: 12, padding: "10px 20px", cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block" };
const SERVICE_AREAS = ["Elyria","Lorain","Avon","Avon Lake","North Ridgeville","Amherst","Oberlin","Sheffield Lake","Bay Village","Westlake","Strongsville","Brunswick"];
const SERVICES_NAV = [["Tree Removal","/services/tree-removal"],["Tree Trimming","/services/tree-trimming"],["Stump Grinding","/services/stump-grinding"],["Storm Cleanup","/services/storm-cleanup"],["Land Clearing","/services/land-clearing"]];

export function QuoteModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const inp = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "13px 16px", color: "#fff", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box" };
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"linear-gradient(145deg,#0f1a12,#122418)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:20, padding:"36px 32px", width:"100%", maxWidth:520, boxShadow:"0 30px 80px rgba(0,0,0,0.6)", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:20, background:"none", border:"none", color:"#9ca3af", fontSize:24, cursor:"pointer" }}>x</button>
        {sent ? (
          <div style={{ textAlign:"center", padding:"32px 0" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>OK</div>
            <h3 style={{ color:"#4ade80", fontSize:26, fontFamily:"'Playfair Display', serif", marginBottom:12 }}>Request Sent!</h3>
            <p style={{ color:"#9ca3af" }}>Jason and the team will call you within 1 hour.</p>
            <button onClick={onClose} style={{ ...btnGreen, marginTop:20 }}>Close</button>
          </div>
        ) : (
          <>
            <h3 style={{ color:"#fff", fontFamily:"'Playfair Display', serif", fontSize:26, marginBottom:6 }}>Get Your Free Estimate</h3>
            <p style={{ color:"#6b7280", fontSize:14, marginBottom:24 }}>We will call you within 1 hour. No obligation.</p>
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[["name","Your Full Name","text"],["phone","Phone Number","tel"],["address","Property Address","text"]].map(([name,ph,type]) => (
                <input key={name} name={name} type={type} placeholder={ph} value={form[name]} onChange={handle} required style={inp} />
              ))}
              <select name="service" value={form.service} onChange={handle} required style={inp}>
                <option value="">Select a Service</option>
                {["Tree Removal","Tree Trimming and Pruning","Stump Grinding","Emergency Storm Cleanup","Land Clearing"].map(s=><option key={s}>{s}</option>)}
              </select>
              <textarea name="message" placeholder="Any additional details? (optional)" value={form.message} onChange={handle} rows={3} style={{ ...inp, resize:"vertical" }} />
              <button type="submit" style={{ ...btnGreen, marginTop:4, fontSize:16, padding:"14px", width:"100%" }}>Send My Free Estimate Request</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ServicesDropdown({ pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position:"relative" }} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <span className={`nav-link${pathname.startsWith("/services")?" active":""}`} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:4 }} onClick={()=>setOpen(!open)}>
        Services <span style={{ fontSize:10, transition:"transform 0.2s", display:"inline-block", transform:open?"rotate(180deg)":"none" }}>v</span>
      </span>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", background:"rgba(5,13,7,0.99)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:16, padding:10, minWidth:220, backdropFilter:"blur(20px)", boxShadow:"0 20px 60px rgba(0,0,0,0.8)", zIndex:9999 }}>
          {SERVICES_NAV.map(([label,path]) => (
            <Link key={path} to={path} onClick={()=>setOpen(false)} style={{ display:"block", padding:"11px 14px", color:"#9ca3af", textDecoration:"none", fontSize:14, fontWeight:500, borderRadius:10, transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.color="#4ade80";e.currentTarget.style.background="rgba(74,222,128,0.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="#9ca3af";e.currentTarget.style.background="transparent";}}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  useEffect(() => { const f=()=>setScrolled(window.scrollY>60); window.addEventListener("scroll",f); return ()=>window.removeEventListener("scroll",f); }, []);
  useEffect(() => { setMenuOpen(false); window.scrollTo(0,0); }, [location]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html,body{background:#050d07;color:#fff;font-family:'DM Sans',sans-serif;overflow-x:hidden;max-width:100%;}
        ::selection{background:#4ade80;color:#052e16;}
        ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:#0a1a0d;} ::-webkit-scrollbar-thumb{background:#16a34a;border-radius:3px;}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);}
        .btn-hover{transition:all 0.25s ease;} .btn-hover:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(74,222,128,0.35);}
        .nav-link{color:#9ca3af;text-decoration:none;font-size:15px;font-weight:500;transition:color 0.2s;}
        .nav-link:hover,.nav-link.active{color:#4ade80;}
        .card-hover{transition:all 0.3s ease;} .card-hover:hover{transform:translateY(-6px);border-color:rgba(74,222,128,0.4)!important;}
        .floating-cta{animation:floatAnim 3s ease-in-out infinite;}
        .footer-link{color:#86efac!important;text-decoration:none!important;font-size:14px;display:block;margin-bottom:10px;transition:color 0.2s;cursor:pointer;}
        .footer-link:hover{color:#4ade80!important;}
        input::placeholder,textarea::placeholder{color:#6b7280;} option{background:#0f1a12;}
        @keyframes floatAnim{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(74,222,128,0.3);}50%{box-shadow:0 0 40px rgba(74,222,128,0.6);}}
        @keyframes pulse{0%,100%{opacity:0.5;transform:scale(1);}50%{opacity:1;transform:scale(1.3);}}
        .desktop-only{display:flex!important;} .mobile-only{display:none!important;}
        @media(max-width:768px){
          .desktop-only{display:none!important;}
          .mobile-only{display:flex!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;gap:28px!important;}
          .two-col{grid-template-columns:1fr!important;}
          .three-col{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr!important;}
          .three-col{grid-template-columns:1fr!important;}
        }
      `}</style>

      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:900, background:scrolled?"rgba(5,13,7,0.95)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(74,222,128,0.12)":"none", transition:"all 0.4s ease" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:70, padding:"0 24px" }}>
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
            <span style={{ fontSize:28 }}>🌳</span>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:18, lineHeight:1.1, color:"#fff" }}>The Tree Service</div>
              <div style={{ fontSize:11, color:"#4ade80", fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>Elyria, Ohio</div>
            </div>
          </Link>

          <nav className="desktop-only" style={{ gap:28, alignItems:"center" }}>
            <Link to="/" className={`nav-link${location.pathname==="/"?" active":""}`}>Home</Link>
            <ServicesDropdown pathname={location.pathname} />
            <Link to="/about" className={`nav-link${location.pathname==="/about"?" active":""}`}>About</Link>
            <Link to="/service-areas" className={`nav-link${location.pathname==="/service-areas"?" active":""}`}>Service Areas</Link>
            <Link to="/blog" className={`nav-link${location.pathname==="/blog"?" active":""}`}>Blog</Link>
          </nav>

          <div className="desktop-only" style={{ gap:10, alignItems:"center", flexShrink:0 }}>
            <a href="tel:4404524840" style={{ ...btnOutline, padding:"9px 16px", fontSize:14 }} className="btn-hover">📞 (440) 452-4840</a>
            <button onClick={()=>setShowModal(true)} style={{ ...btnGreen, padding:"10px 18px", fontSize:14 }} className="btn-hover">Free Estimate</button>
          </div>

          <button onClick={()=>setMenuOpen(!menuOpen)} className="mobile-only" style={{ background:"none", border:"1px solid rgba(74,222,128,0.4)", borderRadius:8, padding:"8px 10px", cursor:"pointer", flexDirection:"column", gap:5, flexShrink:0 }}>
            <span style={{ display:"block", width:22, height:2, background:"#4ade80", borderRadius:2, transition:"all 0.3s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }} />
            <span style={{ display:"block", width:22, height:2, background:"#4ade80", borderRadius:2, opacity:menuOpen?0:1, transition:"all 0.3s" }} />
            <span style={{ display:"block", width:22, height:2, background:"#4ade80", borderRadius:2, transition:"all 0.3s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background:"rgba(5,13,7,0.99)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(74,222,128,0.15)", padding:"16px 24px 24px", display:"flex", flexDirection:"column" }}>
            <Link to="/" onClick={()=>setMenuOpen(false)} style={{ color:"#e5e7eb", textDecoration:"none", fontSize:17, fontWeight:600, padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"block" }}>Home</Link>
            <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:12 }}>
              <div style={{ color:"#4ade80", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"13px 0 10px" }}>Services</div>
              {SERVICES_NAV.map(([label,path]) => (
                <Link key={path} to={path} onClick={()=>setMenuOpen(false)} style={{ color:"#d1fae5", textDecoration:"none", fontSize:15, fontWeight:500, padding:"10px 0 10px 14px", display:"block", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{label}</Link>
              ))}
            </div>
            <Link to="/about" onClick={()=>setMenuOpen(false)} style={{ color:"#e5e7eb", textDecoration:"none", fontSize:17, fontWeight:600, padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"block" }}>About</Link>
            <Link to="/service-areas" onClick={()=>setMenuOpen(false)} style={{ color:"#e5e7eb", textDecoration:"none", fontSize:17, fontWeight:600, padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"block" }}>Service Areas</Link>
            <Link to="/blog" onClick={()=>setMenuOpen(false)} style={{ color:"#e5e7eb", textDecoration:"none", fontSize:17, fontWeight:600, padding:"13px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"block" }}>Blog</Link>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:20 }}>
              <a href="tel:4404524840" style={{ ...btnOutline, textAlign:"center", padding:"13px", display:"block" }}>📞 (440) 452-4840</a>
              <button onClick={()=>{setShowModal(true);setMenuOpen(false);}} style={{ ...btnGreen, marginTop:0, width:"100%", padding:"14px", fontSize:15 }}>Get Free Estimate</button>
            </div>
          </div>
        )}
      </header>

      <main style={{ paddingTop:70 }}>{children}</main>

      <footer style={{ background:"#030a05", borderTop:"1px solid rgba(74,222,128,0.12)", padding:"72px 24px 36px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:60 }} className="footer-grid">
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <span style={{ fontSize:32 }}>🌳</span>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:22, color:"#fff" }}>The Tree Service</div>
                  <div style={{ fontSize:12, color:"#4ade80", letterSpacing:1.5, textTransform:"uppercase" }}>Elyria, Ohio</div>
                </div>
              </div>
              <p style={{ color:"#6b7280", lineHeight:1.7, fontSize:14, marginBottom:20 }}>Ohio's most trusted tree care experts. Licensed, insured, and dedicated to your property's safety.</p>
              {[["📍","6020 Lake Ave, Elyria, OH 44035"],["📞","(440) 452-4840"],["✉️","info@thetreeserviceoh.com"],["🕐","Open 24/7 · Emergency Available"]].map(([icon,text]) => (
                <div key={text} style={{ display:"flex", gap:10, color:"#6b7280", fontSize:14, marginBottom:10 }}><span>{icon}</span><span>{text}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{ color:"#fff", fontWeight:700, marginBottom:20, fontSize:15 }}>Services</h4>
              {SERVICES_NAV.map(([label,path]) => (
                <Link key={path} to={path} className="footer-link">{label}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ color:"#fff", fontWeight:700, marginBottom:20, fontSize:15 }}>Service Areas</h4>
              {SERVICE_AREAS.slice(0,8).map(area => (
                <Link key={area} to="/service-areas" className="footer-link">{area}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ color:"#fff", fontWeight:700, marginBottom:20, fontSize:15 }}>Quick Links</h4>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/service-areas" className="footer-link">Service Areas</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <a href="tel:4404524840" className="footer-link">Contact Us</a>
              <div style={{ marginTop:24 }}>
                <button onClick={()=>setShowModal(true)} style={{ ...btnGreen, width:"100%", textAlign:"center", marginBottom:10 }}>Free Estimate</button>
                <a href="tel:4404524840" style={{ ...btnOutline, display:"block", textAlign:"center", borderColor:"rgba(74,222,128,0.4)", fontSize:13 }}>Call (440) 452-4840</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:28, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div style={{ fontSize:13, color:"#374151" }}>© 2025 The Tree Service — Elyria, OH. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <a href="tel:4404524840" className="floating-cta" style={{ position:"fixed", bottom:24, right:16, zIndex:800, background:"linear-gradient(135deg,#16a34a,#4ade80)", color:"#052e16", fontWeight:800, fontSize:14, textDecoration:"none", borderRadius:50, display:"flex", alignItems:"center", gap:8, padding:"14px 22px", boxShadow:"0 8px 32px rgba(74,222,128,0.4)" }}>
        📞 Call Now
      </a>

      {showModal && <QuoteModal onClose={()=>setShowModal(false)} />}
    </>
  );
}
