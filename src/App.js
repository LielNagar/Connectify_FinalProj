//import Header from './components/Header'
//import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
//import Post from './components/Post';
import Search from './components/Search';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage />}></Route>
          <Route exact path='/SignUp' element={<SignUpPage />}></Route>
          <Route exact path='/Homepage' element={<HomePage />}></Route>
          <Route exact path='/Search' element={<Search />}></Route>
          <Route exact path='/MyProfile' element={<MyProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
