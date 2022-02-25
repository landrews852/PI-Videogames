import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import Paginate from '../Paginate';
import {
  getVideogames,
  getGenres,
  setSort,
  ratingSort,
  filterByGenres,
  filterByCreated,
} from '../../redux/actions';
import SearchBar from '../search_bar/SearchBar';
import NavBar from '../nav_bar/NavBar';
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


  useEffect(() => {
    // console.log(genres)
    dispatch(getGenres())
}, [dispatch])

  console.log({"home": videogames});

  return (
    <div id="home" className="home">
      {/* <div className='navbar'>
        <NavBar />
      </div> */}
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
