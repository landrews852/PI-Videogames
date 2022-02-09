import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
// import "./btn1.css";
// import "./btn2.css";
import "./btn3.css";

export default function LandingPage() {
    return (
        <div className={classes.body}>
        <div className="landing-page">
            <div className="text">
                <h1 className='font1'>Come, get into the Gaming metaverse! </h1>
            </div>
            <Link to="/home">
                <div class="wrap">
                    <button class="button">Enter</button>
                </div>
            </Link>
        </div>
        </div>
    )
}