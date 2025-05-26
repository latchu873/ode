// File: src/components/Scene.jsx
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Scene() {
  const { scene } = useGLTF('/assets/office/scene.gltf')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, -10, 0]} rotation={[0, Math.PI, 0]}/>
}

useGLTF.preload('/assets/office/scene.gltf')
