import Link from "next/link";
import FiledDate from "./FiledDate";

type NavKey = "home" | "about" | "practice" | "field" | "compass" | "volunteer";

export default function Masthead({ active }: { active?: NavKey }) {
  const is = (k: NavKey) => (active === k ? "active" : "");
  return (
    <header className="masthead">
      <div className="wrap">
        <div className="strip">
          <div>
            <span>Vol. III</span> <span className="dot" />
            <span>No. 02</span> <span className="dot" />
            <span>Quarterly Bulletin</span>
          </div>
          <div>
            <FiledDate /> <span className="dot" />
            <span>Dallas, Texas</span>
          </div>
        </div>

        <div className="nameplate">
          <h1>
            <Link href="/">The HPO <em>Initiative</em></Link>
          </h1>
        </div>

        <nav className="nav" aria-label="Primary">
          <Link href="/" className={is("home")}>Front Page</Link>
          <Link href="/about" className={is("about")}>About</Link>
          <Link href="/practice" className={is("practice")}>The Practice</Link>
          <Link href="/field" className={is("field")}>Field Notes</Link>
          <Link href="/compass" className={is("compass")}>Clinical Compass</Link>
          <Link href="/volunteer" className={`cta ${is("volunteer")}`}>Volunteer →</Link>
        </nav>
      </div>
    </header>
  );
}
