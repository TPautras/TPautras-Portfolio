"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRef } from "react"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import Starfields from "./Starfield"
import Planet from "./Planet"
import Sun from "./Sun"
import CameraRig from "./CameraRig"
import SectionOverlay from "@/components/ui/SectionOverlay"
import type { Locale } from "@/lib/planets"

export default function SolarSystem({ locale }: { locale: Locale }){
    const controlsRef = useRef<OrbitControlsImpl>(null)

    return (
        <div className="h-dvh w-full">
            <Canvas camera={{ position: [0, 8, 18], fov: 50 }}>
                <color attach='background' args={['black']}/>
                <ambientLight intensity={0.08}/>
                <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.08} makeDefault/>
                <CameraRig controlsRef={controlsRef}/>
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
            <SectionOverlay locale={locale}/>
        </div>
    )
}
