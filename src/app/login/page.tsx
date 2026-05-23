import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = { title: "Editor sign-in — The HPO Initiative" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "not-authorized"
      ? "That email isn't on the editor allowlist. Ask an existing admin to add you."
      : error === "callback-failed"
      ? "The sign-in link couldn't be exchanged. Request a new one and try again."
      : null;

  return (
    <main className="login-page">
      <div className="wrap">
        <Link href="/" className="back">← Back to The HPO Initiative</Link>

        <div className="login-card">
          <div className="login-side">
            <div className="kicker">Editor sign-in · Email &amp; password</div>
            <h1>The <em>masthead.</em></h1>
            <p>
              Only allowlisted editors can publish. Sign in with your email and password.
            </p>
            <p className="fine">
              First time? Hit "Set up your account" below to pick a password — it works only for emails already on the editor allowlist. No verification email, no waiting.
            </p>
          </div>

          <div className="login-form-wrap">
            <LoginForm initialError={message} />
          </div>
        </div>
      </div>

      <style>{`
        .login-page{
          min-height: 100vh; padding: 64px 0; background: var(--bone);
          display: flex; align-items: center;
        }
        .login-page .back{
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--rule); padding-bottom: 2px;
        }
        .login-page .back:hover{ color: var(--oxblood); border-color: var(--oxblood); }

        .login-card{
          margin-top: 36px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1px solid var(--ink); background: var(--bone-soft);
          box-shadow: 12px 12px 0 var(--ink);
        }
        .login-side{
          padding: 44px; border-right: 1px solid var(--rule);
          background:
            radial-gradient(ellipse at 80% 30%, rgba(110,20,26,.08), transparent 60%),
            var(--bone-soft);
        }
        .login-side .kicker{
          font-family: var(--mono); font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
          color: var(--oxblood); margin-bottom: 18px;
        }
        .login-side h1{
          margin: 0 0 18px; font-family: var(--display); font-weight: 400;
          font-size: clamp(44px, 5.6vw, 72px); line-height: .92; letter-spacing: -.015em;
        }
        .login-side h1 em{ font-style: italic; color: var(--oxblood); }
        .login-side p{ margin: 0 0 12px; font-size: 16.5px; line-height: 1.6; color: var(--ink-soft); }
        .login-side .fine{ font-size: 13.5px; color: var(--ink-mute); }
        .login-form-wrap{ padding: 44px; display: flex; align-items: center; }
        .login-form-wrap > *{ width: 100%; }
        @media (max-width: 800px){
          .login-card{ grid-template-columns: 1fr; box-shadow: 6px 6px 0 var(--ink); }
          .login-side{ border-right: none; border-bottom: 1px solid var(--rule); padding: 28px; }
          .login-form-wrap{ padding: 28px; }
        }
      `}</style>
    </main>
  );
}
