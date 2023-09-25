import React, { useEffect, useState } from "react";



function statusColor(status) {
    if (status === "Completed") {
        return "green"
    } else if (status === "In-Progress") {
        return "yellow"
    }
}

function PassdownInfo({ techs }) {
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

function Passdown({ headerInfo }) {
    return (
        <div>
            <div>
                <h1>{typeof(headerInfo)}</h1>
            </div>
            <div>
                <PassdownInfo />
            </div>
        </div>
    )
}

export default Passdown;


