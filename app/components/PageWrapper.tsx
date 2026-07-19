"use client";

import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/keystatic")) return <>{children}</>;
  return <div style={{ paddingTop: pathname !== "/" ? "56px" : 0 }}>{children}</div>;
}
