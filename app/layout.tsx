import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import PageWrapper from "./components/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Joshua Hall",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="text-neutral-100">
        <NavBar />
        <PageWrapper>{children}</PageWrapper>

        <footer className="mx-auto max-w-4xl px-6 py-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} Joshua Hall
        </footer>
      </body>
    </html>
  );
}