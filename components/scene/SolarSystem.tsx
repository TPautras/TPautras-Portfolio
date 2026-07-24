"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Starfields from "./Starfield"
import Planet from "./Planet"
import Sun from "./Sun"

export default function SolarSystem(){
    return (
        <div className="h-dvh w-full">
            <Canvas camera={{ position: [0, 8, 18], fov: 50 }}>
                <color attach='background' args={['black']}/>
                <ambientLight intensity={0.35}/>
                <directionalLight position={[0, 10, 1]} intensity={3}/>
                <OrbitControls/>
                <Starfields/>
                <Sun/>
                <Planet/>
            </Canvas>
        </div>
    )
}
