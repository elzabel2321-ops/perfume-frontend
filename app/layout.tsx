import "./globals.css";

import Navbar from "./component/components/Navbar";
import Footer from "./component/components/Footer";
import AuthSessionProvider from "./component/components/SessionProvider";

export const metadata = {
  title: "ARomanova Perfume Shop",
  description: "Luxury perfume online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] text-[#2A2421]">
        <AuthSessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}