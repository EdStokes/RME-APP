

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import { useHistory } from "react-router-dom"



function CreatePassdown() {
    const [techData, setTechData] = useState([]);
    const [currentPassdown, setCurrentPassdown] = useState([])

    function passdownData(data) {
        setCurrentPassdown(data)
    }

    useEffect(() => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((data) => {
                setTechData(data)
            });
    }, []);

    return (
        <div>
            <PassdownForm  techs={techData} passdown={passdownData} currentPassdown={currentPassdown}/>
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown}/>
            </div>
        </div>
    )
}

function WorkTable({currentPassdown}) {
    return (
    <div>
        <table className="passdownTable">
                            <thead>
                                <tr>
                                    <th>WO#</th>
                                    <th>Descritption</th>
                                    <th>Booked Labor</th>
                                    <th>Status</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPassdown.map((entry) => (
                                        <tr key={entry.wo}>
                                            <td>{entry.wo}</td>
                                            <td>{entry.description}</td>
                                            <td>{entry.bookedLabor}</td>
                                            <td>{entry.status}</td>
                                            <td>{entry.comments}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
    </div>
)}

export default CreatePassdown;


