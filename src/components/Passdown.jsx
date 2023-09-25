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
    useEffect(() => {
        fetch("http://localhost:4000/passdowns")
            .then((response) => response.json())
            .then((info) => setCurrentPassdownInfo(info))
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

function Header({ headerInfo }) {
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
                        <h2>Booked Labor:</h2>
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
                <Header headerInfo={headerInfo} />
            </div>
            <div>
                <PassdownInfo />
            </div>
        </div>
    )
}

export default Passdown;


