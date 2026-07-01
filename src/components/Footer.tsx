import { Link } from "react-router-dom";
import logo from "../assets/tlbatk-logo.png";
import { waLink, BRAND } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
        <div className="grid gap-9 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo} alt="طلباتك TLBATK" className="h-20 w-auto" />
            <p className="mt-4 max-w-sm leading-loose text-ink-soft">
              شريك التوصيل للمتاجر الإلكترونية والمطاعم والمتاجر المحلية، نوصّل طلباتك بسرعة
              وموثوقاً مع تتبّع لحظي داخل {BRAND.city} وقريباً كل مدن المملكة.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink-soft transition hover:border-leaf hover:text-leaf-deep">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 4.86A4.94 4.94 0 1 0 12 16.94 4.94 4.94 0 0 0 12 7.06zm0 8.14A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zm6.3-8.34a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z"/></svg>
              </a>
              <a href={BRAND.x} target="_blank" rel="noreferrer" aria-label="X" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink-soft transition hover:border-leaf hover:text-leaf-deep">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-extrabold text-ink">روابط</h4>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              <li><a href="/#services" className="transition hover:text-leaf-deep">خدماتنا</a></li>
              <li><a href="/#audiences" className="transition hover:text-leaf-deep">من نخدم</a></li>
              <li><a href="/#integrations" className="transition hover:text-leaf-deep">الربط مع متجرك</a></li>
              <li><Link to="/track" className="transition hover:text-leaf-deep">تتبّع طلبك</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-extrabold text-ink">تواصل معنا</h4>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              <li><button onClick={() => window.open(waLink(), "_blank", "noopener")} className="transition hover:text-leaf-deep">واتساب — تواصل الآن</button></li>
              <li><a href={`mailto:${BRAND.email}`} className="transition hover:text-leaf-deep">{BRAND.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-sm text-ink-soft/80">
          © {new Date().getFullYear()} {BRAND.name} — {BRAND.latin}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
