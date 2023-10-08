import React, { useState } from "react";



function TechEditor({ siteTechs, onClose, handleTechUpdate }) {
    const [newTech, setNewTech] = useState({ name: "", userName: "" });

    const handleTechNameChange = (event) => {
        setNewTech({ ...newTech, name: event.target.value });
    };

    const handleUserNameChange = (event) => {
        setNewTech({ ...newTech, userName: event.target.value })
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
                if (data && data.id) {
                    handleTechUpdate(data);
                }
            })
    }
    const handleDeleteTech = (techId) => {
        fetch(`http://localhost:4000/techs/${techId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status === 200) {
                    const updatedTechs = siteTechs.filter((tech) => tech.id !== techId);
                    console.log(updatedTechs)
                    handleTechUpdate(updatedTechs)
                } else {
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
            </form>
            <h2>Delete Techs</h2>
            <ul>
                {siteTechs.map((tech) => (
                    <li key={tech.id}>
                        {tech.name}
                        <button className="techEditorButton" onClick={() => handleDeleteTech(tech.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
}



export default TechEditor;



