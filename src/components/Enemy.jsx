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
            if (newHealth <= 0 ) {
                onDeath?.();
            }
            return newHealth;
        });
    };

    useFrame(() => {
        const player = playerRef.current;
        const enemy = rb.current;
    
        // Captura e valida a referência uma vez
        if (!player || !player.handle || !enemy || !enemy.handle) return;
    
        const isDead = health <= 0;
    
        try {
            // Posição do player e inimigo
            const enemyPos = enemy.translation();
            const playerPos = player.translation();
    
            if (!isDead) {
                const direction = new THREE.Vector3(
                    playerPos.x - enemyPos.x,
                    0,
                    playerPos.z - enemyPos.z
                ).normalize().multiplyScalar(2);
    
                enemy.setLinvel({ x: direction.x, y: 0, z: direction.z }, true);
            } else {
                enemy.setLinvel({ x: 0, y: 0, z: 0 }, true);
            }
    
            // Rotação do VideoPlane
            if (videoRef.current && !isDead) {
                const target = new THREE.Vector3(playerPos.x, enemyPos.y, playerPos.z);
                videoRef.current.lookAt(target);
            }
    
        } catch (err) {
            console.warn("Erro ao atualizar inimigo:", err);
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
