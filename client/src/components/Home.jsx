import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Paginate from './Paginate';
import {
  getVideogames,
//   filterCountriesContinent,
//   setCountriesSort,
} from '../redux/actions';
import SearchBar from './SearchBar';
import './Home.css';


export default function Home() {
  const dispatch = useDispatch();

  const videogames = useSelector(
    (state) => state.videogames,
    () => false
  );

  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginated = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    console.log(getVideogames);
  }

  return (
    <div className="home">
      <div className="main_container">
        <h1>All videogames for you!</h1>
        <Link to="/new">
          <button className="btn">Create new Videogame</button>
        </Link>
        <button
          className="btn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Back
        </button>
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="select_container">
        <h2 className="sort-by">Sort by:</h2>
        {/* <select onChange={(e) => handleSortBy(e)}> */}
        <select>
          <option value="asc">Sort By:</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {/* <select onChange={(e) => handleFilterContinent(e)}> */}
        <select>
          <option value="All">Filter by continent:</option>
          <option value="South America"> South America </option>
          <option value="North America"> North America </option>
          <option value="Europe"> Europe </option>
          <option value="Africa"> Africa </option>
          <option value="Asia"> Asia </option>
          <option value="Oceania"> Oceania </option>
        </select>
        <option value="activity">Activity</option>
      </div>
      <div className='paginate-container'>
        <div className="paginate">
          <Paginate
            videogamesPerPage={videogamesPerPage}
            videogames={videogames.length}
            paginate={paginated}
            />
        </div>
      </div>
      <div className="cards">
        {currentVideogame.length
          ? currentVideogame.map((videogame) => {
              return (
                <div key={videogame.id}>
                  <Link to={'/home/' + videogame.apiId?videogame.apiId:videogame.id}>
                    <Card
                      className="card"
                      img={videogame.img}
                      name={videogame.name}
                      continent={videogame.continent}
                    />
                  </Link>
                </div>
              );
            })
          : (<img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif" />)}
      </div>
    </div>
  );
}
