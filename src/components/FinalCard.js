import React, { useState } from 'react';
import { Dimmer, Header } from 'semantic-ui-react';

const MovieCard = ({coverStyle, movie, cover, titleStyle}) => {

    const [dimmer, setDimmer] = useState({ active: false });

    const handleShow = () => setDimmer({ active: true })
    const handleHide = () => setDimmer({ active: false })

    const content = (
        <div>
            {(movie.Title.length > 40) ? 
                <Header as='h5' id="Trimmed" inverted>{movie.Title}</Header>
                :
                <Header as='h3' inverted>{movie.Title}</Header>}
            <Header as='h5' inverted>{movie.Year}</Header>
        </div>      
      )

    return (
        <Dimmer.Dimmable blurring dimmed={dimmer.active} onMouseEnter={handleShow} onMouseLeave={handleHide}>

            <div className="Card-item">
                <div className="Card-image">
                    <img id={coverStyle} src={cover} alt={movie.Title} />
                </div>
                <div className={titleStyle}>{movie.Title}</div>
            </div>
            
        <Dimmer active={dimmer.active} onClickOutside={handleHide}>{content}</Dimmer>
        </Dimmer.Dimmable>
    )

}

export default MovieCard