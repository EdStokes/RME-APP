import React, { useEffect, useState } from "react";

function PassdownForm({
    techs,
    passdown,
    currentPassdown,
    shiftData,
    onCancel,
    setShiftData,
    hoursWorked,
    setHoursWorked,
    adjustedHours,
    setAdjustedHours,
}) {

   
    const [selectedTech, setSelectedTech] = useState(shiftData ? shiftData[0].selectedTech : "");
    const [date, setDate] = useState(shiftData ? shiftData[0].date : "");
    const [timeIn, setTimeIn] = useState(shiftData ? shiftData[0].timeIn : "00:00");
    const [timeOut, setTimeOut] = useState(shiftData ? shiftData[0].timeOut : "00:00");

    useEffect(() => {
        setHoursWorked(hoursWorked);
        setAdjustedHours(adjustedHours);
    }, [hoursWorked, adjustedHours])

    const handleSubmit = (event) => {
        event.preventDefault();

        const passdownInfo = {
            date: date,
            selectedTech,
            timeIn: timeIn,
            timeOut: timeOut,
            hours: hoursWorked,
            adjustedHours: adjustedHours
        };

        setShiftData([passdownInfo]);
        handleCloseClick();
    };

    const handleCloseClick = () => {
        onCancel()
    }

    useEffect(() => {
        const shiftDataString = JSON.stringify(shiftData);
        localStorage.setItem('shiftData', shiftDataString);
        console.log("shift data saved to local storage", shiftData)
    }, [handleSubmit])



    return (
        <div className="passdownHeader">
            <div className="passdownHeaderTitle">
                <h1>Shift Information</h1>
                <h1 className="shiftInfoClose-icon" onClick={handleCloseClick}>X</h1>
            </div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="passdownHeaderTop">
                    <label>Tech</label>
                    <select value={selectedTech} onChange={(event) => setSelectedTech(event.target.value)}>
                        <option value="">Select a Tech</option>
                        {techs.map((tech) => (
                            <option key={tech.name} value={tech.name}>{tech.name}</option>
                        ))}
                    </select>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    <label>Time In: </label>
                    <input type="time" value={timeIn} onChange={(event) => setTimeIn(event.target.value)} />
                    <label>Time Out: </label>
                    <input type="time" value={timeOut} onChange={(event) => setTimeOut(event.target.value)} />
                </div>
                <div>
                    <button className="addShiftInfoButton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PassdownForm;

