import { Environment, PointerLockControls } from "@react-three/drei"
import SoundBox from "./SoundBox"
import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Player from "./Player"
import LoadObj from "./LoadObj"
import Gun from './Gun'
import { useRef } from "react"
import EnemySpawner from "./EnemySpawner"

export default function Experience(){

    const playerRef = useRef();

    return(
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 0]} intensity={2}/>
            <PointerLockControls/>

            <RigidBody colliders="trimesh" type="dynamic" mass={10}>
                    <SoundBox position={[0,0,0]} rotation={[-90,180,0]}/>
            </RigidBody>

            <EnemySpawner playerRef={playerRef}/>
            <Player playerRef={playerRef}/>
            <Gun url='models/ak47/ak-47' position={[-0.2, -0.15, 0.2]} rotation={[0, 180, 0]} scale={[1, 1, 1]} />

            <RigidBody type="fixed" colliders="trimesh" position={[10,-2,0]}>
                
                    <LoadObj url='models/bar/bar' texturaUrl='models/bar/bar.png' position={[0,0,0]} rotation={[0,0,0]} scale={[5,5,5]}/>
                
            </RigidBody>

            <RigidBody colliders="trimesh">
                
                    <LoadObj url='models/cadeira/cadeira' texturaUrl='models/cadeira/text.png' position={[10,-1,15]} rotation={[0,0,0]} scale={[0.5,0.5,0.5]}/>
                
            </RigidBody>


            <RigidBody type="fixed" position={[0, -2, 0]}>
                <Box args={[50, 0.5, 50]}>
                <meshStandardMaterial
                    color="#0e0"
                    
                />
                </Box>
            </RigidBody>

            <Environment preset="lobby"/>
            

        </>
    )
}