import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, addVideogame, getPlatforms } from "../redux/actions"
import { Link } from "react-router-dom"

// function validate(input) {
//     const errors = {};
//     if (!input.name.trim()) {
//       errors.name = "A name is required";
//     }
//     if (!input.description.trim()) {
//       errors.description = "A description is required";
//     }
//     if (!input.released.trim()) {
//       errors.released = "The release date is required";
//     }
//     return errors;
//   }

export default function Form(){
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    // const videogames = useSelector(state => state.allVideogames)
    const platforms = useSelector(state => state.platforms)
    // const [errors, setErrors] = useState({});
    
    const [state, setState] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        gId: []
    })

    
    
    // const resetForm = () => {
    //     setState({
    //         name: "",
    //         difficulty: "",
    //         duration: "",
    //         season: "",
    //         cId: []
    //     })
    // }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        dispatch(addVideogame(state))
        // resetForm()
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value

    })}

    const handleSelectPlatform = (e) =>{
    setState({
        ...state,
        platforms: [...state.platforms, e.target.value],
    });
    }
    
    const handleSelectGenres = (e) => {
    setState({
        ...state,
        genres: [...state.genres, e.target.value],
    });
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setErrors(
    //       validate({
    //         ...state,
    //         [e.target.name]: e.target.value,
    //       })
    //     );
    //     if (Object.keys(errors).length === 0) {
    //         dispatch(postVideogames(state));
    //         alert("Your videogame has been created");
    //         setState({
    //           name: "",
    //           description: "",
    //           released: "",
    //           rating: "",
    //           platforms: [],
    //           genres: [],
    //         });
    //       } else {
    //         alert("Your videogame couldn't be created");
    //         return;
    //       }
    //     }

    // const handleSelect = (e) => {
    //     setState({
    //         ...state,
    //         countriesId: [...state.countries, e.target.value]
    // })}

    // const handleSelect = e => { 
    //     setState({
    //         ...state, 
    //         cId: state.gId.concat(e.target.value) } ) } 

    // const handleCheck = (e) => {
    //     if(e.target.checked) {
    //         setState({
    //             ...state,
    //             countries: e.target.value
    //         })
    //     }
    // }

    useEffect(() => {
        // console.log(genres)
        dispatch(getGenres())
    }, [dispatch])

    useEffect(() => {
        // console.log(platforms)
        dispatch(getPlatforms())
    }, [dispatch])


return (
    <div className="form-main-container">
        <form className="form" onSubmit={handleOnSubmit}>
        <div>
            <label className="label">Name: </label>
            <input type="text" className="name-input" name="name" value={state.name} placeholder="Name here..." onChange={handleChange} />
        </div>

        <div>
            <label className="label">Description: </label>
            <input type="text" className="description-input" name="description" value={state.description} placeholder="Description here..." onChange={handleChange} />
        </div>
        <div>
            <label className="label">Released date: </label>
            <input type="date" className="released-input" name="released" value={state.released} placeholder="Released date here..." onChange={handleChange} />
        </div>
            <div>
                <label className="label">Platforms: </label>
                <select className="select" name="season" onChange={handleSelectPlatform} value={state.name}>
                    <option>Select video game platforms: </option>
                    {platforms?.map((platform, i) => {
                        return (
                            <option key={i} value={platform} >{platform}</option>
                            )
                        })}
                    {/* {platforms?.map(mp => (
                        <option key={mp.name} value={mp.name}>{mp.name}</option>
                    ))} */}
                {/* <div><ul><li>{state.cId.map(el => el + ", ")}</li></ul></div> */}
                {/* {console.log(state.cId)} */}
                <div> { state.cId && state.cId.map( mp => ( <ul className='countries-creates' key={mp}>{mp}</ul>) ) } </div>
                </ select>
            </div>
            <div>
                <label className="label">Genres: </label>
                <select className="select" name="genres" onChange={handleSelectGenres} value={state.id}>
                    <option>Select video game ganres: </option>
                    {genres?.map(mp => (
                        <option key={mp.name} value={mp.id}>{mp.name}</option>
                        ))}
                {/* <div><ul><li>{state.gId.map(el => el + ", ")}</li></ul></div> */}
                {/* {console.log(state.gId)} */}
                <div> { state.gId && state.gId.map( mp => ( <ul className='countries-creates' key={mp}>{mp}</ul>) ) } </div>
                </ select>
            </div>
            <div className="form-btn-container">
            <button className="btn" >Add your video game</button>
<Link to="/home"><button className="btn">Back</button></Link>
            </div>
        </form>
  </div>
  )
}