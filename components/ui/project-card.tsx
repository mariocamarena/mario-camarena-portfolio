"use client"

import type React from "react"
import { useState, useEffect, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, FileText, X } from "lucide-react"
import Image from "next/image"

const theme = {
  bg: "#0a0a0a",
  surface: "#0f0f0f",
  elevated: "#1a1a1a",
  border: "#ffffff",
  borderDim: "#333333",
  text: "#f5f5f5",
  textSoft: "#a0a0a0",
  textMuted: "#666666",
  accent: "#ffffff",
}

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
    className="group/arrow p-2 bg-black/60 border border-white/30 hover:border-white hover:bg-black/80 transition-all duration-150"
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  // Image carousel auto-rotation (pause when expanded)
  useEffect(() => {
    if (images.length <= 1 || isExpanded) return

    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [images.length, isExpanded])

  // lock scroll when modal open
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isExpanded])

  // Close modal on scroll (triggered by nav clicks)
  useEffect(() => {
    if (!isExpanded) return

    const handleScroll = () => {
      setIsExpanded(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExpanded])

  const handleDemo = async () => {
    if (!project.demo) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    window.open(project.demo, "_blank")
  }

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
          backgroundColor: '#0a0a0a',
          border: '1px solid #333333',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
        }}
        onClick={() => setIsExpanded(true)}
        animate={isHovered ? {
          y: -6,
          scale: 1.025,
          borderColor: theme.border,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        } : {
          y: 0,
          scale: 1,
          borderColor: '#333333',
          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.4)",
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Subtle dot grid overlay - matches About terminals */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: 0.015,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 z-20"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 z-20"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 z-20"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 z-20"></div>

        {/* Scan Double Effect */}
        {isHovered && (
          <>
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
              initial={{ top: "100%" }}
              animate={{ top: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}


        {/* Top Label Bar */}
        <div
          className="px-4 py-2 border-b flex items-center justify-between"
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
        </div>

        {/* Image Section */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${project.title}`}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              images[currentImageIndex].includes("stables3") ? "object-[50%_25%]" : "object-center"
            }`}
          />

          {/* Subtle overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
            }}
          />

          {/* Pixel Art Navigation Arrows */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <PixelArrow direction="left" onClick={prevImage} />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <PixelArrow direction="right" onClick={nextImage} />
          </div>

          {/* Image dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className="w-1.5 h-1.5 transition-all duration-200"
                  style={{
                    backgroundColor: idx === currentImageIndex ? theme.accent : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Title */}
          <h3
            className="text-sm font-bold mb-2 font-mono tracking-wide uppercase"
            style={{ color: theme.text }}
          >
            {project.title}
          </h3>

          {/* Description - fixed 2 lines */}
          <p
            className="text-xs mb-3 line-clamp-2 leading-relaxed"
            style={{ color: theme.textSoft }}
          >
            {project.description.replace("**You're viewing this site right now!**", "").trim()}
          </p>

          {/* Tech Stack - limited tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {visibleTags.map((tech: string) => (
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
            {hasMoreTags && (
              <span
                className="px-2 py-0.5 text-[10px] font-mono tracking-wide"
                style={{ color: theme.textMuted }}
              >
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons - Max 2 CTAs with primary/secondary styling */}
          <div className="flex gap-2 min-h-[32px]">
            {/* Primary CTA - Research: Paper, Product: Demo */}
            {isResearch ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.paper, "_blank")
                }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-wider bg-white text-black hover:bg-white/90 transition-all duration-200 group/btn"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                <FileText className="w-3 h-3" />
                PAPER
              </button>
            ) : isProduct ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDemo()
                }}
                disabled={loading}
                className="relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-wider bg-white text-black hover:bg-white/90 transition-all duration-200 group/btn"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                {loading ? (
                  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="w-3 h-3" />
                    DEMO
                  </>
                )}
              </button>
            ) : null}

            {/* Secondary CTA - Code (if has github) */}
            {project.github && !isPCBuilds && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.github, "_blank")
                }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 bg-transparent font-mono text-[10px] tracking-wider border border-white/60 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 group/btn"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                <Github className="w-3 h-3" />
                CODE
              </button>
            )}
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-2 right-4 flex gap-1 opacity-30">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
          ))}
        </div>

      </motion.div>

      {/* Expanded Modal */}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.borderDim}`,
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
                  className="p-1 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" style={{ color: theme.textSoft }} />
                </button>
              </div>

              {/* Full-size Image Section */}
              <div className="relative aspect-video bg-black">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${project.title}`}
                  fill
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

                {/* Image counter */}
                {images.length > 1 && (
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 font-mono text-[10px]"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: theme.textSoft }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Full Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-4 font-mono tracking-wide uppercase"
                  style={{ color: theme.text }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: theme.textSoft }}
                >
                  {project.description.replace("**You're viewing this site right now!**", "").trim()}
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.paper, "_blank")
                      }}
                      className="relative flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-wider bg-white text-black hover:bg-white/90 transition-all duration-200 group/btn"
                    >
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <FileText className="w-4 h-4" />
                      VIEW PAPER
                    </button>
                  ) : isProduct ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demo, "_blank")
                      }}
                      className="relative flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-wider bg-white text-black hover:bg-white/90 transition-all duration-200 group/btn"
                    >
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <ExternalLink className="w-4 h-4" />
                      VIEW DEMO
                    </button>
                  ) : null}

                  {/* Secondary CTA - Code */}
                  {project.github && !isPCBuilds && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.github, "_blank")
                      }}
                      className="relative flex items-center gap-2 px-4 py-2 bg-transparent font-mono text-[11px] tracking-wider border border-white/60 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 group/btn"
                    >
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <Github className="w-4 h-4" />
                      VIEW CODE
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'
