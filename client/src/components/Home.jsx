import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Paginate from './Paginate';
import {
  getVideogames,
  getGenres,
  setSort,
  ratingSort,
  filterByGenres,
  filterByCreated,
} from '../redux/actions';
import SearchBar from './SearchBar';
import './Home.css';


export default function Home() {
  const dispatch = useDispatch();

  const videogames = useSelector(
    (state) => state.videogames,
    () => false
  );

  const genres = useSelector(state => state.genres)

  // const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  // const [currentVideogame, setCurrentVideogame] = useState([]);
  const videogamesPerPage = 15;

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = videogames?.slice(
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
    setCurrentPage(1);
    // console.log(getVideogames);
  }

  function handleSortBy(e) {
    dispatch(setSort(e.target.value === 'asc'));
    setCurrentPage(1);
  }

  function handleRatingSort(e) {
    dispatch(ratingSort(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
  }
  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
  }

  useEffect(() => {
    // console.log(genres)
    dispatch(getGenres())
}, [dispatch])

  console.log({"home": videogames});

  return (
    <div className="home">
      <div className="main_container">
        <h1 className='text-title'>All videogames for you!</h1>
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
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="select_container">
        <label className="label">Alphabetical order: </label>
        <select onChange={(e) => handleSortBy(e)}>
          <option disabled>Select an option:</option>
          <option hidden>Select an option</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
        {/* <br/> */}
      <div className="select_container">
        <label className="label">Rating order: </label>
        <select onChange={(e) => handleRatingSort(e)}>
          <option disabled>Select an option:</option>
          <option hidden>Select an option</option>
          <option value="rAsc">Ascending</option>
          <option value="rDesc">Descending</option>
        </select>
      </div>
      <div className="select_container">
        <label className="label">Genres filter: </label>
        <select className="filter-genres" name="genres" onChange={handleFilterGenres}>
          <option disabled>Select an option:</option>
          <option hidden>Select an option</option>
            {genres && genres.length > 0 ? genres.map(mp => (
              <option key={mp.id} value={mp.name} >{mp.name}</option>
            )) : null}
        </select>
      </div>
      <div className="select_container">
        <label className='label'>Created filter: </label>
        <select className="filter-created" name="created" onChange={handleFilterCreated}>
          <option disabled>Select an option:</option>
          <option hidden>Select an option</option>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">From api</option>
        </select>
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
                  <Link to={'/home/' + videogame.id}>
                    <Card
                      className="card"
                      img={videogame.img}
                      name={videogame.name}
                      gId={videogame.gId}
                    />
                  </Link>
                </div>
              );
            })
          : (<div className="loadingio-spinner-bean-eater-uadipf1mxbg"><div className="ldio-7unr3t66ct2">
          <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
          </div></div>)}
          {/* : (<img className="loading-img" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif" />)} */}
      </div>
    </div>
  );
}
