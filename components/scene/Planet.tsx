import { PLANETS } from "@/lib/planets";
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { type Mesh } from "three"

function OrbitingPlanet({
    distance,
    speed,
    size,
    color,
    phase,
    tilt = 0,
}: {
    distance: number
    speed: number
    size: number
    color: string
    phase: number
    tilt?: number
}) {
    const planetRef = useRef<Mesh>(null)

    useFrame((state, delta) => {
        if (planetRef.current) {
            const angle = state.clock.getElapsedTime() * speed + phase
            planetRef.current.position.x = Math.cos(angle) * distance
            planetRef.current.position.z = Math.sin(angle) * distance
            planetRef.current.position.y = Math.sin(angle) * distance * tilt
            planetRef.current.rotation.y += delta * 0.6
        }
    })

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default function Planets() {
    return (
        <>
            {PLANETS.map((planet, i) => (
                <OrbitingPlanet
                    key={planet.id}
                    distance={planet.orbit.radius}
                    speed={planet.orbit.speed}
                    size={planet.orbit.size}
                    tilt={planet.orbit.tilt}
                    color={planet.content.accent}
                    phase={(i / PLANETS.length) * Math.PI * 2}
                />
            ))}
        </>
    )
}
