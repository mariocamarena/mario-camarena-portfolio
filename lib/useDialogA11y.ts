"use client"

import { useEffect, useRef } from "react"

interface UseDialogA11yOptions {
  open: boolean
  onClose: () => void
  lockScroll?: boolean
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useDialogA11y({ open, onClose, lockScroll = true }: UseDialogA11yOptions) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousActiveRef.current = document.activeElement as HTMLElement

    const dialog = dialogRef.current
    if (!dialog) return

    const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    const firstFocusable = focusable[0] ?? dialog
    if (firstFocusable === dialog && !dialog.hasAttribute('tabindex')) {
      dialog.setAttribute('tabindex', '-1')
    }

    const timer = setTimeout(() => firstFocusable.focus(), 0)
    return () => {
      clearTimeout(timer)
      previousActiveRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !lockScroll) return
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [open, lockScroll])

  return { dialogRef }
}
