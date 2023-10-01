

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

function PassdownForm({techs}) {
    const [selectedTech, setSelectedTech] = useState("");
    const [date, setDate] = useState("");
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const [workItems, setWorkItems] = useState([]);
    const [isAddingWork, setIsAddingWork] = useState(false);

    const history = useHistory();

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
                            <option key={tech.id} value={tech.id}>{tech.name}</option>
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
            <PassdownForm onSave={handleSaveWorkItem} techs={techData} />
            <div className="workTableContainer">
                <WorkTable workItems={workItems} />
            </div>
        </div>
    )
}

function AddworkForm({ onSave, onCancel, }) {
    const [workDescription, setWorkDescription] = useState("");
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSaveWorkButtonClick = () => {
        if (workDescription.trim() === "") {
            setIsDescriptionEmpty(true);
            return;
        }

        const workItem = {
            description: workDescription,
        }

        onSave(workItem);

        setWorkDescription("");
        setIsDescriptionEmpty(false)
    };

    return (
        <div>
            <h2>Add Work</h2>
            <label>Workorder Number</label>
            <input
                type="text"
                value={workDescription}
                onChange={(event) => setWorkDescription(event.target.value)} />
            <button onClick={(event) => handleSaveWorkButtonClick(event)}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

function WorkTable({ workItems }) {
    console.log("Here are the workItems: ", workItems)
    return (
        <div>
            <h2>Work Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {workItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CreatePassdown;