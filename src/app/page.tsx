import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { listPublishedPosts } from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const latest = await listPublishedPosts("field_note", 3);

  return (
    <>
      <Masthead active="home" />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="reveal d1">
            <div className="kicker">
              <span className="num">§ 00</span>{" "}
              <span>This Issue · Lead</span>
            </div>
            <h2>
              Health is a <em>civic</em> craft — practiced in{" "}
              <span className="hl">plain language</span>, by people who show up.
            </h2>
            <p className="lede">
              A student-led initiative for community medicine and public-health literacy. Workshops, interviews, volunteer clinics.
            </p>
            <div className="actions">
              <Link href="/field" className="btn solid">Read the Issue <span className="arr">→</span></Link>
              <Link href="/volunteer" className="btn">Join a Clinic <span className="arr">→</span></Link>
            </div>
            <div className="vitals">
              <div className="v"><div className="num">412</div><div className="lbl">Volunteers · Active</div></div>
              <div className="v"><div className="num">38</div><div className="lbl">Workshops · YTD</div></div>
              <div className="v"><div className="num">17</div><div className="lbl">Partner Clinics</div></div>
            </div>
          </div>

          <div className="hero-stack reveal d3">
            <div className="main">
              <span className="tag">Cover · No. 02</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&auto=format&fit=crop&q=80"
                alt="Health workers preparing supplies in a community clinic"
              />
              <div className="stamp">
                <div><em>Field clinic, Dallas County</em>Photographed 12 April 2026</div>
                <div>F/2.8<br/>1/125</div>
              </div>
            </div>
            <div className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                alt="Stethoscope on a clinical chart"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="departments">
        <div className="wrap">
          <div className="section-head">
            <h3>In <em>this</em> issue</h3>
            <div className="meta">Five standing departments<br/>Updated weekly</div>
          </div>
          <div className="dep-grid">
            <DepCard href="/about" n="§ I" tag="§ I · About" title="Who we are" desc="A student-run editorial board, in service of a community." photo="1582719471384-894fbb16e074" alt="Editorial board meeting" />
            <DepCard href="/practice" n="§ II" tag="§ II · Practice" title="Workshops & rounds" desc="Free seminars in libraries, dorms, churches." photo="1612531386530-97286d97c2d2" alt="Workshop in progress" />
            <DepCard href="/field" n="§ III" tag="§ III · Field" title="Notes from the desk" desc="Essays and explainers, in plain English." photo="1532938911079-1b06ac7ceec7" alt="Stethoscope close-up" />
            <DepCard href="/compass" n="§ IV" tag="§ IV · Compass" title="Interviews" desc="Long-form transcripts with practicing clinicians." photo="1631217868264-e5b90bb7e133" alt="Portrait of a clinician" />
            <DepCard href="/volunteer" n="§ V" tag="§ V · Volunteer" title="Show up & stay" desc="Five open roles. Trained in two evenings." photo="1584820927498-cfe5211fd8bf" alt="Volunteers at a community event" />
          </div>
        </div>
      </section>

      <section className="latest">
        <div className="wrap">
          <div className="section-head">
            <h3>Latest <em>field notes</em></h3>
            <div className="meta">
              Updated weekly<br/>
              <Link href="/field" style={{ color: "var(--ink)" }}>All notes →</Link>
            </div>
          </div>
          {latest.length === 0 ? (
            <EmptyLatest />
          ) : (
            <div className="latest-grid">
              {latest.map((p, i) => (
                <PostCard
                  key={p.id}
                  post={p}
                  basePath="/field"
                  cornerLabel={i === 0 ? "Lead" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="vol-strip">
        <div className="wrap vol-strip-grid">
          <div className="reveal d1">
            <div className="tag"><span className="pulse" /> Volunteer Hub · Open Calls</div>
            <h3>Show up <em>quietly.</em><br/>Stay <em>past</em> the photograph.</h3>
          </div>
          <div className="right reveal d2">
            <p>Seventeen partner sites. Trained in two evenings. We do require that you finish what you start.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/volunteer" className="btn solid">Apply · May cohort <span className="arr">→</span></Link>
              <Link href="/volunteer" className="btn">All roles <span className="arr">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <HomeStyles />
    </>
  );
}

function DepCard({ href, n, tag, title, desc, photo, alt }: {
  href: string; n: string; tag: string; title: string; desc: string; photo: string; alt: string;
}) {
  return (
    <Link href={href} className="card reveal d1">
      <div className="photo-plate">
        <span className="corner">{n}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://images.unsplash.com/photo-${photo}?w=900&auto=format&fit=crop&q=80`} alt={alt} />
      </div>
      <div className="dep-n">{tag}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <span className="more">Open →</span>
    </Link>
  );
}

function EmptyLatest() {
  return (
    <div style={{
      padding: "60px 0",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      textAlign: "center",
      fontFamily: "var(--display)",
      fontSize: 28,
      color: "var(--ink-mute)",
      fontStyle: "italic",
    }}>
      No notes filed yet. The next issue is in copy.
    </div>
  );
}

function HomeStyles() {
  return (
    <style>{`
      .hero{ border-bottom:1px solid var(--ink); padding:48px 0 56px }
      .hero-grid{ display:grid; grid-template-columns:1.05fr 1fr; gap:48px; align-items:start }
      .hero .kicker{ font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.22em; color:var(--oxblood); display:flex; align-items:center; gap:10px; margin-bottom:18px }
      .hero .kicker .num{ border:1px solid var(--oxblood); padding:2px 7px; border-radius:2px }
      .hero h2{ font-family:var(--display); font-weight:400; font-size:clamp(40px,5.6vw,78px); line-height:.98; letter-spacing:-.015em; margin:0 0 22px }
      .hero h2 em{ font-style:italic; color:var(--oxblood) }
      .hero h2 .hl{ background:linear-gradient(transparent 62%, var(--highlight) 62%, var(--highlight) 92%, transparent 92%); padding:0 2px }
      .hero p.lede{ font-size:18px; line-height:1.55; color:var(--ink-soft); max-width:46ch; margin:0 0 26px }
      .hero .actions{ display:flex; gap:14px; flex-wrap:wrap; margin-bottom:30px }
      .vitals{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:18px 0 }
      .vitals .v{ padding:0 18px; border-right:1px solid var(--rule) }
      .vitals .v:first-child{ padding-left:0 } .vitals .v:last-child{ border-right:none; padding-right:0 }
      .vitals .v .num{ font-family:var(--display); font-style:italic; font-size:44px; line-height:1; color:var(--ink) }
      .vitals .v .lbl{ font-family:var(--mono); font-size:10px; text-transform:uppercase; letter-spacing:.18em; color:var(--ink-mute); margin-top:8px }

      .hero-stack{ position:relative }
      .hero-stack .main{ aspect-ratio:4/5; border:1px solid var(--ink); position:relative; overflow:hidden; box-shadow:10px 10px 0 var(--ink) }
      .hero-stack .main img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.78) contrast(1.06) }
      .hero-stack .main::after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, transparent 50%, rgba(21,17,12,.65) 100%), linear-gradient(180deg, rgba(110,20,26,.12), rgba(110,20,26,.12)); mix-blend-mode:multiply }
      .hero-stack .tag{ position:absolute; top:14px; left:14px; z-index:2; font-family:var(--mono); font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--bone-soft); background:rgba(21,17,12,.65); padding:6px 10px }
      .hero-stack .stamp{ position:absolute; bottom:14px; left:14px; right:14px; z-index:2; color:var(--bone-soft); font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; display:flex; justify-content:space-between; align-items:flex-end }
      .hero-stack .stamp em{ display:block; font-family:var(--display); font-style:italic; font-size:22px; letter-spacing:0; text-transform:none; color:var(--bone-soft); line-height:1; margin-bottom:4px }
      .hero-stack .thumb{ position:absolute; right:-28px; bottom:-28px; width:42%; aspect-ratio:1/1; border:1px solid var(--ink); background:var(--bone-soft); box-shadow:6px 6px 0 var(--oxblood); overflow:hidden }
      .hero-stack .thumb img{ width:100%; height:100%; object-fit:cover; filter:saturate(.75) contrast(1.05) }

      .departments{ padding:80px 0; border-bottom:1px solid var(--ink) }
      .dep-grid{ display:grid; grid-template-columns:repeat(5,1fr); gap:22px }
      .dep-grid .card .photo-plate{ aspect-ratio:4/5 }
      .dep-grid .card .dep-n{ font-family:var(--mono); font-size:10px; letter-spacing:.22em; color:var(--oxblood); margin-top:14px }
      .dep-grid .card h4{ margin:4px 0 4px }
      @media (max-width:1100px){ .dep-grid{ grid-template-columns:repeat(3,1fr) } }
      @media (max-width:700px){ .dep-grid{ grid-template-columns:repeat(2,1fr) } }

      .latest{ padding:80px 0; border-bottom:1px solid var(--ink) }
      .latest-grid{ display:grid; grid-template-columns:1.3fr 1fr 1fr; gap:32px; align-items:start }
      .latest .card .photo-plate{ aspect-ratio:5/4 }
      @media (max-width:900px){ .latest-grid{ grid-template-columns:1fr } }

      .vol-strip{ position:relative; background:var(--ink); color:var(--bone-soft); padding:80px 0; overflow:hidden; border-bottom:1px solid var(--ink) }
      .vol-strip::before{ content:""; position:absolute; inset:0; background-image:url("https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&auto=format&fit=crop&q=80"); background-size:cover; background-position:center; filter:saturate(.55) brightness(.45) contrast(1.05); opacity:.55 }
      .vol-strip::after{ content:""; position:absolute; inset:0; background: repeating-linear-gradient(-45deg, transparent 0 22px, rgba(217,164,65,.06) 22px 23px) }
      .vol-strip .wrap{ position:relative; z-index:2 }
      .vol-strip-grid{ display:grid; grid-template-columns:1.3fr .9fr; gap:48px; align-items:end }
      .vol-strip .tag{ font-family:var(--mono); font-size:10.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--sun); margin-bottom:18px; display:flex; align-items:center; gap:10px }
      .vol-strip .tag .pulse{ width:8px; height:8px; border-radius:50%; background:var(--sun); animation:pulse 1.6s ease-in-out infinite }
      @keyframes pulse{ 0%,100%{ box-shadow:0 0 0 0 rgba(217,164,65,.6) } 50%{ box-shadow:0 0 0 8px rgba(217,164,65,0) } }
      .vol-strip h3{ margin:0; font-family:var(--display); font-weight:400; font-size:clamp(46px,6.4vw,96px); line-height:.92; letter-spacing:-.02em; color:var(--bone-soft) }
      .vol-strip h3 em{ font-style:italic; color:var(--sun) }
      .vol-strip .right p{ margin:0 0 22px; font-size:17px; line-height:1.55; color:rgba(246,241,224,.78); max-width:38ch }
      .vol-strip .btn{ border-color:var(--bone-soft); color:var(--bone-soft) }
      .vol-strip .btn:hover{ background:var(--sun); color:var(--ink); border-color:var(--sun) }
      .vol-strip .btn.solid{ background:var(--sun); color:var(--ink); border-color:var(--sun) }
      .vol-strip .btn.solid:hover{ background:var(--bone-soft); border-color:var(--bone-soft) }

      @media (max-width:900px){
        .hero-grid{ grid-template-columns:1fr }
        .hero-stack .thumb{ display:none }
        .vol-strip-grid{ grid-template-columns:1fr }
      }
    `}</style>
  );
}
