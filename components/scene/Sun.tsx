export default function Sun() {
    return (
        <>
            <mesh>
                <sphereGeometry args={[2, 32,32]}/>
                    <meshBasicMaterial color="yellow"/>    
            </mesh>       
        </>
    )
}