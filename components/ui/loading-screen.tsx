"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

// Initial command that triggers boot
const INIT_COMMAND = "init --boot"
const PROMPT = "mario@portfolio:~$ "

// Boot log lines with timecodes - dmesg style
// Line index 2 (gfx) will show [..] then flip to [ok]
const bootLines = [
  { time: "0000.012", text: "sys: self test", status: "ok" },
  { time: "0000.084", text: "io: bus scan", status: "ok" },
  { time: "0000.231", text: "gfx: display sync", status: "pending" }, // This one transitions
  { time: "0000.418", text: "net: link", status: "ok" },
  { time: "0000.602", text: "handoff: ready", status: "none" },
]

const DISPLAY_TIME = 1600
const PROGRESS_FILL_TIME = 950 // ms for progress bar to reach 100% (starts after typing)
const TYPING_SPEED = 25 // ms per character for command
const LINE_DELAY = 120 // ms between boot lines appearing
const PENDING_RESOLVE_DELAY = 150 // ms before [..] becomes [ok]

export const LoadingScreen = () => {
  const { theme, isDark, mode } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [typedCommand, setTypedCommand] = useState("")
  const [commandComplete, setCommandComplete] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [pendingResolved, setPendingResolved] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Static minimal view
      setTypedCommand(INIT_COMMAND)
      setCommandComplete(true)
      setVisibleLines(bootLines.length)
      setPendingResolved(true)
      setProgress(100)
      const exitTimer = setTimeout(() => setIsExiting(true), 400)
      return () => clearTimeout(exitTimer)
    }

    // Phase 1: Type out the command character by character
    let charIndex = 0
    const typeCommand = () => {
      if (charIndex < INIT_COMMAND.length) {
        setTypedCommand(INIT_COMMAND.slice(0, charIndex + 1))
        charIndex++
        return setTimeout(typeCommand, TYPING_SPEED)
      } else {
        // Command complete, trigger boot sequence after brief pause
        setCommandComplete(true)
        return null
      }
    }

    // Start typing after initial delay
    const startTyping = setTimeout(typeCommand, 150)

    return () => {
      clearTimeout(startTyping)
    }
  }, [])

  // Phase 2: Boot sequence starts after command is typed
  useEffect(() => {
    if (!commandComplete) return

    const lineTimers: NodeJS.Timeout[] = []

    // Small delay after command before boot lines appear
    const bootStartDelay = setTimeout(() => {
      // Reveal boot lines sequentially
      bootLines.forEach((_, index) => {
        const timer = setTimeout(() => {
          setVisibleLines(index + 1)

          // If this is the pending line, resolve it after a delay
          if (bootLines[index].status === "pending") {
            setTimeout(() => setPendingResolved(true), PENDING_RESOLVE_DELAY)
          }
        }, index * LINE_DELAY)
        lineTimers.push(timer)
      })
    }, 100)

    // Progress animation (0-100%)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + (100 / (PROGRESS_FILL_TIME / 30))
      })
    }, 30)

    // Start exit animation (needs to complete before page timer at 1600ms)
    // commandComplete fires at ~425ms, so exit should start ~1100ms after to begin at ~1525ms
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 1100)

    return () => {
      clearTimeout(bootStartDelay)
      lineTimers.forEach(clearTimeout)
      clearInterval(progressInterval)
      clearTimeout(exitTimer)
    }
  }, [commandComplete])

  const formatLine = (line: typeof bootLines[0], index: number) => {
    const dots = ".".repeat(Math.max(0, 18 - line.text.length))

    if (line.status === "none") {
      return `[${line.time}] ${line.text}`
    }

    if (line.status === "pending") {
      const statusText = pendingResolved ? "[ok]" : "[..]"
      return `[${line.time}] ${line.text} ${dots} ${statusText}`
    }

    return `[${line.time}] ${line.text} ${dots} [ok]`
  }

  return (
    <motion.div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-50 flex items-center justify-center lg:justify-end pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Backdrop - dims the hero behind */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: isDark ? '#000000' : theme.bg }}
        initial={{ opacity: 0.94 }}
        animate={{ opacity: isExiting ? 0 : 0.94 }}
        transition={{ duration: 0.3 }}
      />

      {/* Loader content - positioned to match hero text area */}
      <div className="relative z-10 w-full lg:w-[45%] px-6 lg:px-12 lg:pr-[8%]">
        <motion.div
          className="max-w-xl lg:ml-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* TOP RULE with labels */}
          <div className="flex items-center gap-2 mb-6 opacity-50">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.text }} />
            <div className="w-4 h-px" style={{ backgroundColor: theme.text }} />
            <span className="text-[9px] font-mono tracking-widest" style={{ color: theme.text }}>SYS</span>
            <div className="flex-1 h-px" style={{ backgroundColor: theme.text }} />
            <span className="text-[9px] font-mono tracking-widest" style={{ color: theme.text }}>BOOT</span>
            <div className="w-4 h-px" style={{ backgroundColor: theme.text }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.text }} />
          </div>

          {/* BOOT LOG - tight, left-aligned, monospace */}
          <div className="font-mono text-[13px] leading-tight min-h-[160px] text-left space-y-0.5">
            {/* Command prompt with typing animation */}
            <div className="h-6 flex items-center mb-2">
              <span style={{ color: theme.text }}>{PROMPT}</span>
              <span style={{ color: theme.text }}>{typedCommand}</span>
              {/* Blinking cursor while typing command */}
              {!commandComplete && (
                <motion.span
                  className="inline-block w-[2px] h-[14px] ml-0.5"
                  style={{ backgroundColor: theme.text }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
            </div>

            {/* Boot log lines appear after command */}
            {bootLines.map((line, index) => (
              <motion.div
                key={index}
                className="h-5 flex items-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: visibleLines > index ? 1 : 0,
                }}
                transition={{ duration: 0.1 }}
              >
                <span style={{ color: line.status === "none" ? theme.text : theme.textMuted }}>
                  {visibleLines > index && formatLine(line, index)}
                </span>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM RULE as PROGRESS BAR */}
          <div className="mt-6">
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.text }} />

              {/* Progress line container */}
              <div className="flex-1 relative h-px">
                {/* Base line */}
                <div className="absolute inset-0" style={{ backgroundColor: `${theme.text}33` }} />
                {/* Fill line */}
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: theme.text }}
                />
                {/* Scan dot at leading edge */}
                {progress < 100 && !shouldReduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute top-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: theme.text,
                      left: `${Math.min(progress, 100)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Progress label - BOOT XX% */}
              <span className="text-[9px] font-mono tracking-widest min-w-[52px] text-right" style={{ color: theme.text }}>
                BOOT {Math.floor(Math.min(progress, 100))}%
              </span>

              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.text }} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
