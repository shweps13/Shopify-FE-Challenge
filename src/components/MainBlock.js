import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Animated } from "react-animated-css";
import { List, Image, Popup, Statistic, Form, Input, Header, Pagination, Divider, Icon, Button, Dimmer } from 'semantic-ui-react';

import MovieIcon from '../movieIcon.png';
import MovieCard from './MovieCard.js';
import FinalCard from './FinalCard.js';


const MainBlock = () => {

    const [movie, setMovie] = useState("");                     // Input inside search form
    const [searchResults, setSearchResults] = useState([]);     // Received data for 10 movies
    const [resultsCounter, setResultsCounter] = useState("");   // Counter of founded movies
    const [fetching, setFetching] = useState(false);            // Data fetching process 
    const [activePageNum, setActivePageNum] = useState(1);      // Page number for Paginator
    const [finalDimmer, setFinalDimmer] = useState({ active: false });  // Hook for Victory Message
    const [winner, setWinner] = useState({});                   // Movie-Winner hook
    
    const [selectedMovies, setSelectedMovies] = useState([]);   // Nominated movies

    // useEffect(() => {
    //     console.log('==>',selectedMovies)
    // }, [selectedMovies])

    // loading selected movies from the localStorage
    useEffect(() => {
        const json = localStorage.getItem("selectedMovies");
        const savedMovies = JSON.parse(json);
        
        const searchReq = localStorage.getItem("searchReq");
        const savedReq = JSON.parse(searchReq);

        if (savedMovies) {
            setSelectedMovies(savedMovies);
        }
        if (savedReq) {
            setMovie(savedReq);
        }
    }, []);

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
        setWinner({});
        localStorage.removeItem("selectedMovies");
        localStorage.removeItem("searchReq");
    }

    // Hook for search input
    const movieHandler = (e) => {
        setMovie(e.target.value);
        setFetching(true);
        localStorage.setItem("searchReq", JSON.stringify(e.target.value));
    };
    
    // Hook for paginator active element storing
    const paginatorHandler = (e, data) => {
        setActivePageNum(data.activePage);
    };
    
    // Handler for nominating movies
    const addHandler = (data) => {
        const id = data.imdbID;
        if (selectedMovies.hasOwnProperty(id)) { // deleting
            const { [id]: propertyValue, ...changedMovies } = selectedMovies;
            setSelectedMovies(changedMovies);
            localStorage.setItem("selectedMovies", JSON.stringify(changedMovies));
        } else {
            let updatedData = { // adding
                ...selectedMovies,
                [id]: data,
            }
            setSelectedMovies(updatedData);
            localStorage.setItem("selectedMovies", JSON.stringify(updatedData));
        }
    };

    // 'Get the winner' functions
    const winnerRand = (obj) => {
        let keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    };
    const getWinner = () => {
        let win = winnerRand(selectedMovies);
        setWinner(win);
        setFinalDimmer({ active: true });
    };

    // Final notification functions 
    const dimmerClose = () => setFinalDimmer({ active: false })

    return(
    <div className="Main-form-block ">
        <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} isVisible={true} className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
            {(Object.keys(selectedMovies).length >= 5) ? <></>:
                <>
                    {(resultsCounter === "") ? <></> : 
                    <div className="Main-statistic">
                        {(Object.keys(selectedMovies).length > 0) ? 
                            <Popup trigger={
                                <Statistic size='mini'>
                                    <Statistic.Value>{Object.keys(selectedMovies).length}</Statistic.Value>
                                    <Statistic.Label id="alert-stat" >Nominated</Statistic.Label>
                                </Statistic>
                                } flowing hoverable>
                                <List divided verticalAlign='middle'>
                                    {Object.keys(selectedMovies).map(function(key, index) {
                                        return (
                                            <List.Item className='Menu-item' key={index + selectedMovies[key].imdbID} >
                                                <Image avatar src={selectedMovies[key].Poster} />
                                                {(selectedMovies[key].Title.length > 15) ? 
                                                    <List.Content id="Trimmed-menu">{selectedMovies[key].Title}</List.Content>
                                                    :
                                                    <List.Content>{selectedMovies[key].Title}</List.Content>
                                                }
                                                <Button onClick={() => addHandler(selectedMovies[key])} circular id="MenuBtn" basic color='red' icon='remove' size='mini' />
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Popup>
                            :
                            <Statistic size='mini'>
                                <Statistic.Value>{Object.keys(selectedMovies).length}</Statistic.Value>
                                <Statistic.Label>Nominated</Statistic.Label>
                            </Statistic>
                        }
                        <Statistic size='mini'>
                            <Statistic.Value>{resultsCounter}</Statistic.Value>
                            <Statistic.Label>Founded</Statistic.Label>
                        </Statistic>
                    </div>
                    }
                </>
            }
        </Animated>

        <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} isVisible={true}>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input loading={fetching} fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>
        </Animated>
        
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
                        return (<FinalCard key={index + selectedMovies[key].imdbID} cover={selectedMovies[key].Poster} movie={selectedMovies[key]} titleStyle="Card-title" />)
                    })}
                </div>
                <Divider />
                <div className="final-btns">
                    <Button onClick={() => cleaningFunc()} icon labelPosition='left'><Icon name='repeat' />Nominate again</Button>
                    <>
                        <Button onClick={() => getWinner()} icon labelPosition='right'>Get the Winner<Icon name='star' /></Button>
                        <Dimmer active={finalDimmer.active} onClickOutside={dimmerClose} page>
                        <Header as='h2' icon inverted>
                            <Animated animationIn="rotateIn" animationOut="rotateOut" animationInDuration={1000} isVisible={true}>
                                <Icon name='star' />
                            </Animated>
                            <Header.Subheader>The Winner is:</Header.Subheader>
                            {winner.Title}
                            <Header.Subheader>{winner.Year}</Header.Subheader>
                        </Header>
                        </Dimmer>
                    </>
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