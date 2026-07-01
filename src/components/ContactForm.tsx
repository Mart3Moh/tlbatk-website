import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { name, email, phone, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xyzjkqvb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "لم يتم إدخاله",
          message,
          _subject: `رسالة جديدة من ${name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("فشل الإرسال");
      }
    } catch (error) {
      setStatus("error");
      setErrorMsg("حدث خطأ أثناء الإرسال. جرب مرة أخرى.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-ink mb-2">
          الاسم *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="اسمك الكامل"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20 placeholder:text-ink-soft/50"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-ink mb-2">
          البريد الإلكتروني *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20 placeholder:text-ink-soft/50"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-ink mb-2">
          رقم الجوال (اختياري)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="05XXXXXXXX"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20 placeholder:text-ink-soft/50"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-ink mb-2">
          الرسالة *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="اكتب رسالتك هنا..."
          rows={5}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20 placeholder:text-ink-soft/50 resize-none"
        />
      </div>

      {/* Status Messages */}
      {status === "error" && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex gap-3 rounded-lg border border-leaf/30 bg-leaf/10 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-deep mt-0.5" />
          <p className="text-sm font-bold text-leaf-deep">تم إرسال الرسالة بنجاح! سنرد عليك قريباً.</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-leaf px-6 py-3 font-display font-extrabold text-ink shadow-md shadow-leaf/30 transition hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            أرسل الرسالة
          </>
        )}
      </button>
    </form>
  );
}
