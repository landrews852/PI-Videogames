import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, addVideogame, getPlatforms, validate } from "../../redux/actions"
import { Link, useNavigate } from "react-router-dom"
import "./Form.css"
import Swal from 'sweetalert2'

import { isNull } from "util"

export default function Form(){
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    
    const [game, setGame] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platform: [],
        gId: []
    })

    const [disabledButton, setDisabledButton] = useState(true);

    const [error, setError] = useState("");

    const navigate = useNavigate()

    const validate = () => {
        if(validate) {
            setError("That name is already exist");
            alert("Your videogame couldn't be created");
            return;
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await dispatch(addVideogame(game))
                Swal.fire({
                title: 'VideoGame created!',
                text: 'You have been redirected to home page to see all videogames',
            })
            navigate("/home")
        }
        catch(err) {
            setError("Something went wrong!")
        }
    }

    const handleChange = (e) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value

    })}

    const handleSelectPlatform = (e) => {
        setGame({
            ...game,
            platform: [...game.platform, e.target.value],
        });
    }
    
    const handleDeleteP = (e) => {
        setGame({
            ...game,
            platform: game.platform.filter((p) => p !== e),
        });
      }
      
    const handleSelectGenres = (e) => {
        setGame({
            ...game,
            gId: [...game.gId, e.target.value],
        });
    }

    const handleDeleteG = (e) => {
        setGame({
            ...game,
            gId: game.gId.filter((g) => g !== e),
        });
    }
        
    useEffect(() => {
        // console.log(genres)
        dispatch(getGenres())
    }, [dispatch])
    
    useEffect(() => {
        // console.log(platforms)
        dispatch(getPlatforms())
    }, [dispatch])
    
    const validateRating = (rating) => rating > 5 || rating < 0

    useEffect(() => {
        console.log(game)
        if(game.name && game.description && game.released && game.rating && game.platform.length > 0 && game.gId.length > 0 && !(validateRating(game.rating))){
            setDisabledButton(false)
            setError('');
        } else {
            if(validateRating(game.rating)) {
                setError('Rating is not valid. Must be between 0 and 5.');
            } else {
                setError('Please complete all fields.');
            }
            setDisabledButton(true)
        }
    }, [game])

    useEffect(() => {
        if(!game.name || !game.description || !game.released || !game.rating || !game.platform || !game.gId) {
            setError('Please complete all fields.');
        }
        // if(!game.name.length) setErrors({
        //     name: "Your game must have a name."
        // })
        // if(!game.description) setErrors({
        //     description: "Your game must have a description."
        // })
        // if(!game.released) setErrors({
        //     ...errors,
        //     released: "Your game must have a released date."
        // })
        // if(game.rating > 5 || game.rating < 0) setErrors({
        //     ...errors,
        //     description: "Your game must have a rating between 0 and 5."
        // })
        // if(!game.platform) setErrors({
        //     ...errors,
        //     platform: "Your game must have at least one platform."
        // })
        // if(!game.gId) setErrors({
        //     ...errors,
        //     gId: "Your game must have at least one genre."
        // })
    }, [game])

return (
    <div className="form-main-container">
        <h2 className="text">Create your own videogame</h2>
        <br/>
        <br/>
        <form className="form" onSubmit={handleOnSubmit}>
            <div>
                <label className="label">Name: </label>
                <input type="text" className="name-input" name="name" value={game.name} placeholder="Name here..." onChange={handleChange} />
            </div>
            <div>
                <label className="label">Description: </label>
                <input type="text" className="description-input" name="description" value={game.description} placeholder="Description here..." onChange={handleChange} />
            </div>
            {/* <div>
                <label className="label">Image: </label>
                <input type="text" className="img-input" name="img" value={game.img} placeholder="Img url here..." onChange={handleChange} />
            </div> */}
            <div>
                <label className="label">Released date: </label>
                <input type="date" className="released-input" name="released" value={game.released} placeholder="Released date here..." onChange={handleChange} />
            </div>
            <div>
                <label className="label">Rating: </label>
                <input type="number" className="rating-input" name="rating" min="0" value={game.rating} placeholder="Rating here..." onChange={handleChange} />
            </div>
            <div>
                <label className="label">Platforms: </label>
                <select className="select" name="platforms" onChange={handleSelectPlatform} value={game.platform}>
                    <option disabled>Select video game platforms: </option>
                    <option hidden>Select video game platforms</option>
                    {platforms?.map((platform, i) => {
                        return (
                            <option key={i} value={platform} >{platform}</option>
                            )
                        })}
                </ select>
            </div> 
            <div>
                <label className="label">Genres: </label>
                <select className="select" name="genres" onChange={handleSelectGenres} value={game.gId}>
                    <option disabled>Select video game ganres: </option>
                    <option hidden>Select video game ganres</option>
                    {genres?.map(mp => (
                        <option key={mp.name} value={mp.gId}>{mp.name}</option>
                        ))}
                </ select>
            </div>
            <div className="errorDiv">
            <p className="error">
            {error}
            </p>
            </div>
            <div className="form-btn-container">
                <button className="btn addBtn" disabled={disabledButton}>Add your video game</button>
            </div>
        </form>
        <div><p className="label">Platforms selected: </p>{game.platform?.map(e => {return (<div className="delDiv"><li className="label" key={e} >{e}</li><button className="del" onClick={() => handleDeleteP(e)} value={e}>Delete</button></div>)})}</div>
        <div><p className="label">Genres selected: </p>{game.gId?.map(e => {return (<div className="delDiv"><li className="label" key={e}>{e}</li><button className="del" onClick={() => handleDeleteG(e)} key={e}>Delete</button></div>)})}</div>
            <Link to="/home"><button className="btn back">Back</button></Link>
        </div>
    )
}