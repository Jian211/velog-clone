import React, { useEffect, useRef, useState } from 'react'
import '../styles/cardList.scss'
import { useRecoilValue} from 'recoil'
import {pageMode} from '../store/atom'
import Paging from './Paging'
import Srcoll from './Scroll'

const CardList = () => {
    const currentPageMode = useRecoilValue(pageMode);
    const [containerWidth,setContainerWidth] = useState(1751) 
    const cardListContainerRef = useRef<HTMLSelectElement>(null);
    const getContainerWidth = () =>  cardListContainerRef.current?.offsetWidth ?? 1268;
    const getLimitFromContainerWidth = () => {
        let result = 10;
        const width = containerWidth;
        
        if(1750 > width)  result = 8
        if(1394 > width ) result = 6
        if(1046 > width ) result = 4
        return result
    }

    useEffect(()=> {
        setContainerWidth(getContainerWidth)
    },[])

    return (
        <>
            <section ref={cardListContainerRef} className='cardList-container'>
                {currentPageMode === "page" 
                    ? <Paging limit={getLimitFromContainerWidth()}/>
                    : <Srcoll limit={getLimitFromContainerWidth()} />
                }
            </section>
        </>
    )
}

export default CardList