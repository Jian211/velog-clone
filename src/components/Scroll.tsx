import React, { useRef,useEffect} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { scrollCardDataList, scrollCnt } from '../store/atom';
import Card from './Card';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import NoCardError from './NoCardError';

interface IScrollProps {
    limit:number,
}

const Srcoll = ({limit}:IScrollProps) => {
    const setScrollCnt = useSetRecoilState(scrollCnt);
    const scrollCardRecoil =  useRecoilValue(scrollCardDataList(limit))
    
    const cardRef = useRef<HTMLDivElement>(null);
    const entry = useIntersectionObserver(cardRef,{})
    const isVisible = entry?.isIntersecting;
  
    useEffect(()=> {
        if(isVisible){
            setScrollCnt(curr => curr + 1)
        } 
     
    },[isVisible])

    return (
        <> {
            scrollCardRecoil ?
                scrollCardRecoil.map( (card, index) => (
                    <Card 
                        key={card.id}
                        {...card}
                        ref={index === scrollCardRecoil.length -1 ? cardRef : null}
                    />
            ))
            : <NoCardError /> 
        }</>
    )
}


export default Srcoll;