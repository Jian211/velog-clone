import React, { useEffect,useState, useRef } from 'react'
import '../styles/cardList.scss'
import Card from './Card'
import { useRecoilValue} from 'recoil'
import {cardFilterData} from '../store/atom'
import NoCardError from './NoCardError'
import Pagination from './Pagination'


const CardList = () => {
    const filteredCardList = useRecoilValue(cardFilterData(""))
    
    const [containerWidth, setContainerWidth] = useState<number>(1751);
    const cardListContainerRef = useRef<HTMLSelectElement>(null);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    
    
    const getContainerWidth = () =>  cardListContainerRef.current?.offsetWidth ?? 1268;
    
    /**
     * @returns 1페이지에 들어가는 카드의 총 개수
     */
    const getLimitFromContainerWidth = () => {
        let result = 10;
        if(1750 > containerWidth)  result = 8
        if(1394 > containerWidth ) result = 6
        if(1046 > containerWidth ) result = 4
        return result
    }

    useEffect(()=> {
        setContainerWidth(getContainerWidth())
        setLimit(getLimitFromContainerWidth()) 
        
    },[limit,containerWidth])
    return (
        <>
            <section ref={cardListContainerRef} className='cardList-container'>
                { filteredCardList.length ?  
                    filteredCardList
                        // .filter( card => card.thumbnail)
                        .slice(offset, offset+ limit)
                        .map( card => (
                            <Card 
                                key={card.id}
                                {...card}
                            />
                        ))
                    : <NoCardError /> 
                }
            </section>

            <Pagination
                limit={limit}
                page={page}
                setPage={setPage}
                total={filteredCardList.length ?? 0}
            />
            
        </>
    )
}

export default CardList