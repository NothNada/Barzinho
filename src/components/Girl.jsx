import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default function Girl({position,scale,rotation}){

    const fbx = useLoader(FBXLoader,'models/inimigo/Walking.fbx');
    const modelRef = useRef();

    useEffect(()=>{
        if(modelRef.current){
            modelRef.current.scale.set(...scale);
            modelRef.current.rotation.set(...rotation.map(r => r * Math.PI / 180));
            modelRef.current.position.set(...position);
        }
    },[position,scale,rotation]);

    return <primitive object={fbx} ref={modelRef}/>
}