import Link from "next/link";

export default function Footer() {
  return (
    <footer className="colophon">
      <div className="wrap">
        <div className="colophon-grid">
          <div>
            <div className="brand">The HPO Initiative</div>
            <p style={{
              fontFamily: "var(--body)",
              textTransform: "none",
              letterSpacing: 0,
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              maxWidth: "38ch",
            }}>
              A student-led publication and volunteer initiative for public-health literacy.
            </p>
          </div>
          <div>
            <h6>Departments</h6>
            <p><Link href="/about">About</Link></p>
            <p><Link href="/practice">The Practice</Link></p>
            <p><Link href="/field">Field Notes</Link></p>
            <p><Link href="/compass">Clinical Compass</Link></p>
            <p><Link href="/volunteer">Volunteer Hub</Link></p>
          </div>
          <div>
            <h6>Correspond</h6>
            <p><a href="mailto:letters@hpo.org">letters@hpo.org</a></p>
            <p><a href="mailto:press@hpo.org">press@hpo.org</a></p>
            <p><a href="mailto:volunteer@hpo.org">volunteer@hpo.org</a></p>
          </div>
          <div>
            <h6>Editor sign-in</h6>
            <p style={{
              fontFamily: "var(--body)",
              textTransform: "none",
              letterSpacing: 0,
              fontSize: 14,
              color: "var(--ink-soft)",
            }}>
              Allowlisted editors only.
            </p>
            <p><Link href="/login">Sign in →</Link></p>
          </div>
        </div>
        <div className="legal">
          <div>© MMXXVI · The HPO Initiative</div>
          <div>Set in Instrument Serif, Public Sans, &amp; JetBrains Mono</div>
        </div>
      </div>
    </footer>
  );
}
