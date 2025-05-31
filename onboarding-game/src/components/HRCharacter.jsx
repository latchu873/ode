import { useGLTF } from "@react-three/drei";

export default function HRCharacter() {
  const { scene } = useGLTF("/models/office/lady_in_coat.glb");

  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[0, 0, 20]}          // Adjust to fit room layout
      rotation={[0, Math.PI/2, 0]}    // Facing toward player
    />
  );
}
