"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Dithering } from "@paper-design/shaders-react"
import { Spinner } from "@/components/ui/spinner"
import { theme } from "@/lib/theme"

// Contact form and social links - Terminal/ASCII aesthetic
export const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative overflow-hidden" style={{ backgroundColor: theme.surface }}>
      {/* Corner Frame Accents - softer on surface bg */}
      <div className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/20 z-20"></div>
      <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/20 z-20"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/20 z-20"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/20 z-20"></div>

      {/* Same dithering background as About section */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack="#0a0a0a"
          colorFront="#4a4a4a"
          shape="simplex"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={2}
          rotation={0}
          speed={0.05}
        />
      </div>

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
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">○</span>
              <div className="w-8 h-px bg-white"></div>
            </div>
            <pre
              className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`█▀▀ █▀█ █▄░█ ▀█▀ ▄▀█ █▀▀ ▀█▀
█▄▄ █▄█ █░▀█ ░█░ █▀█ █▄▄ ░█░`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[60px] h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">MSG.2026</span>
              <div className="flex-1 max-w-[60px] h-px bg-white"></div>
            </div>
          </div>
        </motion.div>

        {/* Form Panel - dark surface like terminal card */}
        <motion.div
          className="max-w-xl mx-auto relative border overflow-hidden"
          style={{
            backgroundColor: '#0a0a0a',
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
              opacity: 0.015,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Panel Header */}
          <div
            className="px-5 py-2.5 border-b flex items-center justify-between"
            style={{
              backgroundColor: theme.bg,
              borderColor: '#333333',
            }}
          >
            <span
              className="text-[10px] font-mono tracking-wider"
              style={{ color: theme.textMuted }}
            >
              CONTACT — FORM
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#27ca40' }} />
            </div>
          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="p-7 space-y-6 relative"
          >
            {[
              { name: "name", type: "text", label: "NAME", placeholder: "John Doe" },
              { name: "email", type: "email", label: "EMAIL", placeholder: "john@example.com" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-[11px] font-mono tracking-[0.15em] uppercase mb-2 transition-colors duration-200"
                  style={{ color: focusedField === field.name ? theme.text : theme.textSoft }}
                >
                  {focusedField === field.name && <span className="text-white/60 mr-1">&gt;</span>}
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    className="w-full px-0 py-2 font-mono text-sm transition-all duration-200 focus:outline-none border-b placeholder:text-white/20"
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: focusedField === field.name ? '2px' : '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: focusedField === field.name ? theme.text : '#444444',
                      color: theme.text,
                    }}
                    required
                  />
                </div>
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-mono tracking-[0.15em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focusedField === "message" ? theme.text : theme.textSoft }}
              >
                {focusedField === "message" && <span className="text-white/60 mr-1">&gt;</span>}
                MESSAGE
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your message here..."
                  className="w-full px-0 py-2 font-mono text-sm transition-all duration-200 focus:outline-none min-h-[100px] resize-none border-b placeholder:text-white/20"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: focusedField === "message" ? '2px' : '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: focusedField === "message" ? theme.text : '#444444',
                    color: theme.text,
                  }}
                  required
                />
              </div>
            </div>

            {/* Submit button - outlined style matching hero */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting || status === "success"}
                className="relative w-full py-3 font-mono text-sm tracking-wide uppercase transition-all duration-200 group"
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.text}`,
                  color: theme.text,
                  opacity: submitting || status === "success" ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!submitting && status !== "success") {
                    e.currentTarget.style.backgroundColor = theme.text
                    e.currentTarget.style.color = theme.bg
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = theme.text
                }}
              >
                {/* Corner accents on hover */}
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />

                <span className="flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <Spinner />
                      <span>SENDING...</span>
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
              <div className="mt-4 font-mono text-[11px] border-t pt-4" style={{ borderColor: '#333333' }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: theme.textMuted }}>$</span>
                  <span style={{ color: theme.textSoft }}>send_message</span>
                  {submitting && (
                    <motion.span
                      className="text-white/60"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ...
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
                    <span style={{ color: '#27ca40' }}>[ok]</span>
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
                    <span style={{ color: '#ff5f56' }}>[err]</span>
                    <span style={{ color: theme.textSoft }}>transmission failed, retry</span>
                  </motion.div>
                )}
                {status === "idle" && !submitting && (
                  <div className="mt-2 flex items-center gap-2">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.textMuted }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      style={{ color: theme.textMuted }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
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
            style={{ borderColor: '#333333' }}
          >
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/mariocamarena", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/marioacamarena/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:cs.mario.camarena@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 transition-all duration-200"
                  style={{ color: theme.textMuted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.text
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textMuted
                  }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="flex items-center">
              <span
                className="text-[9px] font-mono tracking-wider"
                style={{ color: theme.textMuted }}
              >
                mario@portfolio:~$
              </span>
              <motion.span
                className="ml-1 w-1.5 h-3 inline-block"
                style={{ backgroundColor: theme.text }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Footer with admin link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => window.location.href = '/admin'}
            className="text-[10px] font-mono tracking-wider px-3 py-1.5 transition-all duration-200 border hover:border-white/60 hover:text-white"
            style={{
              color: theme.textMuted,
              backgroundColor: 'transparent',
              borderColor: theme.borderDim,
            }}
          >
            ADMIN DASHBOARD
          </button>
        </motion.div>
      </div>
    </section>
  )
}
