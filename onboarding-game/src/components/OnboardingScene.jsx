import React from "react";
import { useGLTF } from "@react-three/drei";
import InteractionZone from "./InteractionZone";
import HRCharacter from "./HRCharacter";
import IDCard from "./IDCard";

export default function OnboardingScene( {collectedIDCard} ) {
  const { scene } = useGLTF("/models/office/onboarding3.gltf"); // assumes correct public path

  return (
    <>
    <primitive object={scene} scale={1} position={[2, 0, 0]} />
    <HRCharacter />
    <IDCard collected={collectedIDCard} />
    <InteractionZone position={[0,0.5,20]} name="floor"/>
    </>
    
  );
}
