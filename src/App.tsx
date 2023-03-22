import React from 'react';
import CardList from './components/CardList';
import CategoryNav from './components/CategoryNav';
import Nav from './components/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
        <Nav />
        <CategoryNav />
        <BrowserRouter >
          <Routes>
            <Route path={"/"} element={<CardList />} />
          </Routes>
        </BrowserRouter>
        
      </div>
  );
}

export default App;
