import React, { useEffect, useState } from "react";

function PassdownHeader({ techs }) {
    return (
        <div className="passdownHeader">
            <form>
                <div className="passdownHeaderTop">
                    <label>Tech</label>
                    <select>
                        {techs.map((tech) => (
                            <option key={tech.name}>{tech.name}</option>
                        ))}
                    </select>
                    <label>Date: </label>
                    <input type="date" />
                    <label>Time In: </label>
                    <input type="time" />
                    <label>Time Out: </label>
                    <input type="time" />
                </div>
                <div className="passdownHeaderBottom">
                    <label>Hours Worked: </label>
                    <input type="text" />
                    <label>95% Hours: </label>
                    <input type="text" />
                    <label>Booked: </label>
                    <input type="text" />
                </div>
                <button>Add Work</button>
            </form>
        </div>
    );
}

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

function Passdown({ techs }) {

    return (
        <div>
            <PassdownHeader techs={techs} />
            <PassdownInfo />
        </div>
    )
}

export default Passdown;


