import React, {useState} from "react"
import CreatePassdown from "./CreatePassdown";


function WorkTable({ currentPassdown, setCurrentPassdown }) {
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedValue, setEditedValue] = useState(currentPassdown.map(entry => ({...entry})));

    const handleEditChange = (event, index, columnName) => {
        const newEditedValues = [...editedValue];
        newEditedValues[index] = {...newEditedValues[index],[columnName]: event.target.value}
        setEditedValue(newEditedValues);
        console.log("Edited index has change to: ", editedIndex)
    };

    const handleEditSave = (index, columnName) => {
        if (index !== null) {
            const entry = currentPassdown[index]
            if (entry) {
            const updatedPassdown = [...currentPassdown];
            updatedPassdown[index] = {...updatedPassdown[index], [columnName]: editedValue[index][columnName]};
            setCurrentPassdown(updatedPassdown);
            }
        }

        setEditedIndex(null);
    };

        const handleEditClick = (index, columnName) => {
            setEditedIndex(index)
            setEditedValue((prevState) => {
                const newValue = {...prevState[index] };
                newValue[columnName] = currentPassdown[index][columnName];
                return [...prevState.slice(0, index), newValue, ...prevState.slice(index + 1)];
            })
        }

    function statusColor(status) {
        if (status === "Completed") {
            return "green"
        }else if (status === "In-Progress") {
            return "yellow"
        }else if (status === "Open") {
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
                           <td style={{backgroundColor: statusColor(editedValue[index]?.status)}}>
                            {editedIndex === index ? (
                               <div>
                                <select
                                    type="text"
                                    value={editedValue[index]?.status || ''}
                                    onChange={(event) => handleEditChange(event, index, 'status')}
                                    >
                                    <option value="Open">Open</option>
                                    <option value="Completed">Completed</option>
                                    <option value="In-Progress">In-Progress</option>
                                    </select>
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

export default WorkTable;

