"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ initialError }: { initialError: string | null }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    initialError ? "error" : "idle",
  );
  const [msg, setMsg] = useState<string | null>(initialError);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setMsg(null);

    const supabase = createClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${siteUrl}/auth/callback` },
    });

    if (error) {
      setStatus("error");
      setMsg(error.message);
      return;
    }
    setStatus("sent");
    setMsg("Check your inbox. The link works once and expires in an hour.");
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
          disabled={status === "sending" || status === "sent"}
        />
        <div className="hint">No password. We'll email you a one-tap link.</div>
      </div>
      <button
        type="submit"
        className="form-submit"
        disabled={status === "sending" || status === "sent"}
      >
        {status === "sending"
          ? "Sending..."
          : status === "sent"
          ? "Sent ✓"
          : "Send magic link"}
      </button>
      {msg && (
        <div className={`form-msg ${status === "error" ? "err" : "ok"}`}>
          {msg}
        </div>
      )}
    </form>
  );
}
