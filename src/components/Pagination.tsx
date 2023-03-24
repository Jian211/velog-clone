
import React from 'react'
import '../styles/paging.scss'

interface IPagination {
    total : number,
    limit : number,
    page  : number,
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({total, limit, page, setPage}:IPagination) => {

    const numPages = Math.ceil(total/limit)
    
    return (
        <ul className='cardList__Index-container'>
            {Array(numPages).fill(0).map((_,index) => (
                <li 
                    className={index+1 === page ? "cardList__selected" : ""}
                    key={index} 
                    onClick={() => setPage(index + 1)}
                    
                >
                    <h4> {index + 1}</h4>
                </li>
            ))}
        </ul>
    )
}

export default Pagination