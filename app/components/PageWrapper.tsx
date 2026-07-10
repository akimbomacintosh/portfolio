"use client";

import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/keystatic")) return <>{children}</>;
  return (
    <div className={pathname !== "/" ? "pt-[52px]" : ""}>
      {children}
    </div>
  );
}
