import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Store,
  UtensilsCrossed,
  ShoppingBag,
  ClipboardList,
  Send,
  UserCheck,
  Truck,
  Inbox,
  Zap,
  Radar,
  ShieldCheck,
  MapPin,
  Handshake,
  Smartphone,
  BadgeCheck,
  PackageCheck,
  PackageSearch,
  PlugZap,
  ArrowLeft,
  Plus,
  Minus,
  Star,
} from "lucide-react";
import icon from "../assets/tlbatk-icon.png";
import PriceCalculator from "../components/PriceCalculator";
import { waLink, INTEGRATIONS, TESTIMONIALS } from "../config";

const stats = [
  { value: "60", label: "متوسط زمن التوصيل" },
  { value: "+100", label: "حي مغطّى في جدة ومكة" },
  { value: "%99", label: "نسبة تسليم ناجحة" },
  { value: "فوري", label: "تخصيص المندوب" },
];

const audiences = [
  { icon: Store, title: "المتاجر الإلكترونية", desc: "نوصّل طلبات متجرك لعملائك في جدة ومكة بسرعة واحترافية تعكس صورة علامتك." },
  { icon: UtensilsCrossed, title: "المطاعم", desc: "توصيل سريع للطلبات يحافظ على جودة الطلب ويصل العميل وهو راضٍ." },
  { icon: ShoppingBag, title: "المتاجر المحلية", desc: "خدمة توصيل مرنة لمحلك تساعدك توصل لعملاء أكثر داخل جدة ومكة." },
];

const steps = [
  { icon: ClipboardList, title: "المتجر يستقبل الطلب", desc: "يستقبل متجرك طلب العميل كالمعتاد عبر قنواتك الخاصة." },
  { icon: Send, title: "ترسل التفاصيل إلينا", desc: "ترسل لنا تفاصيل الطلب مباشرة عبر وسائل التواصل المتفق عليها." },
  { icon: UserCheck, title: "نخصّص أقرب مندوب", desc: "نخصّص أقرب مندوب متاح لاستلام الطلب في أسرع وقت." },
  { icon: Truck, title: "نوصّل ونتابع", desc: "يبدأ التوصيل فوراً مع متابعة مستمرة حتى يتم التسليم بنجاح." },
];

const services = [
  { icon: Inbox, title: "استقبال الطلبات", desc: "آلية مرنة وسهلة لإرسال الطلبات بسرعة ودون تعقيد." },
  { icon: Zap, title: "استجابة سريعة", desc: "نتعامل مع طلبك فور وصوله بدون انتظار." },
  { icon: UserCheck, title: "تخصيص المندوب المناسب", desc: "نختار أقرب مندوب متاح في أقصر وقت ممكن." },
  { icon: Truck, title: "توصيل داخل جدة ومكة", desc: "تنفيذ كفؤ لعمليات التوصيل في مختلف أحياء جدة ومكة." },
  { icon: Radar, title: "متابعة حتى التسليم", desc: "تتابع حالة الطلب وتتأكد من وصوله لعميلك." },
  { icon: ShieldCheck, title: "خدمة بمستوى ثابت", desc: "نحافظ على جودة خدمة تليق بسمعة متجرك." },
];

const features = [
  { icon: Zap, title: "سرعة في الاستلام والتنفيذ", desc: "نستلم وننفّذ بأسرع وقت لأن السرعة عنصر أساسي في رضا العميل." },
  { icon: MapPin, title: "تغطية واسعة في جدة ومكة", desc: "نغطّي معظم أحياء جدة ومكة بشبكة مناديب منتشرة." },
  { icon: Handshake, title: "شراكة موثوقة مع المتاجر", desc: "نتعامل كشريك لوجستي يهمّه نمو متجرك لا مجرد مزوّد خدمة." },
  { icon: Smartphone, title: "سهولة إرسال ومتابعة الطلبات", desc: "ترسل الطلب وتتابع حالته بكل بساطة دون أي تعقيد." },
  { icon: ShieldCheck, title: "احترافية في التعامل", desc: "تعامل احترافي مع متجرك ومع عملائك في كل خطوة." },
];

const speedPoints = [
  "الاستجابة السريعة للطلبات.",
  "تخصيص المندوب المناسب في أقصر وقت ممكن.",
  "تنفيذ التوصيل بكفاءة عالية داخل جدة ومكة.",
  "الحفاظ على مستوى خدمة ثابت يليق بسمعة متجرك.",
];

const faqs = [
  { q: "كيف أرسل الطلب لكم؟", a: "ترسل تفاصيل الطلب مباشرة عبر وسائل التواصل المتفق عليها (واتساب أو ربط مع متجرك)، ونبدأ التنفيذ فوراً." },
  { q: "كم يستغرق توصيل الطلب؟", a: "نخصّص أقرب مندوب متاح ونبدأ التوصيل فوراً، مع متابعة مستمرة حتى التسليم داخل جدة ومكة." },
  { q: "هل أقدر أتابع حالة الطلب؟", a: "نعم، فيه صفحة تتبّع تعرض حالة الطلب خطوة بخطوة، وتقدر تتابع بسهولة حتى يصل لعميلك." },
  { q: "هل تخدمون المطاعم والمتاجر المحلية؟", a: "نعم، نخدم المتاجر الإلكترونية والمطاعم والمتاجر المحلية داخل جدة ومكة بخدمة توصيل احترافية." },
  { q: "هل يمكن الربط مع متجري في سلة أو زد؟", a: "نعم، نقدر نربط مع متجرك عند الحاجة لاستقبال الطلبات تلقائياً، إضافة إلى الإرسال عبر واتساب." },
];

function order(text?: string) {
  window.open(waLink(text), "_blank", "noopener");
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1100px 500px at 85% -5%, #eef3df 0%, transparent 60%), radial-gradient(900px 500px at 0% 100%, #f1f6e3 0%, transparent 55%), #ffffff",
        }}
      >
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-leaf/10 blur-3xl" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-2">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-leaf-deep">
              <span className="h-2 w-2 rounded-full bg-leaf" /> خدمة توصيل احترافية داخل جدة ومكة
            </span>
            <h1 className="mt-5 font-display text-[32px] font-black leading-[1.2] text-ink sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              نوصّل طلباتك بسرعة
              <br />
              <span className="text-leaf-deep">ونعكس احترافية</span> متجرك
            </h1>
            <p className="mt-5 max-w-md text-base leading-loose text-ink-soft sm:text-lg">
              تجربة العميل ما تنتهي عند إتمام الطلب — تبدأ من لحظة استلامه وحتى وصوله لباب
              العميل. نوفّر توصيلاً سريعاً وموثوقاً للمتاجر الإلكترونية والمطاعم والمتاجر
              المحلية داخل جدة ومكة.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => order("أبغى أبدأ خدمة التوصيل لمتجري")}
                className="rounded-full bg-leaf px-8 py-3.5 font-display text-base font-extrabold text-ink shadow-md shadow-leaf/30 transition hover:brightness-105"
              >
                ابدأ الآن
              </button>
              <Link
                to="/track"
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-base font-bold text-ink transition hover:border-leaf hover:text-leaf-deep"
              >
                <PackageSearch className="h-5 w-5 text-leaf-deep" /> تتبّع طلبك
              </Link>
            </div>

            <QuickTrack />
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square">
              <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-cream to-cream-2" />
              <div className="absolute inset-0 grid place-items-center">
                <img src={icon} alt="شعار طلباتك" className="floaty h-2/3 w-2/3 object-contain drop-shadow-[0_24px_40px_rgba(47,72,88,0.18)]" />
              </div>
              <FloatChip className="right-0 top-8" icon={<ClipboardList className="h-4 w-4" />} text="طلب جديد" />
              <FloatChip className="left-0 top-1/3" icon={<Truck className="h-4 w-4" />} text="قيد التوصيل" />
              <FloatChip className="bottom-10 right-6" icon={<PackageCheck className="h-4 w-4" />} text="تم التسليم ✓" />
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="mx-auto max-w-[1200px] px-5 pb-14 md:px-8">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white p-6 md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-black text-ink md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section id="audiences" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow="من نخدم ؟" title="شريك التوصيل لمتجرك" sub="نخدم المتاجر الإلكترونية والمطاعم والمتاجر المحلية داخل جدة ومكة." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="group rounded-3xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-leaf hover:shadow-xl hover:shadow-ink/5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf/15 text-leaf-deep transition group-hover:bg-leaf group-hover:text-ink">
                <a.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{a.title}</h3>
              <p className="mt-2 leading-loose text-ink-soft">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section id="how" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <SectionHead eyebrow="كيف نعمل ؟" title="من استلام الطلب إلى باب العميل" sub="آلية بسيطة وسريعة بأربع خطوات واضحة." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-3xl border border-line bg-white p-6">
                <span className="font-kufi absolute left-5 top-4 text-4xl font-bold text-cream-2">0{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf/15 text-leaf-deep">
                  <s.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-loose text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow="خدماتنا" title="توصيل احترافي بكل تفاصيله" sub="نهتم بكل خطوة عشان يوصل طلب عميلك بأفضل صورة." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-leaf hover:shadow-xl hover:shadow-ink/5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf/15 text-leaf-deep transition group-hover:bg-leaf group-hover:text-ink">
                <s.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-loose text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Order intake + speed */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 md:px-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-line bg-white p-7 md:p-9">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf/15 text-leaf-deep">
              <Inbox className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">استقبال الطلبات</h3>
            <p className="mt-3 leading-loose text-ink-soft">
              نعمل وفق آلية مرنة وسهلة تتيح للمتاجر إرسال الطلبات بسرعة دون تعقيد، مع إمكانية
              متابعة حالة الطلب والتأكد من وصوله للعميل بأعلى مستوى من الاحترافية.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-ink">
                <Send className="h-4 w-4 text-leaf-deep" /> إرسال عبر واتساب
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-ink">
                <PlugZap className="h-4 w-4 text-leaf-deep" /> ربط مع متجرك (عند الحاجة)
              </span>
            </div>
          </div>

          <div className="rounded-[28px] bg-ink p-7 text-white md:p-9">
            <div className="flex items-center gap-2 text-leaf">
              <Zap className="h-6 w-6" />
              <span className="font-display text-xl font-extrabold">سرعتنا في التنفيذ</span>
            </div>
            <p className="mt-3 leading-loose text-white/75">
              ندرك أن السرعة عنصر أساسي في رضا العميل، لذلك نركّز على:
            </p>
            <ul className="mt-5 space-y-3.5">
              {speedPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                  <span className="leading-relaxed text-white/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow="لماذا طلباتك؟" title="أكثر من مجرد خدمة توصيل" sub="شريك لوجستي يساعد متجرك يقدّم تجربة توصيل موثوقة وسريعة." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-3xl border border-line bg-white p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-leaf">
                <f.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-loose text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="mx-auto max-w-[1200px] px-5 pb-16 md:px-8 md:pb-24">
        <div className="overflow-hidden rounded-[32px] border border-line bg-white">
          <div className="grid items-center gap-8 p-7 md:grid-cols-2 md:p-12">
            <div>
              <span className="font-kufi text-sm font-bold tracking-widest text-leaf-deep">الربط مع متجرك</span>
              <h2 className="mt-2 font-display text-3xl font-black text-ink md:text-4xl">طريقة إرسال تناسبك</h2>
              <p className="mt-4 text-base leading-loose text-ink-soft sm:text-lg">
                ترسل لنا الطلبات عبر واتساب مباشرة، أو نربط متجرك معنا لتصلنا الطلبات تلقائياً.
                ندعم أشهر المنصّات، وكذلك ربط <span className="font-bold text-ink">API</span> مخصص لأي منصة.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {INTEGRATIONS.map((p) => (
                  <span key={p} className="flex items-center gap-1.5 rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-ink">
                    <PlugZap className="h-4 w-4 text-leaf-deep" /> {p}
                  </span>
                ))}
              </div>
              <button onClick={() => order("أبغى أربط متجري مع طلباتك")} className="mt-7 rounded-full bg-leaf px-8 py-3.5 font-display font-extrabold text-ink shadow-md shadow-leaf/30 transition hover:brightness-105">
                اطلب الربط
              </button>
            </div>
            <div className="rounded-3xl bg-ink p-7 text-white">
              <div className="flex items-center gap-2 text-leaf">
                <Radar className="h-5 w-5" />
                <span className="font-display font-extrabold">كيف يصلنا الطلب؟</span>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  "ترسل تفاصيل الطلب عبر واتساب أو من متجرك مباشرة.",
                  "نخصّص أقرب مندوب متاح ونبدأ التوصيل فوراً.",
                  "تتابع حالة الطلب حتى يصل لعميلك بنجاح.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf font-display text-sm font-extrabold text-ink">{i + 1}</span>
                    <span className="leading-relaxed text-white/85">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Price calculator */}
      <section id="pricing" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <SectionHead
            eyebrow="حاسبة الأسعار"
            title="احسب تكلفة التوصيل"
            sub="تقدير فوري لتكلفة التوصيل داخل جدة ومكة. أسعار شفافة بدون مفاجآت."
          />
          <div className="mt-12">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow="آراء العملاء" title="شركاؤنا يحكون عننا" sub="متاجر ومطاعم في جدة ومكة وثقت بطلباتك في توصيل طلباتها." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-line bg-white p-7">
              <div className="flex gap-1 text-leaf-deep">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-loose text-ink-soft">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-leaf/15 font-display text-lg font-extrabold text-leaf-deep">
                  {t.name.trim().charAt(0)}
                </span>
                <span>
                  <span className="block font-display font-extrabold text-ink">{t.name}</span>
                  <span className="block text-sm text-ink-soft">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHead eyebrow="الأسئلة الشائعة" title="عندك سؤال؟" sub="أكثر الأسئلة اللي توصلنا." />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <Faq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-7 py-12 md:px-14 md:py-16">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-leaf/20 blur-3xl" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                شريك لوجستي <span className="text-leaf">يدعم نمو متجرك</span>
              </h3>
              <p className="mt-3 max-w-lg text-base leading-loose text-white/75 sm:text-lg">
                طلباتك ليست مجرد خدمة توصيل، بل تجربة سريعة وموثوقة تعزّز رضا عملائك. ابدأ معنا اليوم.
              </p>
            </div>
            <button onClick={() => order("أبغى أبدأ خدمة التوصيل لمتجري")} className="group flex items-center justify-center gap-2 justify-self-start rounded-full bg-leaf px-9 py-4 font-display text-lg font-extrabold text-ink shadow-lg shadow-leaf/30 transition hover:brightness-105 md:justify-self-end">
              ابدأ الآن
              <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuickTrack() {
  const [code, setCode] = useState("");
  return (
    <div className="mt-7 max-w-md rounded-2xl border border-line bg-white p-2.5 shadow-lg shadow-ink/5">
      <div className="flex items-center gap-2">
        <PackageSearch className="ms-2 h-5 w-5 shrink-0 text-leaf-deep" />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="رقم الطلب للتتبّع…"
          className="w-full min-w-0 bg-transparent py-2 text-[15px] text-ink outline-none placeholder:text-ink-soft/50"
        />
        <Link
          to={code.trim() ? `/track?code=${encodeURIComponent(code.trim())}` : "/track"}
          className="shrink-0 rounded-xl bg-ink px-5 py-2.5 font-display text-sm font-extrabold text-white transition hover:bg-ink-soft"
        >
          تتبّع
        </Link>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-right">
        <span className="font-display font-extrabold text-ink">{q}</span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-leaf-deep">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && <p className="px-5 pb-5 leading-loose text-ink-soft">{a}</p>}
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="font-kufi text-base font-bold tracking-widest text-leaf-deep">{eyebrow}</span>
      <h2 className="mt-4 font-display text-5xl font-black leading-tight text-ink sm:text-6xl md:text-7xl">{title}</h2>
      <p className="mt-5 text-lg leading-loose text-ink-soft sm:text-xl">{sub}</p>
    </div>
  );
}

function FloatChip({ className, icon, text }: { className?: string; icon: React.ReactNode; text: string }) {
  return (
    <div className={`absolute flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-bold text-ink shadow-lg shadow-ink/5 sm:px-4 sm:text-sm ${className}`}>
      <span className="text-leaf-deep">{icon}</span>
      {text}
    </div>
  );
}
