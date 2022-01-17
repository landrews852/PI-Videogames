import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';


export default function Detail(props) {

  console.log(props);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.apiId));
  });

  const videogame = useSelector((state) => state.detail);

  return (
    <div className="detail">
      {
        console.log(videogame),
        videogame.length > 0
        ? (
            <div>
                <img src={videogame[0].img} alt="img" width="500px" height="700" />
                <h1>Name: {videogame[0].name}</h1>
                <p>Description: {videogame.description}</p>
                <p>Released date: {videogame.released}</p>
                <p>Rating: {videogame.rating}</p>
                <p>Platforms: {videogame.platforms}</p>
                <p>Genres: {videogame.genres}</p>
            </div>
        )
     : (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}
</div>
     );
}