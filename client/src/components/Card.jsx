import React from 'react';
import './Card.css';

export default function Card({ img, name, gId, rating }) {
    return (
        <div className="card">
            <img className="img" src={img} alt="Img not found" />
            <h3>{name}</h3>
            <p>Genres: {gId.join(", ")}</p>
            {/* <p>{"GENRES: " + gId.map(e => " " + e)}</p> */}
        </div>
    );
    }