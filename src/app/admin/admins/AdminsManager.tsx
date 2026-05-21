"use client";

import { useState } from "react";

type AdminRow = {
  id: string;
  email: string;
  added_by: string | null;
  created_at: string;
};

export default function AdminsManager({
  initialAdmins,
  currentEmail,
}: {
  initialAdmins: AdminRow[];
  currentEmail: string;
}) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const value = email.trim().toLowerCase();
    if (!value) return;
    setBusy(true);
    setMsg(null);

    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (!res.ok) {
      setMsg({ kind: "err", text: data.error ?? res.statusText });
      return;
    }
    setAdmins([...admins, data]);
    setEmail("");
    setMsg({ kind: "ok", text: `Added ${value}.` });
  }

  async function onRemove(row: AdminRow) {
    if (row.email.toLowerCase() === currentEmail.toLowerCase()) {
      alert("You can't remove yourself. Ask another admin to do it.");
      return;
    }
    if (!confirm(`Remove ${row.email} from the editor allowlist?`)) return;
    const res = await fetch(`/api/admin/admins/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(`Remove failed: ${j.error ?? res.statusText}`);
      return;
    }
    setAdmins(admins.filter((a) => a.id !== row.id));
  }

  return (
    <>
      <form
        onSubmit={onAdd}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 12,
          alignItems: "end",
          padding: 20,
          background: "var(--bone-soft)",
          border: "1px solid var(--ink)",
          marginBottom: 28,
        }}
      >
        <div className="form-row" style={{ margin: 0 }}>
          <label htmlFor="add-email">Add editor email</label>
          <input
            id="add-email"
            type="email"
            required
            placeholder="new-editor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
          />
        </div>
        <button type="submit" className="btn solid" disabled={busy}>
          {busy ? "Adding…" : "Add"} <span className="arr">→</span>
        </button>
      </form>

      {msg && <div className={`form-msg ${msg.kind}`} style={{ marginBottom: 24 }}>{msg.text}</div>}

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Email</th>
            <th>Added by</th>
            <th>Added</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => {
            const self = a.email.toLowerCase() === currentEmail.toLowerCase();
            return (
              <tr key={a.id}>
                <td style={{ fontFamily: "var(--mono)", fontSize: 13 }}>
                  {a.email} {self && <span style={{ color: "var(--oxblood)", marginLeft: 8 }}>(you)</span>}
                </td>
                <td style={{ color: "var(--ink-mute)" }}>{a.added_by ?? "—"}</td>
                <td style={{ color: "var(--ink-mute)" }}>{a.created_at}</td>
                <td>
                  <div className="row-actions" style={{ justifyContent: "flex-end" }}>
                    {self ? (
                      <span style={{ color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase" }}>
                        protected
                      </span>
                    ) : (
                      <button type="button" className="danger" onClick={() => onRemove(a)}>
                        Remove
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
