import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic, Form, Input, Header, Pagination } from 'semantic-ui-react';

import MovieIcon from '../movieIcon.png';
import MovieCard from './MovieCard.js';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [resultsCounter, setResultsCounter] = useState("");
    const [fetching, setFetching] = useState(false);
    const [activePageNum, setActivePageNum] = useState(1);
    
    const [selectedMovies, setSelectedMovies] = useState([]);


    useEffect(() => {
        console.log('==>',selectedMovies)
    }, [selectedMovies])

    useEffect(() => {
        if (movie) {
            axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_APIKEY}&page=${activePageNum}`)
            .then(response => {
                if (response.data.Response === "True") {
                    setSearchResults(response.data.Search);
                    setResultsCounter(response.data.totalResults);
                }
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setSearchResults([]);
            setResultsCounter("");
        }
        setFetching(false);
    }, [movie, activePageNum])

    const movieHandler = (e) => {
        setMovie(e.target.value);
        setFetching(true);
    };
    const paginatorHandler = (e, data) => {
        setActivePageNum(data.activePage)
    };

    return(
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
            {(resultsCounter === "") ? <></> : 
            <Statistic size='mini'>
                <Statistic.Value>{resultsCounter}</Statistic.Value>
                <Statistic.Label>Movies</Statistic.Label>
            </Statistic>
            }
        </div>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input loading={fetching} fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>

        <div id="Cards-group">
        {searchResults.map((movie, i) => ( 
            (movie.Poster === "N/A") ? 
                <MovieCard key={i + movie.imdbID} cover={MovieIcon} title={movie.Title} coverStyle="Card-cover-na" titleStyle="Card-title-na" />
                : 
                <MovieCard key={i + movie.imdbID} cover={movie.Poster} title={movie.Title} titleStyle="Card-title" />
        ))}
        </div>
        {(resultsCounter === "") ? <></> : 
        <div className="pagination-div">
            <Pagination onPageChange={paginatorHandler} activePage={activePageNum} totalPages={Math.ceil((parseInt(resultsCounter)) / 10)} />
        </div>
        }
        
    </div>
    )
}

export default MainBlock