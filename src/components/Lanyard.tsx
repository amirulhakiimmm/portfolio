'use client'

import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Lightformer, useTexture } from "@react-three/drei"
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier"

import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import { extend } from "@react-three/fiber"

extend({ MeshLineGeometry, MeshLineMaterial })

function Band() {
  const snapRotation = (value: number) => {
    const TWO_PI = Math.PI * 2
    let v = value % TWO_PI
    if (v < 0) v += TWO_PI
    const front = 0
    const back = Math.PI
    return Math.abs(v - front) < Math.abs(v - back) ? front : back
  }

  const sleepAll = () => {
    j1.current?.sleep()
    j2.current?.sleep()
    j3.current?.sleep()
    card.current?.sleep()
  }

  const lastDragTime = useRef(0)
  const isResting = useRef(false)
  const band = useRef<any>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = useRef<any>(null)

  const vec = useRef(new THREE.Vector3())
  const dir = useRef(new THREE.Vector3())

  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  const texture = useTexture("/hakim.jpeg")
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ])

  /* joints */
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto"
  }, [hovered, dragged])

  useFrame((state) => {
    // FIX: only wake up when actively dragging
    if (dragged && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5)
      vec.current.unproject(state.camera)

      dir.current.copy(vec.current)
      dir.current.sub(state.camera.position)
      dir.current.normalize()

      vec.current.add(
        dir.current.multiplyScalar(state.camera.position.length())
      )

      const target = {
        x: vec.current.x - (dragged as THREE.Vector3).x,
        y: vec.current.y - (dragged as THREE.Vector3).y,
        z: vec.current.z - (dragged as THREE.Vector3).z,
      }

      card.current.setNextKinematicTranslation(target)

      // FIX: wakeUp only inside drag block — never conflicts with sleepAll
      ;[card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp())
    }

    // FIX: settle logic only when NOT dragging
    if (!dragged && card.current) {
      const v = card.current.linvel()
      const av = card.current.angvel()
      const rot = card.current.rotation()

      const targetY = snapRotation(rot.y)

      card.current.setAngvel({
        x: 0,
        y: (targetY - rot.y) * 6,
        z: 0,
      })

      const isStill =
        Math.abs(v.x) < 0.01 &&
        Math.abs(v.y) < 0.01 &&
        Math.abs(v.z) < 0.01 &&
        Math.abs(av.x) < 0.01 &&
        Math.abs(av.y) < 0.01 &&
        Math.abs(av.z) < 0.01

      if (isStill) {
        const finalRot = card.current.rotation()

        card.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
        card.current.setAngvel({ x: 0, y: 0, z: 0 }, true)

        card.current.setRotation(
          {
            x: finalRot.x,
            y: snapRotation(finalRot.y),
            z: finalRot.z,
            w: finalRot.w,
          },
          true
        )

        sleepAll()
      }
    }

    // FIX: guard all refs before accessing translation — prevents rope snap on sleep
    if (
      fixed.current &&
      band.current &&
      j1.current &&
      j2.current &&
      j3.current
    ) {
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.translation())
      curve.points[2].copy(j1.current.translation())
      curve.points[3].copy(fixed.current.translation())

      band.current.geometry.setPoints(curve.getPoints(24))
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />

        <RigidBody ref={j1} position={[0.25, 0, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} position={[0.5, 0, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} position={[0.7, 0, 0]}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          linearDamping={8}
          angularDamping={10}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={1.5}
            position={[0, -1.2, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement
              target.setPointerCapture(e.pointerId)

              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.current.copy(card.current.translation()))
              )

              isResting.current = false
            }}
            onPointerUp={(e) => {
              const target = e.target as HTMLElement
              target.releasePointerCapture(e.pointerId)

              drag(false)
              lastDragTime.current = performance.now()
            }}
          >
            {/* FRONT */}
            <mesh position={[0, 0, 0.001]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={texture}
                roughness={0.35}
                metalness={0.15}
                clearcoat={1}
              />
            </mesh>

            {/* BACK — FIX: offset -0.001 on Z to eliminate z-fighting */}
            <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={texture}
                roughness={0.35}
                metalness={0.15}
                clearcoat={1}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* ROPE — FIX: depthTest={true} so rope doesn't pop over card */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ffffff"
          depthTest={true}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
      <Band />
    </Physics>
  )
}

export default function Lanyard() {
  return (
    <div style={{ width: "100%", height: 520 }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />

        <Scene />

        <Environment>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}