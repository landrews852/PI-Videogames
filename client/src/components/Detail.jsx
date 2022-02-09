import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';
import "./Detail.css";


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
    <div className="detailsContainer">
      <div className="buttonDetail">  
      <Link to="/home">
<button className='btn'>Back</button>
</Link>
</div>
      {
        // console.log(videogame),
        videogame
        ? (
            <div className='detail'>
                <img className="img-detail" src={videogame.background_image?videogame.background_image:videogame.img} alt="img" />
                <div className="videogameDetails">
                <h1 className='firstItem'>Name: {videogame.name}</h1>
                <p className='text'>Released date: {videogame.released}</p>
                <br/>
                <p className='text'>Rating: {videogame.rating}</p>
                <br/>
                <p className='text'>Platforms: {plataformas()}</p>
                {/* {plataformas.map((p) => <p>{p}</p>
                )} */}
                <br/>
                <p className='text'>{"Genre: " + videogame.genres?.map(e => " " + e.name)}</p>
                <br/>
                {/* <p className='text'>Description: {videogame.description}</p> */}
                <p className='text' dangerouslySetInnerHTML={{ __html: videogame.description }}></p>
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
     );
}