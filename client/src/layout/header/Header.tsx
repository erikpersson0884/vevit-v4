import React from 'react';
import './Header.css';
import vevITLogo from '../../assets/vevit-white.png';
import AuthButton from '../../components/authButton/AuthButton';


const Header: React.FC = () => {

    return (
        <header className="page-header">
            <img src={vevITLogo} alt="VevIT Logo" className="header-logo" width={200}/>
            <AuthButton />
        </header>
    );
};

export default Header;