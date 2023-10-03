import React, { useEffect, useState } from "react";
import TechEditor from "./TechEditor";
import logo from '../logo.jpeg';


function Home() {
    const [siteTechs, setSiteTechs] = useState([]);
    const [siteInfo, setSiteInfo] = useState([]);
    const [isEditingTechs, setIsEditingTechs] = useState(false);


    useEffect(() => {
        fetchTechData();
    }, []);

    useEffect(() => {
        fetchSiteInfo()
    },[])

    const fetchTechData = () => {
        fetch("http://localhost:4000/techs")
            .then((response) => response.json())
            .then((data) => {
                setSiteTechs(data)
            });
    }

    const fetchSiteInfo = () => {
        fetch("http://localhost:4000/siteInfo")
            .then((response) => response.json())
            .then((data) => {
                setSiteInfo(data)
            });
    }

    const handleEditTechs = () => {
        console.log("Edit button was clicked")
        setIsEditingTechs(!isEditingTechs);
    }

    const handleTechUpdate = (newTechs) => {
        setSiteTechs((siteTechs) => [...siteTechs, newTechs])
    }

    return (
        <div>
            <h1 className="homeTitle">Welcome to STN1</h1>
            <img src={logo} alt="Site Logo" className="homeLogo" />


            <h1>STN1 Managers</h1>
            <ul>
                {siteInfo.map((info) => (
                    <><li key={info.id}>Regional Manager: {info.rmm}</li>
                        <li key={info.id}>Maintenance Manerger: {info.amm}</li></>
                ))}
            </ul>
            <h1>STN1 Techs</h1>
            <ul>
                {siteTechs.map((tech) => (
                    <li key={tech.name}>{tech.name}</li>
                ))}
            </ul>
            <button onClick={handleEditTechs}>Edit Techs</button>
            {isEditingTechs && (
                <TechEditor siteTechs={siteTechs} onClose={handleEditTechs} handleTechUpdate={handleTechUpdate} />
            )}



        </div>

    );
}

export default Home;


