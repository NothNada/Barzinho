import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

export default function App() {

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "music1", keys: ["Digit1"] },
    { name: "music2", keys: ["Digit2"] },
    { name: "music3", keys: ["Digit3"] },
    { name: "music4", keys: ["Digit4"] },
  ];

  return (
    <Canvas>
      <color attach="background" args={['#aeaeae']} />
      <Physics>
        <KeyboardControls map={keyboardMap}>
          <Experience/>
        </KeyboardControls>
      </Physics>
      
    </Canvas>
  )
}
