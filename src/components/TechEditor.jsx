import React, { useState } from "react";
import {useHistory} from "react-router-dom";


function TechEditor({ siteTechs, onClose }) {
    const history = useHistory();
    const [newTech, setNewTech] = useState({name: "", userName: ""});

    const handleTechNameChange = (event) => {
        setNewTech({...newTech, name: event.target.value});
    };

    const handleUserNameChange = (event) => {
        setNewTech({...newTech, userName: event.target.value})
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        
    fetch("http://localhost:4000/techs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTech)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data && data.id) {
        onClose();
        history.push("/")
    }
    })
}

    return (
        <div className="techEditor">
            <h2>Edit Techs</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                type="text"
                value={newTech.name}
                onChange={handleTechNameChange}
                />
                </div>
                <div>
                    <label>username: </label>
                    <input
                    type="text"
                    value={newTech.userName}
                    onChange={handleUserNameChange}
                    />
                </div>
                <button type="submit">Add Tech</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    )
}



export default TechEditor;



