import React, { useEffect, useState } from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa";


function WorkTable({ currentPassdown, setCurrentPassdown }) {
    const [editedIndices, setEditedIndices] = useState([]);
    const [intialEditedValues, setIntialEditedValues] = useState(currentPassdown.map(entry => ({ ...entry })))

   useEffect(() => {
    const savedPassdown = JSON.parse(localStorage.getItem("currentPassdown"));
    if (savedPassdown) {
        setCurrentPassdown(savedPassdown);
        setIntialEditedValues(savedPassdown.map((entry) => ({...entry})));
    }
    },[setCurrentPassdown]);

    useEffect(() => {
        localStorage.setItem("currentPassdown", JSON.stringify(currentPassdown));
    },[currentPassdown])

    useEffect(() => {
        setIntialEditedValues(currentPassdown.map(entry => ({...entry})));
    }, [currentPassdown])
   

    const handleEditChange = (event, index, columnName) => {
        const newEditedValues = [...intialEditedValues];
        newEditedValues[index] = {
            ...newEditedValues[index],
            [columnName]: event.target.value,
        };
        setEditedIndices([...editedIndices, index]);
        setIntialEditedValues(newEditedValues)
    };

    const handleEditSave = (index) => {
        if (editedIndices.includes(index)) {
            const updatedPassdown = [...currentPassdown];
            updatedPassdown[index] = { ...intialEditedValues[index] };
            setCurrentPassdown(updatedPassdown);
            setEditedIndices(editedIndices.filter(item => item !== index));
        }
    };

    const handleEditClick = (index) => {
        if (!editedIndices.includes(index)) {
            const newInitialEditedValues = [...intialEditedValues];
            newInitialEditedValues[index] = {...currentPassdown[index]};
            setIntialEditedValues(newInitialEditedValues);
            setEditedIndices([...editedIndices, index]);
        }
    }

    const handleDeleteClick = (index) => {
        const newEditedValues = [...intialEditedValues];
        newEditedValues.splice(index, 1);
        setIntialEditedValues(newEditedValues)

        const updatedPassdown = [...currentPassdown];
        updatedPassdown.splice(index, 1);
        setCurrentPassdown(updatedPassdown)
    }

    function statusColor(status) {
        if (status === "Completed") {
            return "green"
        } else if (status === "In-Progress") {
            return "yellow"
        } else if (status === "Open") {
            return "red"
        }
    }

    return (
        <div>
            <table className="passdownTable">
                <thead>
                    <tr>
                        <th>WO#</th>
                        <th>Descritption</th>
                        <th>Booked Labor</th>
                        <th>Status</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPassdown.map((entry, index) => (
                        <tr key={entry.wo}>
                            <td>
                                {editedIndices.includes(index) ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={intialEditedValues[index]?.wo || ''}
                                            onChange={(event) => handleEditChange(event, index, "wo")}
                                        />
                                    </div>
                                ) : (
                                    <span>{entry.wo}</span>
                                )}
                            </td>
                            <td>
                                {editedIndices.includes(index) ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={intialEditedValues[index]?.description || ''}
                                            onChange={(event) => handleEditChange(event, index, "description")}
                                        />
                                    </div>
                                ) : (
                                    <span>{entry.description}</span>
                                )}
                            </td>
                            <td>
                                {editedIndices.includes(index) ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={intialEditedValues[index]?.bookedLabor || ''}
                                            onChange={(event) => handleEditChange(event, index, "bookedLabor")}
                                        />
                                    </div>
                                ) : (
                                    <span>{entry.bookedLabor}</span>
                                )}
                            </td>
                            <td style={{ backgroundColor: statusColor(intialEditedValues[index]?.status) }}>
                                {editedIndices.includes(index) ? (
                                    <div>
                                        <select
                                            type="text"
                                            value={intialEditedValues[index]?.status || ''}
                                            onChange={(event) => handleEditChange(event, index, "status")}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Completed">Completed</option>
                                            <option value="In-Progress">In-Progress</option>
                                        </select>
                                    </div>
                                ) : (
                                    <span>{entry.status}</span>
                                )}
                            </td>
                            <td>
                                {editedIndices.includes(index) ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={intialEditedValues[index]?.comments || ''}
                                            onChange={(event => handleEditChange(event, index, "comments"))}
                                        />
                                    </div>
                                ) : (
                                    <span>{entry.comments}</span>
                                )}

                                {editedIndices.includes(index) ? (
                                    <button className="saveEditedWorkorderButton" onClick={() => handleEditSave(index)}>Save Changes</button>
                                ) : (

                                    <span className="edit-delete-icons">
                                        <FaPencilAlt className="editIcon" onClick={() => handleEditClick(index, 'comments')} />
                                        <FaTrash className="trashIcon" onClick={() => handleDeleteClick(index)} />
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WorkTable;


