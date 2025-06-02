import { useGLTF } from "@react-three/drei";

export default function HRCharacter() {
  const { scene } = useGLTF("/models/office/girl.glb");

  return (
    <primitive
      object={scene}
      scale={1}
      position={[-1.5, 0, 0.5]}          // Adjust to fit room layout
      rotation={[0, Math.PI/2, 0]}    // Facing toward player
    />
  );
}
