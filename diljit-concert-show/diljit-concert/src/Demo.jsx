import { useEffect, useState } from "react"

const Demo = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("called times")
    }, [])

    const func = () => {
        setCount(p => p + 1)
        setCount(p=>p+1)
    }


    return (
        <>
            <button onClick={func}>Click me</button>
            <p>Cliked {count} times</p>
        </>
    )
}

export default Demo;