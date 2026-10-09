import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";


const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
  icons: {
    icon: "/logo-icon.png",
  },
};




export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        <Navbar></Navbar>
        <main className="flex-1">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}