import React, { useState } from "react";

function PassdownForm({ techs, passdown, currentPassdown, shiftInfo, onCancel  }) {
    
    const [selectedTech, setSelectedTech] = useState("");
    const [date, setDate] = useState("");
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const passdownInfo = {
             date: date,
             selectedTech,
             timeIn: timeIn,
             timeOut: timeOut,
        };
        shiftInfo([passdownInfo]);
        console.log(passdownInfo)
    };

    const handleCloseClick = () => {
        onCancel()
    }
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

