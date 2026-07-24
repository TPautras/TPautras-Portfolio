import { PLANETS } from "@/lib/planets";
import { useSceneStore } from "@/store/useSceneStore";
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { type Mesh } from "three"

function OrbitingPlanet({
    slug,
    distance,
    speed,
    size,
    color,
    phase,
    tilt = 0,
}: {
    slug: string
    distance: number
    speed: number
    size: number
    color: string
    phase: number
    tilt?: number
}) {
    const planetRef = useRef<Mesh>(null)
    const [shiny, setShiny] = useState(false)
    const registerPlanet = useSceneStore((s) => s.registerPlanet)
    const setHovered = useSceneStore((s) => s.setHovered)
    const selectPlanet = useSceneStore((s) => s.selectPlanet)

    useFrame((state, delta) => {
        if (planetRef.current) {
            const angle = state.clock.getElapsedTime() * speed + phase
            planetRef.current.position.x = Math.cos(angle) * distance
            planetRef.current.position.z = Math.sin(angle) * distance
            planetRef.current.position.y = Math.sin(angle) * distance * tilt
            planetRef.current.rotation.y += delta * 0.6
        }
    })

    useEffect(() => {
        registerPlanet(slug, planetRef.current)
        return () => registerPlanet(slug, null)
    }, [slug, registerPlanet])

    const [hovered, setHoveredLocal] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const pointerOverHandler = () => {
        setHoveredLocal(true)
        setShiny(true)
        setHovered(slug)
    }

    const pointerOutHandler = () => {
        setHoveredLocal(false)
        setShiny(false)
        setHovered(null)
    }

    const clickHandler = () => {
        selectPlanet(slug)
    }

    return (
        <mesh
            ref={planetRef}
            onPointerOver={pointerOverHandler}
            onPointerOut={pointerOutHandler}
            onClick={clickHandler}
            scale={shiny ? 1.2 : 1}
        >
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={shiny ? 0.4 : 0}
            />
        </mesh>
    )
}

export default function Planets() {
    return (
        <>
            {PLANETS.map((planet, i) => (
                <OrbitingPlanet
                    key={planet.id}
                    slug={planet.content.id}
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
