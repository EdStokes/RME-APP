import React, {useState} from "react";

function SearchPassdownTable({tableData}) {
    
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
                                {tableData.map((entry) => (
                                    entry.wordorder.map((wo) => (
                                    <tr key={wo.workorder}>
                                        <td>{wo.workorder}</td>
                                        <td>{wo.description}</td>
                                        <td>{wo.bookedLabor}</td>
                                        <td style={{backgroundColor: statusColor(wo.status)}}>{wo.status}</td>
                                        <td>{wo.comments}</td>
                                    </tr>
                                ))
                                ))}
                            </tbody>
                        </table> 
    )
}

export default SearchPassdownTable; 


