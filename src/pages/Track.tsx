import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PackageSearch,
  Loader2,
  Warehouse,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  User,
  Hash,
} from "lucide-react";
import { trackOrder, type TrackResult, type TrackStage } from "../lib/tracking";
import { waLink, TRACKING_API_URL } from "../config";

const STAGE_ICON: Record<TrackStage, typeof Truck> = {
  received: Warehouse,
  processing: PackageCheck,
  out_for_delivery: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export default function Track() {
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState(params.get("code") || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(async (value: string) => {
    const c = value.trim();
    if (!c) return;
    setLoading(true);
    setSearched(true);
    const r = await trackOrder(c);
    setResult(r);
    setLoading(false);
  }, []);

  useEffect(() => {
    const initial = params.get("code");
    if (initial) runSearch(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit() {
    const c = code.trim();
    if (!c) return;
    setParams(c ? { code: c } : {});
    runSearch(c);
  }

  return (
    <main className="min-h-[70vh]">
      {/* header */}
      <section
        className="border-b border-line"
        style={{ background: "radial-gradient(900px 360px at 80% -20%, #eef3df 0%, transparent 60%), #ffffff" }}
      >
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8 md:py-20">
          <span className="font-kufi text-sm font-bold tracking-widest text-leaf-deep">تتبّع الطلب</span>
          <h1 className="mt-2 font-display text-4xl font-black text-ink md:text-5xl">وين وصل طلبك؟</h1>
          <p className="mt-3 text-lg leading-loose text-ink-soft">
            اكتب رقم الطلب وبنعرض لك حالته خطوة بخطوة.
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-line bg-white p-2.5 shadow-lg shadow-ink/5">
            <div className="flex items-center gap-2">
              <PackageSearch className="ms-2 h-5 w-5 shrink-0 text-leaf-deep" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="مثال: TLB123456"
                className="w-full bg-transparent py-2.5 text-[15px] text-ink outline-none placeholder:text-ink-soft/50"
              />
              <button
                onClick={submit}
                disabled={!code.trim() || loading}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-leaf px-6 py-2.5 font-display text-sm font-extrabold text-ink transition hover:brightness-105 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "تتبّع"}
              </button>
            </div>
          </div>

          {!TRACKING_API_URL && (
            <p className="mt-3 text-xs text-ink-soft/70">
              وضع تجريبي — جرّب أي رقم مثل <span className="font-bold text-leaf-deep">TLB123456</span>.
              يتفعّل التتبّع الحقيقي تلقائياً عند ربط الـ API.
            </p>
          )}
        </div>
      </section>

      {/* result */}
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 text-ink-soft">
            <Loader2 className="h-8 w-8 animate-spin text-leaf-deep" />
            <p>نجيب حالة طلبك…</p>
          </div>
        )}

        {!loading && searched && !result && (
          <div className="rounded-3xl border border-line bg-white p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cream text-ink-soft">
              <XCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-xl font-extrabold text-ink">ما لقينا هذا الرقم</h3>
            <p className="mt-2 leading-loose text-ink-soft">
              تأكد من رقم الطلب وحاول مرة ثانية، أو تواصل معنا ونساعدك.
            </p>
            <a
              href={waLink(`أبغى أستفسر عن طلب رقم: ${code}`)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-full bg-leaf px-7 py-3 font-display font-extrabold text-ink transition hover:brightness-105"
            >
              تواصل عبر واتساب
            </a>
          </div>
        )}

        {!loading && result && <ResultView result={result} />}
      </section>
    </main>
  );
}

function ResultView({ result }: { result: TrackResult }) {
  const cancelled = result.currentStage === "cancelled";
  const meta = [
    { icon: Hash, label: "رقم الطلب", value: result.code },
    result.recipient ? { icon: User, label: "المستلم", value: result.recipient } : null,
    result.city ? { icon: MapPin, label: "المدينة", value: result.city } : null,
    result.estimated ? { icon: Clock, label: "التوصيل المتوقع", value: result.estimated } : null,
  ].filter(Boolean) as { icon: typeof Hash; label: string; value: string }[];

  const events = result.events.length
    ? result.events
    : [];

  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-8">
      {/* status banner */}
      <div className={`flex items-center gap-3 rounded-2xl p-4 ${cancelled ? "bg-red-50 text-red-700" : "bg-leaf/12 text-ink"}`}>
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${cancelled ? "bg-red-100" : "bg-leaf text-ink"}`}>
          {(() => { const I = STAGE_ICON[result.currentStage]; return <I className="h-6 w-6" />; })()}
        </div>
        <div>
          <div className="text-xs text-ink-soft">الحالة الحالية</div>
          <div className="font-display text-lg font-extrabold">
            {result.events.find((e) => e.stage === result.currentStage)?.title ||
              "قيد المعالجة"}
          </div>
        </div>
      </div>

      {/* meta */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label} className="rounded-2xl bg-cream p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-ink-soft">
              <m.icon className="h-3.5 w-3.5 text-leaf-deep" /> {m.label}
            </div>
            <div className="mt-1 font-bold text-ink">{m.value}</div>
          </div>
        ))}
      </div>

      {/* timeline */}
      <div className="mt-7">
        <div className="mb-4 font-display font-extrabold text-ink">مراحل الطلب</div>
        <ol className="relative">
          {events.map((ev, i) => {
            const I = STAGE_ICON[ev.stage];
            const last = i === events.length - 1;
            return (
              <li key={ev.stage} className="relative flex gap-4 pb-7 last:pb-0">
                {!last && (
                  <span
                    className={`absolute right-[21px] top-11 -bottom-0 w-0.5 ${ev.done ? "bg-leaf" : "bg-line"}`}
                  />
                )}
                <span
                  className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 ${
                    ev.done ? "border-leaf bg-leaf text-ink" : "border-line bg-white text-ink-soft/40"
                  }`}
                >
                  <I className="h-5 w-5" />
                </span>
                <div className="pt-1">
                  <div className={`font-display font-extrabold ${ev.done ? "text-ink" : "text-ink-soft/50"}`}>
                    {ev.title}
                  </div>
                  <p className={`mt-0.5 text-sm leading-relaxed ${ev.done ? "text-ink-soft" : "text-ink-soft/40"}`}>
                    {ev.description}
                  </p>
                  {ev.timestamp && <div className="mt-1 text-xs text-leaf-deep">{ev.timestamp}</div>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-sm text-ink-soft">عندك سؤال عن طلبك؟</span>
        <a
          href={waLink(`استفسار عن طلب رقم: ${result.code}`)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ink px-6 py-2.5 font-display text-sm font-extrabold text-white transition hover:bg-ink-soft"
        >
          تواصل عبر واتساب
        </a>
      </div>
    </div>
  );
}
