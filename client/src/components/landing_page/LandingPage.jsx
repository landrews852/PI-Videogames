import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
// import "./btn1.css";
// import "./btn2.css";
import "./btn3.css";
import classes from './LandingPage.css';
import github_logo from '../../img/github_logo.png';
import linkedin_logo from '../../img/linkedin_logo.png';

export default function LandingPage() {
    return (
        <div id='landingpage' className='landingpage'>
            <div className="landing-page">
                <div className="text">
                    <h1 className='font1'>Come, get into the Gaming metaverse! </h1>
                </div>
                <div class="wrap">
                    <Link to="/home">
                        <button class="btn-lp">Enter</button>
                    </Link>
                </div>
                <div className="footer">
                    <div className='logo_div'>
                        <a className='logo_a' href="https://linkedin.com/in/landrewsl"><img className='logo' src={github_logo} alt='linkedIn' /><span className='span_logo'>Landrews852</span></a>
                    </div>
                    <div className='logo_div'>
                        <a className='logo_a' href="https://github.com/landrews852"><img className='logo' src={linkedin_logo} alt='gitHub' /><span className='span_logo'>Landrewsl</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}