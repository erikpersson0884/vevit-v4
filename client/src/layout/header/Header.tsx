import React from 'react';
import './Header.css';
import vevITLogo from '../../assets/vevit-white.png';
import AuthButton from '../../components/authButton/AuthButton';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

    return (
        <header className="page-header">
            <Link to="/">
                <img src={vevITLogo} alt="VevIT Logo" className="header-logo" width={200}/>
                <AuthButton />
            </Link>
        </header>
    );
};

export default Header;