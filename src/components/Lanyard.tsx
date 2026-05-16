'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import { useRef, useState } from 'react'

/* ───────────────── GLASS ID CARD ───────────────── */

function Card() {
  const group = useRef<THREE.Group>(null!)

  const texture = useTexture('/hakim.jpeg')

  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = true
  texture.anisotropy = 16

  const [dragging, setDragging] = useState(false)

  const rot = useRef({ x: -0.15, y: 0.4 })
  const vel = useRef({ x: 0, y: 0.003 })
  const last = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!dragging) {
      rot.current.y += vel.current.y
      rot.current.x += vel.current.x

      vel.current.x *= 0.95
      vel.current.y *= 0.95

      if (Math.abs(vel.current.y) < 0.0005) {
        vel.current.y = 0.002
      }
    }

    if (group.current) {
      group.current.rotation.x = rot.current.x
      group.current.rotation.y = rot.current.y
    }
  })

  const onDown = (e: any) => {
    setDragging(true)
    last.current.x = e.clientX
    last.current.y = e.clientY
  }

  const onUp = () => setDragging(false)

  const onMove = (e: any) => {
    if (!dragging) return

    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y

    rot.current.y += dx * 0.01
    rot.current.x += dy * 0.01

    vel.current.y = dx * 0.0008
    vel.current.x = dy * 0.0008

    last.current.x = e.clientX
    last.current.y = e.clientY
  }

  /* ───────────────── MATERIALS ───────────────── */

  const glass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.08,
    metalness: 0,
    transmission: 0.85,   // glass effect
    thickness: 0.6,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  // const photo = new THREE.MeshStandardMaterial({
  //   map: texture,
  //   roughness: 0.25,
  //   metalness: 0,
  // })

  // const back = new THREE.MeshPhysicalMaterial({
  //   color: '#f5f5f5',
  //   roughness: 0.2,
  //   metalness: 0,
  //   clearcoat: 1,
  // })

  return (
    <group
      ref={group}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerMove={onMove}
    >
      {/* ───────── GLASS BODY ───────── */}
      <mesh material={glass}>
        <boxGeometry args={[1.9, 2.6, 0.08]} />
      </mesh>

      {/* ───────── FRONT PHOTO ───────── */}
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[1.75, 2.45]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
        />
      </mesh>

      {/* ───────── BACK DESIGN ───────── */}
      <mesh position={[0, 0, -0.041]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.75, 2.45]} />
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>

      {/* ───────── TOP RING ───────── */}
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[0.085, 0.02, 20, 40]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

/* ───────────────── MAIN ───────────────── */

export default function IDCard3D() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top, #1b1b2f 0%, #0d0d1a 100%)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        {/* LIGHTS */}
        <ambientLight intensity={1.5} />

        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, 2, -5]} intensity={0.8} />

        <spotLight position={[0, 6, 6]} intensity={2.5} />

        {/* CARD */}
        <Card />

        {/* ENVIRONMENT REFLECTION (glass look) */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}