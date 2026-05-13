"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { Dithering } from "@paper-design/shaders-react"
import { useTheme } from "@/lib/useTheme"

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
      {/* Corner Frame Accents - softer on surface bg */}
      <div aria-hidden="true" className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}33` }}></div>
      <div aria-hidden="true" className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}33` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 left-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}33` }}></div>
      <div aria-hidden="true" className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}33` }}></div>

      {/* Subtle dithering background effect */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: isDark ? 0.25 : 0.3 }}>
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={theme.bg}
          colorFront={isDark ? "#4a4a4a" : "#8a8a8a"}
          shape="simplex"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={2}
          rotation={0}
          speed={shouldReduceMotion ? 0 : 0.05}
        />
      </div>
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
              className="font-mono text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`▄▀█ █▄▄ █▀█ █ █ ▀█▀
█▀█ █▄█ █▄█ █▄█ ░█░`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[60px] h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>BIO.2026</span>
              <div className="flex-1 max-w-[60px] h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
          </div>
        </motion.div>

        {/* Two-terminal grid - aligned pair */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start">
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
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#ff5f56' }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#ffbd2e' }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#27ca40' }} />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 space-y-5 relative">
                {/* Background */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    BACKGROUND
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
                    M.S. Computer Science @ UTRGV, expected May 2027. I started building systems through custom PCs, hardware repair, and small software projects. Over time, that turned into full-stack development, applied AI, and research work.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    This summer, I’ll be joining Textron Systems in Slidell, Louisiana as an IT Analyst Intern. The role sits at the intersection of software development, cybersecurity, infrastructure IT, and front-facing business support, which fits well with the way I’ve been building across both research and applied systems.
                  </p>
                </div>

                {/* Research */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    RESEARCH
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
                    I’m an AI Research Assistant at UTRGV MECIS (NSF CREST), where I work on computer vision, transportation AI, and graph-based risk modeling.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    I lead AD-SAM, a dual-encoder urban-scene segmentation model for autonomous-driving environments. The work focuses on improving segmentation with deformable decoding, hybrid losses, and stronger class-level performance across urban scenes.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    My current M.S. thesis is NASA-funded and focuses on AAM flight security risk modeling. Right now, the project models aircraft interactions from OpenSky ADS-B data as dynamic graph events, using surrogate safety signals like proximity and encounter geometry to study risk in future airspace systems.
                  </p>
                </div>

                {/* Builds */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    BUILDS
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
                    STABLES: project lead + lead developer for a parking management app covering 800+ parking spots across 3 lots. Built the Node.js/Express + PostgreSQL backend for live availability, reservations, spatial checks, and double-booking prevention.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    This portfolio: built with Next.js, TypeScript, Tailwind, Framer Motion, and PostgreSQL. Designed as a terminal-inspired personal system with ASCII visuals, responsive animations, a full-stack contact pipeline, and an admin dashboard.
                  </p>
                </div>

                {/* Combined Skills section */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-3 block" style={{ color: theme.text }}>
                    SKILLS
                  </span>
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
            className="lg:sticky lg:top-24 lg:self-start"
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
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#ff5f56' }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#ffbd2e' }} />
                  <div className={`${terminalChrome.dotSize} rounded-full`} style={{ backgroundColor: '#27ca40' }} />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 space-y-5 relative">
                {/* Photo with file label */}
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[9px] font-mono opacity-40 block mb-1" style={{ color: theme.text }}>
                      profile.png
                    </span>
                    <div
                      className="w-24 h-24 overflow-hidden border"
                      style={{ borderColor: theme.border }}
                    >
                      <Image
                        src="/mc.png"
                        alt="Mario Camarena"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <pre
                      aria-hidden="true"
                      className="font-mono text-[8px] sm:text-[9px] leading-[1.15] tracking-tight"
                      style={{ color: theme.text }}
                    >{`█▀▄▀█ ▄▀█ █▀█ █ █▀█
█░▀░█ █▀█ █▀▄ █ █▄█

█▀▀ ▄▀█ █▀▄▀█ ▄▀█ █▀█ █▀▀ █▄░█ ▄▀█
█▄▄ █▀█ █░▀░█ █▀█ █▀▄ ██▄ █░▀█ █▀█`}</pre>
                  </div>
                </div>

                {/* Terminal-style metadata - aligned fields */}
                <div className="font-mono text-[11px] sm:text-[12px] space-y-2">
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
                        style={{ backgroundColor: '#27ca40' }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span style={{ color: theme.textSoft }}>Open to opportunities</span>
                    </span>
                  </div>
                </div>

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
