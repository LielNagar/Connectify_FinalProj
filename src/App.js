import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import Search from './components/Search';
// import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import FavoritePosts from './components/FavoritePosts';
import Profile from './components/Profile';
import LiveChat from './components/chat/LiveChat';

import './styles/myCSS.css'

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/SignUp' element={<SignUpPage />}></Route>
          <Route path='/Homepage' element={<HomePage />}></Route>
          <Route path='/Posts/Favorites/:userId' element={<FavoritePosts />}></Route>
          <Route path='/Search' element={<Search />}></Route>
          <Route path='/Chat' element={<LiveChat />}></Route>
          <Route path='/Profile/:userProfileId' element={<Profile />}></Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
