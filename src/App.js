import React from "react";
import './App.scss';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Foooter/Footer";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movie/:imdbID" element={<MovieDetail />}></Route>
            <Route element={<PageNotFound />}></Route>
          </Routes>
          </div>
          <Footer />                                                                  
          </BrowserRouter> 
    </div>
  );
}

export default App;
