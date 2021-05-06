import React, { useState } from 'react';
import { Dimmer } from 'semantic-ui-react';

const MovieCard = ({coverStyle, cover, title, titleStyle}) => {

    const [dimmer, setDimmer] = useState({ active: false });

    const handleShow = () => setDimmer({ active: true })
    const handleHide = () => setDimmer({ active: false })

    return (
        <Dimmer.Dimmable dimmed={dimmer.active} onMouseEnter={handleShow} onMouseLeave={handleHide}>

            <div className="Card-item">
                <div className="Card-image">
                    <img id={coverStyle} src={cover} alt={title} />
                </div>
                <div className={titleStyle}>{title}</div>
            </div>
            
        <Dimmer active={dimmer.active} onClickOutside={handleHide} />
        </Dimmer.Dimmable>
    )

}

export default MovieCard