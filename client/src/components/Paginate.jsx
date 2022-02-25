import React from 'react';
import './Paginate.css';

export default function Paginate(props) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.videogames / props.videogamesPerPage);
    i++
  ) {
    pageNumbers.push(i);
    // debugger
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                className="page-link"
                onClick={() => props.paginate(number)}
                href="/#"
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}