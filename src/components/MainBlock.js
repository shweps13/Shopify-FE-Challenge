import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image, Form, Input, Header } from 'semantic-ui-react';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [fetching, setFetching] = useState(false);

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
        })
        .catch(error => {
            console.log(error)
        })
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
        <Card.Group id="Cards-group" itemsPerRow={5}>

        {searchResults.map((movie) => (
            // <div key={movie.imdbID}><p>{movie.Title}</p></div > 
            // <Card key={movie.imdbID}>
            //     <Image src={movie.Poster} wrapped ui={false} />
            //     <Card.Content>
            //     <Card.Header>{movie.Title}</Card.Header>
            //     <Card.Meta>
            //         <span className='date'>Joined in 2015</span>
            //     </Card.Meta>
            //     <Card.Description>
            //         Matthew is a musician living in Nashville.
            //     </Card.Description>
            //     </Card.Content>
            // </Card>
                <Card key={movie.imdbID} raised image={movie.Poster} />
                
                ))}
        </Card.Group>
    </div>
    )
}

export default MainBlock