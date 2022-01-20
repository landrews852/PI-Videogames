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



  function handleSortBy(e) {
    dispatch(setSort(e.target.value === 'asc'));
    setCurrentPage(1);
  }

  function handleRatingSort(e) {
    dispatch(ratingSort(e.target.value));
    setCurrentPage(1);
  }

  // function handleRatingSort(e) {
  //   dispatch(ratingSort(e.target.value));
  //   setCurrentPage(1);
  //   setOrder(e.target.value);
  // }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
  }

  useEffect(() => {
    // console.log(genres)
    dispatch(getGenres())
}, [dispatch])

  
  console.log(videogames);
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
          Back
        </button>
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="select_container">
        <label className="sort-by">Alphabetical order: </label>
        <select onChange={(e) => handleSortBy(e)}>
          <option value="All">Sort by</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
        <div className="select_container">
        <label className="sort-by">Rating order: </label>
        <select onChange={(e) => handleRatingSort(e)}>
          <option value="rAsc">Select the parameter</option>
          <option value="rAsc">Ascending</option>
          <option value="rDesc">Descending</option>
        </select>
        <label className="sort-by">Genres filter: </label>
        <select className="filter-genres" name="genres" onChange={handleFilterGenres}>
          <option value="All">Select video game ganres: </option>
            {genres && genres.length > 0 ? genres.map(mp => (
              <option key={mp.id} value={mp.name} >{mp.name}</option>
            )) : null}
        </select>
        <label className='sort-by'>Created filter: </label>
        <select className="filter-created" name="created" onChange={handleFilterGenres}>
          <option value="All">Select option: </option>
          <option value="created">Created</option>
          <option value="api">From api</option>

        
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
                  <Link to={'/home/' + videogame.apiId?videogame.apiId:videogame.id}>
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
