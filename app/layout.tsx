import "./globals.css";
import NavBar from "./components/NavBar";

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
    <html lang="en">
      <body className="text-neutral-900">
        <NavBar />
        {children}

        <footer className="mx-auto max-w-4xl px-6 py-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} Joshua Hall
        </footer>
      </body>
    </html>
  );
}