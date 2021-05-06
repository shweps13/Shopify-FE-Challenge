import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic, Form, Input, Header, Pagination, Divider, Icon, Button } from 'semantic-ui-react';

import MovieIcon from '../movieIcon.png';
import MovieCard from './MovieCard.js';
import FinalCard from './FinalCard.js';


const MainBlock = () => {

    const [movie, setMovie] = useState("");                     // Input inside search form
    const [searchResults, setSearchResults] = useState([]);     // Received data for 10 movies
    const [resultsCounter, setResultsCounter] = useState("");   // Counter of founded movies
    const [fetching, setFetching] = useState(false);            // Data fetching process 
    const [activePageNum, setActivePageNum] = useState(1);      // Page number for Paginator
    
    const [selectedMovies, setSelectedMovies] = useState([]);   // Nominated movies


    // useEffect(() => {
    //     console.log('==>',selectedMovies)
    // }, [selectedMovies])

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

    const cleaningFunc = () => {
        setSelectedMovies([]);
        setActivePageNum(1);
        setSearchResults([]);
        setResultsCounter("");
        setMovie("");
    }

    // Hook for search input
    const movieHandler = (e) => {
        setMovie(e.target.value);
        setFetching(true);
    };
    
    // Hook for paginator active element storing
    const paginatorHandler = (e, data) => {
        setActivePageNum(data.activePage)
    };
    
    // Handler for nominating movies
    const addHandler = (data) => {
        const id = data.imdbID;
        if (selectedMovies.hasOwnProperty(id)) { // deleting
            const { [id]: propertyValue, ...changedMovies } = selectedMovies;
            setSelectedMovies(changedMovies);
        } else {
            setSelectedMovies({ // adding
                ...selectedMovies,
                [id]: data,
            });
        }
    };

    return(
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
            {(Object.keys(selectedMovies).length >= 5) ? <></>:
                <>
                    {(resultsCounter === "") ? <></> : 
                    <div className="Main-statistic">
                        <Statistic size='mini'>
                            <Statistic.Value>{Object.keys(selectedMovies).length}</Statistic.Value>
                            <Statistic.Label>Nominated</Statistic.Label>
                        </Statistic>
                        <Statistic size='mini'>
                            <Statistic.Value>{resultsCounter}</Statistic.Value>
                            <Statistic.Label>Founded</Statistic.Label>
                        </Statistic>
                    </div>
                    }
                </>
            }
        </div>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input loading={fetching} fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>
        
        {(Object.keys(selectedMovies).length >= 5) ? 
            <>
                <Header as='h2'>The Best</Header>
                <Divider horizontal>
                <Header as='h4'>
                    <Icon name='film' />
                    We got final nominations
                </Header>
                </Divider>
                <div id="Cards-group">
                    {Object.keys(selectedMovies).map(function(key, index) {
                        return (
                            <FinalCard key={index + selectedMovies[key].imdbID} cover={selectedMovies[key].Poster} movie={selectedMovies[key]} titleStyle="Card-title" />
                        )
                    })}
                </div>
                <Divider />
                <div className="final-btns">
                    <Button onClick={() => cleaningFunc()} icon labelPosition='left'><Icon name='repeat' />Nominate again</Button>
                    <Button onClick={() => cleaningFunc()} icon labelPosition='right'>Get the Winner<Icon name='star' /></Button>
                </div>
            </>
            :
            <>
                <div id="Cards-group">
                {searchResults.map((movie, i) => ( 
                    (movie.Poster === "N/A") ? 
                        <MovieCard key={i + movie.imdbID} selectedMovies={selectedMovies} addHandler={addHandler} cover={MovieIcon} movie={movie} coverStyle="Card-cover-na" titleStyle="Card-title-na" />
                        : 
                        <MovieCard key={i + movie.imdbID} selectedMovies={selectedMovies} addHandler={addHandler} cover={movie.Poster} movie={movie} titleStyle="Card-title" />
                ))}
                </div>
                {(resultsCounter === "") ? <></> : 
                <div className="pagination-div">
                    <Pagination onPageChange={paginatorHandler} activePage={activePageNum} totalPages={Math.ceil((parseInt(resultsCounter)) / 10)} />
                </div>
                }
            </>
        }
    </div>
    )
}

export default MainBlock