import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const mat = (c, m = 0.8, r = 0.3) => <meshStandardMaterial color={c} metalness={m} roughness={r} />

function Camera() {
  const g = useRef(), reelA = useRef(), reelB = useRef()
  useFrame((s, d) => {
    if (reduced) return
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, s.pointer.x * 0.8 - 0.5, 0.06)
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.4, 0.06)
    reelA.current.rotation.z += d; reelB.current.rotation.z += d
  })
  return (
    <Float speed={reduced ? 0 : 1.5} floatIntensity={0.6}><group ref={g} scale={1.1}>
      <mesh><boxGeometry args={[2, 1.1, 1.1]} />{mat('#15151f')}</mesh>
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.42, .55, .9, 32]} />{mat('#222233')}</mesh>
      <mesh position={[1.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.34, .34, .1, 32]} /><meshStandardMaterial color="#3d8bff" emissive="#3d8bff" emissiveIntensity={1.4} /></mesh>
      {[[-.45, 0], [.3, 0]].map(([x], i) => (
        <mesh key={i} ref={i ? reelB : reelA} position={[x, .95, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.42, .42, .22, 6]} />{mat('#6c5cff', .6, .35)}</mesh>
      ))}
      <mesh position={[-1.1, -.2, 0]}><sphereGeometry args={[.1]} /><meshStandardMaterial color="#ff3b5c" emissive="#ff3b5c" emissiveIntensity={2} /></mesh>
    </group></Float>
  )
}

function Strip({ position, rotation }) {
  const ref = useRef()
  const frames = Array.from({ length: 9 })
  useFrame((s) => { if (!reduced) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime + position[0]) * 0.2 })
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh><boxGeometry args={[.7, 4.5, .02]} />{mat('#0c0c12', .3, .6)}</mesh>
      {frames.map((_, i) => <mesh key={i} position={[0, -2 + i * .5, .02]}><planeGeometry args={[.45, .36]} /><meshBasicMaterial color={i % 3 ? '#1b1b2c' : '#3a2f9e'} /></mesh>)}
    </group>
  )
}

function Particles({ count = 220 }) {
  const ref = useRef()
  const pos = useMemo(() => Float32Array.from({ length: count * 3 }, () => (Math.random() - .5) * 14), [count])
  useFrame((_, d) => { if (!reduced) ref.current.rotation.y += d * .03 })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} /></bufferGeometry><pointsMaterial size={.035} color="#8f86ff" transparent opacity={.7} /></points>
}

function MouseLight() {
  const l = useRef()
  useFrame((s) => l.current.position.set(s.pointer.x * 5, s.pointer.y * 3, 3))
  return <pointLight ref={l} intensity={60} color="#6c8bff" distance={14} />
}

function Reel() { // rotating "editing timeline" drum
  const g = useRef()
  useFrame((_, d) => { if (!reduced) g.current.rotation.x += d * .5 })
  return <group ref={g} rotation={[0, .5, 0]}>{Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2
    return <mesh key={i} position={[0, Math.sin(a) * 1.6, Math.cos(a) * 1.6]} rotation={[-a, 0, 0]}><boxGeometry args={[2.2, .08, .9]} /><meshStandardMaterial color={i % 2 ? '#6c5cff' : '#3d8bff'} emissive={i % 2 ? '#6c5cff' : '#3d8bff'} emissiveIntensity={.5} /></mesh>
  })}</group>
}

function Orb() {
  const m = useRef()
  useFrame((s, d) => { if (!reduced) { m.current.rotation.y += d * .6; m.current.rotation.x = s.pointer.y * .5 } })
  return <Float><mesh ref={m}><icosahedronGeometry args={[1.5, 1]} /><meshStandardMaterial color="#6c5cff" wireframe emissive="#3d8bff" emissiveIntensity={.8} /></mesh></Float>
}

const lights = <><ambientLight intensity={.35} /><directionalLight position={[3, 4, 5]} intensity={1.2} /></>
const Wrap = ({ children, z = 6, className }) => (
  <Canvas className={className} dpr={[1, 1.5]} camera={{ position: [0, 0, z], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>{lights}{children}</Canvas>)

export const HeroScene = () => <Wrap z={7}><MouseLight /><Particles /><Camera /><Strip position={[-4.2, 0, -2]} rotation={[0, .5, .2]} /><Strip position={[4.4, .3, -3]} rotation={[0, -.5, -.25]} /></Wrap>
export const ReelScene = () => <Wrap z={6}><Reel /></Wrap>
export const OrbScene = () => <Wrap z={5}><Orb /></Wrap>
