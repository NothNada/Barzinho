import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import VideoPlane from './VideoPlane'


export default function Enemy({ playerRef, position = [0, 0, 0], onDeath, video }) {
    const rb = useRef();
    const videoRef = useRef();
    const [health, setHealth] = useState(100);

    const takeDamage = (amount) => {
        setHealth(h => {
            const newHealth = h - amount;
            if (newHealth <= 0 && onDeath) {
                onDeath();
            }
            return newHealth;
        });
    };

    useFrame(() => {
        if (!rb.current || !playerRef.current) return;

        const isDead = health <= 0;

        if (!isDead) {
            const enemyPos = rb.current.translation();
            const playerPos = playerRef.current.translation();

            const direction = new THREE.Vector3(
                playerPos.x - enemyPos.x,
                0,
                playerPos.z - enemyPos.z
            ).normalize().multiplyScalar(2);

            rb.current.setLinvel({ x: direction.x, y: 0, z: direction.z }, true);
        } else {
            rb.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        }

        if (videoRef.current && playerRef.current && !isDead) {
            const playerPos = playerRef.current.translation();
            const enemyPos = videoRef.current.position;
        
            const target = new THREE.Vector3(playerPos.x, enemyPos.y, playerPos.z);
            videoRef.current.lookAt(target);
        }
        
    });

    return (
        <RigidBody
            ref={rb}
            position={position}
            mass={1}
            colliders=""
            name="enemy"
            userData={{ takeDamage }}
        >
            <group ref={videoRef}>
                <VideoPlane name="enemy" src={video} active={health > 0}/>
            </group>
        </RigidBody>
    );
}
