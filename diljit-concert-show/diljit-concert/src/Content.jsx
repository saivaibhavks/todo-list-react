import { useState } from "react";
import "./Content.css"


const Content = () => {
    const [vipSection, setVipSection] = useState(Array(25).fill(""))
    const [selectedSeat, setSelectedSeat] = useState([])

    const selectFunc = (index) => {
        setSelectedSeat(prevSelectedSeat => {
            
            console.log("prrr",prevSelectedSeat)
            if (prevSelectedSeat.includes(index)) {
                // Remove the seat if already selected
                return prevSelectedSeat.filter(seat => seat !== index);
            } else {
                // Add the seat if not already selected
                return [...prevSelectedSeat, index];
            }
        });
    };


    return (
        <div className="container">
            <div>
                <h1>Concert</h1>
            </div>
            <div className="vip-grid">
                {
                    vipSection.map((item, index) => {
                        return <button style={{ backgroundColor: selectedSeat.includes(index) ? "orange" : "light-gray" }} className="vip-box" onClick={() => selectFunc(index)}>{index + 1}</button>
                    })
                }
            </div>
        </div>
    )
}

export default Content;