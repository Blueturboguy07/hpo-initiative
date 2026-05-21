"use client";

import { useEffect, useState } from "react";
import { formatFiledDate } from "@/lib/format";

export default function FiledDate() {
  // Server-render with today's date (will be slightly stale on cached pages).
  // Client effect refreshes to the visitor's current local date after hydration.
  const [text, setText] = useState(() => formatFiledDate());

  useEffect(() => {
    setText(formatFiledDate(new Date()));
  }, []);

  return <span>{text}</span>;
}
