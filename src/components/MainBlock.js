import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Form, Input, Header } from 'semantic-ui-react';
import MovieIcon from '../movieIcon.png';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    useEffect(() => {
        if (movie) {
            axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_APIKEY}`)
            .then(response => {
                if (response.data.Response === "True") {
                    setSearchResults(response.data.Search)
                    // console.log("==>",response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setSearchResults([]);
        }
        setFetching(false);
    }, [movie])

    const movieHandler = (e) => {
        setMovie(e.target.value);
        setFetching(true);
    };

    return(
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
        </div>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input loading={fetching} fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>

        <div id="Cards-group">
        {searchResults.map((movie, i) => ( 
            (movie.Poster === "N/A") ? 
            <div className="Card">
                <div className="Card-item">
                    <div className="Card-image">
                        <img id='Card-cover-na' src={MovieIcon} alt={movie.Title} />
                    </div>
                    <div className="Card-title">{movie.Title}</div>
                </div>
            </div>
                : 
            <div className="Card">
                <div className="Card-item">
                    <div className="Card-image">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="Card-title">{movie.Title}</div>
                </div>
            </div>
        ))}
        </div>
    </div>
    )
}

export default MainBlock