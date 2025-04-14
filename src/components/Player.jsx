import { Box, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3,Quaternion,Euler } from "three";

export default function Player(){
    const rb = useRef();
    const [,get] = useKeyboardControls();
    const direction = new Vector3();
    const side = new Vector3();

    useFrame(({camera})=>{
        if(rb.current){
            const vel = rb.current.linvel();

            const movement = new Vector3();

            camera.getWorldDirection(direction);
            direction.y = 0;
            direction.normalize();

            side.crossVectors(camera.up, direction).normalize();



            if(get().forward){
                movement.add(direction);
            }

            if(get().backward){
                movement.sub(direction);
            }

            let speed = get().run ? 7 : 5;

            if(get().leftward){
                movement.add(side);
            }

            if(get().rightward){
                movement.sub(side);
            }

            movement.normalize().multiplyScalar(speed);

            if(get().jump){
                vel.y = speed;
            }
            

            rb.current.setLinvel({
                x: movement.x,
                y: vel.y,
                z: movement.z,
            },true);

            const angle = Math.atan2(direction.x, direction.z);
            const quat = new Quaternion()
            quat.setFromEuler(new Euler(0, angle, 0))
            rb.current.setRotation(quat, true)

            let pos = rb.current.translation();
            camera.position.set(pos.x,pos.y + 1.5, pos.z);

            

        }

        

    });

    return (
        <RigidBody colliders="cuboid" ref={rb} mass={1}>
            <Box args={[1,1,1]}>
                <meshStandardMaterial color="royalblue"/>
            </Box>
        </RigidBody>
    )
}