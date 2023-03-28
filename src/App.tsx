import React,{useEffect} from 'react';
import CardList from './components/CardList';
import CategoryNav from './components/CategoryNav';
import Nav, { LOCALSTORAGE_KEY } from './components/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { initUserSetting } from './store/atom';
import CardDetail from './components/CardDetail';
import Search from './components/Search';

function App() {
  const setInitFromUserStorage = useSetRecoilState(initUserSetting);

  /**
   *  @description 유저의 로컬브라우저에 있는 스토리지 데이터가 있으면, 전체 변수에 저장한다.
   */
  useEffect(()=> {
    const JSON_DATA_userStarage =  localStorage.getItem(LOCALSTORAGE_KEY);
    if(JSON_DATA_userStarage) {
      const userStorageData = JSON.parse(JSON_DATA_userStarage);
      setInitFromUserStorage(userStorageData);
      
      document.documentElement.setAttribute("data-theme",userStorageData.velogClone.darkmode ? "dark" :"light");
    }
  },[])


  return (
    <div className="App">
        <BrowserRouter >
          <Nav />
          <CategoryNav />
          <Routes>
            <Route path={"/"} element={<CardList />} />
            <Route path={"/search"} element={<Search />} />
            <Route path={"/card/:id"} element={<CardDetail />} />
          </Routes>
        </BrowserRouter>
        
      </div>
  );
}

export default App;
