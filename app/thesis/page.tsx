"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThesisPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Back Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Centered WIP Banner */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {/* Banner stripe */}
          <div className="relative py-16 border-y border-white/20">
            {/* Scanning line effect */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4 opacity-40">
                <div className="w-12 h-px bg-white" />
                <span className="text-[10px] font-mono tracking-widest">WORK IN PROGRESS</span>
                <div className="w-12 h-px bg-white" />
              </div>

              <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-wider text-white uppercase mb-6">
                COMING SOON
              </h1>

              <p className="text-white/40 font-mono text-sm max-w-md mx-auto px-6">
                NASA AAM Flight-Graph Security Thesis
              </p>

              {/* Blinking cursor */}
              <div className="flex items-center justify-center gap-1 mt-8">
                <motion.div
                  className="w-2 h-4 bg-white"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
