import React, { useEffect, useState } from "react";
import logo from '../logo.jpeg';

function Home({ techs, onTechUpdate }) {
    if (typeof onTechUpdate !== 'function') {
        return <div>Loading....</div>;
    }


    return (
        <div>
            <h1 className="homeTitle">Welcome to STN1</h1>
            <img src={logo} alt="Site Logo" className="homeLogo" />
            <p> add list of site techs here with edit button to add tecsh
                Needs to populate from component
            </p>

            <p>Add site info here address, contact info(Site lead, Regional AMM, site AMM
                Needs to populate from component
            </p>


        </div>

    );
}

export default Home;