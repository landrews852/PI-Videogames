import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <div className="landing-page">
            {/* <h1>Welcome to my videogame App</h1> */}
            <img className="landing-img" src="https://wallpapercave.com/wp/zh9ePPZ.jpg" alt="videogames" />
            <Link to="/home">
                <button className="btn-primary">Enter</button>
            </Link>
        </div>
    )}