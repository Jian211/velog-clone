import React,{useState,useEffect,useRef} from "react";
import '../styles/categoryNav.scss'
import { useSetRecoilState } from "recoil";
import { cardListData, ICard } from "../store/atom";

import { ReactComponent as Tranding } from '../images/tranding.svg'
import { ReactComponent as Clock } from '../images/clock.svg'
import { ReactComponent as Heart } from '../images/heart.svg'
import {ReactComponent as Filter} from '../images/filter-circle-svgrepo-com.svg'
import { LocalStorageType, LOCALSTORAGE_KEY } from "./Nav";

interface ISelectData {
    [key: string] : any,
}

const selectData: ISelectData = {
    tranding : (arr:ICard[]) => {
        const currList = [...arr];
        // 8:2 = 댓글 수 : 좋아요 수
        currList.sort( (a,b) => {
            return  a.likes * 4 + a.comments_count - b.likes * 4 + b.comments_count
        }).reverse()
        return [...currList]
    },
    recent : (arr:ICard[]) => {
        const currList = [...arr];            
        currList.sort( ( a,b) => {
            const r = new Date(a.updated_at).getTime()
            const d = new Date(b.updated_at).getTime()
            return r -d
        }).reverse()
        return [...currList]
    }
}

type FilterType = "all" | "day" |"weed" | "month"| "year"

const CategoryNav = () => {

    const setCardList = useSetRecoilState(cardListData);
    const [filterType, setFilterType] = useState<string>();
    const [showSettingBtn, setShowSettingBtn] = useState(false);

    const selectRef = useRef<HTMLSelectElement>(null);

    //유저가 선택한 카테고리에 따라서 리스트를 재 설정하는 메소드
    const handleCateList = (target:string) => () => setCardList( curr => selectData[target](curr))

    const handleShowChild = () => setShowSettingBtn(curr => !curr);

    const handleDateFilterSubmit = () => {
        if(selectRef.current){
            setFilterTypeInLocalstorage(selectRef.current.value)
            setFilterType(selectRef.current.value)
        }
        setShowSettingBtn(curr => !curr)
    }

    const setFilterTypeInLocalstorage = (value:string) => {
        const currentLocalData = localStorage.getItem(LOCALSTORAGE_KEY)
        if(currentLocalData) {
            const newData:LocalStorageType = {...JSON.parse(currentLocalData)}
            newData.velogClone.card.dayFilter = value
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({...newData}))
        }
    }

    useEffect(()=>{
        const localstorageData = localStorage.getItem(LOCALSTORAGE_KEY);
        if(localstorageData){
            const {velogClone : {card : {dayFilter}}}:LocalStorageType = JSON.parse(localstorageData);
            console.log(dayFilter,"묽")
            setFilterType(dayFilter)
        }
    }, [filterType])

    return (
        <div className="categoryNav-container">
            <div onClick={handleCateList("tranding")}>
                <Tranding />                
                <h4>트렌딩</h4>
            </div>
            <div onClick={handleCateList("recent")}>
                <Clock />                
                <h4>최신</h4>
            </div>
            <div>
                <div onClick={handleShowChild}>
                    <Filter />                
                    <h4>필터링</h4>
                </div>

                <div style={{ display:  showSettingBtn ? "flex" : "none" }}>
                    <select name="filter" ref={selectRef} defaultValue={filterType} key={filterType} >
                        <option value="all" >전체</option>
                        <option value="day">1일</option>
                        <option value="week">일주일</option>
                        <option value="month">한달</option>    
                        <option value="year">일년</option>    
                    </select>
                    <button onClick={handleDateFilterSubmit}>저장</button>
                </div>
            </div>
            <div>
                <Heart />                
                <h4>인기</h4>
            </div>
        </div>
    )
}

export default CategoryNav;