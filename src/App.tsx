import React from 'react';
import './App.css';
import { 
  Footer, 
  Header, 
  SignIn, 
  SignUp, 
  Books, 
  RegistrationConfirm,
  ContentPage,
  BasketWindow,
  SearchResults,
  Favorites,
  Order
} from './components'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
          <Route path='/' element={<Navigate to='/new' />}/>
              <Route path='/sign-up'
                    element={<SignUp />} />
              <Route path='/sign-in' 
                    element={<SignIn />} />
              <Route path='activate/:uid/:token'
                    element={<RegistrationConfirm />} />
              <Route path='/basket' 
                    element={localStorage.getItem('access') ? <BasketWindow /> : <Navigate to={'/sign-in'}/>}/>
              <Route path='/new' 
                    element={<Books />} />
              <Route path='/books' >
                  <Route path=":isbn13" 
                        element={<ContentPage />} />
              </Route>
              <Route path='/search-results' 
                     element={<SearchResults />} />
              <Route path='/favorites' 
                     element={localStorage.getItem('access') ? <Favorites /> : <Navigate to={'/sign-in'}/>}/>
              <Route path='/order' 
                     element={<Order />} />
      </Routes>
      <Footer />
           
    </div>
  );
}

export default App;
