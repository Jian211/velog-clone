import React,{useState, useEffect} from 'react';
import '../styles/nav.scss'
import { ReactComponent as Search} from '../images/search-svgrepo-com.svg'
import { ReactComponent as Moon } from '../images/moon-svgrepo-com.svg'
import { ReactComponent as Sun } from '../images/sun-svgrepo-com.svg'
import {ReactComponent as VelogLog} from '../images/velog-log.svg';

export const LOCALSTORAGE_KEY = "initialSettingOfVelog";
 
export type LocalStorageType = {
    velogClone:{
        darkmode : boolean,
        card : {
            dayFilter : string,
            categorys : {
                tranding : boolean,
                recent : boolean,
                popular : boolean
            }
        }
    }
}

const Nav = () => {
    const [darkMode, setDarkmode] = useState(false);
    
    const onChangeMode = () => {
        setMode();
        setDarkmode( curr => !curr);
    } 

    const setMode = () => {
        const currentLocalData = localStorage.getItem(LOCALSTORAGE_KEY);
        if(currentLocalData) {
            const newData:LocalStorageType = {...JSON.parse(currentLocalData)}
            newData.velogClone.darkmode = !darkMode
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData))
        }
        else setInitDataInLocalstorage()
    }

    // 초기 모드 설정 함수
    const setInitDataInLocalstorage = () => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
            velogClone : {
                darkmode : false,
                card : {
                    dayFilter : "all",
                    categorys : {
                        tranding : true,
                        recent : false,
                        popular : false
                    }
                }
            }
        }))
    }

    useEffect(() => {
        // localstorige 값 찾기, 없을경우 초기 데이터를 로컬스토리지에 저장
        const localData = localStorage.getItem(LOCALSTORAGE_KEY) ?? setInitDataInLocalstorage();
        if(localData){
            const data:LocalStorageType = JSON.parse(localData);
            setDarkmode(data.velogClone.darkmode ?? false )
        }
    },[])

    return (
        <nav className='nav-container'>
            <VelogLog />
            <ul>
                <li onClick={onChangeMode}>
                    {!darkMode 
                        ? <Sun  
                            width="24" 
                            height="24" 
                          />
                        : <Moon 
                            width="24" 
                            height="24" 
                            fill='black' 
                          />
                    }
                </li>
                <li>
                    
                    <Search width="24" height="24" />
                </li>
                <li>
                    <h4>로그인</h4>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
