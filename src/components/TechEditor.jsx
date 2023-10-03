import React, { useState } from "react";
import {useHistory} from "react-router-dom";



function TechEditor({ siteTechs, onClose, fetchTechData}) {
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
            fetchTechData();
        onClose();
        history.push("/")
    }
    })   
}
const handleDeleteTech = (techId) => {
    fetch(`http://localhost:4000/techs/${techId}`, {
        method: "DELETE"
    })
   .then((response) => {
    if (response.status === 200) {
        fetchTechData();
    }else {
        console.error("Failed to delete tech")
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
            <h2>Delete Techs</h2>
            <ul>
                {siteTechs.map((tech) => (
                    <li key={tech.id}>{tech.name}
                    <button onClick={() => handleDeleteTech(tech.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default TechEditor;



