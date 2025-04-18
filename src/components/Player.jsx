import { Box, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3, Quaternion, Euler } from "three";

export default function Player({playerRef}) {
    const rb = useRef();
    const [, get] = useKeyboardControls();
    const direction = new Vector3();
    const side = new Vector3();
    const currentVel = useRef(new Vector3());

    useFrame(({ camera }, delta) => {
        if (rb.current) {
            playerRef.current = rb.current;
            const vel = rb.current.linvel();
            const movement = new Vector3();

            camera.getWorldDirection(direction);
            direction.y = 0;
            direction.normalize();

            side.crossVectors(camera.up, direction).normalize();

            if (get().forward) movement.add(direction);
            if (get().backward) movement.sub(direction);
            if (get().leftward) movement.add(side);
            if (get().rightward) movement.sub(side);

            let speed = get().run ? 7 : 5;

            // Normalize movement and apply speed
            movement.normalize().multiplyScalar(speed);

            // Interpolar suavemente a velocidade atual com a desejada
            currentVel.current.lerp(movement, 18 * delta); // quanto maior o valor, mais rápido interpola

            // Aplicar velocidade com LERP
            rb.current.setLinvel(
                {
                    x: currentVel.current.x,
                    y: vel.y,
                    z: currentVel.current.z,
                },
                true
            );

            // Pulo direto, sem lerp
            if (get().jump) {
                rb.current.setLinvel({
                        x: currentVel.current.x,
                        y: speed,
                        z: currentVel.current.z,
                    },
                    true
                );
            }

            // Rotação para onde a câmera está olhando
            const angle = Math.atan2(direction.x, direction.z);
            const quat = new Quaternion();
            quat.setFromEuler(new Euler(0, angle, 0));
            rb.current.setRotation(quat, true);

            // Seguir o jogador com a câmera
            const pos = rb.current.translation();
            camera.position.set(pos.x, pos.y + 1.5, pos.z);
        }
    });

    return (
        <RigidBody colliders="cuboid" ref={rb} mass={1}>
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial color="royalblue" />
            </Box>
        </RigidBody>
    );
}
