import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Header } from 'semantic-ui-react';


const MainBlock = () => {

    const [movie, setMovie] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log(movie)
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
    </div>
    )
}

export default MainBlock