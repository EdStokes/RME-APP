import React, { useEffect, useState } from "react";


function AddworkForm({ onCancel, tech, passdown, currentPassdown }) {
    console.log("Tech Name:", tech)
    const [workorderNumber, setWorkorderNumber] = useState("");
    const [workorderDescription, setWorkorderDescription] = useState("")
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSaveWorkButtonClick = () => {
        if (workorderNumber.trim() === "") {
            setIsDescriptionEmpty(true);
            return;
        }

        const workItem = {
            wo: parseInt(workorderNumber),
            description: workorderDescription,
            bookedLabor: 0,
            status: "Open",
            comments: ""
        }

        passdown([...currentPassdown, workItem]);
    }
    return (
        <div>
            <label>Workorder Number</label>
            <input
                type="text"
                value={workorderNumber}
                onChange={(event) => setWorkorderNumber(event.target.value)} />
            <label>Description</label>
            <input
                type="text"
                onChange={(event) => setWorkorderDescription(event.target.value)} />
            <button onClick={(event) => handleSaveWorkButtonClick(event)}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default AddworkForm;

