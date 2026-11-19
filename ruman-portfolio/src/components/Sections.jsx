import { Suspense, lazy, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowDown, Instagram, MessageCircle, Mail, Send, Film, Clapperboard, Gauge, Zap, Heart, Palette, Music, Smartphone, Menu, X } from 'lucide-react'
import { CONTACT, SKILLS, SOFTWARE, TIMELINE } from '../data'
import { useState } from 'react'
const HeroScene = lazy(() => import('./Scene').then((m) => ({ default: m.HeroScene })))
const ReelScene = lazy(() => import('./Scene').then((m) => ({ default: m.ReelScene })))
const OrbScene = lazy(() => import('./Scene').then((m) => ({ default: m.OrbScene })))
const Loader = () => <div className="absolute inset-0 grid place-items-center text-[var(--mute)] text-sm" role="status">Loading 3D scene…</div>
const Stage = ({ children, className = '' }) => <div className={`relative ${className}`}><Suspense fallback={<Loader />}>{children}</Suspense></div>

const LINKS = ['About', 'Expertise', 'Software', 'Work', 'Experience', 'Contact']
export function Nav() {
  const [o, setO] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 py-3"><nav className="glass max-w-6xl mx-auto flex items-center justify-between px-5 py-3" aria-label="Main">
      <a href="#top" className="display font-extrabold">RUMAN AHAMED</a>
      <ul className={`${o ? 'flex' : 'hidden'} md:flex absolute md:static top-16 inset-x-4 md:inset-auto flex-col md:flex-row gap-4 md:gap-6 glass md:!bg-transparent md:!border-0 p-5 md:p-0 text-sm`}>
        {LINKS.map((l) => <li key={l}><a onClick={() => setO(false)} className="hover:text-[var(--glow)]" href={`#${l.toLowerCase()}`}>{l}</a></li>)}</ul>
      <button className="md:hidden" onClick={() => setO(!o)} aria-label="Toggle menu" aria-expanded={o}>{o ? <X /> : <Menu />}</button>
    </nav></header>
  )
}

export function Hero() {
  const root = useRef()
  const portraitWrapperRef = useRef()
  const portraitImgRef = useRef()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // Staggered text entrance
      gsap.from('.rv', {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2
      })

      // Portrait smooth cinematic fade-in and upward slide entrance
      gsap.from(portraitWrapperRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.35
      })

      // Very subtle idle floating animation
      gsap.to(portraitWrapperRef.current, {
        y: '-=10',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.85
      })
    }, root)

    return () => ctx.revert()
  }, [])

  // Interactive mouse-following parallax & slight depth movement
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      if (!portraitImgRef.current) return
      const { innerWidth, innerHeight } = window
      const normX = (e.clientX / innerWidth - 0.5) * 2 // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2

      // Move portrait with gentle 3D perspective
      gsap.to(portraitImgRef.current, {
        x: normX * 14,
        y: normY * 10,
        rotateY: normX * 4,
        rotateX: -normY * 4,
        duration: 0.9,
        ease: 'power1.out',
        overwrite: 'auto'
      })
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="top" ref={root} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12 lg:py-0">
      {/* 3D background canvas */}
      <Stage className="absolute inset-0 pointer-events-none"><HeroScene /></Stage>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_88%)] pointer-events-none" />

      {/* Main 2-Column Hero Grid: Text Left (55%), Portrait Right (45%) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100vh-4rem)]">

        {/* Left Column: Exact Existing Typography & Badges (~55% width: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-20 pt-4 lg:pt-0">
          <p className="display text-[var(--glow)] text-sm md:text-base mb-3 overflow-hidden">
            <span className="rv inline-block font-semibold tracking-wider">RUMAN AHAMED</span>
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] overflow-hidden">
            <span className="rv inline-block">TURNING MOMENTS</span><br />
            <span className="rv inline-block bg-gradient-to-r from-white via-slate-100 to-[#8f86ff] bg-clip-text text-transparent">INTO CINEMA.</span>
          </h1>
          <p className="rv mt-5 text-[var(--mute)] text-base sm:text-lg lg:text-xl max-w-xl">
            I'm a Video Editor &amp; Visual Storyteller with 5+ Years of Experience.
          </p>
          <div className="rv mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#work" className="btn btn-glow">EXPLORE MY WORK</a>
            <a href="#contact" className="btn btn-ghost">LET'S WORK TOGETHER</a>
          </div>

          {/* Existing software badges */}
          <div className="rv mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[var(--mute)]">
            <span className="px-3.5 py-1.5 rounded-full glass border border-white/10 font-medium text-white/90">CapCut Mastered</span>
            <span className="px-3.5 py-1.5 rounded-full glass border border-white/10">KineMaster</span>
            <span className="px-3.5 py-1.5 rounded-full glass border border-white/10">VN</span>
            <span className="px-3.5 py-1.5 rounded-full glass border border-white/10">InShot</span>
          </div>
        </div>

        {/* Right Column: Master Cinematic Poster Composition (~45% width: 5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative self-center lg:-mt-2 pointer-events-none">
          <div
            ref={portraitWrapperRef}
            className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[530px] xl:max-w-[580px] flex items-center justify-center pointer-events-auto"
            style={{ transformPerspective: 1200 }}
          >
            {/* Soft Ambient Cinematic Glow & Spotlight Behind Portrait */}
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] h-[380px] sm:h-[480px] rounded-full blur-[100px] opacity-60 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(108,92,255,0.55) 0%, rgba(61,139,255,0.3) 50%, transparent 75%)'
              }}
            />

            {/* Seamless Cropped Cinematic Portrait (No baked-in navbar, clean feathered boundaries) */}
            <div ref={portraitImgRef} className="relative z-10 w-full flex items-center justify-center">
              <img
                src="/hero-cropped-clean.png"
                alt="Ruman Ahamed - Video Editor"
                className="w-full h-auto max-h-[72vh] sm:max-h-[78vh] lg:max-h-[82vh] xl:max-h-[85vh] object-contain select-none"
                style={{
                  filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 25px rgba(108,92,255,0.3))'
                }}
              />
            </div>

            {/* Subtle Gradient Blend at Bottom Edge */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/75 to-transparent z-20 pointer-events-none"
            />
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 -translate-x-1/2 grid place-items-center w-7 h-11 rounded-full border border-white/30 z-20">
        <span className="w-1 h-2 bg-white rounded" style={{ animation: 'drop 1.6s infinite' }} />
      </a>
    </section>
  )
}

const H = ({ children }) => <h2 className="text-3xl md:text-5xl font-extrabold mb-8">{children}</h2>

export function About() {
  return (
    <section id="about" className="sec grid md:grid-cols-2 gap-10 items-center">
      <Stage className="h-[340px] md:h-[460px] glass"><ReelScene /></Stage>
      <div><H>BEHIND THE FRAMES</H>
        <p className="text-[var(--mute)] leading-relaxed mb-4">I'm a passionate video editor with over five years of experience turning ordinary footage into engaging visual stories.</p>
        <p className="text-[var(--mute)] leading-relaxed mb-4">My journey started on KineMaster, moved through InShot and VN, and led me to master CapCut, which is now my main tool for everything from reels to wedding films.</p>
        <p className="text-[var(--mute)] leading-relaxed">Creativity, storytelling, attention to detail, sharp timing, clean transitions and a cinematic vision shape every cut I make.</p></div>
    </section>
  )
}

const ICONS = [Film, Clapperboard, Gauge, Zap, Heart, Palette, Music, Smartphone]
export function Expertise() {
  return (
    <section id="expertise" className="sec"><H>MY EXPERTISE</H>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{SKILLS.map(([t, d], i) => {
        const I = ICONS[i]; return (
          <motion.article key={t} whileHover={{ y: -8, rotateX: 6 }} style={{ transformPerspective: 700 }} className="glass p-6 group hover:shadow-[0_0_40px_rgba(108,92,255,.35)] transition-shadow">
            <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5 bg-gradient-to-br from-[var(--accent)] to-[var(--glow)] shadow-[0_8px_24px_rgba(108,92,255,.5)] group-hover:rotate-12 transition-transform"><I /></div>
            <h3 className="text-base mb-2">{t}</h3><p className="text-sm text-[var(--mute)]">{d}</p></motion.article>)
      })}</div>
    </section>
  )
}

export function Software() {
  const [main, ...rest] = SOFTWARE
  return (
    <section id="software" className="sec"><H>SOFTWARE I USE</H>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div whileHover={{ rotateY: -6, rotateX: 4 }} style={{ transformPerspective: 900 }} className="glass md:row-span-2 p-8 flex flex-col justify-end min-h-[300px] bg-gradient-to-br from-[#2a1f7a]/60 to-transparent shadow-[0_0_60px_rgba(108,92,255,.35)]">
          <span className="display text-5xl md:text-6xl font-extrabold">{main.name}</span><p className="mt-3 text-[var(--glow)] font-semibold">{main.level}</p>
          <p className="text-[var(--mute)] text-sm mt-2">My primary editing platform for 5+ years of cinematic work.</p></motion.div>
        {rest.map((s) => <motion.div key={s.name} whileHover={{ y: -6 }} className="glass p-6 flex items-center justify-between"><span className="display text-xl">{s.name}</span><span className="text-sm text-[var(--mute)]">{s.level}</span></motion.div>)}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="sec"><H>EXPERIENCE</H>
      <ol className="relative border-l border-white/15 ml-3 space-y-10">{TIMELINE.map(([t, d], i) => (
        <motion.li key={t} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} className="pl-8 relative">
          <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--glow)] shadow-[0_0_14px_var(--glow)]" />
          <h3 className="text-lg">{t}</h3><p className="text-[var(--mute)] mt-1">{d}</p></motion.li>))}</ol>
    </section>
  )
}

export function Contact() {
  const rows = [
    [Instagram, 'Instagram', CONTACT.instagram, CONTACT.handle || '@urfavv_.ruman'],
    [MessageCircle, 'WhatsApp', CONTACT.whatsapp, CONTACT.whatsappDisplay || '+91 93800 44573'],
    [Mail, 'Email', `mailto:${CONTACT.email}`, CONTACT.email]
  ]
  return (
    <section id="contact" className="sec grid md:grid-cols-2 gap-10 items-center">
      <div><H>LET'S CREATE SOMETHING CINEMATIC.</H>
        <div className="space-y-3">
          {rows.map(([I, l, h, val]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" className="glass flex items-center justify-between p-4 hover:border-[var(--glow)] transition group">
              <div className="flex items-center gap-4">
                <I className="text-[var(--glow)] group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{l}</span>
              </div>
              <span className="text-sm text-[var(--mute)] group-hover:text-white transition-colors">{val}</span>
            </a>
          ))}
        </div>
        <a href={`mailto:${CONTACT.email}`} className="btn btn-glow mt-8"><Send size={18} />Send a message</a></div>
      <Stage className="h-[320px] md:h-[420px]"><OrbScene /></Stage>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-[var(--mute)]">
      <p className="display text-[var(--ink)] mb-4">Crafted with Creativity. Edited with Passion.</p>
      <div className="flex justify-center gap-5 mb-4"><a aria-label="Instagram" href={CONTACT.instagram}><Instagram /></a><a aria-label="WhatsApp" href={CONTACT.whatsapp}><MessageCircle /></a><a aria-label="Email" href={`mailto:${CONTACT.email}`}><Mail /></a></div>
      <p>© {new Date().getFullYear()} Ruman Ahamed. All rights reserved.</p>
    </footer>
  )
}
