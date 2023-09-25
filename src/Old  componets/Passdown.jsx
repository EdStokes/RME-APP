import React, { useEffect, useState } from "react";



function statusColor(status) {
    if (status === "Completed") {
        return "green"
    } else if (status === "In-Progress") {
        return "yellow"
    }
}

function PassdownInfo() {
    const [currentPassdownInfo, setCurrentPassdownInfo] = useState([]);
    const [bookedLabor, setBookedLabor] = useState(undefined)
    useEffect(() => {
        fetch("http://localhost:4000/passdowns")
            .then((response) => response.json())
            .then((info) => {
                setCurrentPassdownInfo(info);
                const labor = bookedLaborHours(info);
                setBookedLabor(labor);
            })
    }, []);


    return (
        <div>

            <table className="passdownTable">
                <thead>
                    <tr>
                        <th>WO#</th>
                        <th>Description</th>
                        <th>Booked Labor</th>
                        <th>Status</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPassdownInfo.map((info) => (
                        <tr key={info.id}>
                            <td>{info.workorder}</td>
                            <td>{info.description}</td>
                            <td>{info.bookedLabor}</td>
                            <td style={{ backgroundColor: statusColor(info.status) }}>{info.status}</td>
                            <td>{info.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function bookedLaborHours(currentPassdownInfo) {
    if (!currentPassdownInfo || currentPassdownInfo.length === 0) {
        console.log("No booked labor")
        return 0;
    }

    let currentLabor = currentPassdownInfo.reduce((total, info) => total + info.bookedLabor, 0);
    console.log("Booked labor: ", currentLabor)
    return currentLabor;

}

function Header({ headerInfo, bookedLabor }) {
    console.log("booklabor from header: ", bookedLabor)

    return (
        <div className="passdownHeaderInfo">
            <div className="passdownHeaderInfoTop">
                <h1>{headerInfo.tech}</h1>
            </div>
            <div className="passdownHeaderInfoBottom">
                <div className="passdownHeaderInfoBottomLeft">
                    <h2>Time In: {headerInfo.timeIn}</h2>
                    <h2>Time Out: {headerInfo.timeOut}</h2>
                </div>
                <div className="passdownHeaderInfoBottomRight">
                    <div>
                        <h2>Hours worked: </h2>
                        <h2>95% Hours:</h2>
                        <h2 style={{ backgroundColor: "red" }}>Booked Labor: {bookedLabor}</h2>
                    </div>
                </div>
            </div>
        </div>


    )
}

function Passdown({ headerInfo }) {
    return (
        <div>
            <div>
                {/* <PassdownInfo /> */}
                <Header headerInfo={headerInfo} />
            </div>
            <div>
                {/* <Header heraderInfo={headerInfo} /> */}
                <PassdownInfo />
            </div>
        </div>
    )
}

export default Passdown;


