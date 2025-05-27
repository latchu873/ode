// import React, { Suspense, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Physics } from "@react-three/rapier";
// import { Environment } from "@react-three/drei";
// import Player from "./Player";
// import Building from "./Building";
// import InteractionZone from "./InteractionZone";

// export default function ModelViewer() {
//   const [showPrompt, setShowPrompt] = useState(false);

//   const handleEnterZone = (pos) => {
//     const inZone =
//       Math.abs(pos.x - 0) < 1.5 &&
//       Math.abs(pos.z - 0) < 1.5;
//     setShowPrompt(inZone);
//   };

//   const handlePressE = () => {
//     if (showPrompt) {
//       alert("You opened the door!");
//     }
//   };

//   return (
//     <>
//       <Canvas camera={{ position: [0, 2, 20], fov: 35 }} style={{ height: "100vh", background: "#000" }}>
//         <ambientLight intensity={1.2} />
//         <directionalLight position={[10, 10, 10]} intensity={1} />
//         <Suspense fallback={null}>
//           <Environment preset="city" />
//           <Physics>
//             <Building />
//             <InteractionZone />
//             <Player onEnterZone={handleEnterZone} onPressE={handlePressE} />
//           </Physics>
//         </Suspense>
//       </Canvas>
//       {showPrompt && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             width: "100%",
//             textAlign: "center",
//             color: "white",
//             fontSize: 24,
//           }}
//         >
//           Press "E" to interact
//         </div>
//       )}
//     </>
//   );
// }


import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Building from "./Building";
import InteractionZone from "./InteractionZone";

export default function ModelViewer() {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleEnterZone = (pos) => {
    const inZone =
      Math.abs(pos.x - 4.5) < 1.5 &&  // match new zone position
      Math.abs(pos.z + 0.5) < 1.5;
    setShowPrompt(inZone);
  };

  const handlePressE = () => {
    if (showPrompt) {
      alert("You opened the door!");
    }
  };

  return (
    <>
      <Canvas camera={{ position: [0, 2, 20], fov: 35 }} style={{ height: "100vh", background: "#000" }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Physics>
            <Building />
            <InteractionZone />
            <Player onEnterZone={handleEnterZone} onPressE={handlePressE} />
          </Physics>
        </Suspense>
      </Canvas>
      {showPrompt && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 24,
          }}
        >
          Press "E" to interact
        </div>
      )}
    </>
  );
}
