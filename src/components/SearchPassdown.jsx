import React, { useEffect, useState } from "react";


function SearchPassdown() {

    const [techs, setTechs] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/passdowns")
            .then((response) => response.json())
            .then((data) => {
                setSearchData(data)
            });
    }, []);

    function handleSearch() {
        console.log("this is the search date", searchDate)
        const filteredData = searchData.filter((entry) => {
            const isDateMatch = searchDate === "" || entry.date === searchDate;
            const isTechMatch = techs === "" || entry.tech === techs;
            return isDateMatch && isTechMatch
        });

       


        setSearchResults(filteredData);
    };

    function statusColor(status) {
        if (status === "Completed") {
            return "green"
        } else if (status === "In-Progress") {
            return "yellow"
        }
    }

    return (
        <div>
            <div>
                <h2>Search Passdowns</h2>
                <form>
                    <label>
                        Date:
                        <input type="text" value={searchDate} placeholder="mm/dd/yyyy"
                            onChange={(event) => { const selectedDate = event.target.value; setSearchDate(selectedDate)}} />
                    </label>
                    <label>
                        Tech:
                        <input type="text" value={techs}
                            onChange={(event) => setTechs(event.target.value)} />
                    </label>
                    <button type="button" onClick={handleSearch}>Search</button>
                </form>
                <h3>Search Results</h3>
                <ul>
                    {searchResults.map((entry) => (
                        <li key={entry.id}>
                            Date: {entry.date}, Tech: {entry.tech}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {searchResults.length > 0 ? (
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
                        {searchResults.filter((entry) => entry.tech === techs).map((entry) => (
                            entry.workorder.map((wo) => (
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
                ) : (
                    <h1>No serach results to display</h1>
                )}
            </div>
        </div>
    );

}

export default SearchPassdown;