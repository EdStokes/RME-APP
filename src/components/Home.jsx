import React, { useEffect, useState } from "react";
import logo from '../logo.jpeg';

function TechList({onTechUpdate}) {
    const [techs, setTechs] = useState([])

    
    useEffect(() => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((techs) => {
                setTechs(techs);
                onTechUpdate(techs)
            });
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
        <div>
            <h2>Techs on Duty</h2>
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
        <button>Edit Shit Info</button>
        </div>
    )

}


function Home({techs, onTechUpdate}) {
    if (typeof onTechUpdate !== 'function') {
        return <div>Loading....</div>;
    }

  
    return (
        <div>
            <h1 className="homeTitle">Welcome to STN1</h1>
            <img src={logo} alt="Site Logo" className="homeLogo" />
            <p>Serving the best of Nashville since 2020</p>
            <TechList onTechUpdate={onTechUpdate} />
            <ShiftInfo />

        </div>

    );
}

export default Home;

