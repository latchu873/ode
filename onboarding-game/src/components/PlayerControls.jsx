// File: src/components/PlayerControls.jsx
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default function PlayerControls() {
  const { camera } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const keys = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true)
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    direction.current.set(0, 0, 0)
    if (keys.current['w']) direction.current.z -= 1
    if (keys.current['s']) direction.current.z += 1
    if (keys.current['a']) direction.current.x -= 1
    if (keys.current['d']) direction.current.x += 1

    direction.current.normalize()
    direction.current.multiplyScalar(5 * delta)
    velocity.current.lerp(direction.current, 0.2)
    camera.position.add(velocity.current)
  })

  return null
}
