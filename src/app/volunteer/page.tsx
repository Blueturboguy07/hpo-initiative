import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function VolunteerPage() {
  return (
    <>
      <Masthead active="volunteer" />

      <section className="recruit">
        <div className="wrap recruit-grid">
          <div className="reveal d1">
            <div className="tag"><span className="pulse" /> May 2026 cohort · Applications open</div>
            <h2>Show up <em>quietly.</em><br/>Stay <em>past</em> the photograph.</h2>
          </div>
          <div className="right reveal d2">
            <p>Seventeen partner sites. Five open roles. Trained in two evenings. We do require one thing: that you finish what you start.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn solid" href="#apply">Apply now <span className="arr">→</span></a>
              <a className="btn" href="#roles">See the roles <span className="arr">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mosaic">
        <div className="wrap">
          <div className="section-head">
            <h3>The <em>work,</em> photographed</h3>
            <div className="meta">From past cohorts<br/>2024 – 2026</div>
          </div>
          <div className="mosaic-grid">
            <div className="m big reveal d1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1400&auto=format&fit=crop&q=80" alt="Cohort training" />
              <span className="lbl">Cohort training · March 2026</span>
            </div>
            <div className="m reveal d2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80" alt="Nurse" />
              <span className="lbl">Mobile unit, North Dallas</span>
            </div>
            <div className="m reveal d3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&auto=format&fit=crop&q=80" alt="Medical kit" />
              <span className="lbl">Screening, Oak Cliff</span>
            </div>
            <div className="m reveal d2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=80" alt="Clinic" />
              <span className="lbl">Clinic shadow, Bishop Arts</span>
            </div>
            <div className="m reveal d3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=800&auto=format&fit=crop&q=80" alt="Workshop" />
              <span className="lbl">Workshop, J. Erik Jonsson library</span>
            </div>
          </div>
        </div>
      </section>

      <section className="roles" id="roles">
        <div className="wrap">
          <div className="section-head">
            <h3>Five <em>open</em> roles</h3>
            <div className="meta">May cohort<br/>~30 placements</div>
          </div>
          <div className="roles-grid">
            <Role n="01 · 8 openings" title="Blood-pressure station, Saturdays" body="Take a cuff reading, log it, hand the patient a printout they can take to their doctor." meta={["4 hrs / wk","1 evening training"]} photo="1530026405186-ed1f139313f8" />
            <Role n="02 · 4 openings" title="Vaccination drive translator" body="Spanish or Vietnamese, conversational fluency. Help families navigate paperwork and consent." meta={["6 hrs / wk","Background check"]} photo="1584820927498-cfe5211fd8bf" />
            <Role n="03 · 6 openings" title="Workshop co-leader" body="Pair with a senior leader to deliver a two-hour seminar at a library or church. Curriculum provided." meta={["3 hrs / wk","2 evenings training"]} photo="1612531386530-97286d97c2d2" />
            <Role n="04 · 4 openings" title="Newsroom · Fact-checker" body="Read articles before they go to print. Verify citations, dosages, and the spelling of every clinician's name." meta={["2 hrs / wk","Remote OK"]} photo="1551601651-2a8555f1a136" />
            <Role n="05 · 8 openings" title="Clinic shadow · Mobile unit" body="Ride along with the mobile screening unit one Saturday a month. Observe, set up, restock, learn." meta={["1 Sat / mo","HIPAA training"]} photo="1559757148-5c350d0d3c56" />
            <Role n="06 · 2 openings" title="Outreach lead, Dallas ISD" body="Coordinate one school health day per semester. Recruit ten volunteers, secure the venue, run the day." meta={["~8 hrs / mo","Returning vols only"]} photo="1576091160550-2173dba999ef" />
          </div>
        </div>
      </section>

      <section className="apply" id="apply">
        <div className="wrap apply-grid">
          <div className="left reveal d1">
            <h3>The <em>application.</em></h3>
            <p>Three short questions and a way to reach you. We answer within seven days. If you are a good fit for a different role than the one you picked, we will say so.</p>
            <ul>
              <li><span className="b">01</span><span>Anyone over 16 is welcome. No clinical background required.</span></li>
              <li><span className="b">02</span><span>Training is two weekday evenings, free, on campus.</span></li>
              <li><span className="b">03</span><span>You commit to one semester. If that goes well, we ask for the next.</span></li>
              <li><span className="b">04</span><span>We do not sell your contact info. Ever.</span></li>
            </ul>
          </div>
          <ApplicationForm />
        </div>
      </section>

      <Footer />
      <VolStyles />
    </>
  );
}

function Role({ n, title, body, meta, photo }: {
  n: string; title: string; body: string; meta: [string, string]; photo: string;
}) {
  return (
    <a className="role reveal d1" href="#apply">
      <div className="img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://images.unsplash.com/photo-${photo}?w=900&auto=format&fit=crop&q=80`} alt={title} />
      </div>
      <div className="copy">
        <div className="n">Role {n}</div>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="meta"><div>{meta[0]}</div><div>{meta[1]}</div></div>
      </div>
    </a>
  );
}

function ApplicationForm() {
  // Non-functional placeholder (the public site doesn't write to the DB).
  // In a future iteration this could POST to /api/applications.
  return (
    <form className="form-card reveal d2" action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="form-row two">
        <div><label htmlFor="fn">First name</label><input id="fn" name="fn" type="text" required /></div>
        <div><label htmlFor="ln">Last name</label><input id="ln" name="ln" type="text" required /></div>
      </div>
      <div className="form-row"><label htmlFor="em">Email</label><input id="em" name="em" type="email" required placeholder="you@domain.edu" /></div>
      <div className="form-row two">
        <div><label htmlFor="rl">Role</label>
          <select id="rl" name="rl" defaultValue="01">
            <option value="01">01 · Blood-pressure station</option>
            <option value="02">02 · Translator</option>
            <option value="03">03 · Workshop co-leader</option>
            <option value="04">04 · Newsroom fact-checker</option>
            <option value="05">05 · Mobile-unit shadow</option>
            <option value="06">06 · Outreach lead</option>
          </select>
        </div>
        <div><label htmlFor="hr">Hours / week</label>
          <select id="hr" name="hr" defaultValue="2-4">
            <option>2–4</option><option>4–6</option><option>6–8</option><option>8+</option>
          </select>
        </div>
      </div>
      <div className="form-row"><label htmlFor="ms">Why this role?</label>
        <textarea id="ms" name="ms" style={{ minHeight: 100 }} placeholder="Three or four sentences are plenty." />
      </div>
      <button type="submit" className="form-submit">Submit application</button>
    </form>
  );
}

function VolStyles() {
  return (
    <style>{`
      .recruit{ position:relative; padding:96px 0; background:var(--ink); color:var(--bone-soft); border-bottom:1px solid var(--ink); overflow:hidden }
      .recruit::before{ content:""; position:absolute; inset:0; background-image:url("https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1800&auto=format&fit=crop&q=80"); background-size:cover; background-position:center; filter:saturate(.55) brightness(.42) contrast(1.05); opacity:.6 }
      .recruit::after{ content:""; position:absolute; inset:0; background:repeating-linear-gradient(-45deg, transparent 0 22px, rgba(217,164,65,.06) 22px 23px) }
      .recruit .wrap{ position:relative; z-index:2 }
      .recruit-grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:48px; align-items:end }
      .recruit .tag{ font-family:var(--mono); font-size:10.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--sun); margin-bottom:18px; display:flex; align-items:center; gap:10px }
      .recruit .tag .pulse{ width:8px; height:8px; border-radius:50%; background:var(--sun); animation:pulse 1.6s ease-in-out infinite }
      @keyframes pulse{ 0%,100%{ box-shadow:0 0 0 0 rgba(217,164,65,.6) } 50%{ box-shadow:0 0 0 8px rgba(217,164,65,0) } }
      .recruit h2{ margin:0; font-family:var(--display); font-weight:400; font-size:clamp(52px,7.6vw,110px); line-height:.9; letter-spacing:-.02em; color:var(--bone-soft) }
      .recruit h2 em{ font-style:italic; color:var(--sun) }
      .recruit .right p{ margin:0 0 22px; font-size:17px; line-height:1.6; color:rgba(246,241,224,.78); max-width:38ch }
      .recruit .btn{ border-color:var(--bone-soft); color:var(--bone-soft) }
      .recruit .btn:hover{ background:var(--sun); color:var(--ink); border-color:var(--sun) }
      .recruit .btn.solid{ background:var(--sun); color:var(--ink); border-color:var(--sun) }
      .recruit .btn.solid:hover{ background:var(--bone-soft); border-color:var(--bone-soft) }
      @media (max-width:900px){ .recruit-grid{ grid-template-columns:1fr } }

      .mosaic{ padding:70px 0; border-bottom:1px solid var(--ink) }
      .mosaic-grid{ display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:200px 200px; gap:16px }
      .mosaic-grid .m{ position:relative; overflow:hidden; border:1px solid var(--ink) }
      .mosaic-grid .m img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.78) contrast(1.05); transition:transform .8s cubic-bezier(.2,.7,.2,1) }
      .mosaic-grid .m:hover img{ transform:scale(1.05) }
      .mosaic-grid .m::after{ content:""; position:absolute; inset:0; background:linear-gradient(180deg, transparent 55%, rgba(21,17,12,.55) 100%) }
      .mosaic-grid .m .lbl{ position:absolute; bottom:10px; left:12px; z-index:2; font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--bone-soft) }
      .mosaic-grid .m.big{ grid-row:span 2; grid-column:span 2 }
      @media (max-width:900px){ .mosaic-grid{ grid-template-columns:1fr 1fr; grid-template-rows:180px 180px 180px 180px } .mosaic-grid .m.big{ grid-row:span 1; grid-column:span 2 } }

      .roles{ padding:80px 0; border-bottom:1px solid var(--ink) }
      .roles-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:26px }
      .role{ display:grid; grid-template-columns:1fr 1.1fr; align-items:stretch; border:1px solid var(--ink); background:var(--bone-soft); overflow:hidden; transition:transform .25s ease, box-shadow .25s ease; text-decoration:none; color:inherit }
      .role:hover{ transform:translateY(-4px); box-shadow:8px 8px 0 var(--oxblood) }
      .role .img{ position:relative; min-height:240px }
      .role .img img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.78) contrast(1.05) }
      .role .copy{ padding:24px }
      .role .copy .n{ font-family:var(--mono); font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--oxblood) }
      .role .copy h3{ margin:6px 0 10px; font-family:var(--display); font-weight:400; font-style:italic; font-size:28px; line-height:1.05; letter-spacing:-.005em }
      .role .copy p{ margin:0 0 14px; font-size:15.5px; line-height:1.55; color:var(--ink-soft) }
      .role .copy .meta{ display:flex; gap:18px; padding-top:12px; border-top:1px solid var(--rule); font-family:var(--mono); font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-mute) }
      @media (max-width:800px){ .roles-grid{ grid-template-columns:1fr } .role{ grid-template-columns:1fr } }

      .apply{ padding:80px 0; border-bottom:1px solid var(--ink); background:var(--bone-deep) }
      .apply-grid{ display:grid; grid-template-columns:1fr 1fr; gap:56px }
      .apply .left h3{ margin:0 0 16px; font-family:var(--display); font-weight:400; font-size:clamp(38px,4.8vw,60px); line-height:.98; letter-spacing:-.012em }
      .apply .left h3 em{ font-style:italic; color:var(--oxblood) }
      .apply .left p{ margin:0 0 24px; font-size:16.5px; line-height:1.6; color:var(--ink-soft); max-width:44ch }
      .apply .left ul{ margin:0; padding:0; list-style:none }
      .apply .left li{ display:grid; grid-template-columns:26px 1fr; gap:12px; font-size:15.5px; padding:8px 0; color:var(--ink-soft) }
      .apply .left li .b{ font-family:var(--mono); font-size:11px; color:var(--oxblood); padding-top:3px }
      @media (max-width:900px){ .apply-grid{ grid-template-columns:1fr } }
    `}</style>
  );
}
