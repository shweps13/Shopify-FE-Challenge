import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Header } from 'semantic-ui-react';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_APIKEY}`)
        .then(response => {
            if (response.data.Response === "True") {
                setSearchResults(response.data.Search)
                // console.log("==>",response.data)
            }
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [movie])

    const movieHandler = (e) => {
        setMovie(e.target.value);
    };

    return(
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
        </div>
        <Form id="Main-form-block">
            <Header as='h4'>Movie title</Header>
            <Input fluid icon='search' iconPosition='left' placeholder='Search...' value={movie} onChange={movieHandler}/>
        </Form>
        {searchResults.map((movie) => (
            <div key={movie.imdbID}><p>{movie.Title} </p></div > 
        ))}
    </div>
    )
}

export default MainBlock