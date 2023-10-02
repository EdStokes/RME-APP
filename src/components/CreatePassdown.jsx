

import React, { useState, useEffect } from "react";
import PassdownForm from "./PassdownForm";
import { useHistory } from "react-router-dom"

function CreatePassdown() {
    const [techData, setTechData] = useState([]);
    const [currentPassdown, setCurrentPassdown] = useState([])

    function passdownData(data) {
        setCurrentPassdown(data)
    }

    useEffect(() => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((data) => {
                setTechData(data)
            });
    }, []);

    return (
        <div>
            <PassdownForm techs={techData} passdown={passdownData} currentPassdown={currentPassdown} />
            <div className="workTableContainer">
                <WorkTable currentPassdown={currentPassdown} setCurrentPassdown={setCurrentPassdown} />
            </div>
        </div>
    )
}

function WorkTable({ currentPassdown, setCurrentPassdown }) {
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedValue, setEditedValue] = useState(Array(currentPassdown.length).fill(''));

    const handleEditChange = (event, index, columnName) => {
        const newEditedValues = [...editedValue];
        newEditedValues[index] = {...newEditedValues[index],[columnName]: event.target.value}
        setEditedValue(newEditedValues);
        console.log("Edited index has change to: ", editedIndex)
    };

    const handleEditSave = (index, columnName) => {
        if (index !== null) {
            const updatedPassdown = [...currentPassdown];
            updatedPassdown[index] = {...updatedPassdown[index], [columnName]: editedValue[index][columnName]};
            setCurrentPassdown(updatedPassdown);
        }

        setEditedIndex(null);
    };

        const handleEditClick = (index, columnName) => {
            setEditedIndex(index)
        }

    console.log("This is the data ready to push: ", currentPassdown);
    console.log("edited index: ", editedIndex)

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
                            {editedIndex === index ? (
                               <div>
                                <input
                                    type="text"
                                    value={editedValue[index]?.wo || ''}
                                    onChange={(event) => handleEditChange(event, index, 'wo')}
                                    />
                                    <button onClick={() => handleEditSave(index, 'wo')}>Save</button>
                               </div> 
                            ) : (
                                <span onClick={() => handleEditClick(index, 'wo')}>{entry.wo}</span>
                            )}
                           </td>
                           <td>
                            {editedIndex === index ? (
                               <div>
                                <input
                                    type="text"
                                    value={editedValue[index]?.description || ''}
                                    onChange={(event) => handleEditChange(event, index, 'description')}
                                    />
                                    <button onClick={() => handleEditSave(index, 'description')}>Save</button>
                               </div> 
                            ) : (
                                <span onClick={() => handleEditClick(index, 'description')}>{entry.description}</span>
                            )}
                           </td>
                           <td>
                            {editedIndex === index ? (
                               <div>
                                <input
                                    type="text"
                                    value={editedValue[index]?.bookedLabor || ''}
                                    onChange={(event) => handleEditChange(event, index, 'bookedLabor')}
                                    />
                                    <button onClick={() => handleEditSave(index, 'bookedLabor')}>Save</button>
                               </div> 
                            ) : (
                                <span onClick={() => handleEditClick(index, 'bookedLabor')}>{entry.bookedLabor}</span>
                            )}
                           </td>
                           <td>
                            {editedIndex === index ? (
                               <div>
                                <input
                                    type="text"
                                    value={editedValue[index]?.status || ''}
                                    onChange={(event) => handleEditChange(event, index, 'status')}
                                    />
                                    <button onClick={() => handleEditSave(index, 'status')}>Save</button>
                               </div> 
                            ) : (
                                <span onClick={() => handleEditClick(index, 'status')}>{entry.status}</span>
                            )}
                           </td>
                           <td>
                            {editedIndex === index ? (
                               <div>
                                <input
                                    type="text"
                                    value={editedValue[index]?.comments || ''}
                                    onChange={(event) => handleEditChange(event, index, 'comments')}
                                    />
                                    <button onClick={() => handleEditSave(index, 'comments')}>Save</button>
                               </div> 
                            ) : (
                                <span onClick={() => handleEditClick(index, 'comments')}>{entry.comments}</span>
                            )}
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CreatePassdown;


