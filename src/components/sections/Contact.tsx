// src/components/sections/Contact.tsx
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Send } from "lucide-react";
import { personalInfo } from "@/data";

if (!import.meta.env.VITE_WEB3FORMS_KEY) {
  console.error(
    "Missing Web3Forms API key. Contact form will not work properly."
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-fg placeholder:text-faint transition focus:border-cyan/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-cyan/10";

const Contact = () => {
  const [status, setStatus] = useState({
    submitting: false,
    info: { error: false, msg: null as string | null },
  });
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ submitting: true, info: { error: false, msg: null } });

    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    formData.append("subject", "New message from your personal website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus({
          submitting: false,
          info: { error: false, msg: "Message sent. I'll get back to you soon." },
        });
        form.reset();
      } else {
        setStatus({
          submitting: false,
          info: {
            error: true,
            msg: data.message || "Something went wrong. Please try again.",
          },
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        submitting: false,
        info: { error: true, msg: "Network error. Please try again later." },
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="reveal mx-auto max-w-4xl text-center">
          <p className="eyebrow">
            <span className="text-gradient">05</span>
            <span className="mx-2 text-white/20">/</span>
            Contact
          </p>
          <h2 className="mt-6 text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            Let's build something{" "}
            <span className="serif-accent text-gradient">that ships.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Working on agents, data platforms, or anything where AI meets finance? I'd love
            to hear about it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${personalInfo.email}`} className="btn-primary">
              {personalInfo.email}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="icon-btn"
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              {copied ? <Check className="h-[18px] w-[18px] text-mint" /> : <Copy className="h-[18px] w-[18px]" />}
            </button>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
              <Github className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass reveal mx-auto mt-16 max-w-2xl rounded-[28px] p-6 sm:p-8"
        >
          {/* Honeypot field for spam prevention */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />

          <p className="eyebrow">Or send a quick message</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" autoComplete="name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" required placeholder="Your email" autoComplete="email" className={inputClass} />
            </div>
          </div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building?"
            className={`${inputClass} mt-4 resize-none`}
          />

          <div className="mt-5 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p
              className={`min-h-[1.25rem] text-sm ${status.info.error ? "text-red-400" : "text-mint"}`}
              aria-live="polite"
            >
              {status.info.msg}
            </p>
            <button
              type="submit"
              disabled={status.submitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status.submitting ? "Sending…" : "Send message"}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
