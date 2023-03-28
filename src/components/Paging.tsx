
import React, { useState} from 'react'
import { useRecoilValue } from 'recoil';
import { cardFilterData } from '../store/atom';
import Card from './Card';
import NoCardError from './NoCardError';
import Pagination from './Pagination';

interface IPagingProps {
    limit : number
}   

const Paging = ({limit} :IPagingProps) => {
    const filteredCardList = useRecoilValue(cardFilterData(""))
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    return (
        <>
            {filteredCardList.length ?
                filteredCardList
                    .slice(offset, offset+ limit)
                    .map( card => (
                        <Card 
                            key={card.id}
                            {...card}
                        />
                ))
                : <NoCardError /> 
            }
            
           <Pagination
                limit={limit}
                page={page}
                setPage={setPage}
                total={filteredCardList.length ?? 0}
            />
        </>
    )
}

export default Paging;