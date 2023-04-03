
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

import './styles/myCSS.css'
import FavoritePosts from './components/FavoritePosts';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage />}></Route>
          <Route exact path='/SignUp' element={<SignUpPage />}></Route>
          <Route exact path='/Homepage' element={<HomePage />}></Route>
          <Route exact path='/Posts/Favorites/:userId' element={<FavoritePosts />}></Route>
          <Route exact path='/Search' element={<Search />}></Route>
          <Route exact path='/Profile/:userProfileId' element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
