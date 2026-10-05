import { Outlet } from "react-router-dom";
import { Navbar } from "../organisms/landing/Navbar";
import { Footer } from "../organisms/landing/Footer";

export function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
