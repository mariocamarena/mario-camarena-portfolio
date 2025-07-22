"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Spinner } from "./spinner"
import { useIsMobile } from "@/hooks/use-mobile"
import { theme } from "@/lib/theme"

interface ProjectProps {
  project: {
    id: number
    title: string
    description: string
    stack: string[]
    github: string
    demo?: string
    image: string
  }
  index: number
}

// Project showcase cards with flip animation
export const ProjectCard: React.FC<ProjectProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [flipped, setFlipped] = useState(false) // mobile flip state
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // carousel index
  const isMobile = useIsMobile()

  // Magnetic button state
  const codeButtonRef = useRef<HTMLButtonElement>(null)
  const demoButtonRef = useRef<HTMLButtonElement>(null)
  const codeX = useMotionValue(0)
  const codeY = useMotionValue(0)
  const demoX = useMotionValue(0)
  const demoY = useMotionValue(0)

  // Project image arrays
  const stablesImages = [
    "/assets/stables3.png",
    "/assets/stables2.png", 
    "/assets/stables1.png",
    "/assets/stables4.png"
  ]

  const portfolioImages = [
    "/assets/website1.png",
    "/assets/website2.png"
  ]

  const pcBuildsImages = [
    "/assets/pc1.jpg",
    "/assets/pc2.jpg",
    "/assets/pc3.jpg"
  ]

  const ftsamImages = [
    "/assets/ftsam1.png"
  ]

  const isStables = project.title.includes("STABLES")
  const isPortfolio = project.title.includes("Interactive Portfolio")
  const isPCBuilds = project.title.includes("Custom PC Builds")
  const isFTSAM = project.title.includes("FT-SAM")
  const imagesToShow = isStables ? stablesImages : isPortfolio ? portfolioImages : isPCBuilds ? pcBuildsImages : isFTSAM ? ftsamImages : [project.image || "/placeholder.svg"]

  const handleDemo = async (e?: React.MouseEvent) => {
    e?.stopPropagation() // don't trigger card flip
    if (!project.demo) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    window.open(project.demo, "_blank")
  }

  const handleCardClick = () => {
    if (isMobile) {
      setFlipped(!flipped)
    }
  }

  // Magnetic movement handlers for code button
  const handleCodeMove = useCallback(
    (e: React.MouseEvent) => {
      if (!codeButtonRef.current || isMobile) return

      const rect = codeButtonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const distance = Math.sqrt(distX ** 2 + distY ** 2)
      const maxDist = 100

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist
        codeX.set(distX * strength * 0.3)
        codeY.set(distY * strength * 0.3)
      }
    },
    [codeX, codeY, isMobile]
  )

  const handleCodeLeave = useCallback(() => {
    codeX.set(0)
    codeY.set(0)
  }, [codeX, codeY])

  // Magnetic movement handlers for demo button
  const handleDemoMove = useCallback(
    (e: React.MouseEvent) => {
      if (!demoButtonRef.current || isMobile) return

      const rect = demoButtonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const distance = Math.sqrt(distX ** 2 + distY ** 2)
      const maxDist = 100

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist
        demoX.set(distX * strength * 0.3)
        demoY.set(distY * strength * 0.3)
      }
    },
    [demoX, demoY, isMobile]
  )

  const handleDemoMoveLeave = useCallback(() => {
    demoX.set(0)
    demoY.set(0)
  }, [demoX, demoY])

  // Image carousel auto-rotation
  useEffect(() => {
    if (!isStables && !isPortfolio && !isPCBuilds && !isFTSAM) return
    
    const imageCount = isStables ? stablesImages.length : isPortfolio ? portfolioImages.length : isPCBuilds ? pcBuildsImages.length : ftsamImages.length
    
    // Skip if only one image
    if (imageCount <= 1) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount)
    }, 3000)

    return () => clearInterval(interval)
  }, [isStables, isPortfolio, isPCBuilds, isFTSAM, stablesImages.length, portfolioImages.length, pcBuildsImages.length, ftsamImages.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      viewport={{ once: true }}
      className="group relative"
      style={{ perspective: "1000px", cursor: isMobile ? 'pointer' : 'default' }}
      onHoverStart={!isMobile ? () => setHovered(true) : undefined}
      onHoverEnd={!isMobile ? () => setHovered(false) : undefined}
      onClick={handleCardClick}
    >
      <motion.div
        animate={{ 
          rotateY: (isMobile ? flipped : hovered) ? 180 : 0 
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative w-full h-96"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* front of card */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${theme.surface}, ${theme.elevated})`,
            border: `1px solid ${theme.border}`,
          }}
          whileHover={{
            boxShadow: `0 25px 50px ${theme.primary}20`,
            borderColor: theme.primary + "60",
          }}
        >
          <div className="relative h-48 overflow-hidden">
            {(isStables || isPortfolio || isPCBuilds || isFTSAM) ? (
              <>
                <Image
                  src={imagesToShow[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                    imagesToShow[currentImageIndex].includes('stables3.png') 
                      ? 'object-[50%_25%]' 
                      : 'object-center'
                  }`}
                  key={currentImageIndex} // smooth transitions
                />
                
                {/* Image dots indicator - only show if multiple images */}
                {imagesToShow.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {imagesToShow.map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-2 h-2 rounded-full cursor-pointer"
                        style={{
                          backgroundColor: index === currentImageIndex ? theme.primary : theme.primary + "40"
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}

            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, ${theme.overlay}90, transparent)`,
              }}
              animate={(isMobile ? flipped : hovered) ? { opacity: [0.9, 0.5, 0.9] } : { opacity: 0.9 }}
              transition={{ duration: 2, repeat: (isMobile ? flipped : hovered) ? Number.POSITIVE_INFINITY : 0 }}
            />

            {/* Mobile tap indicator */}
            {isMobile && !flipped && (
              <motion.div
                className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: theme.primary + "90",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                Tap to flip
              </motion.div>
            )}
          </div>

          <div className="p-6">
            <motion.h3
              className="text-xl font-bold mb-2"
              style={{ color: theme.text }}
              whileHover={{ color: theme.primary }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-sm line-clamp-3" style={{ color: theme.textSoft }}>
              {project.description.startsWith('**You\'re viewing this site right now!**') ? (
                <>
                  <span className="font-bold" style={{ color: theme.primary }}>
                    You're viewing this site right now!
                  </span>
                  {' ' + project.description.replace('**You\'re viewing this site right now!**', '').trim()}
                </>
              ) : (
                project.description
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.slice(0, 3).map((tech: string, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full font-medium"
                  style={{
                    backgroundColor: theme.primary + "20",
                    color: theme.primary,
                    border: `1px solid ${theme.primary}40`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + techIndex * 0.1, type: "spring" }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: theme.primary + "40",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          <motion.h3
            className="text-2xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-white/90 mb-6 leading-relaxed text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2 mb-6 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {project.stack.map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">
                {tech}
              </span>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
                        {!project.title.includes("Custom PC Builds") && (
              <motion.button
                ref={codeButtonRef}
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.github, "_blank")
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg text-sm font-medium backdrop-blur-sm relative overflow-hidden"
                style={{
                  x: codeX,
                  y: codeY,
                }}
                onMouseMove={!isMobile ? handleCodeMove : undefined}
                onMouseLeave={handleCodeLeave}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Code
                </span>
              </motion.button>
            )}
            {project.demo && project.demo.length > 0 && (
              <motion.button
                ref={demoButtonRef}
                onClick={handleDemo}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium relative overflow-hidden"
                style={{
                  x: demoX,
                  y: demoY,
                }}
                onMouseMove={!isMobile ? handleDemoMove : undefined}
                onMouseLeave={handleDemoMoveLeave}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(0, 212, 255, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                disabled={loading}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </>
                  )}
                </span>
              </motion.button>
            )}
          </motion.div>

          {/* Mobile tap to close indicator */}
          {isMobile && flipped && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Tap to close
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
} 