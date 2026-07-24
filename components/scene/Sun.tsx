export default function Sun() {
    return (
        <>
            <pointLight position={[0, 0, 0]} intensity={450} decay={2} color="#fff2cc" />
            <mesh>
                <sphereGeometry args={[2, 32,32]}/>
                    <meshBasicMaterial color={[6, 4.5, 1.2]} toneMapped={false}/>
            </mesh>
        </>
    )
}