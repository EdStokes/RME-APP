import React, {useEffect, useState} from "react";

function TechList() {
    const [techs, setTechs] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/techs")
        .then((response) => response.json())
        .then((techs) => setTechs(techs));
    }, []);

    return (
        <div className="techList"> 
            <h2>STN1 RME TECHS</h2>
            <ul>
            {techs.map((tech) => (
                <li key={tech.name}>{tech.name}</li>
            ))}
            </ul>
        </div>
    )
}

function ShiftInfo() {

}


function Home() {
    return (
        <div>
        <h1 className="homeTitle">Welcome to STN1</h1>
        <p>Serving the best of Nashville since 2020</p>
        <TechList />
        
        </div>
        
    )
}

export default Home;