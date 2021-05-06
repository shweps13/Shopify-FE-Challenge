import React from 'react';

const MovieCard = ({coverStyle, movie, cover, titleStyle}) => {


    return (
        <div>
            <div className="Card-item">
                <div className="Card-image">
                    <img id={coverStyle} src={cover} alt={movie.Title} />
                </div>
                <div className={titleStyle}>{movie.Title}</div>
            </div>
        </div>
    )

}

export default MovieCard