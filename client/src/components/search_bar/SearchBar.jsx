import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesName } from '../../redux/actions';
// import { useHistory } from 'react-router-dom';
import s from "./SearchBar.module.css";
// import Swal from 'sweetalert2'


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogamesName(name));
        setName('');
    //     Swal.fire({
    //         title: 'Please fill in the field.',
    //         text: 'Ve al carrito para ver los productos agregados',
    // })
    }

    return (
      <div className="search-bar">
           <input className={s.input}
           value={name} type="text"
           placeholder="Search here..."
              onChange={handleInputChange}
           />
           <button className={s.btn} type="submit" onClick={handleSubmit}>Search</button>
      </div>
    )

}
//     export default function SearchBar() {
//     const [search, setSearch] = useState('');
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const handleChange = (e) => {
//         setSearch(e.target.value);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(getDetail(search));
//         history.push(`/detail/${search}`);
//     }

//     return (
//         <div className="search-bar">
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Search for a movie..." onChange={handleChange} />
//                 <button type="submit">Search</button>
//             </form>
//         </div>
//     )
// }