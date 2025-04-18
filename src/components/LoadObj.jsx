import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { useTexture } from "@react-three/drei";

export default function LoadObj({url,position,rotation,scale,texturaUrl}){
    const modelRef = useRef();
    const textura = texturaUrl ? useTexture(texturaUrl) : null;

    
    const material = useLoader(MTLLoader,url+'.mtl');
    const obj = useLoader(OBJLoader,url+'.obj',(loader)=>{
        material.preload();
        loader.setMaterials(material);
    });

    useEffect(()=>{
        if(modelRef.current){
            modelRef.current.scale.set(scale[0],scale[1],scale[2]);
        }
        
    },[scale,material]);

    function grausParaRadianos(graus) {
        return graus.map((g) => g * (Math.PI / 180));
    }

    return(
        <primitive 
            position={position}
            rotation={grausParaRadianos(rotation)}
            object={obj}
            ref={modelRef}
            
        >
            <Suspense> <meshStandardMaterial map={textura}/> </Suspense>
        </primitive>
    )
}