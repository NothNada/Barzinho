import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { Vector3, Euler } from "three";
import GunShotDebug from "./GunShotDebug";

export default function Gun({ url, position, rotation, scale }) {
    const groupRef = useRef();       // segue a câmera
    const gunOffsetRef = useRef();   // aplica rotação extra
    const material = useLoader(MTLLoader, url + ".mtl");
    const obj = useLoader(OBJLoader, url + ".obj", (loader) => {
        material.preload();
        loader.setMaterials(material);
    });

    useEffect(() => {
        if (gunOffsetRef.current) {
            gunOffsetRef.current.scale.set(...scale);
            

            // rotação visual personalizada
            // gunOffsetRef.current.rotation.set(
            //     rotation[0] * Math.PI / 180,
            //     rotation[1] * Math.PI / 180,
            //     rotation[2] * Math.PI / 180
            // );
            gunOffsetRef.current.rotation.y = rotation[1] * Math.PI / 180;

        }
    }, [rotation, scale]);

    useFrame(({ camera }) => {
        if (groupRef.current) {
            const offset = new Vector3(...position);
            const cameraDirection = new Vector3();
            camera.getWorldDirection(cameraDirection);

            const right = new Vector3();
            right.crossVectors(camera.up, cameraDirection).normalize();

            const up = new Vector3();
            up.copy(camera.up).normalize();

            const finalPos = new Vector3()
                .copy(camera.position)
                .addScaledVector(right, offset.x)
                .addScaledVector(up, offset.y)
                .addScaledVector(cameraDirection, offset.z);

            groupRef.current.position.copy(finalPos);
            groupRef.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <group ref={groupRef}>
            <GunShotDebug varios={true}/>
            <group ref={gunOffsetRef}>
                <primitive object={obj} />
            </group>
        </group>
    );
}
