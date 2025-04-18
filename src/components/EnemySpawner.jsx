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
        "videos/skibid/skibid.mp4"
    ];

    const idCounter = useRef(0);

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomPosition = () => {
        return [randomNumber(-10, 10), 0, randomNumber(-10, 10)];
    };

    useEffect(() => {
        if (enemies.length < qntsEnemies) {
            let newEnemies = [...enemies];
            while (newEnemies.length < qntsEnemies) {
                idCounter.current++;
                console.log("aqui aqui");
                newEnemies.push({
                    id: idCounter.current,
                    position: randomPosition(),
                    video: videos[Math.floor(Math.random() * videos.length)],
                });
            }
            setEnemies(newEnemies);
            console.log(newEnemies)
        }
    }, [enemies]);

    const handleDeath = (id) => {
        setEnemies(prev => prev.filter(e => e.id !== id));
    };

    return (
        <>
            {enemies.map((e) => (
                <Enemy
                    key={e.id}
                    position={e.position}
                    playerRef={playerRef}
                    onDeath={() => handleDeath(e.id)}
                    video={e.video}
                />
            ))}
        </>
    );
}
