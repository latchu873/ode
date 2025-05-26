import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Building() {
  const { scene } = useGLTF("/models/office/scene.gltf");
  return (
    <primitive
      object={scene}
      scale={0.1}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 2.5, 0]} // tweak for initial angle
    />
  );
}
