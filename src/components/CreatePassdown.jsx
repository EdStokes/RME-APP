

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import WorkTable from "./WorkTable";
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
            <PassdownForm techs={techData} passdown={passdownData} currentPassdown={currentPassdown} />
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown} setCurrentPassdown={setCurrentPassdown} />
            </div>
        </div>
    )
}


export default CreatePassdown;


