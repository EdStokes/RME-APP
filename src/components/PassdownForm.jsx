import React, {useEffect, useState} from "react";
import AddworkForm from "./AddworkForm";





function PassdownForm({techs}) {
    const [selectedTech, setSelectedTech] = useState("");
    const [date, setDate] = useState("");
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const [workItems, setWorkItems] = useState([]);
    const [isAddingWork, setIsAddingWork] = useState(false);


    const handleSaveWorkItem = (workItem) => {
        setWorkItems([...workItems, workItem])
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const passdownInfo = {
            tech: selectedTech,
            date,
            timeIn,
            timeOut,
        };

        setWorkItems([...workItems, passdownInfo]);

        setSelectedTech("");
        setDate("");
        setTimeIn("");
        setTimeOut("");
    };

    const toggleAddWorkForm = () => {
        setIsAddingWork(!isAddingWork);
    };

    return (
        <div className="passdownHeader">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="passdownHeaderTop">
                    <label>Tech</label>
                    <select value={selectedTech} onChange={(event) => setSelectedTech(event.target.value)}>
                        {techs.map((tech) => (
                            <option key={tech.id} value={tech.name}>{tech.name}</option>
                        ))}
                    </select>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    <label>Time In: </label>
                    <input type="time" value={timeIn} onChange={(event) => setTimeIn(event.target.value)} />
                    <label>Time Out: </label>
                    <input type="time" value={timeOut} onChange={(event) => setTimeOut(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
                <button onClick={toggleAddWorkForm}>Add Workorder</button>
            </form>

            {isAddingWork && (
                <AddworkForm
                    onSave={handleSaveWorkItem}
                    onCancel={toggleAddWorkForm} />
            )}

        </div>
    );
}

export default PassdownForm;

