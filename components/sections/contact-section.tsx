"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useTheme } from "@/lib/useTheme"
import { DitheredSurface } from "@/components/ui/dithered-surface"

type FieldName = "name" | "email" | "message"
type FieldErrors = Partial<Record<FieldName, string>>

// Contact form and social links - Terminal/ASCII aesthetic
export const ContactSection = () => {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const fieldRefs = useRef<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    message: null,
  })

  // Warn before navigating away with unsaved input
  useEffect(() => {
    const hasUnsaved = (form.name || form.email || form.message).trim().length > 0
    if (!hasUnsaved || status === "success") return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [form, status])

  const validate = (data: typeof form): FieldErrors => {
    const next: FieldErrors = {}
    if (!data.name.trim()) next.name = "Name is required"
    else if (data.name.trim().length < 2) next.name = "Name must be at least 2 characters"
    if (!data.email.trim()) next.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = "Enter a valid email address"
    if (!data.message.trim()) next.message = "Message is required"
    else if (data.message.trim().length < 10) next.message = "Message must be at least 10 characters"
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      // Focus first invalid field
      const firstInvalid = (["name", "email", "message"] as const).find((k) => nextErrors[k])
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus()
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setForm({ name: "", email: "", message: "" })

        setTimeout(() => {
          setStatus("idle")
        }, 3000)
      } else {
        setStatus("error")
        console.error('Form submission error:', data.error)

        setTimeout(() => {
          setStatus("idle")
        }, 5000)
      }
    } catch (error) {
      setStatus("error")
      console.error('Network error:', error)

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }

    setSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName
    setForm({
      ...form,
      [name]: e.target.value,
    })
    // Clear this field's error as the user types
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20 sm:py-24 lg:py-28 px-6 relative overflow-hidden scroll-mt-20" style={{ backgroundColor: theme.surface }}>
      <DitheredSurface />

      {/* Corner Frame Accents */}
      <div aria-hidden="true" className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title with hero treatment - matching About section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-block relative">
            <div className="flex items-center gap-3 mb-3 justify-center opacity-60">
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[10px] font-mono tracking-wider" style={{ color: theme.text }}>○</span>
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
            <h2 className="sr-only">Contact</h2>
            <pre
              aria-hidden="true"
              translate="no"
              className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`█▀▀ █▀█ █▄░█ ▀█▀ ▄▀█ █▀▀ ▀█▀
█▄▄ █▄█ █░▀█ ░█░ █▀█ █▄▄ ░█░`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>MSG.2026</span>
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
          </div>
        </motion.div>

        {/* Form Panel - dark surface like terminal card */}
        <motion.div
          className="max-w-xl mx-auto relative border overflow-hidden"
          style={{
            backgroundColor: theme.bg,
            borderColor: theme.borderDim,
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Subtle dot grid overlay like terminal */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              opacity: isDark ? 0.015 : 0.03,
              backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Panel Header */}
          <div
            className="px-5 py-2.5 border-b flex items-center justify-between"
            style={{
              backgroundColor: theme.bg,
              borderColor: theme.border,
            }}
          >
            <span
              className="text-[10px] font-mono tracking-wider"
              style={{ color: theme.textMuted }}
            >
              CONTACT — FORM
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.red }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.yellow }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.green }} />
            </div>
          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={submitting}
            className="p-7 space-y-6 relative"
          >
            {([
              { name: "name", type: "text", label: "NAME", placeholder: "John Doe", autoComplete: "name", maxLength: 80 },
              { name: "email", type: "email", label: "EMAIL", placeholder: "john@example.com", autoComplete: "email", inputMode: "email" as const, spellCheck: false, maxLength: 254 },
            ] as const).map((field) => {
              const fieldError = errors[field.name as FieldName]
              const errorBorder = fieldError ? theme.terminalDots.red : (focusedField === field.name ? theme.text : theme.borderHover)
              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-[11px] font-mono tracking-[0.15em] uppercase mb-2 transition-colors duration-200"
                    style={{ color: focusedField === field.name ? theme.text : theme.textSoft }}
                  >
                    {focusedField === field.name && <span className="opacity-60 mr-1">&gt;</span>}
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      ref={(el) => { fieldRefs.current[field.name as FieldName] = el }}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      maxLength={field.maxLength}
                      enterKeyHint="next"
                      disabled={submitting || status === "success"}
                      inputMode={"inputMode" in field ? field.inputMode : undefined}
                      spellCheck={"spellCheck" in field ? field.spellCheck : undefined}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      aria-invalid={!!fieldError}
                      aria-describedby={fieldError ? `${field.name}-error` : undefined}
                      aria-required="true"
                      required
                      className="w-full px-0 py-2 font-mono text-sm transition duration-200 focus-visible:outline-none border-b placeholder:opacity-30"
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: focusedField === field.name || fieldError ? '2px' : '1px',
                        borderBottomStyle: 'solid',
                        borderBottomColor: errorBorder,
                        color: theme.text,
                      }}
                    />
                  </div>
                  {fieldError && (
                    <p
                      id={`${field.name}-error`}
                      role="alert"
                      className="mt-1.5 text-[10px] font-mono tracking-wide"
                      style={{ color: theme.terminalDots.red }}
                    >
                      [err] {fieldError}
                    </p>
                  )}
                </div>
              )
            })}

            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-mono tracking-[0.15em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focusedField === "message" ? theme.text : theme.textSoft }}
              >
                {focusedField === "message" && <span className="opacity-60 mr-1">&gt;</span>}
                MESSAGE
              </label>
              <div className="relative">
                <textarea
                  ref={(el) => { fieldRefs.current.message = el }}
                  id="message"
                  name="message"
                  autoComplete="off"
                  maxLength={2000}
                  disabled={submitting || status === "success"}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="What are you working on? What brings you here?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-required="true"
                  required
                  className="w-full px-0 py-2 font-mono text-sm transition duration-200 focus-visible:outline-none min-h-[100px] resize-none border-b placeholder:opacity-30"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: focusedField === "message" || errors.message ? '2px' : '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: errors.message ? theme.terminalDots.red : (focusedField === "message" ? theme.text : theme.borderHover),
                    color: theme.text,
                  }}
                />
              </div>
              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1.5 text-[10px] font-mono tracking-wide"
                  style={{ color: theme.terminalDots.red }}
                >
                  [err] {errors.message}
                </p>
              )}
            </div>

            {/* Submit button - outlined style matching hero */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting || status === "success"}
                className="btn-outline relative w-full py-3 font-mono text-sm tracking-wide uppercase group"
              >
                {/* Corner accents on hover */}
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />

                <span className="flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <Spinner />
                      <span>SENDING…</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.success }}
                      />
                      <span>MESSAGE SENT</span>
                    </>
                  ) : status === "error" ? (
                    <>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.error }}
                      />
                      <span>TRY AGAIN</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </span>
              </button>

              {/* Terminal-style status output */}
              <div
                role="status"
                aria-live="polite"
                className="mt-4 font-mono text-[11px] border-t pt-4"
                style={{ borderColor: theme.border }}
              >
                <div aria-hidden="true" className="flex items-center gap-2">
                  <span style={{ color: theme.textMuted }}>$</span>
                  <span style={{ color: theme.textSoft }}>send_message</span>
                  {submitting && (
                    <motion.span
                      className="opacity-60"
                      animate={shouldReduceMotion ? { opacity: 0.6 } : { opacity: [1, 0.3, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity }}
                    >
                      …
                    </motion.span>
                  )}
                </div>
                {status === "success" && (
                  <motion.div
                    className="mt-2 flex items-center gap-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ color: theme.terminalDots.green }}>[ok]</span>
                    <span style={{ color: theme.textSoft }}>message transmitted successfully</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    className="mt-2 flex items-center gap-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ color: theme.terminalDots.red }}>[err]</span>
                    <span style={{ color: theme.textSoft }}>transmission failed, retry</span>
                  </motion.div>
                )}
                {status === "idle" && !submitting && (
                  <div aria-hidden="true" className="mt-2 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.textMuted }}
                      animate={shouldReduceMotion ? { opacity: 0.7 } : { opacity: [0.4, 1, 0.4] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      style={{ color: theme.textMuted }}
                      animate={shouldReduceMotion ? { opacity: 0.65 } : { opacity: [0.3, 1, 0.3] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      awaiting input
                    </motion.span>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Social links - integrated into panel footer */}
          <div
            className="px-7 py-4 border-t flex items-center justify-between"
            style={{ borderColor: theme.border }}
          >
            <address className="not-italic flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/mariocamarena", label: "GitHub", external: true },
                { icon: Linkedin, href: "https://www.linkedin.com/in/marioacamarena/", label: "LinkedIn", external: true },
                { icon: Mail, href: "mailto:cs.mario.camarena@gmail.com", label: "Email", external: false },
              ].map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="icon-link p-2"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </address>
            <div className="flex items-center">
              <span
                className="text-[9px] font-mono tracking-wider"
                style={{ color: theme.textMuted }}
              >
                mario@portfolio:~$
              </span>
              <motion.span
                aria-hidden="true"
                className="ml-1 w-1.5 h-3 inline-block"
                style={{ backgroundColor: theme.text }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
