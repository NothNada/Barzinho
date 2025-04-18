import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function GunShotDebug({ varios = false }) {
    const { camera, scene } = useThree();
    const lineRef = useRef();
    const [shootRequest, setShootRequest] = useState(false);
    const intervalRef = useRef(null);

    // Criar linha vermelha do tiro
    useEffect(() => {
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const points = [new THREE.Vector3(), new THREE.Vector3()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        line.name = "rayLine"; // <- nome da linha
        lineRef.current = line;
    
        return () => {
            scene.remove(line);
        };
    }, [scene]);
    

    // Lógica de clique
    useEffect(() => {
        const handleMouseDown = (e) => {
            if (e.button !== 0) return;

            if (varios) {
                // Evita múltiplos intervals
                if (!intervalRef.current) {
                    setShootRequest(true); // dispara um imediatamente
                    intervalRef.current = setInterval(() => {
                        setShootRequest(true);
                    }, 100);
                }
            } else {
                setShootRequest(true);
            }
        };

        const handleMouseUp = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [varios]);

    // Raycast e linha
    useFrame(() => {
        if (!shootRequest || !lineRef.current) return;
    
        setShootRequest(false);
    
        const origin = new THREE.Vector3();
        const direction = new THREE.Vector3();
        camera.getWorldPosition(origin);
        camera.getWorldDirection(direction);
    
        const raycaster = new THREE.Raycaster(origin, direction);
    
        // Pega todos objetos da cena, exceto a linha do tiro
        const objectsToTest = scene.children.filter(obj => obj.name !== "rayLine");
    
        const intersects = raycaster.intersectObjects(objectsToTest, true);
    
        let endPoint = new THREE.Vector3().copy(origin).add(direction.multiplyScalar(100));
    
        if (intersects.length > 0) {
            const hit = intersects[0];
            endPoint.copy(hit.point);
            console.log("🎯 Acertou:", hit.object.name || hit.object, "em", hit.point);
        
            // Checa se o objeto atingido é inimigo
            if (hit.object && hit.object.userData.takeDamage) {
                hit.object.userData.takeDamage(10);
            }
        
            // ou subindo a hierarquia (caso o hit foi no mesh dentro do RigidBody)
            let parent = hit.object;
            while (parent && !parent.userData.takeDamage) {
                parent = parent.parent;
            }
            if (parent && parent.userData.takeDamage) {
                parent.userData.takeDamage(10);
            }
        
        }
    
        const positions = lineRef.current.geometry.attributes.position.array;
        positions[0] = origin.x;
        positions[1] = origin.y;
        positions[2] = origin.z;
        positions[3] = endPoint.x;
        positions[4] = endPoint.y;
        positions[5] = endPoint.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });
    

    return null;
}
