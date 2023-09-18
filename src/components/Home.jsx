import React, { useEffect, useState } from "react";

function TechList() {
    const [techs, setTechs] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((techs) => setTechs(techs));
    }, []);

    return (
        <div className="techList">
            <h2>STN1 RME TECHS</h2>
            <ul>
                {techs.map((tech) => (
                    <li key={tech.name}>{tech.name}</li>
                ))}
            </ul>
        </div>
    )
}

function ShiftInfo() {
    const [currentShiftInfo, setCurrentShiftInfo] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/shiftInfo")
            .then((response) => response.json())
            .then((info) => setCurrentShiftInfo(info))
    }, []);

    return (
        <table className="shiftInfo">
            <thead>
                <tr>
                    <th>Tech</th>
                    <th>Shift</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                </tr>
            </thead>
            <tbody>
                {currentShiftInfo.map((info) => (
                    <tr key={info.name}>
                        <td>{info.name}</td>
                        <td>{info.shift}</td>
                        <td>{info.timeIn}</td>
                        <td>{info.timeOut}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}


function Home() {
    return (
        <div>
            <h1 className="homeTitle">Welcome to STN1</h1>
            <p>Serving the best of Nashville since 2020</p>
            <TechList />
            <ShiftInfo />

        </div>

    )
}

export default Home;