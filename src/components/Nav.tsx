import React,{useState, useEffect} from 'react';
import '../styles/nav.scss'
import { ReactComponent as Search} from '../images/search-svgrepo-com.svg'
import { ReactComponent as Moon } from '../images/moon-svgrepo-com.svg'
import { ReactComponent as Sun } from '../images/sun-svgrepo-com.svg'
import {ReactComponent as VelogLog} from '../images/velog-log.svg';

const LOCALSTORAGE_KEY = "initialSettingOfVelog";

type LocalStorageType = {
    velogClone: {
        darkmode : boolean
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
            const newData = JSON.parse(currentLocalData);
            newData.velogClone.darkmode = !darkMode
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData))
        }
        else setInitDataInLocalstorage()
    }

    // 초기 모드 설정 함수
    const setInitDataInLocalstorage = () => {
        const initData = {
            velogClone : {
                darkmode : false
            }
        }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(initData))
    }

    useEffect(() => {
        // localstorige 값 찾기
        const localData = localStorage.getItem(LOCALSTORAGE_KEY);
        
        // 로컬스토리지에 값이 없는 경우, 초기 데이터를 저장시키고 화이트모드로 설정
        if(!localData)  setInitDataInLocalstorage();
        else {
            const data:LocalStorageType = JSON.parse(localData);
            setDarkmode(data.velogClone.darkmode)
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
