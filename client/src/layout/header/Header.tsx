import React from 'react';
import './Header.css';
import vevITLogo from '../../assets/vevit-white.png';

const Header: React.FC = () => {
    return (
        <header className="page-header">
            <img src={vevITLogo} alt="VevIT Logo" className="header-logo" width={200}/>
        </header>
    );
};

export default Header;