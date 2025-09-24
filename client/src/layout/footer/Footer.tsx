import React from 'react';
import './Footer.css';

import birdImage from '../../assets/bird.png'

const Footer: React.FC = () => {
    return (
        <footer className="page-footer">
            <p>Skapad av <a className='link-underlfine' href="https://github.com/erikpersson0884">Erik Persson</a></p>
            <img src={birdImage} alt='bird' />
        </footer>
    );
};

export default Footer;
