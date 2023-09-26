import React, { useEffect, useState } from "react";


function SearchPassdown() {

    const [techs, setTechs] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const techOptions = [...new Set(searchData.map((entry) => entry.tech))];

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
                            onChange={(event) => { const selectedDate = event.target.value; setSearchDate(selectedDate) }} />
                        <option value=""></option>
                    </label>
                    <label>
                        Tech:
                        <select value={techs} onChange={(event) => setTechs(event.target.value)}>
                            <option value="">All</option>
                            {techOptions.map((tech, index) => (
                                <option key={index} value={tech}>
                                    {tech}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="button" onClick={handleSearch}>Search</button>
                </form>
                <h3>Search Results for: </h3>
                <ul>
                    {searchResults.map((entry) => (
                        <li key={entry.id}>
                            Tech: {entry.tech} Date: {entry.date}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {searchResults.length > 0 ? (
                    <div>
                        <div className="passdownSearchHeader">
                            {searchData
                                .filter((entry) => entry.tech === techs && entry.date === searchDate)
                                .map((entry) => (
                                    <div key={entry.id}>
                                        <p>Time In: {entry.timeIn}</p>
                                        <p>Time Out: {entry.timeOut}</p>
                                        <p>Booked Hours: {entry.bookedHours}</p>
                                    </div>
                                ))}
                        </div>
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
                                            <td style={{ backgroundColor: statusColor(wo.status) }}>{wo.status}</td>
                                            <td>{wo.comments}</td>

                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h1>No serach results to display</h1>
                )}
            </div>
        </div>
    );

}

export default SearchPassdown;