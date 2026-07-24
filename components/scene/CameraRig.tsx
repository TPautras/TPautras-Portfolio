import { useFrame, useThree } from "@react-three/fiber"
import { useRef, type RefObject } from "react"
import { Vector3 } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { useSceneStore } from "@/store/useSceneStore"

export default function CameraRig({
    controlsRef,
}: {
    controlsRef: RefObject<OrbitControlsImpl | null>
}) {
    const { camera } = useThree()
    const selectedSlug = useSceneStore((s) => s.selectedSlug)
    const targetPos = useRef(new Vector3())

    useFrame((_, delta) => {
        const controls = controlsRef.current
        if (!controls || !selectedSlug) return

        const planet = useSceneStore.getState().planetObjects[selectedSlug]
        if (!planet) return

        planet.getWorldPosition(targetPos.current)

        const prevTarget = controls.target.clone()
        const followAlpha = 1 - Math.pow(0.0001, delta)
        controls.target.lerp(targetPos.current, followAlpha)

        const movedBy = controls.target.clone().sub(prevTarget)
        camera.position.add(movedBy)

        controls.update()
    })

    return null
}
