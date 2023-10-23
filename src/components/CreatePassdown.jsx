

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
    const [shiftData, setShiftData] = useState([{
        timeIn: "00:00",
        timeOut: "00:00",
        hours: 0,
        hoursToWork: 0
    }])
    const [isAddingWork, setIsAddingWork] = useState(false);
    const [isShiftInfoEdit, setIsShiftInfoEdit] = useState(false);
    const [hoursWorked, setHoursWorked] = useState(0)
    const [adjustedHours, setAdjustedHours] = useState(0)
    const { DateTime, Duration } = require("luxon")

    function passdownData(data) {
        setCurrentPassdown(data)
    }
    
    useEffect(() => {
        console.log("before time caluclations", shiftData)
        if (shiftData && shiftData[0]) {
            console.log("use effect triggered")
            const startDateTime = DateTime.fromFormat(shiftData[0].timeIn, "HH:mm");
            const endDateTime = DateTime.fromFormat(shiftData[0].timeOut, "HH:mm");
            const duration = endDateTime.diff(startDateTime);
            const actualHours = duration.as("hours")
            const hours = actualHours - 0.5;
            const hours95 = hours * 0.95;
            const hoursToWork = hours95.toFixed(1);

            setHoursWorked(hours);
            setAdjustedHours(hoursToWork)

            const updatedShiftData = {
                ...shiftData[0],
                hours: hours,
                adjustedHours: hoursToWork,
            };
            
            setShiftData([updatedShiftData])

        }
    }, [shiftEditButton])

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

    useEffect(() => {
        const savedShiftData = localStorage.getItem('shiftData');

        if (savedShiftData) {
            const parsedShiftData = JSON.parse(savedShiftData);
            setShiftData(parsedShiftData)
            console.log("shift data was retrieved from local storage", parsedShiftData)
        }
    }, []);

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
            sendPassdown(shiftData, currentPassdown)
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

    const workedLaborHours = (currentPassdown) => {
       if (!currentPassdown || currentPassdown.length === 0) {
            return 0;
       }
       const totalLaborWorked = currentPassdown.reduce((acc, work) => {
            const laborAsFloat = parseFloat(work.bookedLabor);
            if (!isNaN(laborAsFloat)) {
                return acc + laborAsFloat;
            }
            return acc;
       }, 0);
       return totalLaborWorked;

    }

    const bookedLaborBackground = (hours) => {
        const hoursToWork = shiftData[0].adjustedHours
        if (hours >= hoursToWork) {
            return "green"
        } 
        else return "red";
    }

    const totalWorkedLaborHours = workedLaborHours(currentPassdown);

    const hoursLeftToBook = shiftData[0].adjustedHours - totalWorkedLaborHours;
    
    return (
        <div>
            {isShiftInfoEdit && (
                <PassdownForm 
                techs={techData} 
                passdown={passdownData} 
                currentPassdown={currentPassdown} 
                shiftData={shiftData}
                setShiftData={setShiftData}
                onCancel={handleShiftEditButton} 
                hoursWorked={hoursWorked}
                setHoursWorked={setHoursWorked}
                adjustedHours={adjustedHours}
                setAdjustedHours={setAdjustedHours}/>
            )}
            {isAddingWork && (
                <AddworkForm
                    onCancel={handleAddworkButton}
                    passdown={passdownData}
                    currentPassdown={currentPassdown} />
            )}
            <div className="shiftInfo">
                {/* <div className="shiftInfoTitle">
                <h1>Shift Info</h1>
                </div> */}
                <div className="shiftInfo-left">
                    <h2>Tech: {shiftData[0].selectedTech}</h2>
                    <h2>Date: {shiftData[0].date}</h2>
                </div>
                <div className="shiftInfo-center">
                    <h2>Time-In: {shiftData[0].timeIn}</h2>
                    <h2>Time-Out: {shiftData[0].timeOut}</h2>
                </div>
                <div className="shiftInfo-center-left">
                    <h2>Hours Worked: {shiftData[0].hours}</h2>
                    <h2>95% of HW: {shiftData[0].adjustedHours}</h2>
                </div>
                <div className="shiftInfo-right">
                    <h2 style={{backgroundColor: bookedLaborBackground(totalWorkedLaborHours)}}>
                        Booked Labor: {totalWorkedLaborHours} <br />
                        Hours to Book: {hoursLeftToBook}
                        </h2>
                </div>
            </div>
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown} setCurrentPassdown={setCurrentPassdown} />
            </div>
        </div>
    )
}
export default CreatePassdown;


