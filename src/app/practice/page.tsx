import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function PracticePage() {
  return (
    <>
      <Masthead active="practice" />

      <section className="page-head">
        <div className="wrap">
          <div className="crumb reveal d1">§ II · The Practice</div>
          <h2 className="reveal d1">Four <em>programs.</em></h2>
          <p className="reveal d2">Free workshops, supervised rounds, and a working schedule the community can actually plan around.</p>
        </div>
      </section>

      <section className="programs">
        <div className="wrap">
          <Program n="I" flip={false} lbl="Seminars" title={<>Two-hour <em>workshops</em></>} body="Nutrition, pharmacology basics, screening literacy, reading a lab result. Held in libraries, dorm lounges, and partner churches. Free, always." photo="1612531386530-97286d97c2d2" alt="Workshop in session" meta={[["14","Seminars per quarter"],["2 hrs","Per session"],["$0","Cost to attend"]]} />
          <Program n="II" flip lbl="Volunteer Clinics" title={<>Supervised <em>rounds</em></>} body="Trainees rotate through partner sites — free clinics, school health days, mobile units, senior centers — paired with a licensed clinician." photo="1559757148-5c350d0d3c56" alt="Clinic interior" meta={[["17","Partner sites"],["412","Active volunteers"],["2 evenings","Training"]]} />
          <Program n="III" flip={false} lbl="Health Fairs" title={<>Pop-up <em>screenings</em></>} body="Blood pressure, glucose, BMI, basic vision. We arrive at 8am, set up tables, run for six hours, and clean up. Eight per year." photo="1584820927498-cfe5211fd8bf" alt="Community health fair" meta={[["8","Fairs per year"],["~340","Screenings each"],["6 hrs","On site"]]} />
          <Program n="IV" flip lbl="Research" title={<>Plain-English <em>summaries</em></>} body="We translate one new study per month into an 800-word summary anyone can read. Reviewed by our advisor, footnoted, printed in the bulletin." photo="1530497610245-94d3c16cda28" alt="Lab discussion" meta={[["12","Summaries per year"],["800 words","Each"],["1 advisor","Reviews all"]]} />
        </div>
      </section>

      <section className="schedule">
        <div className="wrap">
          <div className="section-head">
            <h3>Upcoming <em>schedule</em></h3>
            <div className="meta">June – August 2026<br/>Six sessions</div>
          </div>
          <div className="sched-list">
            <Row date={["06.04","Tue · 7pm"]} title="Reading a lipid panel without panicking" where="Dallas Public Library, Central Hall" who="Led by D. Park, M4" />
            <Row date={["06.18","Tue · 7pm"]} title="What a 24-hour urine collection actually measures" where="Oak Cliff Community Center" who="Led by J. Okafor, M3" />
            <Row date={["07.09","Tue · 7pm"]} title="Vaccines for adults: a working schedule" where="First Methodist, Fellowship Hall" who="Led by Dr. M. Halpern" />
            <Row date={["07.20","Sat · 8am"]} title="Health fair · West Dallas community center" where="WDCC, all day" who="Volunteers needed (24)" cta={["volunteer","Sign up →"]} />
            <Row date={["08.06","Tue · 7pm"]} title="How to talk to a parent about screening" where="Online · Zoom" who="Led by A. Mensah, M2" />
            <Row date={["08.24","Sat · 9am"]} title="Volunteer training · Cohort 09" where="UT Southwestern medical library" who="For new volunteers" cta={["volunteer","Apply →"]} />
          </div>
        </div>
      </section>

      <Footer />
      <PracticeStyles />
    </>
  );
}

function Program({ n, flip, lbl, title, body, photo, alt, meta }: {
  n: string; flip: boolean; lbl: string; title: React.ReactNode; body: string; photo: string; alt: string;
  meta: [string, string][];
}) {
  return (
    <div className={`program ${flip ? "flip" : ""} reveal d1`}>
      <div className="copy">
        <div className="roman">{n}.</div>
        <div className="lbl">Program · {lbl}</div>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="meta">
          {meta.map(([n2, l], i) => (
            <div key={i}><strong>{n2}</strong>{l}</div>
          ))}
        </div>
      </div>
      <div className="img">
        <div className="photo-plate">
          <span className="corner">№ {n}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://images.unsplash.com/photo-${photo}?w=1200&auto=format&fit=crop&q=80`} alt={alt} />
        </div>
      </div>
    </div>
  );
}

function Row({ date, title, where, who, cta }: {
  date: [string, string]; title: string; where: string; who: string; cta?: [string, string];
}) {
  return (
    <div className="row reveal d1">
      <div className="dt"><span className="big">{date[0]}</span><small>{date[1]}</small></div>
      <div className="tt">{title}</div>
      <div className="wh">{where}</div>
      <div className="who">{who}</div>
      <div className="rsvp">
        {cta ? <Link href={`/${cta[0]}`}>{cta[1]}</Link> : <a href="#">RSVP →</a>}
      </div>
    </div>
  );
}

function PracticeStyles() {
  return (
    <style>{`
      .programs{ padding:70px 0; border-bottom:1px solid var(--ink) }
      .program{ display:grid; grid-template-columns:1.1fr 1fr; gap:56px; align-items:center; padding:56px 0; border-bottom:1px solid var(--rule) }
      .program:last-child{ border-bottom:none }
      .program.flip{ grid-template-columns:1fr 1.1fr }
      .program.flip .copy{ order:2 } .program.flip .img{ order:1 }
      .program .roman{ font-family:var(--display); font-style:italic; font-size:72px; color:var(--oxblood); line-height:.9; margin-bottom:6px }
      .program .lbl{ font-family:var(--mono); font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--ink-mute); margin-bottom:14px }
      .program h3{ margin:0 0 16px; font-family:var(--display); font-weight:400; font-size:clamp(34px,4.2vw,56px); line-height:.98; letter-spacing:-.012em }
      .program p{ margin:0 0 18px; font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:46ch }
      .program .meta{ display:flex; gap:24px; flex-wrap:wrap; border-top:1px solid var(--rule); padding-top:14px; margin-top:6px; font-family:var(--mono); font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-mute) }
      .program .meta strong{ display:block; font-family:var(--display); font-style:italic; font-weight:400; font-size:22px; text-transform:none; letter-spacing:0; color:var(--ink); margin-bottom:2px }
      .program .img .photo-plate{ aspect-ratio:4/5; box-shadow:10px 10px 0 var(--ink) }
      @media (max-width:900px){
        .program, .program.flip{ grid-template-columns:1fr; gap:28px }
        .program.flip .copy{ order:0 } .program.flip .img{ order:0 }
      }

      .schedule{ padding:70px 0; border-bottom:1px solid var(--ink) }
      .sched-list{ display:grid; grid-template-columns:1fr; gap:0; border-top:3px double var(--ink) }
      .sched-list .row{ display:grid; grid-template-columns:100px 1.4fr 1fr 1fr 100px; gap:18px; align-items:center; padding:20px 0; border-bottom:1px solid var(--rule); transition:background .2s }
      .sched-list .row:hover{ background:rgba(110,20,26,.04) }
      .sched-list .row .dt .big{ font-family:var(--display); font-style:italic; font-size:36px; line-height:1; color:var(--oxblood) }
      .sched-list .row .dt small{ display:block; font-family:var(--mono); font-style:normal; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-mute); margin-top:4px }
      .sched-list .row .tt{ font-family:var(--display); font-weight:400; font-size:22px; line-height:1.1; letter-spacing:-.005em }
      .sched-list .row .wh, .sched-list .row .who{ font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-soft) }
      .sched-list .row .rsvp{ text-align:right; font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase }
      .sched-list .row .rsvp a{ color:var(--ink); text-decoration:none; border-bottom:1px solid var(--ink); padding-bottom:2px }
      .sched-list .row .rsvp a:hover{ color:var(--oxblood); border-color:var(--oxblood) }
      @media (max-width:900px){
        .sched-list .row{ grid-template-columns:80px 1fr }
        .sched-list .row .wh, .sched-list .row .who, .sched-list .row .rsvp{ grid-column:2 / -1; text-align:left }
      }
    `}</style>
  );
}
