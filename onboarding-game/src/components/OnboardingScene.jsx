// OnboardingScene.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import InteractionZone from "./InteractionZone";

export default function OnboardingScene() {
  const { scene } = useGLTF("/models/office/onboarding.gltf"); // assumes correct public path

  return (
    <>
    <primitive object={scene} scale={0.1} position={[0, 0, 0]} />
    <InteractionZone position={[-15,0,0]}/>
    </>
    
  );
}
