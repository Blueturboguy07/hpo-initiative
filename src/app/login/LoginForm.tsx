"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "register";

export default function LoginForm({ initialError }: { initialError: string | null }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    initialError ? { kind: "err", text: initialError } : null,
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg(null);

    const supabase = createClient();
    const em = email.trim().toLowerCase();

    // First-time setup: create the account (allowlist-gated server side),
    // then fall through to a normal password sign-in.
    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBusy(false);
        // If the account already exists, nudge them to plain sign-in.
        if (res.status === 409) setMode("signin");
        setMsg({ kind: "err", text: data.error ?? "Couldn't set up the account." });
        return;
      }
    }

    const { error } = await supabase.auth.signInWithPassword({ email: em, password });
    if (error) {
      setBusy(false);
      setMsg({ kind: "err", text: error.message });
      return;
    }

    // Signed in. The /admin layout re-checks the allowlist server-side.
    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="email">Editor email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@domain.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
        />
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "register" ? "new-password" : "current-password"}
          placeholder={mode === "register" ? "Pick a password (8+ chars)" : "Your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={busy}
        />
        <div className="hint">
          {mode === "register"
            ? "First time — this becomes your password."
            : "8+ characters."}
        </div>
      </div>

      <button type="submit" className="form-submit" disabled={busy}>
        {busy
          ? mode === "register"
            ? "Setting up…"
            : "Signing in…"
          : mode === "register"
          ? "Create account & sign in"
          : "Sign in"}
      </button>

      {msg && <div className={`form-msg ${msg.kind === "err" ? "err" : "ok"}`}>{msg.text}</div>}

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "register" : "signin");
          setMsg(null);
        }}
        style={{
          marginTop: 16,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        {mode === "signin"
          ? "First time? Set up your account →"
          : "← Already have a password? Sign in"}
      </button>
    </form>
  );
}
