"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { Send, Github, Linkedin, Mail } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { theme } from "@/lib/theme"

// Contact form and social links
export const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  // Admin button state
  const adminButtonRef = useRef<HTMLButtonElement>(null)
  const adminX = useMotionValue(0)
  const adminY = useMotionValue(0)

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

  // Magnetic effect handlers
  const handleAdminMove = useCallback(
    (e: React.MouseEvent) => {
      if (!adminButtonRef.current) return

      const rect = adminButtonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const distance = Math.sqrt(distX ** 2 + distY ** 2)
      const maxDist = 100

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist
        adminX.set(distX * strength * 0.3)
        adminY.set(distY * strength * 0.3)
      }
    },
    [adminX, adminY]
  )

  const handleAdminLeave = useCallback(() => {
    adminX.set(0)
    adminY.set(0)
  }, [adminX, adminY])

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: theme.surface }}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ color: theme.text }}
        >
          Let's Connect
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 mb-12"
          >
            {[
              { name: "name", type: "text", label: "Your Name" },
              { name: "email", type: "email", label: "Your Email" },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <motion.input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-2 rounded-xl px-4 py-4 pt-6 placeholder-transparent focus:outline-none transition-all duration-300"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                  whileFocus={{
                    borderColor: theme.primary,
                    boxShadow: `0 0 20px ${theme.primary}20`,
                  }}
                  placeholder={field.label}
                  required
                />
                <motion.label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    form[field.name as keyof typeof form]
                      ? "top-2 text-xs"
                      : "top-4 text-base peer-focus:top-2 peer-focus:text-xs"
                  }`}
                  style={{ color: theme.primary }}
                  htmlFor={field.name}
                >
                  {field.label}
                </motion.label>
              </motion.div>
            ))}

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="peer w-full bg-transparent border-2 rounded-xl px-4 py-4 pt-6 placeholder-transparent focus:outline-none transition-all duration-300 min-h-[120px] resize-none"
                style={{
                  borderColor: theme.border,
                  color: theme.text,
                }}
                whileFocus={{
                  borderColor: theme.primary,
                  boxShadow: `0 0 20px ${theme.primary}20`,
                }}
                placeholder="Your Message"
                required
              />
              <motion.label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  form.message ? "top-2 text-xs" : "top-4 text-base peer-focus:top-2 peer-focus:text-xs"
                }`}
                style={{ color: theme.primary }}
                htmlFor="message"
              >
                Your Message
              </motion.label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.button
                type="submit"
                disabled={submitting || status === "success"}
                className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
                  opacity: submitting || status === "success" ? 0.7 : 1
                }}
                whileHover={{ 
                  scale: submitting || status === "success" ? 1 : 1.02,
                  boxShadow: `0 20px 40px ${theme.primary}40` 
                }}
                whileTap={{ scale: submitting || status === "success" ? 1 : 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {submitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <Spinner />
                      <span className="ml-2">Sending...</span>
                    </motion.div>
                  ) : status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full mr-2"
                        style={{ backgroundColor: theme.success }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                      Message Sent!
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full mr-2"
                        style={{ backgroundColor: theme.error }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                      Try Again
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.form>

          {/* social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/mariocamarena", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/marioacamarena/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:cs.mario.camarena@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: theme.elevated,
                  border: `2px solid ${theme.border}`,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.1,
                  borderColor: theme.primary,
                  backgroundColor: theme.primary + "20",
                  boxShadow: `0 10px 30px ${theme.primary}30`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <Icon className="w-6 h-6" style={{ color: theme.primary }} />
                </motion.div>

                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* footer with admin link */}
          <motion.div
            className="mt-16 pt-8 text-center"
            style={{
              borderTop: `1px solid ${theme.border}`,
              color: theme.textMuted,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Mario Camarena • AI Researcher & Developer
            </motion.p>
            
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                ref={adminButtonRef}
                onClick={() => window.location.href = '/admin'}
                className="text-xs px-3 py-1 rounded-full transition-all duration-300 relative overflow-hidden"
                style={{ 
                  color: theme.textMuted,
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}40`,
                  x: adminX,
                  y: adminY,
                }}
                onMouseMove={handleAdminMove}
                onMouseLeave={handleAdminLeave}
                whileHover={{ 
                  color: theme.primary,
                  borderColor: theme.primary + '60',
                  backgroundColor: theme.primary + '10',
                  scale: 1.05,
                  boxShadow: `0 10px 20px ${theme.primary}30`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4, type: "spring", stiffness: 400, damping: 30 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${theme.primary}40 0%, transparent 70%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Admin Dashboard</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 