"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (busy) return;
    if (!confirm(`Delete "${title || "untitled"}"? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(`Delete failed: ${j.error ?? res.statusText}`);
      return;
    }
    router.refresh();
  }

  return (
    <button type="button" className="danger" onClick={onDelete} disabled={busy}>
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
