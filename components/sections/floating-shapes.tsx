"use client"

import { useRef, useEffect, useState } from "react"
import { theme } from "@/lib/theme"

// Animated background elements
export const FloatingShapes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()

    // Grid layout for distributed positioning
    const gridCols = 4
    const gridRows = 3
    const cellWidth = canvas.width / gridCols
    const cellHeight = canvas.height / gridRows

    const elements: Array<{
      x: number
      y: number
      size: number
      color: string
      dx: number
      dy: number
      rotation: number
      rotSpeed: number
      isSquare: boolean
    }> = []

    // Initialize floating elements
    for (let i = 0; i < 12; i++) {
      // Calculate grid position
      const col = i % gridCols
      const row = Math.floor(i / gridCols) % gridRows

      // Position within grid cell
      const padding = 50
      const baseX = col * cellWidth + padding
      const baseY = row * cellHeight + padding
      const maxX = (col + 1) * cellWidth - padding
      const maxY = (row + 1) * cellHeight - padding

      // Random positioning within cell bounds
      const x = baseX + Math.random() * (maxX - baseX)
      const y = baseY + Math.random() * (maxY - baseY)

      // Random size
      const size = Math.random() * 40 + 15

      elements.push({
        x,
        y,
        size,
        color: [theme.primary, theme.secondary, theme.success][Math.floor(Math.random() * 3)],
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        isSquare: Math.random() > 0.5,
      })
    }

    let frameId: number

    function draw() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((el) => {
        // Update position and rotation
        el.x += el.dx
        el.y += el.dy
        el.rotation += el.rotSpeed

        // Edge collision detection
        if (el.x < 0) {
          el.x = 0
          el.dx = Math.abs(el.dx)
        } else if (el.x > canvas.width - el.size) {
          el.x = canvas.width - el.size
          el.dx = -Math.abs(el.dx)
        }

        if (el.y < 0) {
          el.y = 0
          el.dy = Math.abs(el.dy)
        } else if (el.y > canvas.height - el.size) {
          el.y = canvas.height - el.size
          el.dy = -Math.abs(el.dy)
        }

        // draw the shape
        ctx.save()
        ctx.translate(el.x + el.size / 2, el.y + el.size / 2)
        ctx.rotate(el.rotation)

        ctx.fillStyle = el.color + "15"
        ctx.strokeStyle = el.color + "30"
        ctx.lineWidth = 1.5

        if (el.isSquare) {
          ctx.fillRect(-el.size / 2, -el.size / 2, el.size, el.size)
          ctx.strokeRect(-el.size / 2, -el.size / 2, el.size, el.size)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, el.size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        }

        ctx.restore()
      })

      // basic collision detection
      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const a = elements[i]
          const b = elements[j]

          // get centers of both shapes
          const ax = a.x + a.size / 2
          const ay = a.y + a.size / 2
          const bx = b.x + b.size / 2
          const by = b.y + b.size / 2

          // distance between them
          const dx = bx - ax
          const dy = by - ay
          const distance = Math.sqrt(dx * dx + dy * dy)

          // minimum distance before collision (sum of radii)
          const minDistance = (a.size + b.size) / 2

          // if colliding
          if (distance < minDistance) {
            // calculate collision normal
            const nx = dx / distance
            const ny = dy / distance

            // calculate minimum translation distance
            const mtd = (minDistance - distance) / 2

            // push-pull based on size (larger objects move less)
            const totalMass = a.size + b.size
            const aWeight = b.size / totalMass
            const bWeight = a.size / totalMass

            // apply position correction
            a.x -= nx * mtd * aWeight
            a.y -= ny * mtd * aWeight
            b.x += nx * mtd * bWeight
            b.y += ny * mtd * bWeight

            // swap velocities sometimes for bounce effect
            // but not always so they keep moving naturally
            if (Math.random() < 0.3) {
              const tempDx = a.dx
              const tempDy = a.dy
              a.dx = b.dx
              a.dy = b.dy
              b.dx = tempDx
              b.dy = tempDy
            }
          }
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    draw()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [ready])

  if (!ready) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        background: `radial-gradient(ellipse at center, ${theme.grad2} 0%, ${theme.bg} 70%)`,
      }}
    />
  )
} 