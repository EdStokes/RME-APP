

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import WorkTable from "./WorkTable";
import AddworkForm from "./AddworkForm"

function CreatePassdown(
    { addWorkButton,
        handleAddworkButton,
        submitPassdownButton,
        handleSubmitPassdownButton,
        shiftEditButton,
        handleShiftEditButton
    }) {
    const [techData, setTechData] = useState([]);
    const [currentPassdown, setCurrentPassdown] = useState([])
    const [shiftData, setShiftData] = useState([{}])
    const [isAddingWork, setIsAddingWork] = useState(false);
    const [isShiftInfoEdit, setIsShiftInfoEdit] = useState(false);

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
            wordorder: currentPassdown.map((work) => ({
                workorder: work.wo,
                description: work.description,
                bookedLabor: work.bookedLabor,
                status: work.status,
                comments: work.comments,
            })),
        }

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
                setCurrentPassdown([]);
            })
    }

    const toggleAddWorkForm = () => {
        setIsAddingWork(!isAddingWork);
        handleAddworkButton();
    }

    useEffect(() => {
        if (addWorkButton) {
            toggleAddWorkForm();
        }
    }, [addWorkButton, toggleAddWorkForm]);

    useEffect(() => {
        if (submitPassdownButton) {
            console.log("Passdown has been submitted")
            // sendPassdown(shiftData, currentPassdown)
        }
    }, [submitPassdownButton]);


    const toggleShiftInfoEdit = () => {
        setIsShiftInfoEdit(!isShiftInfoEdit)
        handleShiftEditButton();
    }

    useEffect(() => {
        if (shiftEditButton) {
        console.log("shift edit button was clicked")
        toggleShiftInfoEdit()
    }
    }, [shiftEditButton, toggleShiftInfoEdit]);



    return (
        <div>
            {isShiftInfoEdit && (
                <PassdownForm 
                techs={techData} 
                passdown={passdownData} 
                currentPassdown={currentPassdown} 
                shiftInfo={shiftInfo}
                onCancel={handleShiftEditButton} />
            )}
            {isAddingWork && (
                <AddworkForm
                    onCancel={handleAddworkButton}
                    passdown={passdownData}
                    currentPassdown={currentPassdown} />
            )}
            <div className="shiftInfo">
                <div className="shiftInfo-left">
                    <h2>Tech: Superman</h2>
                    <h2>Date: {shiftData[0].date}</h2>
                </div>
                <div className="shiftInfo-center">
                    <h2>Time-In: 05:30</h2>
                    <h2>Time-Out: 16:00</h2>
                </div>
                <div className="shiftInfo-center-left">
                    <h2>Hours Worked: 10</h2>
                    <h2>95% of HW: 9.5</h2>
                </div>
                <div className="shiftInfo-right">
                    <h2 style={{ backgroundColor: "red" }}>Booked Labor: 9.5</h2>
                </div>
            </div>
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown} setCurrentPassdown={setCurrentPassdown} />
            </div>
            <div className="createPassdownBottomButtons">
                <button className="sendPassdownButton" onClick={() => sendPassdown(shiftData, currentPassdown)}>Submit End of Shift Passdown</button>
            </div>
        </div>
    )
}


export default CreatePassdown;


