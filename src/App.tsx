import React from 'react';
import './App.css';
import { 
  Footer, 
  Header, 
  SignIn, 
  SignUp, 
  Books, 
  RegistrationConfirm,
  ContentPage
} from './components'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className='page'>
      <Header />
      <Routes>
          <Route path="/" >
            <Route path='/sign-up'
                    element={<SignUp />} />
              <Route path='/sign-in' 
                    element={<SignIn />} />
              <Route path='activate/:uid/:token'
                    element={<RegistrationConfirm />} />
              <Route path='/new' 
                    element={<Books />} />
              <Route path="books" >
                  <Route path=":isbn13" 
                        element={<ContentPage />} />
              </Route>
            </Route>
      </Routes>
      <Footer />
           
    </div>
  );
}

export default App;
