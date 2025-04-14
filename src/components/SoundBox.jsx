import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader.js";
import { AudioListener, AudioLoader, PositionalAudio } from "three";
import { useKeyboardControls } from "@react-three/drei";

export default function SoundBox({position:[x,y,z],rotation:[rx,ry,rz]}){
    const modelRef = useRef(null);
    const loader = useLoader(TDSLoader,'models/soundBox/soundbox.3DS');
    const sound = useRef(null);
    const { camera } = useThree();
    const [,get] = useKeyboardControls();
    const [currentTrack, setCurrentTrack] = useState("musicas/baroes.mp3");

    function grausParaRadianos(graus) {
        return graus.map((g) => g * (Math.PI / 180));
    }

    const playSound = (url) => {
        if (!sound.current) return;
        const audio = sound.current;
        const audioLoader = new AudioLoader();
    
        audioLoader.load(url, (buffer) => {
          audio.stop(); // para o som anterior
          audio.setBuffer(buffer);
          audio.setLoop(true);
          audio.setVolume(0.6);
          audio.play();
        });
    };

    useEffect(()=>{
        if(modelRef.current && sound.current){
            modelRef.current.scale.set(0.01,0.02,0.01);

            const listener = new AudioListener();
            camera.add(listener);

            const audio = sound.current;

            audio.setRefDistance(5);
            
            playSound(currentTrack);

            return () => {
                camera.remove(listener);
                audio.stop();
            };
        }
    },[camera,currentTrack]);

    useFrame(()=>{
        if(get().music1){
            setCurrentTrack("musicas/baroes.mp3");
        }
        if(get().music2){
            setCurrentTrack("musicas/baroesboa.mp3");
        }
        if(get().music3){
            setCurrentTrack("musicas/joaogomes.mp3");
        }
        if(get().music4){
            setCurrentTrack("musicas/joaogomesboa.mp3");
        }
    });

    return (
        <primitive 
        position={[x,y,z]}
        rotation={grausParaRadianos([rx,ry,rz])}
        object={loader}
        ref={modelRef}
        >
            <positionalAudio ref={sound} args={[new AudioListener()]} />
        </primitive>
    )
}