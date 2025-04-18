// EnemySpawner.jsx
import Enemy from "./Enemy";
import { useRef, useState } from "react";

export default function EnemySpawner({ playerRef }) {
    const [enemies, setEnemies] = useState([
        { id: 1, position: [5, 0, 5] },
        { id: 2, position: [-4, 0, -3] },
        { id: 3, position: [-4, 0, -1] },
        { id: 4, position: [-4, 0, 0] },
    ]);

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
