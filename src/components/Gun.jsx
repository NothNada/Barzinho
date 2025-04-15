import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export default function Gun({url,position,rotation,scale}){
    const modelRef = useRef();
    const material = useLoader(MTLLoader,url+".mtl");
    const obj = useLoader(OBJLoader,url+".obj",(loader)=>{
        material.preload();
        loader.setMaterials(material);
    });

    useEffect(()=>{
        if(modelRef.current){
            modelRef.current.scale.set(...scale);
            modelRef.current.rotation.set(...rotation.map(r => r * Math.PI / 180));
            modelRef.current.position.set(...position);
        }
    },[position,scale,rotation]);

    return <primitive object={obj} ref={modelRef}/>

}