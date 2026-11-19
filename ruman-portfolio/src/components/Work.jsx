import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { CATEGORIES, PROJECTS } from '../data'

function Card({ p, onOpen }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imgLoaded, setImgLoaded] = useState(false)

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -7,
      y: ((e.clientX - r.left) / r.width - 0.5) * 7
    })
  }

  const aspectClass =
    p.aspect === 'landscape'
      ? 'aspect-video'
      : p.aspect === 'standard'
      ? 'aspect-[3/4]'
      : 'aspect-[9/16]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative break-inside-avoid mb-6"
    >
      <button
        type="button"
        onMouseMove={move}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={() => onOpen(p)}
        aria-label={`Play ${p.title} (${p.category})`}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className={`group glass w-full overflow-hidden text-left relative rounded-2xl block border border-white/10 hover:border-[var(--glow)]/60 shadow-lg hover:shadow-[0_0_32px_rgba(108,92,255,0.35)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--glow)] cursor-pointer ${aspectClass}`}
      >
        {/* Poster Thumbnail Image */}
        <img
          src={p.thumb}
          alt={p.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            if (p.thumbFallback && e.currentTarget.src !== p.thumbFallback) {
              e.currentTarget.src = p.thumbFallback
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-85'
          }`}
        />

        {/* Cinematic Vignette & Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-80 group-hover:opacity-70 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges (Category & Duration) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/90">
            {p.category}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[var(--mute)]">
            {p.duration}
          </span>
        </div>

        {/* Center Glowing Play Button */}
        <div className="absolute inset-0 grid place-items-center z-10 pointer-events-none">
          <div className="grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:border-[var(--glow)] group-hover:shadow-[0_0_28px_rgba(108,92,255,0.7)]">
            <Play size={22} className="ml-0.5 fill-white" />
          </div>
        </div>

        {/* Bottom Metadata Info */}
        <div className="absolute bottom-3.5 inset-x-3.5 z-10 pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/75">
              {p.aspectRatioText}
            </span>
          </div>
          <h3 className="font-bold text-white text-base sm:text-lg leading-snug drop-shadow-md">
            {p.title}
          </h3>
          {p.description && (
            <p className="text-xs text-[var(--mute)] mt-1 line-clamp-2 leading-relaxed opacity-90 group-hover:text-white/85 transition-colors">
              {p.description}
            </p>
          )}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--glow)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Watch Video</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function Work() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)

  const list =
    cat === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === cat || (p.tags && p.tags.includes(cat)))

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="work" className="sec">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">MY WORK</h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--mute)] max-w-md">
          Cinematic video edits, viral social reels, slow-motion sequences, and wedding highlights.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter portfolio categories">
        {CATEGORIES.map((c) => {
          const count =
            c === 'All'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === c || (p.tags && p.tags.includes(c))).length
          return (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`btn text-xs sm:text-sm !py-2 !px-4 transition-all cursor-pointer ${
                cat === c ? 'btn-glow' : 'btn-ghost'
              }`}
            >
              <span>{c}</span>
              <span className={`text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full ${
                cat === c ? 'bg-white/25 text-white' : 'bg-white/10 text-[var(--mute)]'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Multi-Column Masonry Video Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <Card key={p.id} p={p} onOpen={setOpen} />
          ))}
        </AnimatePresence>
      </div>

      {/* Modern Vimeo Playback Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-full mx-auto flex flex-col justify-center my-auto ${
                open.aspect === 'landscape'
                  ? 'max-w-5xl'
                  : open.aspect === 'standard'
                  ? 'max-w-md'
                  : 'max-w-[420px]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 mb-3 text-white">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--accent)]/30 border border-[var(--accent)]/50 text-white">
                      {open.category}
                    </span>
                    <span className="text-xs text-[var(--mute)] font-mono">
                      {open.aspectRatioText} • {open.duration}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold truncate">{open.title}</h3>
                </div>
                <button
                  autoFocus
                  onClick={() => setOpen(null)}
                  aria-label="Close video"
                  className="p-2 rounded-full glass hover:bg-white/15 text-white/80 hover:text-white transition flex-shrink-0 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Vimeo Video Player Container */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl ${
                  open.aspect === 'landscape'
                    ? 'aspect-video'
                    : open.aspect === 'standard'
                    ? 'aspect-[3/4]'
                    : 'aspect-[9/16]'
                }`}
              >
                <iframe
                  src={`${open.embedUrl}&autoplay=1`}
                  title={open.title}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer Description */}
              {open.description && (
                <p className="text-xs text-[var(--mute)] mt-3 text-center sm:text-left px-1">
                  {open.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
