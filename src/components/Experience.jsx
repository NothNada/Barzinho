import { PointerLockControls } from "@react-three/drei"
import SoundBox from "./SoundBox"
import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Player from "./Player"
import LoadObj from "./LoadObj"

export default function Experience(){

    return(
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 0]} intensity={2}/>
            <PointerLockControls/>

            <RigidBody colliders="trimesh" type="dynamic" mass={10}>
                <SoundBox position={[0,0,0]} rotation={[-90,180,0]}/>
            </RigidBody>
            
            <Player />

            <RigidBody type="fixed" colliders="trimesh" position={[10,-2,0]}>
                <LoadObj url='models/bar/bar' position={[0,0,0]} rotation={[0,0,0]} scale={[5,5,5]}/>
            </RigidBody>

            <RigidBody colliders="trimesh">
                <LoadObj url='models/cadeira/chair' position={[10,-1,15]} rotation={[0,0,0]} scale={[0.5,0.5,0.5]}/>
            </RigidBody>

            <RigidBody type="fixed" position={[0, -2, 0]}>
                <Box args={[50, 0.5, 50]}>
                <meshPhysicalMaterial
                    color="#afa"
                    roughness={0.5}       // Quão fosco (0 = bem polido)
                    metalness={0.3}       // Um pouco metálico
                    reflectivity={0.6}    // Capacidade de refletir
                    clearcoat={1}         // Camada brilhante
                    clearcoatRoughness={0.1}
                    
                />
                </Box>
            </RigidBody>
            

        </>
    )
}