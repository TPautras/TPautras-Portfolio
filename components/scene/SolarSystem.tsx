"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import Starfields from "./Starfield"
import Planet from "./Planet"
import Sun from "./Sun"

export default function SolarSystem(){
    return (
        <div className="h-dvh w-full">
            <Canvas camera={{ position: [0, 8, 18], fov: 50 }}>
                <color attach='background' args={['black']}/>
                <ambientLight intensity={0.08}/>
                <OrbitControls/>
                <Starfields/>
                <Sun/>
                <Planet/>
                <EffectComposer>
                    <Bloom
                        intensity={0.3}
                        luminanceThreshold={1}
                        luminanceSmoothing={0.2}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
