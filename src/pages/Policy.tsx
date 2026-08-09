import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, AlertCircle, CheckCircle } from "lucide-react";

export default function Policy() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-ink py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-leaf-deep hover:text-leaf mb-6 transition">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white">سياسة التعويض</h1>
          <p className="mt-3 text-lg text-white/75">شفافية كاملة في معالجة الطلبات التالفة</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="space-y-12">
          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-ink-soft">
              تلتزم <span className="font-bold text-ink">طلباتك</span> بتعويض العملاء والمتاجر بشكل عادل وشفاف في حالة تلف الطلبات. نحن نقدّر ثقتكم ونسعى لتقديم أفضل خدمة ممكنة.
            </p>
          </section>

          {/* 1. Proportional Compensation */}
          <section className="rounded-3xl border border-line bg-white p-8 md:p-10">
            <div className="flex gap-4 mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf/15 text-leaf-deep">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-ink">التعويض التناسبي</h2>
                <p className="mt-1 text-sm text-ink-soft">للأضرار الجزئية والطفيفة</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
              <p>
                في حالة وصول الطلب للعميل بتلف جزئي أو ضرر شكلي لا يمنع الاستفادة من المنتج:
              </p>

              <div className="rounded-lg bg-cream p-5 space-y-3 text-ink">
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep">✓</span>
                  <p>يتم تقدير الضرر بنسبة تتراوح بين <span className="font-bold">20% إلى 25%</span> من قيمة الطلب</p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep">✓</span>
                  <p>يتم تعويض العميل بهذه النسبة</p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep">✓</span>
                  <p>للعميل الحق بالاحتفاظ بالمنتج</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Total Damage Compensation */}
          <section className="rounded-3xl border border-line bg-white p-8 md:p-10">
            <div className="flex gap-4 mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-ink">التعويض عند التلف الكامل</h2>
                <p className="mt-1 text-sm text-ink-soft">للأضرار التي تجعل المنتج غير قابل للاستخدام</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
              <p>
                في حالة عدم إمكانية استخدام المنتج (مثل: انقلاب الطلب بالكامل، ذوبان بسبب الحرارة، أو تهشم المنتج):
              </p>

              <div className="rounded-lg bg-red-50 p-5 space-y-3 text-ink border border-red-100">
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-red-600">✓</span>
                  <p>تعويض مالي كامل: <span className="font-bold">100% من قيمة الطلب</span></p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-red-600">✓</span>
                  <p>تعويض إضافي: مبلغ رمزي أو قسائم توصيل حسب تقدير إدارة طلباتك</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Conditions */}
          <section className="rounded-3xl border border-line bg-white p-8 md:p-10">
            <div className="flex gap-4 mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf/15 text-leaf-deep">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-ink">شروط التعويض</h2>
                <p className="mt-1 text-sm text-ink-soft">إجراءات ضرورية لضمان الحماية المتبادلة</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
              <p className="bg-cream rounded-lg p-5 border-l-4 border-leaf-deep">
                تلتزم إدارة طلباتك بتعويض <span className="font-bold text-ink">100%</span> من قيمة الطلب التالف، بشرط:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep text-lg">1</span>
                  <div>
                    <p className="font-bold text-ink mb-1">تسليم الطلب التالف للمندوب</p>
                    <p className="text-sm">كإجراء إداري لإثبات الحالة والتحقق من الضرر</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep text-lg">2</span>
                  <div>
                    <p className="font-bold text-ink mb-1">توثيق الحالة</p>
                    <p className="text-sm">لتتمكن الإدارة من اتخاذ الإجراء اللازم حيال المندوب</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 font-bold text-leaf-deep text-lg">3</span>
                  <div>
                    <p className="font-bold text-ink mb-1">التواصل الفوري</p>
                    <p className="text-sm">إبلاغ طلباتك عن التلف عند استلام الطلب مباشرة</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-leaf/10 to-leaf-deep/10 border border-leaf/30 p-8 md:p-10">
            <h3 className="font-display text-xl font-black text-ink mb-3">عندك طلب تالف؟</h3>
            <p className="text-ink-soft mb-5">تواصل معنا فوراً عبر WhatsApp ليتمكن الفريق من مساعدتك بأسرع وقت</p>
            <a
              href="https://wa.me/966541722219?text=أرسل%20لي%20طلبي%20بحالة%20تالفة%20وأحتاج%20تعويض"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-8 py-3.5 font-display font-extrabold text-ink shadow-md shadow-leaf/30 transition hover:brightness-105"
            >
              💬 تواصل عبر WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
