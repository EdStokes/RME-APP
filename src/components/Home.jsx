import React, {useEffect, useState} from "react";
import logo from '../logo.jpeg';

function Home({techs, onTechUpdate}) {
    if (typeof onTechUpdate !== 'function') {
        return <div>Loading....</div>;
    }

  
    return (
        <div>
            <h1 className="homeTitle">Welcome to STN1</h1>
            <img src={logo} alt="Site Logo" className="homeLogo" />
            <p>Serving the best of Nashville since 2020</p>
            {/* <TechList onTechUpdate={onTechUpdate} />
            <ShiftInfo /> */}

        </div>

    );
}

export default Home;