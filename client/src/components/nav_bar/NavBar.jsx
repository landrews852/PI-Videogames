import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../img/logo.png';
import SearchBar from '../search_bar/SearchBar';
import {
  getVideogames,
  getGenres,
  setSort,
  ratingSort,
  filterByGenres,
  filterByCreated,
} from '../../redux/actions';
import s from './NavBar.module.css';

export default function NavBar () {

  const dispatch = useDispatch();

    function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());

    // console.log(getVideogames);
  }

  const genres = useSelector(state => state.genres)
  const videogames = useSelector(state => state.videogames)

  function handleSortBy(e) {
    dispatch(setSort(e.target.value === 'asc'));

  }

  function handleRatingSort(e) {
    dispatch(ratingSort(e.target.value));

  }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));

  }
  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));

  }

  useEffect(() => {
    // console.log(genres)
    dispatch(getGenres())
  }, [dispatch])


  return (
    <div className={s.home_header}>
      {  
        videogames.length===0?
        (
          <div className={s.home_header}>
            <div className={s.div_btn}>
              <div className={s.header_logo}>
                <Link to="/">
                  <img classNam={s.logo_nb} src={logo} alt="logo" />
                </Link>
              </div>
              <div className={s.header_buttons}>
                <Link to="/new">
                  <button className="btn">Create new Videogame</button>
                </Link>
              </div>
                <div className={s.search_bar}>
                  <SearchBar />
                </div>
            </div>
          </div>
        )
        :(
          <div>
            <div className={s.div_btn}>
              <div className={s.header_logo}>
                <Link to="/">
                  <img className={s.logo_nb} src={logo} alt="logo" />
                </Link>
              </div>
              <div className={s.header_buttons}>
                <Link to="/new">
                  <button className="btn">Create new Videogame</button>
                </Link>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  >
                  Refresh
                </button>
              </div>
              <div className={s.search_bar}>
                <SearchBar />
              </div>
            </div>
            <div className={s.select_div}>
              <div className={s.select_container}>
                <label className="label">Alphabetical order: </label>
                <select className={s.navbar_select} onChange={(e) => handleSortBy(e)}>
                  <option disabled>Select an option:</option>
                  <option hidden>Select an option</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
                <br/>
              <div className={s.select_container}>
                <label className="label"> Rating: </label>
                <select className={s.navbar_select} onChange={(e) => handleRatingSort(e)}>
                  <option disabled>Select an option:</option>
                  <option hidden>Select an option</option>
                  <option value="rAsc">Ascending</option>
                  <option value="rDesc">Descending</option>
                </select>
              </div>
              <div className={s.select_container}>
                <label className="label">Genres filter: </label>
                <select className={s.navbar_select} name="genres" onChange={handleFilterGenres}>
                  <option disabled>Select an option:</option>
                  <option hidden>Select an option</option>
                    {genres && genres.length > 0 ? genres.map(mp => (
                      <option key={mp.id} value={mp.name} >{mp.name}</option>
                      )) : null}
                </select>
              </div>
              <div className={s.select_container}>
                <label className='label'>Created filter: </label>
                <select className={s.navbar_select} name="created" onChange={handleFilterCreated}>
                  <option disabled>Select an option:</option>
                  <option hidden>Select an option</option>
                  <option value="All">All</option>
                  <option value="Created">Created</option>
                  <option value="Api">From api</option>
                </select>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}