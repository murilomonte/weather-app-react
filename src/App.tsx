import React from 'react';
import Home from './Pages/Home';
import Header from './Components/_partials/Header';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Home/>
    </div>
  )
}

export default App