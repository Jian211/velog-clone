import React,{useEffect, useState, useRef} from "react"
import '../styles/search.scss'

import { ReactComponent as SearchImg} from '../images/search.svg'
import { getSearchedPosts } from "../api";
import { ICard } from "../store/atom";
import SearchedCard from "./SearchedCard";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedList,setSearchedList] = useState<ICard[]>();
    const [count,setCount] = useState(1)
    const [listCnt, setListCnt] = useState(0);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const cardRef= useRef<HTMLDivElement>(null)
    const entry = useIntersectionObserver(cardRef,{})
    const isVisible = entry?.isIntersecting
   
    useEffect(()=> {
        if(isVisible){
            if(!searchedList || searchedList.length < 10) return 
            setCount(curr => curr++)
        }
    },[isVisible,count])

    useEffect(()=> {
        // 포스트 불러오기
        if(searchValue.length === 0 ) return
        (async () => {
            const fetchData = await getSearchedPosts(searchValue);
            setSearchedList(fetchData)
            setListCnt(fetchData.length)

        })()
    }, [searchValue, listCnt])

    
    return (
        <div className="search-conainer">
            <aside />

            <section className="search-conainer__main">
                <div  className="search-conainer__main__search">
                    <SearchImg width={24} height={24}  />
                    <input 
                        onChange={handleChange}
                        placeholder="검색어를 입력하세요"
                        value={searchValue}
                    />
                </div>
                <p>
                    { listCnt < 1 ? <></>
                        : listCnt > 0 
                            ? <>총 <b>{listCnt}</b>개의 포스트를 찾았습니다.</>
                            : <>검색 결과가 없습니다.</>
                    }
                </p>
                <div>
                    {searchedList?.map( (card, index) => (
                        <SearchedCard 
                            key={card.id}
                            {...card}
                            ref={ searchedList.length - 1 === index ? cardRef : null}
                        />
                    ))}
                </div>
            </section>

            <aside/>
        </div>
    )
}

export default Search