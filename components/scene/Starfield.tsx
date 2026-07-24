import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Points } from "three";

const Starfields = () => {
    const starsRef = useRef<Points>(null);
    useFrame(() => {
        if (starsRef.current) starsRef.current.rotation.x += 0.0001;
        if (starsRef.current) starsRef.current.rotation.y += 0.0001;
    });

    return <Stars ref={starsRef} />;
};

export default Starfields;