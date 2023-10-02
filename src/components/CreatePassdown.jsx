

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import { useHistory } from "react-router-dom"



function CreatePassdown() {
    const [techData, setTechData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((data) => {
                setTechData(data)
            });
    }, []);


    const [workItems, setWorkItems] = useState([]);
    const handleSaveWorkItem = (workItem) => {
        setWorkItems([...workItems, workItem])
    };
    return (
        <div>
            <PassdownForm onSave={handleSaveWorkItem} techs={techData}/>
            <div className="workTableContainer">
                <WorkTable workItems={workItems} />
            </div>
        </div>
    )
}

function WorkTable({ workItems }) {
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
                                {/* {searchResults.filter((entry) => entry.tech === techs).map((entry) => (
                                    entry.workorder.map((wo) => (
                                        <tr key={wo.workorder}>
                                            <td>{wo.workorder}</td>
                                            <td>{wo.description}</td>
                                            <td>{wo.bookedLabor}</td>
                                            <td style={{ backgroundColor: statusColor(wo.status) }}>{wo.status}</td>
                                            <td>{wo.comments}</td>

                                        </tr>
                                    ))
                                ))} */}
                            </tbody>
                        </table>
    </div>
)}

export default CreatePassdown;


