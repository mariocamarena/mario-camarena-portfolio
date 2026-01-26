"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Dithering } from "@paper-design/shaders-react"
import { theme } from "@/lib/theme"

// Shared terminal chrome styling
const terminalChrome = {
  border: "1px solid #333333",
  borderRadius: "0px",
  headerPadding: "px-4 py-2",
  headerBg: theme.bg,
  headerBorder: "#333333",
  titleStyle: "text-[10px] font-mono tracking-wider",
  dotSize: "w-2.5 h-2.5",
  dotGap: "gap-1.5",
}

// Skills data - combined from languages, frameworks, tools
const skills = [
  "PYTHON", "TYPESCRIPT/JAVASCRIPT", "DART", "C++", "RUST",
  "PYTORCH", "TENSORFLOW", "CUDA",
  "NEXT.JS/REACT", "FLUTTER", "NODE/EXPRESS", "TAILWIND", "FRAMER MOTION",
  "POSTGRESQL", "GIT/GITHUB", "GCP", "LINUX"
]

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative overflow-hidden" style={{ backgroundColor: theme.surface }}>
      {/* Corner Frame Accents - softer on surface bg */}
      <div className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/20 z-20"></div>
      <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/20 z-20"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/20 z-20"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/20 z-20"></div>

      {/* Subtle dithering background effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={theme.bg}
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
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">○</span>
              <div className="w-8 h-px bg-white"></div>
            </div>
            <pre
              className="font-mono text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`▄▀█ █▄▄ █▀█ █ █ ▀█▀
█▀█ █▄█ █▄█ █▄█ ░█░`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[60px] h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">BIO.2026</span>
              <div className="flex-1 max-w-[60px] h-px bg-white"></div>
            </div>
          </div>
        </motion.div>

        {/* Two-terminal grid - aligned pair */}
        <div className="grid md:grid-cols-[1fr_0.85fr] gap-6 items-start">
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
                  opacity: 0.015,
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
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
                    M.S. Computer Science @ UTRGV (Expected May 2027). I've been building systems since I was about 10, custom PCs and hardware.
                  </p>
                </div>

                {/* Research */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    RESEARCH
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
                    I'm an AI Research Assistant at UTRGV MECIS (NSF CREST). I lead AD-SAM, a dual-encoder urban-scene segmentation model: +29% accuracy improvement, using a deformable decoder + hybrid losses. I also did a Summer 2024 ML REU at UC Riverside, benchmarking segmentation baselines.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    Current focus: my Master's thesis on NASA-funded AAM flight-graph security, modeling flight operations as graphs and studying how to detect and reduce security risks in those systems.
                  </p>
                </div>

                {/* Products */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2 block" style={{ color: theme.text }}>
                    PRODUCTS
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
                    STABLES: project lead + lead developer for a parking app managing 800+ spots across 3 lots (live availability + reservations). Built the Node/Express + PostgreSQL backend.
                  </p>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: theme.textSoft }}>
                    This portfolio: Next.js + TypeScript + PostgreSQL contact pipeline with an admin dashboard.
                  </p>
                </div>

                {/* Combined Skills section */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-3 block" style={{ color: theme.text }}>
                    SKILLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase transition-colors duration-150 hover:border-white/50"
                        style={{
                          backgroundColor: "transparent",
                          color: theme.textMuted,
                          border: `1px solid ${theme.borderDim}`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer prompt with blinking cursor */}
                <div className="pt-3 border-t" style={{ borderColor: '#333333' }}>
                  <div className="flex items-center font-mono text-[11px]">
                    <span style={{ color: theme.textMuted }}>cat ~/README.md</span>
                    <motion.span
                      className="ml-1 w-2 h-3.5 inline-block"
                      style={{ backgroundColor: theme.text }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
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
                  opacity: 0.015,
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
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
                      style={{ borderColor: '#333333' }}
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
                  <div className="flex-1">
                    <pre
                      className="font-mono text-[8px] sm:text-[9px] leading-[1.15] tracking-tight"
                      style={{ color: theme.text }}
                    >{`█▀▄▀█ ▄▀█ █▀█ █ █▀█
█░▀░█ █▀█ █▀▄ █ █▄█

█▀▀ ▄▀█ █▀▄▀█ ▄▀█ █▀█ █▀▀ █▄░█ ▄▀█
█▄▄ █▀█ █░▀░█ █▀█ █▀▄ ██▄ █░▀█ █▀█`}</pre>
                  </div>
                </div>

                {/* Terminal-style metadata - aligned fields */}
                <div className="font-mono text-[11px] space-y-2">
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
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#27ca40' }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span style={{ color: theme.textSoft }}>Open to opportunities</span>
                    </span>
                  </div>
                </div>

                {/* Footer prompt with single blinking cursor */}
                <div className="pt-3 border-t" style={{ borderColor: '#333333' }}>
                  <div className="flex items-center font-mono text-[11px]">
                    <span style={{ color: theme.textMuted }}>mario@portfolio:~$</span>
                    <motion.span
                      className="ml-1 w-2 h-3.5 inline-block"
                      style={{ backgroundColor: theme.text }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
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
