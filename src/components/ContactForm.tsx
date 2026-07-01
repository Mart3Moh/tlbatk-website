import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID || "xyzjkqvb";
const API_TIMEOUT = 15000; // 15 seconds
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const { name, email, phone, message } = formData;

    // Validation
    if (!name.trim()) {
      setStatus("error");
      setErrorMsg("الاسم مطلوب");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg("البريد الإلكتروني غير صحيح");
      return;
    }

    if (!message.trim()) {
      setStatus("error");
      setErrorMsg("الرسالة مطلوبة");
      return;
    }

    // Abort previous request if still pending
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    // Create timeout
    const timeoutId = setTimeout(() => {
      abortRef.current?.abort();
      setStatus("error");
      setErrorMsg("انتهت مهلة الإرسال. حاول مرة أخرى.");
    }, API_TIMEOUT);

    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || "—",
          message: message.trim(),
          _subject: `رسالة من ${name.trim()}`,
        }),
        signal: abortRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        timeoutRef.current = setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error();
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      setStatus("error");
      setErrorMsg("حدث خطأ. حاول مرة أخرى.");
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
          maxLength={20}
          pattern="[0-9\-\+\s]+"
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
        aria-busy={status === "loading"}
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
