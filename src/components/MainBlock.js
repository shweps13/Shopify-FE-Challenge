import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic, Form, Input, Header, Pagination } from 'semantic-ui-react';
import MovieIcon from '../movieIcon.png';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [resultsCounter, setResultsCounter] = useState("");
    const [fetching, setFetching] = useState(false);
    const [activePageNum, setActivePageNum] = useState(1);

    useEffect(() => {
        console.log(activePageNum)
    }, [activePageNum])

    // useEffect(() => {
    //     console.log(searchResults)
    // }, [searchResults])

    useEffect(() => {
        if (movie) {
            axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_APIKEY}`)
            .then(response => {
                if (response.data.Response === "True") {
                    setSearchResults(response.data.Search);
                    setResultsCounter(response.data.totalResults);
                    // console.log("==>",response.data)
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
    }, [movie])

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
            <div key={i + movie.imdbID} className="Card">
                <div className="Card-item">
                    <div className="Card-image">
                        <img id='Card-cover-na' src={MovieIcon} alt={movie.Title} />
                    </div>
                    <div className="Card-title">{movie.Title}</div>
                </div>
            </div>
                : 
            <div key={i + movie.imdbID} className="Card">
                <div className="Card-item">
                    <div className="Card-image">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="Card-title">{movie.Title}</div>
                </div>
            </div>
        ))}
        </div>
        {(resultsCounter === "") ? <></> : 
        <div className="pagination-div">
            <Pagination onPageChange={paginatorHandler} activePage={activePageNum} totalPages={Math.round((parseInt(resultsCounter)) / 10)} />
        </div>
        }
        
    </div>
    )
}

export default MainBlock