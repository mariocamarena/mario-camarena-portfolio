"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/lib/useTheme"
import { DitheredSurface } from "@/components/ui/dithered-surface"

// Skills data - combined from languages, frameworks, tools
const skills = [
  "PYTHON", "TYPESCRIPT/JAVASCRIPT", "DART", "C++", "RUST",
  "PYTORCH", "TENSORFLOW", "CUDA",
  "NEXT.JS/REACT", "FLUTTER", "NODE/EXPRESS", "TAILWIND", "FRAMER MOTION",
  "POSTGRESQL", "GIT/GITHUB", "GCP", "LINUX"
]

export function AboutSection() {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  // Terminal chrome styling - reacts to theme
  const terminalChrome = {
    border: `1px solid ${theme.border}`,
    borderRadius: "0px",
    headerPadding: "px-4 py-2",
    headerBg: theme.bg,
    headerBorder: theme.border,
    titleStyle: "text-[10px] font-mono tracking-wider",
    dotSize: "w-2.5 h-2.5",
    dotGap: "gap-1.5",
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="min-h-screen py-20 sm:py-24 lg:py-28 px-6 sm:px-8 relative overflow-hidden scroll-mt-20" style={{ backgroundColor: theme.surface }}>
      <DitheredSurface />

      {/* Corner Frame Accents */}
      <div aria-hidden="true" className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 left-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Title with hero treatment */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-block relative">
            <div className="flex items-center gap-3 mb-3 justify-center opacity-60">
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[10px] font-mono tracking-wider" style={{ color: theme.text }}>○</span>
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
            <h2 id="about-heading" className="sr-only">About</h2>
            <pre
              aria-hidden="true"
              translate="no"
              className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`▄▀█ █▄▄ █▀█ █ █ ▀█▀
█▀█ █▄█ █▄█ █▄█ ░█░`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>BIO.2026</span>
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
          </div>
        </motion.div>

        {/* Two-terminal grid - aligned pair */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left terminal - README */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                backgroundColor: theme.bg,
                border: terminalChrome.border,
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Subtle dot grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  opacity: isDark ? 0.015 : 0.03,
                  backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Terminal Header Bar */}
              <div
                className={`${terminalChrome.headerPadding} border-b flex items-center justify-between`}
                style={{
                  backgroundColor: terminalChrome.headerBg,
                  borderColor: terminalChrome.headerBorder,
                }}
              >
                <span
                  className={terminalChrome.titleStyle}
                  style={{ color: theme.textMuted }}
                >
                  ABOUT — README.md
                </span>
                <div className={`flex items-center ${terminalChrome.dotGap}`}>
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.red }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.yellow }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.green }} />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 space-y-5 relative">
                <h3 className="sr-only">README</h3>
                {/* Background */}
                <div>
                  <h4 className="text-[10px] font-mono font-normal tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    BACKGROUND
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty" style={{ color: theme.textSoft }}>
                    M.S. Computer Science @ UTRGV. Started with custom PCs and hardware repair, which grew into full-stack development, applied AI, and research.
                  </p>
                  <p className="text-sm leading-relaxed text-pretty mt-2" style={{ color: theme.textSoft }}>
                    Joining Textron Systems (Slidell, LA) this summer as an IT Analyst Intern — software, cybersecurity, and infrastructure IT.
                  </p>
                </div>

                {/* Research */}
                <div>
                  <h4 className="text-[10px] font-mono font-normal tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    RESEARCH
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty" style={{ color: theme.textSoft }}>
                    AI Research Assistant at UTRGV MECIS (NSF CREST) — computer vision, transportation AI, and graph-based risk modeling.
                  </p>
                  <p className="text-sm leading-relaxed text-pretty mt-2" style={{ color: theme.textSoft }}>
                    Lead on AD-SAM, a dual-encoder urban-scene segmentation model for autonomous driving, using deformable decoding and hybrid losses.
                  </p>
                  <p className="text-sm leading-relaxed text-pretty mt-2" style={{ color: theme.textSoft }}>
                    NASA-funded M.S. thesis on AAM flight-security risk: aircraft interactions from OpenSky ADS-B modeled as dynamic graph events.
                  </p>
                </div>

                {/* Builds */}
                <div>
                  <h4 className="text-[10px] font-mono font-normal tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    BUILDS
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty" style={{ color: theme.textSoft }}>
                    STABLES — lead developer on a parking-management app covering 800+ spots across 3 lots. Built the Node/Express + PostgreSQL backend for live availability, reservations, and spatial double-booking prevention.
                  </p>
                  <p className="text-sm leading-relaxed text-pretty mt-2" style={{ color: theme.textSoft }}>
                    This portfolio — Next.js, TypeScript, Tailwind, Framer Motion, PostgreSQL. Terminal-inspired with a full-stack contact pipeline and admin dashboard.
                  </p>
                </div>

                {/* Combined Skills section */}
                <div className="pt-2">
                  <h4 className="text-[10px] font-mono font-normal tracking-widest uppercase opacity-50 mb-3 block" style={{ color: theme.text }}>
                    SKILLS
                  </h4>
                  <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
                    {skills.map((tech) => (
                      <li
                        key={tech}
                        className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono tracking-wide uppercase"
                        style={{
                          backgroundColor: "transparent",
                          color: theme.textMuted,
                          border: `1px solid ${theme.borderDim}`,
                        }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer prompt with blinking cursor */}
                <div className="pt-3 border-t" style={{ borderColor: theme.border }}>
                  <div className="flex items-center font-mono text-[11px]">
                    <span style={{ color: theme.textMuted }}>cat ~/README.md</span>
                    <motion.span
                      aria-hidden="true"
                      className="ml-1 w-2 h-3.5 inline-block"
                      style={{ backgroundColor: theme.text }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right terminal - Profile */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                backgroundColor: theme.bg,
                border: terminalChrome.border,
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Subtle dot grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  opacity: isDark ? 0.015 : 0.03,
                  backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Terminal Header Bar */}
              <div
                className={`${terminalChrome.headerPadding} border-b flex items-center justify-between`}
                style={{
                  backgroundColor: terminalChrome.headerBg,
                  borderColor: terminalChrome.headerBorder,
                }}
              >
                <span
                  className={terminalChrome.titleStyle}
                  style={{ color: theme.textMuted }}
                >
                  PROFILE — TERMINAL
                </span>
                <div className={`flex items-center ${terminalChrome.dotGap}`}>
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.red }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.yellow }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: theme.terminalDots.green }} />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-7 lg:p-8 space-y-6 relative">
                <h3 className="sr-only">Profile</h3>
                {/* Photo with file label */}
                <div className="flex items-center gap-5">
                  <div>
                    <span className="text-[10px] font-mono opacity-40 block mb-1.5" style={{ color: theme.text }}>
                      profile.png
                    </span>
                    <div
                      className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden border"
                      style={{ borderColor: theme.border }}
                    >
                      <Image
                        src="/profile.png"
                        alt="Mario Camarena"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        style={{
                          imageRendering: 'pixelated',
                          filter: isDark
                            ? 'grayscale(1) contrast(1.05) brightness(0.95)'
                            : 'grayscale(1) contrast(1.05) brightness(1.02)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden font-mono">
                    <div className="text-[15px] sm:text-[17px] leading-tight tracking-tight" style={{ color: theme.text }}>
                      Mario Camarena
                    </div>
                    <div className="text-[12px] mt-1" style={{ color: theme.textSoft }} translate="no">
                      @mariocamarena
                    </div>
                    <div className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-snug tracking-wider uppercase" style={{ color: theme.textSoft }}>
                      <motion.span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full mt-[4px] shrink-0"
                        style={{ backgroundColor: theme.terminalDots.green }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span>
                        <span style={{ color: theme.textMuted }}>Incoming · </span>
                        Textron Systems
                        <span className="block opacity-70" translate="no">IT Analyst Intern · Summer 2026</span>
                      </span>
                    </div>
                    <dl className="mt-2.5 space-y-1 text-[11px] tracking-wider uppercase" style={{ color: theme.textMuted }}>
                      <div className="flex items-center gap-1.5">
                        <dt>M.S. CS</dt>
                        <span aria-hidden="true" className="opacity-40">·</span>
                        <dd translate="no">Spring 2027</dd>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <dt>B.S. CS</dt>
                        <span aria-hidden="true" className="opacity-40">·</span>
                        <dd translate="no">Spring 2025</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Terminal-style metadata - aligned fields */}
                <address className="not-italic font-mono text-[12px] sm:text-[13px] space-y-2.5">
                  <div className="flex">
                    <span className="w-20 opacity-40 shrink-0" style={{ color: theme.text }}>role:</span>
                    <span style={{ color: theme.textSoft }}>Graduate Research Assistant</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 opacity-40 shrink-0" style={{ color: theme.text }}>location:</span>
                    <span style={{ color: theme.textSoft }}>UTRGV, Texas</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 opacity-40 shrink-0" style={{ color: theme.text }}>focus:</span>
                    <span style={{ color: theme.textSoft }}>ML, Computer Vision, AAM Security (GNNs)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 opacity-40 shrink-0" style={{ color: theme.text }}>status:</span>
                    <span className="flex items-center gap-1.5">
                      <motion.span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.terminalDots.green }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span style={{ color: theme.textSoft }}>Open to opportunities</span>
                    </span>
                  </div>
                </address>

                {/* Footer prompt with single blinking cursor */}
                <div className="pt-3 border-t" style={{ borderColor: theme.border }}>
                  <div className="flex items-center font-mono text-[11px]">
                    <span style={{ color: theme.textMuted }}>mario@portfolio:~$</span>
                    <motion.span
                      aria-hidden="true"
                      className="ml-1 w-2 h-3.5 inline-block"
                      style={{ backgroundColor: theme.text }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
