

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import WorkTable from "./WorkTable";
import { useHistory } from "react-router-dom"

function CreatePassdown() {
    const [techData, setTechData] = useState([]);
    const [currentPassdown, setCurrentPassdown] = useState([])
    const [shiftData, setShiftData] = useState([{}])
    console.log("the is the data that needs to be sent", currentPassdown)
    console.log("this is the shift data that needs to be set", shiftData)

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

    function shiftInfo(data) {
        setShiftData(data);
    }

    function sendPassdown(shiftData, currentPassdown) {

    const passdownPost = {
        date: shiftData[0].date,
        tech: shiftData[0].selectedTech,
        timeIn: shiftData[0].timeIn,
        timeOut: shiftData[0].timeOut,
        wordorder: currentPassdown.map((work) =>( {
            workorder: work.wo,
            description: work.description,
            bookedLabor: work.bookedLabor,
            status: work.status,
            comments: work.comments,
        })),  
    }
        console.log(passdownPost);

        fetch("http://localhost:4000/passdowns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(passdownPost),
        })

        .then((respones) => respones.json())
        .then((data) => {
            alert("Passdown was added to JSON")
        })
    }

    return (
        <div>
            <PassdownForm techs={techData} passdown={passdownData} currentPassdown={currentPassdown} shiftInfo={shiftInfo}/>
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown} setCurrentPassdown={setCurrentPassdown} />
            </div>
            <button onClick={() => sendPassdown(shiftData, currentPassdown)}>submit passdown</button>
        </div>
    )
}


export default CreatePassdown;


// const [shiftData, setShiftData] = useState({
//     date: "",
//     tech: "",
//     timeIn: "",
//     timeOut: "",
// })