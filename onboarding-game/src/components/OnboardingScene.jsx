import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import InteractionZone from "./InteractionZone";
import HRCharacter from "./HRCharacter";
import IDCard from "./IDCard";

export default function OnboardingScene({ collectedIDCard }) {
  const { scene } = useGLTF("/models/office/reception.glb");

  // ✅ Clone scene to avoid shared state mutations
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <>
      <primitive object={clonedScene} scale={1.3} position={[2, 0, 0]} />
      <HRCharacter />
      <IDCard collected={collectedIDCard} />
    </>
  );
}
