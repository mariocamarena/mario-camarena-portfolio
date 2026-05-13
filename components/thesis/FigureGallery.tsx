"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Figure } from '@/lib/thesis-types'
import { useDialogA11y } from "@/lib/useDialogA11y"

function Lightbox({ figure, onClose }: { figure: Figure; onClose: () => void }) {
  const { dialogRef } = useDialogA11y({ open: true, onClose })
  const captionId = `lightbox-caption-${figure.src.replace(/[^a-z0-9]/gi, '-')}`
  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={captionId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)', overscrollBehavior: 'contain' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 p-2 transition-colors"
        style={{ color: 'var(--th-text-soft)' }}
      >
        <X className="w-6 h-6" />
      </button>
      <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={figure.src}
          alt={figure.alt}
          width={1600}
          height={1200}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
        <p id={captionId} className="font-mono text-xs text-center mt-3" style={{ color: 'var(--th-text-muted)' }}>{figure.caption}</p>
      </div>
    </motion.div>
  )
}

export function FigureGallery({ figures }: { figures: Figure[] }) {
  const [lightboxFigure, setLightboxFigure] = useState<Figure | null>(null)

  return (
    <>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        {figures.map((figure) => (
          <button
            key={figure.src}
            type="button"
            aria-label={`Open figure: ${figure.alt}`}
            className={`text-left rounded-lg p-3 cursor-pointer transition-colors ${
              figure.layout === 'full' ? 'md:col-span-2' : ''
            }`}
            style={{
              backgroundColor: 'var(--th-bg-subtle)',
              border: '1px solid var(--th-border)',
            }}
            onClick={() => setLightboxFigure(figure)}
          >
            <Image
              src={figure.src}
              alt={figure.alt}
              width={800}
              height={600}
              className="w-full h-auto rounded"
              loading="lazy"
            />
            <p className="font-mono text-[11px] mt-2" style={{ color: 'var(--th-text-dim)' }}>{figure.caption}</p>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {lightboxFigure && (
          <Lightbox figure={lightboxFigure} onClose={() => setLightboxFigure(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
