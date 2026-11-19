import { useEffect } from 'react'
import { Nav, Hero, About, Expertise, Software, Experience, Contact, Footer } from './components/Sections'
import Work from './components/Work'

export default function App() {
  useEffect(() => { // cursor-following ambient glow
    const move = (e) => { document.documentElement.style.setProperty('--mx', e.clientX + 'px'); document.documentElement.style.setProperty('--my', e.clientY + 'px') }
    addEventListener('pointermove', move); return () => removeEventListener('pointermove', move)
  }, [])
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(500px circle at var(--mx,50%) var(--my,30%), rgba(108,92,255,.12), transparent 60%)' }} />
      <Nav />
      <main className="relative z-10"><Hero /><About /><Expertise /><Software /><Work /><Experience /><Contact /></main>
      <Footer />
    </>
  )
}
