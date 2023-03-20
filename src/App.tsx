import React from 'react';
import CardList from './components/CardList';
import CategoryNav from './components/CategoryNav';
import Nav from './components/Nav';

function App() {

  return (
    <div className="App">
      <Nav />
      <CategoryNav />
      <CardList />
    </div>
  );
}

export default App;
