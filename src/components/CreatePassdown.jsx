import React, {useEffect, useState} from "react";


function statusColor(status) {
    if (status === "Completed") {
        return "green"
    } else if (status === "In-Progress") {
        return "yellow"
    }
}

function RenderPassdown(){
    const [currentPassdownInfo, setCurrentPassdownInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/passdowns")
            .then((response) => response.json())
            .then((data) => {
                setCurrentPassdownInfo(data);
            });
}, []);

return ( 
    <div>

        <table className="passdownTable">
            <thead>
                <tr>
                    <th>WO#</th>
                    <th>Description</th>
                    <th>Booked Labor</th>
                    <th>Status</th>
                    <th>Comments</th>
                </tr>
            </thead>
            <tbody>
                {currentPassdownInfo.map((info) => (
                    <tr key={info.id}>
                        {info.workorder.map((wo, index) => (
                            <React.Fragment key={`${info.id}-${index}`}>
                                <td>{wo.workorder}</td>
                                <td>{wo.description}</td>
                                <td>{wo.bookedLabor}</td>
                                <td style={{backgroundColor: statusColor(wo.status)}}>{wo.status}</td>
                                <td>{wo.comments}</td>
                            </React.Fragment>
                        ))}  
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}


function CreatePassdown() {
    return (
        <RenderPassdown />
    )
}

export default CreatePassdown;