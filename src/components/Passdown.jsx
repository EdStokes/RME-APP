import React, {useEffect, useState} from "react";

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
                            <td>{info.status}</td>
                            <td>{info.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Passdown() {

    return (
        <div>
        <PassdownInfo />
        </div>
    )
}

export default Passdown;