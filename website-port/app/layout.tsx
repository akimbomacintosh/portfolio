import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import Notifications, { Banner } from "./components/Notifications";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const reader = createReader(process.cwd(), config);

export async function generateMetadata() {
  const site = await reader.singletons.site.read();
  return {
    title: site?.metaTitle || "Joshua Hall",
    description: site?.metaDescription || "Portfolio",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [site, notif] = await Promise.all([
    reader.singletons.site.read(),
    reader.singletons.notifications.read(),
  ]);

  const brandName = site?.brandName || "Joshua Hall";
  const navLinks = (site?.navLinks ?? []).filter((l) => l.label && l.href) as {
    label: string;
    href: string;
  }[];
  const socials = (site?.socials ?? []).filter((s) => s.label && s.url) as {
    label: string;
    url: string;
  }[];
  const contactLabel = site?.contactLabel || "Contact";
  const footerText = (site?.footerText || "© {year} Joshua Hall").replace(
    "{year}",
    String(new Date().getFullYear())
  );
  // Only active banners are sent to the client, so disabled/draft announcement
  // text never appears in the page source.
  const banners = ((notif?.banners ?? []) as Banner[]).filter(
    (b) => b.active && b.message
  );

  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="text-neutral-100">
        <NavBar brandName={brandName} links={navLinks} contactLabel={contactLabel} />
        <PageWrapper>
          <Notifications banners={banners} />
          {children}
        </PageWrapper>

        <Footer brandName={brandName} links={navLinks} socials={socials} footerText={footerText} />
        <SpeedInsights />
      </body>
    </html>
  );
}
