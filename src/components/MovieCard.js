import React from 'react';

const MovieCard = ({coverStyle, cover, title, titleStyle}) => {

    return (
        <div className="Card">
            <div className="Card-item">
                <div className="Card-image">
                    <img id={coverStyle} src={cover} alt={title} />
                </div>
                <div className={titleStyle}>{title}</div>
            </div>
        </div>
    )

}

export default MovieCard