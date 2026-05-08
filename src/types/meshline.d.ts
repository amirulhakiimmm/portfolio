import * as THREE from "three"

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}