// import React, { Suspense, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Physics } from "@react-three/rapier";
// import { Environment } from "@react-three/drei";
// import Player from "./Player";
// import Building from "./Building";
// import InteractionZone from "./InteractionZone";

// export default function ModelViewer() {
//   const [inZone, setInZone] = useState(false);

//   const handleEPress = () => {
//     if (inZone) {
//       alert("🚪 You interacted with the door!");
//     }
//   };

//   return (
//     <>
//       {inZone && (
//         <div style={{
//           position: "absolute",
//           top: "40%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           background: "rgba(0, 0, 0, 0.75)",
//           color: "#fff",
//           padding: "15px 25px",
//           borderRadius: "10px",
//           fontSize: "18px",
//           pointerEvents: "none"
//         }}>
//           Press E to enter
//         </div>
//       )}
//       <Canvas camera={{ position: [0, 2, 10], fov: 40 }} style={{ height: "100vh", background: "#000" }}>
//         <ambientLight intensity={1.2} />
//         <directionalLight position={[10, 10, 5]} intensity={1.5} />
//         <Suspense fallback={null}>
//           <Environment preset="city" />
//           <Physics>
//             <Building />
//             <InteractionZone
//               onEnter={() => setInZone(true)}
//               onExit={() => setInZone(false)}
//             />
//             <Player onPressE={handleEPress} />
//           </Physics>
//         </Suspense>
//       </Canvas>
//     </>
//   );
// }

import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Building from "./Building";
import InteractionZone from "./InteractionZone";
export default function ModelViewer() {
  const [inZone, setInZone] = useState(false);

  const handleEPress = () => {
    if (inZone) {
      alert("🚪 You interacted with the door!");
    }
  };

  return (
    <>
      {inZone && (
        <div style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0, 0, 0, 0.75)",
          color: "#fff",
          padding: "15px 25px",
          borderRadius: "10px",
          fontSize: "18px",
          pointerEvents: "none"
        }}>
          Press E to enter
        </div>
      )}
      <Canvas camera={{ position: [0, 2, 10], fov: 40 }} style={{ height: "100vh", background: "#000" }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Physics>
            <Building />
            <InteractionZone
              onEnter={() => setInZone(true)}
              onExit={() => setInZone(false)}
            />
            <Player onPressE={handleEPress} />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}
