import React, {useEffect, useState} from "react";


function AddworkForm({ onSave, onCancel, tech }) {
    console.log("Tech Name:", tech)
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

export default AddworkForm;