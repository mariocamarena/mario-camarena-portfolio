"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Github, ExternalLink, FileText, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/lib/useTheme"
import { useDialogA11y } from "@/lib/useDialogA11y"

interface ProjectProps {
  project: {
    id: number
    title: string
    description: string
    stack: string[]
    github: string
    demo?: string
    paper?: string
    image: string
  }
  index: number
}

// Get short project name for label
const getProjectLabel = (title: string): string => {
  if (title.includes("STABLES")) return "STABLES"
  if (title.includes("AD-SAM")) return "AD-SAM"
  if (title.includes("Portfolio")) return "PORTFOLIO"
  if (title.includes("PC Builds")) return "HARDWARE"
  if (title.includes("Hackathon")) return "HACKATHON"
  return title.split(" ")[0].toUpperCase()
}

// Pixel art chevron arrow component
const PixelArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
  <button
    onClick={(e) => {
      e.stopPropagation()
      onClick()
    }}
    aria-label={direction === "left" ? "Previous image" : "Next image"}
    className="group/arrow p-3 md:p-2 bg-black/60 border border-white/30 hover:border-white hover:bg-black/80 transition duration-150"
  >
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      className={direction === "right" ? "rotate-180" : ""}
    >
      <rect x="6" y="0" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="4" y="2" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="2" y="4" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="0" y="6" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="2" y="8" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="4" y="10" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
      <rect x="6" y="12" width="2" height="2" fill="currentColor" className="text-white/60 group-hover/arrow:text-white transition-colors" />
    </svg>
  </button>
)

// project card component
export const ProjectCard: React.FC<ProjectProps> = memo(({ project, index }) => {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const { dialogRef } = useDialogA11y({ open: isExpanded, onClose: () => setIsExpanded(false) })

  // Project image arrays - organized by project folder
  const imageMap: Record<string, string[]> = {
    "AD-SAM": ["/assets/project_01/ftsam1.png"],
    STABLES: ["/assets/project_02/stables3.png", "/assets/project_02/stables2.png", "/assets/project_02/stables1.png", "/assets/project_02/stables4.png"],
    "Hackathon": ["/assets/project_03/outlier_scores_chart.png", "/assets/project_03/all_profiles_combined.png", "/assets/project_03/outlier_verification.png"],
    "Custom PC Builds": ["/assets/project_05/pc1.jpg", "/assets/project_05/pc2.jpg", "/assets/project_05/pc3.jpg"],
    "Interactive Portfolio": ["/assets/project_06/1.png", "/assets/project_06/2.png"],
  }

  const getImages = () => {
    for (const key of Object.keys(imageMap)) {
      if (project.title.includes(key)) {
        return imageMap[key]
      }
    }
    return [project.image || "/placeholder.svg"]
  }

  const images = getImages()

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  // Image carousel auto-rotation (pause when expanded, hovered, paused, offscreen, or reduced-motion)
  useEffect(() => {
    if (images.length <= 1 || isExpanded || isHovered || isPaused || !isInView || shouldReduceMotion) return

    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [images.length, isExpanded, isHovered, isPaused, isInView, shouldReduceMotion])

  // IntersectionObserver — pause auto-rotation when the card scrolls offscreen
  useEffect(() => {
    if (!cardRef.current || typeof IntersectionObserver === "undefined") return
    const node = cardRef.current
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Reset hover when modal closes (body-scroll lock + Esc handled by useDialogA11y)
  useEffect(() => {
    if (!isExpanded) setIsHovered(false)
  }, [isExpanded])

  // Modal: left/right arrow keys page through images
  useEffect(() => {
    if (!isExpanded || images.length <= 1) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevImage()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        nextImage()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isExpanded, images.length])

  const isPCBuilds = project.title.includes("Custom PC Builds")
  const isResearch = !!project.paper // Research projects have papers
  const isProduct = !!project.demo // Product/App projects have demos
  const projectNumber = String(index + 1).padStart(2, "0")
  const projectLabel = getProjectLabel(project.title)

  // Limit visible tags on card (show max 4)
  const visibleTags = project.stack.slice(0, 4)
  const hasMoreTags = project.stack.length > 4

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden cursor-pointer"
        style={{
          backgroundColor: theme.bg,
          border: `1px solid ${theme.border}`,
          boxShadow: isDark ? '0 16px 32px rgba(0, 0, 0, 0.4)' : '0 16px 32px rgba(0, 0, 0, 0.15)',
        }}
        onClick={(e) => {
          // Don't open modal if click originated on a nested interactive element
          const target = e.target as HTMLElement
          if (target.closest("button, a")) return
          setIsExpanded(true)
        }}
        animate={isHovered ? {
          y: shouldReduceMotion ? 0 : -6,
          scale: shouldReduceMotion ? 1 : 1.025,
          borderColor: theme.borderHover,
          boxShadow: isDark ? "0 20px 40px rgba(0, 0, 0, 0.6)" : "0 20px 40px rgba(0, 0, 0, 0.2)",
        } : {
          y: 0,
          scale: 1,
          borderColor: theme.border,
          boxShadow: isDark ? "0 16px 32px rgba(0, 0, 0, 0.4)" : "0 16px 32px rgba(0, 0, 0, 0.15)",
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Subtle dot grid overlay - matches About terminals */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: isDark ? 0.015 : 0.03,
            backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Grid Overlay on Hover - matches Thesis Banner */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.03 : 0,
            backgroundImage: `
              linear-gradient(${theme.text}80 1px, transparent 1px),
              linear-gradient(90deg, ${theme.text}80 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l z-20" style={{ borderColor: `${theme.text}4d` }}></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r z-20" style={{ borderColor: `${theme.text}4d` }}></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l z-20" style={{ borderColor: `${theme.text}4d` }}></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r z-20" style={{ borderColor: `${theme.text}4d` }}></div>

        {/* Scan Double Effect */}
        {isHovered && !shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent, ${theme.text}66, transparent)` }}
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent, ${theme.text}66, transparent)` }}
              initial={{ top: "100%" }}
              animate={{ top: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}


        {/* Top Label Bar */}
        <div
          className="px-3 py-2 border-b flex items-center justify-between"
          style={{
            backgroundColor: theme.bg,
            borderColor: theme.border,
          }}
        >
          <span
            className="text-[10px] font-mono tracking-wider truncate"
            style={{ color: theme.textMuted }}
          >
            PROJECT {projectNumber} — {projectLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.red }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.yellow }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.green }} />
          </div>
        </div>

        {/* Image Section - Expands on hover */}
        <motion.div
          className="relative overflow-hidden"
          initial={false}
          animate={{
            height: isHovered && !shouldReduceMotion ? 220 : 128,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={images.length > 1 ? `${project.title} — screenshot ${currentImageIndex + 1} of ${images.length}` : project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover transition-transform duration-500 ${
              images[currentImageIndex].includes("stables3") ? "object-[50%_25%]" : "object-center"
            }`}
          />

          {/* Subtle overlay - fades on hover for better image visibility */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: isHovered ? 0.3 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
            }}
          />

          {/* Pixel Art Navigation Arrows - Always visible */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <PixelArrow direction="left" onClick={prevImage} />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <PixelArrow direction="right" onClick={nextImage} />
          </div>

          {/* Image dots indicator - Enlarged for accessibility */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  aria-label={`Go to image ${idx + 1}`}
                  aria-current={idx === currentImageIndex ? "true" : undefined}
                  className="p-1.5 -m-0.5 transition duration-200"
                >
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3"
                    style={{
                      backgroundColor: idx === currentImageIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Carousel pause/play toggle — only when multiple images */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPaused((p) => !p)
              }}
              aria-label={isPaused ? "Resume image rotation" : "Pause image rotation"}
              aria-pressed={isPaused}
              className="absolute top-2 right-2 z-20 px-1.5 py-0.5 font-mono text-[10px] leading-none bg-black/60 border border-white/30 text-white/80 hover:text-white hover:border-white transition duration-150"
              translate="no"
            >
              {isPaused ? "[▶]" : "[❚❚]"}
            </button>
          )}
        </motion.div>

        {/* Content Section */}
        <div className="p-3">
          {/* Title */}
          <h3
            className="text-sm font-bold mb-2 font-mono tracking-wide uppercase"
            style={{ color: theme.text }}
          >
            {project.title}
          </h3>

          {/* desc - expands on hover */}
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{
              height: isHovered && !shouldReduceMotion ? "auto" : "2.5rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: theme.textSoft }}
            >
              {project.description.replace(/\*\*(.*?)\*\*/g, "").trim()}
            </p>
          </motion.div>

          {/* tags - shows all on hover */}
          <motion.div
            className="flex flex-wrap gap-1.5 mt-3 mb-3 overflow-hidden"
            initial={false}
            animate={{
              height: isHovered && !shouldReduceMotion ? "auto" : "1.5rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {(isHovered ? project.stack : visibleTags).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase"
                style={{
                  backgroundColor: "transparent",
                  color: theme.textMuted,
                  border: `1px solid ${theme.borderDim}`,
                }}
              >
                {tech}
              </span>
            ))}
            {!isHovered && hasMoreTags && (
              <span
                className="px-2 py-0.5 text-[10px] font-mono tracking-wide"
                style={{ color: theme.textMuted }}
              >
                +{project.stack.length - 4}
              </span>
            )}
          </motion.div>

          {/* Action Buttons - Max 2 CTAs with primary/secondary styling */}
          <div className="flex gap-2 min-h-[32px]">
            {/* Primary CTA - Research: Paper, Product: Demo */}
            {isResearch ? (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-wider transition duration-200 group/btn"
                style={{ backgroundColor: theme.text, color: theme.bg }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <FileText className="w-3 h-3" />
                PAPER
              </a>
            ) : isProduct ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-wider transition duration-200 group/btn"
                style={{ backgroundColor: theme.text, color: theme.bg }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <ExternalLink className="w-3 h-3" />
                DEMO
              </a>
            ) : null}

            {/* Secondary CTA - Code (if has github) */}
            {project.github && !isPCBuilds && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center gap-1.5 px-3 py-1.5 bg-transparent font-mono text-[10px] tracking-wider transition duration-200 group/btn"
                style={{ border: `1px solid ${theme.text}80`, color: theme.text }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg; e.currentTarget.style.borderColor = theme.text }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text; e.currentTarget.style.borderColor = `${theme.text}80` }}
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                <Github className="w-3 h-3" />
                CODE
              </a>
            )}

            {/* Tertiary CTA - explicit modal opener (keyboard a11y; mouse users can also click anywhere on card) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(true)
              }}
              aria-haspopup="dialog"
              aria-expanded={isExpanded}
              aria-label={`Open ${project.title} details`}
              className="icon-link ml-auto flex items-center gap-1 px-2 py-1.5 font-mono text-[10px] tracking-wider"
            >
              DETAILS
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-2 right-4 flex gap-1 opacity-30">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: theme.text }}></div>
          ))}
        </div>

      </motion.div>

      {/* Expanded Modal — portaled to body to escape transform stacking context */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-24 md:p-8 md:pt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 backdrop-blur-sm"
                style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)' }}
                onClick={() => setIsExpanded(false)}
              />

              {/* Modal Content */}
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-${project.id}-title`}
                aria-describedby={`project-${project.id}-desc`}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.borderDim}`,
                  overscrollBehavior: 'contain',
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Modal Header */}
                <div
                  className="sticky top-0 z-10 px-4 py-3 border-b flex items-center justify-between"
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.borderDim,
                  }}
                >
                  <span
                    className="text-[10px] font-mono tracking-wider"
                    style={{ color: theme.textMuted }}
                  >
                    PROJECT {projectNumber} — {projectLabel}
                  </span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    aria-label="Close project details"
                    className="p-1 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" style={{ color: theme.textSoft }} />
                  </button>
                </div>

                {/* Full-size Image Section */}
                <div className="relative aspect-video bg-black">
                  <Image
                    src={images[currentImageIndex]}
                    alt={images.length > 1 ? `${project.title} — screenshot ${currentImageIndex + 1} of ${images.length}` : project.title}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-contain"
                  />

                  {/* Navigation Arrows - Always visible in modal */}
                  {images.length > 1 && (
                    <>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                        <PixelArrow direction="left" onClick={prevImage} />
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                        <PixelArrow direction="right" onClick={nextImage} />
                      </div>
                    </>
                  )}

                  {/* Image counter — announced to screen readers as user pages */}
                  {images.length > 1 && (
                    <div
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-[10px]"
                      style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: theme.textSoft }}
                    >
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Full Content */}
                <div className="p-6">
                  <h2
                    id={`project-${project.id}-title`}
                    className="text-xl font-bold mb-4 font-mono tracking-wide uppercase"
                    style={{ color: theme.text }}
                  >
                    {project.title}
                  </h2>

                  <p
                    id={`project-${project.id}-desc`}
                    className="text-sm mb-6 leading-relaxed text-pretty"
                    style={{ color: theme.textSoft }}
                  >
                    {project.description.replace(/\*\*(.*?)\*\*/g, "").trim()}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-3 block"
                      style={{ color: theme.text }}
                    >
                      TECH STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-[11px] font-mono tracking-wide uppercase"
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

                  {/* Action Buttons - Max 2 with primary/secondary */}
                  <div className="flex gap-3 pt-4 border-t" style={{ borderColor: theme.borderDim }}>
                    {/* Primary CTA */}
                    {isResearch ? (
                      <a
                        href={project.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-wider transition duration-200 group/btn"
                        style={{ backgroundColor: theme.text, color: theme.bg }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                      >
                        <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <FileText className="w-4 h-4" />
                        VIEW PAPER
                      </a>
                    ) : isProduct ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-wider transition duration-200 group/btn"
                        style={{ backgroundColor: theme.text, color: theme.bg }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                      >
                        <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <ExternalLink className="w-4 h-4" />
                        VIEW DEMO
                      </a>
                    ) : null}

                    {/* Secondary CTA - Code */}
                    {project.github && !isPCBuilds && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex items-center gap-2 px-4 py-2 bg-transparent font-mono text-[11px] tracking-wider transition duration-200 group/btn"
                        style={{ border: `1px solid ${theme.text}80`, color: theme.text }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg; e.currentTarget.style.borderColor = theme.text }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text; e.currentTarget.style.borderColor = `${theme.text}80` }}
                      >
                        <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ borderColor: theme.text }}></span>
                        <Github className="w-4 h-4" />
                        VIEW CODE
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'
