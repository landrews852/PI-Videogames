import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import s from "./Detail.module.css";


export default function Detail() {

  const videogame = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const { id } = useParams();
    
  useEffect(() => {   
      dispatch(getDetail(id))
  }, [dispatch]);



  const plataformas = () => {
    if (videogame.length == 0) return
    if(videogame.platforms) {
      // console.log(videogame.platform)
      const platformsName = videogame.platforms.map(e => e.platform.name)
      return platformsName.join(", ")
    } else {
      return videogame.platform.join(", ")
    }
  }

  return (
    <div className={s.detailsContainer}>
      <div className={s.buttonDetail}>  
        <Link to="/home">
          <button className='btn'>Back</button>
        </Link>
      </div>
      <div className={s.details}>
        {
          videogame
          ? (
              <div className={s.detail}>
                  <img className={s.img_detail} src={videogame.background_image?videogame.background_image:videogame.img} alt="img" />
                  <div className={s.videogameDetails}>
                  <h1 className={s.firstItem}>Name: {videogame.name}</h1>
                  <p className={s.text}>Released date: {videogame.released}</p>
                  <br/>
                  <p className={s.text}>Rating: {videogame.rating}</p>
                  <br/>
                  <p className={s.text}>Platforms: {plataformas()}</p>
                  <br/>
                  <p className={s.text}>{"Genre: " + videogame.genres?.map(e => " " + e.name)}</p>
                  <br/>
                  <p className={s.text} dangerouslySetInnerHTML={{ __html: videogame.description }}></p>
                  </div>
              </div>
          )
          : (
              <div>
                  <h1>Loading...</h1>
              </div>
            )
        }
      </div>
    </div>
    );
}