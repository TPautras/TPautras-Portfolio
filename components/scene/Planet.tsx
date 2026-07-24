import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { type Mesh } from "three"

export default function Planet({ distance = 8, speed = 0.4 }: { distance?: number; speed?: number }) {
    const planetRef = useRef<Mesh>(null)

    useFrame((state) => {
        if(planetRef.current){
            const t = state.clock.getElapsedTime()
            planetRef.current.position.x = Math.cos(t * speed) * distance
            planetRef.current.position.z = Math.sin(t * speed) * distance
            planetRef.current.rotation.y += 0.01
        }
    })
    return (
        <>
            <mesh ref={planetRef}>
                {/* radius, X-axis, Y-axis */}
                <sphereGeometry args={[1, 32, 32]}/>
                    <meshStandardMaterial color="#1e6fd9"/>
        
            </mesh>
        </>
    )
}