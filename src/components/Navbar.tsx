import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, PackageSearch } from "lucide-react";
import icon from "../assets/tlbatk-icon.png";
import { waLink, BRAND } from "../config";

const links = [
  { href: "/#how", label: "كيف نعمل" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/#integrations", label: "الربط مع متجرك" },
  { href: "/#pricing", label: "الأسعار" },
  { href: "/#contact", label: "التواصل" },
  { href: "/#faq", label: "الأسئلة" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={icon} alt="طلباتك" className="h-10 w-auto md:h-11" />
          <div className="leading-none">
            <div className="font-display text-lg font-extrabold text-ink md:text-xl">{BRAND.name}</div>
            <div className="font-kufi text-[10px] tracking-[0.25em] text-leaf-deep">{BRAND.latin}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-soft transition hover:text-leaf-deep">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/track"
            className="hidden items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:border-leaf hover:text-leaf-deep sm:flex"
          >
            <PackageSearch className="h-4 w-4" />
            تتبّع طلبك
          </Link>
          <button
            onClick={() => window.open(waLink(), "_blank", "noopener")}
            className="hidden rounded-full bg-leaf px-6 py-2.5 font-display text-sm font-extrabold text-ink shadow-md shadow-leaf/30 transition hover:brightness-105 md:block"
          >
            ابدأ الآن
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="القائمة"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-5 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-ink-soft transition hover:bg-cream">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); navigate("/track"); }}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-right font-bold text-ink transition hover:bg-cream"
            >
              <PackageSearch className="h-4 w-4 text-leaf-deep" /> تتبّع طلبك
            </button>
            <button
              onClick={() => { setOpen(false); window.open(waLink(), "_blank", "noopener"); }}
              className="mt-1 rounded-xl bg-leaf px-3 py-2.5 text-center font-display font-extrabold text-ink"
            >
              ابدأ الآن
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
