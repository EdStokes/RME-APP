

import React, { useState } from "react";
import {useHistory} from "react-router-dom"

function PassdownForm() {
    const [selectedTech, setSelectedTech] = useState("");
    const [date, setDate] = useState("");
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const passdownInfo = {
            tech: selectedTech,
            date,
            timeIn,
            timeOut,
        };

        // onSubmitPassdownInfo(passdownInfo);
        // history.push("/Passdown")
    };

    return (
        <div className="passdownHeader">
            <form onSubmit={handleSubmit}>
                <div className="passdownHeaderTop">
                    <label>Tech</label>
                    {/* <select value={selectedTech} onChange={(event) => setSelectedTech(event.target.value)}>
                        {techs.map((tech) => (
                            <option key={tech.name}>{tech.name}</option>
                        ))}
                    </select> */}
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    <label>Time In: </label>
                    <input type="time" value={timeIn} onChange={(event) => setTimeIn(event.target.value)} />
                    <label>Time Out: </label>
                    <input type="time" value={timeOut} onChange={(event) => setTimeOut(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}



function CreatePassdown() {
    return (
        <PassdownForm />
    )
}

export default CreatePassdown;