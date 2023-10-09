import React, { useEffect, useState } from "react";
import SearchPassdownTable from "./SearchPassdownTable";


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
        const filteredData = searchData.filter((entry) => {
            const isDateMatch = searchDate === "" || entry.date === searchDate;
            const isTechMatch = techs === "" || entry.tech === techs;
            return isDateMatch && isTechMatch
        });

        setSearchResults(filteredData);
    };

    // function statusColor(status) {
    //     if (status === "Completed") {
    //         return "green"
    //     } else if (status === "In-Progress") {
    //         return "yellow"
    //     }
    // }

    return (
        <div className="searchPassdownMain">
            <div className="searchPassdownTitle">
                <h2>Search Passdowns</h2>
            </div>
            <div className="searchPassdownForm"> 
                <form>
                    <label>
                        Date:
                        <input type="date" value={searchDate} placeholder="mm/dd/yyyy"
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
                    {/* <button type="button" onClick={handleSearch}>Search</button> */}
                </form>
                <button className="searachPassdownButton" type="button" onClick={handleSearch}>Search</button>
                </div>
                <div className="resultsSearch">
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
                        <div>
                        <SearchPassdownTable tableData={searchResults} />
                        </div>   
                       
                    </div>
                ) : (
                    <h1 className="noResultsDisplay">No serach results to display</h1>
                )}
            </div>
        </div>
    );

}

export default SearchPassdown;



