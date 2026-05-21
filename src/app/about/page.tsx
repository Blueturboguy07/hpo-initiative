import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Masthead active="about" />

      <section className="about-hero">
        <div className="wrap about-hero-grid">
          <div className="reveal d1">
            <div className="crumb">§ I · About</div>
            <h2>A small <em>press,</em><br/>a long <em>practice.</em></h2>
            <p>Twenty-eight students, one faculty advisor, and a printer in a basement. We publish, we volunteer, we keep showing up after the semester ends.</p>
          </div>
          <div className="reveal d3">
            <div className="photo-plate">
              <span className="corner">Editorial · 2026</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&auto=format&fit=crop&q=80" alt="Editorial board meeting" />
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="wrap manifesto-grid">
          <div className="label"><span className="star">✦</span> Editorial</div>
          <blockquote>
            <span className="drop">W</span>e think public health is, at its best, a kind of <em>translation</em> — moving knowledge from journals into kitchens, from clinics into classrooms, and back again.
          </blockquote>
          <aside>
            <span className="ann">A note to the reader</span>
            Every issue is reviewed by a rotating board of medical students and a faculty advisor. Corrections welcome.
          </aside>
        </div>
      </section>

      <section className="gallery">
        <div className="wrap">
          <div className="section-head">
            <h3>In the <em>field</em></h3>
            <div className="meta">Photographed 2024–2026</div>
          </div>
          <div className="gallery-grid">
            <div className="a reveal d1">
              <div className="photo-plate"><span className="corner">№ 01</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80" alt="Patient consultation" /></div>
            </div>
            <div className="reveal d2">
              <div className="photo-plate"><span className="corner">№ 02</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&auto=format&fit=crop&q=80" alt="Nurse at work" /></div>
            </div>
            <div className="reveal d3">
              <div className="photo-plate"><span className="corner">№ 03</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&auto=format&fit=crop&q=80" alt="Hands washing" /></div>
            </div>
            <div className="reveal d4">
              <div className="photo-plate"><span className="corner">№ 04</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&auto=format&fit=crop&q=80" alt="Clinic corridor" /></div>
            </div>
            <div className="reveal d3">
              <div className="photo-plate"><span className="corner">№ 05</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&auto=format&fit=crop&q=80" alt="Stethoscope" /></div>
            </div>
            <div className="reveal d4">
              <div className="photo-plate"><span className="corner">№ 06</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&auto=format&fit=crop&q=80" alt="Medical kit" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="history">
        <div className="wrap">
          <div className="section-head">
            <h3>A short <em>history</em></h3>
            <div className="meta">Three years of issues</div>
          </div>
          <div className="timeline">
            <Ev yr="'23" lbl="Founded" copy="Three students, a hand-stapled zine, distributed at a free clinic in Bryan." />
            <Ev yr="'24" lbl="First quarter" copy="Quarterly schedule begins. First Clinical Compass interview goes to print." />
            <Ev yr="'25" lbl="Partners" copy="Seventeen partner clinics across north Texas. Volunteer training formalized." />
            <Ev yr="'26" lbl="This issue" copy="412 active volunteers. 501(c)(3) status pending. Print run of 2,000." />
          </div>
        </div>
      </section>

      <Footer />
      <AboutStyles />
    </>
  );
}

function Ev({ yr, lbl, copy }: { yr: string; lbl: string; copy: string }) {
  return (
    <div className="ev reveal d1">
      <div className="yr">{yr}</div>
      <div className="lbl">{lbl}</div>
      <p>{copy}</p>
    </div>
  );
}

function AboutStyles() {
  return (
    <style>{`
      .about-hero{ padding:64px 0 56px; border-bottom:1px solid var(--ink) }
      .about-hero-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:48px; align-items:end }
      .about-hero .crumb{ font-family:var(--mono); font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--oxblood); margin-bottom:18px }
      .about-hero h2{ margin:0 0 18px; font-family:var(--display); font-weight:400; font-size:clamp(54px,7.6vw,110px); line-height:.9; letter-spacing:-.02em }
      .about-hero h2 em{ font-style:italic; color:var(--oxblood) }
      .about-hero p{ margin:0; font-size:18px; line-height:1.55; color:var(--ink-soft); max-width:48ch }
      .about-hero .photo-plate{ aspect-ratio:4/5; box-shadow:10px 10px 0 var(--ink) }

      .manifesto{ padding:80px 0; border-bottom:1px solid var(--ink) }
      .manifesto-grid{ display:grid; grid-template-columns:180px 1fr 220px; gap:48px; align-items:start }
      .manifesto .label{ font-family:var(--mono); font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--ink-mute); padding-top:14px; border-top:1px solid var(--ink) }
      .manifesto .label .star{ color:var(--oxblood); margin-right:6px }
      .manifesto blockquote{ margin:0; font-family:var(--display); font-weight:400; font-size:clamp(28px,3.6vw,46px); line-height:1.1; letter-spacing:-.012em }
      .manifesto blockquote em{ font-style:italic; color:var(--oxblood) }
      .manifesto .drop{ float:left; font-family:var(--display); font-size:96px; line-height:.82; padding:6px 12px 0 0; color:var(--oxblood) }
      .manifesto aside{ font-size:14.5px; color:var(--ink-soft); line-height:1.55; padding:14px 0 0 16px; border-left:1px solid var(--rule) }
      .manifesto aside .ann{ font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--oxblood); display:block; margin-bottom:6px }
      @media (max-width:960px){ .manifesto-grid{ grid-template-columns:1fr } .manifesto .label{ display:none } }

      .gallery{ padding:70px 0; border-bottom:1px solid var(--ink) }
      .gallery-grid{ display:grid; grid-template-columns:1.2fr 1fr 1fr 1.2fr; gap:18px }
      .gallery-grid .photo-plate{ aspect-ratio:auto; height:300px }
      .gallery-grid .a{ grid-row:span 2; height:auto }
      .gallery-grid .a .photo-plate{ height:100%; min-height:618px }
      @media (max-width:1000px){ .gallery-grid{ grid-template-columns:1fr 1fr } .gallery-grid .a{ grid-row:span 1 } .gallery-grid .a .photo-plate{ min-height:300px } }

      .history{ padding:80px 0; border-bottom:1px solid var(--ink) }
      .timeline{ display:grid; grid-template-columns:repeat(4,1fr); gap:22px; border-top:3px double var(--ink); padding-top:30px }
      .timeline .ev{ border-left:1px solid var(--rule); padding:0 18px }
      .timeline .ev:first-child{ border-left:none; padding-left:0 }
      .timeline .ev .yr{ font-family:var(--display); font-style:italic; font-size:56px; line-height:1; color:var(--oxblood) }
      .timeline .ev .lbl{ font-family:var(--mono); font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-mute); margin:6px 0 10px }
      .timeline .ev p{ margin:0; font-size:15.5px; line-height:1.55; color:var(--ink-soft) }
      @media (max-width:900px){ .timeline{ grid-template-columns:1fr 1fr } .timeline .ev{ border-left:none; padding:0 } }
    `}</style>
  );
}
