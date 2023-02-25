import React, {useEffect, useState} from "react";
import NavBar from "./components/navBar/NavBar";
import Banner from "./components/banner/Banner";
import './App.css';
import RowPost from "./components/rowPost/RowPost";
import axios from './axios';
import { apiKey } from "./constants";

function App() {
  const [genres, setGenres] = useState([]);
  const [videoPlayingRow, setVideoPlayingRow] = useState();

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`).then((response) => {
      console.log(response.data.genres);
      setGenres(response.data.genres);
    })
  },[])

  return (
    <div>
      <NavBar/>
      <Banner/>
      <RowPost posterType='large'/>
      { genres.map((genre,index) => {
        return <RowPost rowIndex={index} videoPlayingRow={videoPlayingRow} setVideoPlayingRow={setVideoPlayingRow} genreId={genre.id} genreName={genre.name} posterType='small'/>
      })}
    </div>
  );
}



export default App;
