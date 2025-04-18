import { Plane, useVideoTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { DoubleSide } from "three";

export default function VideoPlane({ src, name, active = true }) {
  const texture = useVideoTexture(src);
  const videoRef = useRef();

  useEffect(() => {
    if (texture?.image) {
      videoRef.current = texture.image;
      if (active) {
        videoRef.current.play().catch(() => {}); // às vezes precisa de interação do usuário
      } else {
        videoRef.current.pause();
      }
    }
  }, [texture, active]);

  return (
    <Plane args={[5, 5, 5]} name={name}>
      <Suspense fallback={<meshStandardMaterial  color="#000" />}>
      {
        active ? <meshStandardMaterial map={texture} toneMapped={false} side={DoubleSide} /> : <meshStandardMaterial side={DoubleSide}  color="#000" />
      }
      </Suspense>
    </Plane>
  );
}
