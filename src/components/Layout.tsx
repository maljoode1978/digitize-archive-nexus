// src/components/Layout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const base = import.meta.env.BASE_URL; // e.g. "/digitize-archive-nexus/"

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          
          {/* Logo + Title */}
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src={`${base}assets/samples/tawasul.png`}
              alt="Tawasul Logo"
              className="h-12 w-auto mr-3 logo"
            />
            <span className="text-xl font-bold">Digitization Hub</span>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6">
            <Link
              to="/scan"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/scan") ? "bg-white/20 font-medium" : "hover:bg-white/10"
              }`}
            >
              Scan & Archive (المسح والأرشفة)
            </Link>
            <Link
              to="/data-entry"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/data-entry")
                  ? "bg-white/20 font-medium"
                  : "hover:bg-white/10"
              }`}
            >
              Manual Data Entry (إدخال البيانات يدوياً)
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow bg-secondary">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
