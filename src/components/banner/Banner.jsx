import React, {useEffect, useState} from 'react'
import './Banner.css';
import axios from '../../axios';
import {apiKey, imageUrlOriginal} from '../../constants';

function Banner() {
    const [movie, setMovie] = useState();
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`).then((response) => {
            let randomNumber = ~~(Math.random() * 19);
            console.log(response.data.results[randomNumber]);
            setMovie(response.data.results[randomNumber]);
        })
    },[]);
  return (
    <div className='banner' style={{backgroundImage: `url(${movie ? imageUrlOriginal + movie.backdrop_path : ''})`}}> 
        <div className='banner-gradient'>
            <div className='contents'>
                <div className='title-1'>
                    <img className='netflix-small-logo' src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png" alt="netflix" />
                    {movie ? movie.media_type : 'media type'}
                </div>
                <div className='title-2'>
                    {movie ? movie.title || movie.name  : 'title'}
                </div>
                <div className='title-3'>
                    {movie ? movie.overview : 'overview'}
                </div>
                <div className='button-container'>
                    <div className='button-1'>
                        &#9658; Play
                    </div>
                    <div className='button-2'>
                        &#9432; More Info
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner;