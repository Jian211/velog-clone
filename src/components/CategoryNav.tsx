import React,{useState,useEffect,useRef} from "react";
import '../styles/categoryNav.scss'
import { useRecoilState, useSetRecoilState } from "recoil";
import { cardListData, currPeriod, ICard, ILocalStorage, initUserSetting } from "../store/atom";

import { ReactComponent as Tranding } from '../images/tranding.svg'
import { ReactComponent as Clock } from '../images/clock.svg'
import { ReactComponent as Heart } from '../images/heart.svg'
import {ReactComponent as Filter} from '../images/filter-circle-svgrepo-com.svg'
import {ReactComponent as Scroll} from '../images/scroll-down-icon.svg'
import {ReactComponent as Page} from '../images/page-file-icon.svg'
import { LOCALSTORAGE_KEY } from "./Nav";
import { useLocation } from "react-router-dom";


interface ISelectData {
    [key: string] : (arr:ICard[]) => ICard[]
}

const selectData: ISelectData = {
    tranding : (arr) => {
        // 8:2 = 댓글 수 : 좋아요 수
        const currList = [...arr];
        currList.sort( (a,b) => {
            return  a.likes * 4 + a.comments_count - b.likes * 4 + b.comments_count
        }).reverse()
        return [...currList]
    },
    recent : (arr) => {
        const currList = [...arr];            
        currList.sort( ( a,b) => {
            const r = new Date(a.released_at).getTime()
            const d = new Date(b.released_at).getTime()
            return r - d
        }).reverse()
        return [...currList]
    },
    heart : (arr) => {
        const currList = [...arr];
        return currList.sort( (a,b) => b.likes - a.likes)
    },
}

const CategoryNav = () => {
    const setCardList = useSetRecoilState(cardListData);
    const [filterType,setFilterType] = useRecoilState(currPeriod);
    const [{velogClone: {pageMode}}, setInit] = useRecoilState(initUserSetting);
    const [showSettingBtn, setShowSettingBtn] = useState(false);
    const {pathname} = useLocation();

    const selectRef = useRef<HTMLSelectElement>(null);

    /**
     * @description  유저가 선택한 카테고리에 따라서 리스트를 재 설정하는 메소드
     */
    const handleCateList = (target:string) => () => setCardList( curr => selectData[target](curr));

    /**
     * @description 필터링 창을 보여주거나 숨기는 함수.
     * @name setShowSettingBtn 이 state를 통해 display를 none하거나 flex를 적용시킨다. 
     */
    const handleShowChild = () => setShowSettingBtn(curr => !curr);

    /**
     * @description 유저가 선택한 기간을 저장하기위해 버튼을 눌렀을 때 3가지의 함수를 실행한다.
     * @param selectRef.current.value select태그에서 선택된 값.
     * @name setFilterType state로, 유저가 선택한 기간(ex: "week")을 저장한다.
     * @name setFilterTypeInLocalstorage param값을 로컬스토리지에 저장하는 함수를 실행.
     * @name setShowSettingBtn 이 state를 통해 display를 none하거나 flex를 적용시킨다.
     */
    const handleDateFilterSubmit = () => {
        if(selectRef.current){
            setFilterTypeInLocalstorage(selectRef.current.value)
            setFilterType(selectRef.current.value)
        }
        setShowSettingBtn(curr => !curr)
    }

    /**
     * @param value 유저가 선택한 날짜 데이터
     * @constant currentLocalData 브라우저의 로컬스토리지 데이터 값.
     * @constant uewData 로컬스토리지에 새롭게 넣을 값
     * @description 유저가 선택한 기간을 로컬스토리지에 넣는 함수.
     */
    const setFilterTypeInLocalstorage = (value:string) => {
        const currentLocalData = localStorage.getItem(LOCALSTORAGE_KEY)
        if(currentLocalData) {
            const newData:ILocalStorage = {...JSON.parse(currentLocalData)}
            newData.velogClone.card.dayFilter = value
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({...newData}))
        }
    }

    const handlePaging = (mode = "page") => () => {
         setInit( curr => {
            const newValue = {
                velogClone : {
                    ...curr.velogClone,
                    pageMode: mode
                }
            }
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newValue))
            return newValue;
        });
    }

    useEffect(()=>{
        const localstorageData = localStorage.getItem(LOCALSTORAGE_KEY);
        if(localstorageData){
            const {velogClone : {card : {dayFilter}}}:ILocalStorage = JSON.parse(localstorageData);
            setFilterType(dayFilter)
        }
    }, [])

    return (
        <div className="categoryNav-container">
            {pathname === "/" && 
            <>
                <div onClick={handleCateList("tranding")}>
                    <Tranding />                
                    <h4>트렌딩</h4>
                </div>
                <div onClick={handleCateList("recent")}>
                    <Clock />                
                    <h4>최신</h4>
                </div>
                <div onClick={handleCateList("heart")}>
                    <Heart />                
                    <h4>인기</h4>
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
                    <div
                        onClick={handlePaging("page")} 
                        style={{ color : pageMode === "page" ? "black":"gray"}}
                    >
                        <Page width={16} />
                        <h4>페이지형식</h4>
                    </div>

                    <div
                        onClick={handlePaging("scroll")}
                        style={{ color : pageMode === "scroll" ? "black":"gray"}}
                    > 
                        <Scroll width={14} />
                        <h4>스크롤형식</h4>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default CategoryNav;