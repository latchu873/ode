// File: src/App.jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PointerLockControls } from '@react-three/drei'
import Scene from './components/Scene'
import PlayerControls from './components/PlayerControls'
import TaskManager from './components/TaskManager'
import ModelViewer from './components/ModelViewer'
// import HUD from './components/HUD'

export default function App() {
  return (
    // <Canvas shadows camera={{ fov: 60, position: [0, 2, 50], near:0.1, aspect: window.innerWidth/window.innerHeight }}> {/* Adjusted Z position for centered view */}
    //   <ambientLight intensity={0.5} />
    //   <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
    //   <Suspense fallback={null}>
    //     <Scene position={[0, -1.5, 0]} /> {/* Move model down to center it in view */}
    //   </Suspense>
    //   <PlayerControls />
    //   <TaskManager />
    //   {/* <HUD /> */}
    //   <PointerLockControls />
    // </Canvas>

    <ModelViewer/>
  )
}
