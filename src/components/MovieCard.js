import React, { useState } from 'react';
import { Dimmer, Header, Button } from 'semantic-ui-react';

const MovieCard = ({coverStyle, cover, year, title, titleStyle}) => {

    const [dimmer, setDimmer] = useState({ active: false });

    const handleShow = () => setDimmer({ active: true })
    const handleHide = () => setDimmer({ active: false })

    const content = (
    <div>
        {(title.length > 40) ? 
            <Header as='h5' id="Trimmed" inverted>{title}</Header>
            :
            <Header as='h5' inverted>{title}</Header>}
        <Header as='h5' inverted>{year}</Header>

        <Button primary>Add</Button>
    </div>      
      )

    return (
        <Dimmer.Dimmable dimmed={dimmer.active}   onMouseEnter={handleShow} onMouseLeave={handleHide}>

            <div className="Card-item">
                <div className="Card-image">
                    <img id={coverStyle} src={cover} alt={title} />
                </div>
                <div className={titleStyle}>{title}</div>
            </div>
            
        <Dimmer active={dimmer.active} onClickOutside={handleHide}>{content}</Dimmer>
        </Dimmer.Dimmable>
    )

}

export default MovieCard