import Enemy from "./Enemy";
import { useEffect, useRef, useState } from "react";

export default function EnemySpawner({ playerRef }) {
    const qntsEnemies = 5;
    const [enemies, setEnemies] = useState([]);
    const videos = [
        "videos/calabreso/calma.mp4",
        "videos/coringa/coringa.mp4",
        "videos/meme/meme.mp4",
        "videos/receba/receba.mp4",
        "videos/sigma/sigma.mp4",
        "videos/skibid/skibid.mp4",
        "videos/thaiscarla/thais.gif"
    ];

    const randomNumber = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomPosition = () => {
        return [randomNumber(-10,10),0,randomNumber(-10,10)];
    }

    useEffect(()=>{
        const ultimo = enemies[enemies.length - 1];
        if(enemies.length < qntsEnemies){
            enemies.push(
                { id: ultimo.id, position: randomPosition(), video: videos[Math.floor(Math.random() * videos.length)]}
            );
        }

    },[enemies]);

    const handleDeath = (id) => {
        const enemie = enemies.filter(e => e.id === id);
        console.log(enemie);
    };

    return (
        <>
            {enemies.map(e => (
                <Enemy
                    key={e.id}
                    position={e.position}
                    playerRef={playerRef}
                    onDeath={() => handleDeath(e.id)}
                />
            ))}
        </>
    );
}
