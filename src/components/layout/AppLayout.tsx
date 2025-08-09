import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const navItems = [
  { to: "/", key: "dashboard" as const },
  { to: "/whatsapp", key: "whatsapp" as const },
  { to: "/banners", key: "banners" as const },
  { to: "/referral", key: "referral" as const },
  { to: "/loyalty", key: "loyalty" as const },
  { to: "/seo", key: "seo" as const },
  { to: "/social", key: "social" as const },
  { to: "/customers", key: "customers" as const },
  { to: "/suggestions", key: "suggestions" as const },
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, lang, setLang } = useI18n();
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className="hidden md:flex flex-col gap-4 border-r bg-sidebar text-sidebar-foreground p-4">
        <header className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-gradient-to-tr from-primary to-accent shadow-[var(--shadow-elegant)]" />
          <h1 className="text-lg font-semibold">{t("appName")}</h1>
        </header>
        <nav className="mt-4 flex-1">
          <ul className="space-y-1">
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/70"
                    }`
                  }
                >
                  {t(n.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <footer className="pt-2">
          <div className="rounded-md border p-3 text-xs text-muted-foreground">
            <p>Made for Indian retailers — automate your marketing.</p>
          </div>
        </footer>
      </aside>

      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="md:hidden flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-tr from-primary to-accent" />
            <span className="font-semibold">{t("appName")}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Languages className="opacity-70" />
            <select
              aria-label="Language"
              className="bg-background border rounded-md px-2 py-1"
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
            >
              <option value="en">English</option>
              <option value="hinglish">Hinglish</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 bg-background">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
