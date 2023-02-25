import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import { apiKey, imageUrlOriginal } from '../../constants';
import './RowPost.css';
import YouTube from 'react-youtube';

function RowPost({rowIndex, genreId, genreName, posterType, videoPlayingRow, setVideoPlayingRow}) {
    const url = posterType === 'large' ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}` 
    : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

    let [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState('');
    useEffect(()=> {
        axios.get(url).then((response) => {
            setMovies(response.data.results);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    const movieTrailer = (id) => {
        axios.get('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key='+apiKey).then((response) => {
            if(response.data.results.length){
                setUrlId(response.data.results[response.data.results.length-1]);
                setVideoPlayingRow(rowIndex);
            } else {
                console.log('no videos available');
            }
        }).catch((err) => {
            console.log();
        })
    }
    const opts = {
        height: '300px',
        width: '100%',
        playerVars: {
            autoplay:1,
        },
    }
    return (
    <div className="rowPost">
        <div className="sub-title">
            {genreName ? genreName : 'Netflix Original'}
        </div>
        <div className="posters">
            {movies.map((obj) => {
                return (
                    <div onClick={()=>{movieTrailer(obj.id)}} className={`each-poster ${(posterType === 'small') && 'each-poster-small'}`}>
                        <img src={imageUrlOriginal + obj.backdrop_path} alt="poster"/>
                        <div className={`title-on-each-poster ${posterType==='small' && 'title-on-each-poster-small'}`}>
                            {obj.title || obj.name}
                        </div>
                    </div>
                )
            })}
        </div>
        {urlId && videoPlayingRow===rowIndex && <YouTube videoId={urlId.key} opts={opts}/> } 
    </div>
  )
};

export default RowPost;