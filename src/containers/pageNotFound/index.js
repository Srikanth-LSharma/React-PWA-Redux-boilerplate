/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './styles.css';
import Error from '../../assets/NotFound/404.svg';
import Astronaut from '../../assets/NotFound/astronaut.svg';
import Moon from '../../assets/NotFound/moon.svg';
import Rocket from '../../assets/NotFound/rocket.svg';
import Earth from '../../assets/NotFound/earth.svg'

function NotFound(props) {
    return (
        <body>
            <div className="bg-purple">
                <div className="stars">
                    <div className="central-body">
                        <img className="image-404" src={Error} width="300px" />
                        <button onClick={() => props.navigate(-1)} className="btn-go-home" target="_blank">GO BACK </button>
                    </div>
                    <div className="objects">
                        <img className="object_rocket" src={Rocket} width="40px" />
                        <div className="earth-moon">
                            <img className="object_earth" src={Earth} width="100px" />
                            <img className="object_moon" src={Moon} width="80px" />
                        </div>
                        <div className="box_astronaut">
                            <img className="object_astronaut" src={Astronaut} width="140px" />
                        </div>
                    </div>
                    <div className="glowing_stars">
                        <div className="star" />
                        <div className="star" />
                        <div className="star" />
                        <div className="star" />
                        <div className="star" />
                    </div>
                </div>
            </div>
        </body>
    )
}

export default NotFound;