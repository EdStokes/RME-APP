import React, { useState } from "react";


function AddworkForm({ onCancel, tech, passdown, currentPassdown }) {
    const [workorderNumber, setWorkorderNumber] = useState("");
    const [workorderDescription, setWorkorderDescription] = useState("")
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSaveWorkButtonClick = () => {
        if (workorderNumber.trim() === "") {
            setIsDescriptionEmpty(true);
            return;
        }

        const workItem = {
            wo: workorderNumber,
            description: workorderDescription,
            bookedLabor: "0",
            status: "Open",
            comments: ""
        }

        passdown([...currentPassdown, workItem]);

        onCancel()

    }

    function handleCloseClick() {
        onCancel();
    }

    return (
    
        <div className="addwork">
        <div className="addworkTopRow">
            <h1>Add Work</h1>
            <h1 className="addworkClose-icon" onClick={handleCloseClick}>X</h1>
            </div>
            <form className="addworkForm">
                <label>Workorder Number: </label>
                <input
                    type="text"
                    value={workorderNumber}
                    onChange={(event) => setWorkorderNumber(event.target.value)} />
                <label>Description: </label>
                <input
                    type="text"
                    onChange={(event) => setWorkorderDescription(event.target.value)} />
            </form>
            <div>
            <button className="buttonAddworkForm" onClick={(event) => handleSaveWorkButtonClick(event)}>Add to Table</button>
            </div>
        </div>
    );
}

export default AddworkForm;

