import React from 'react';
import './Header.css';
import vevITLogo from '../../assets/vevit-white.png';
import AuthButton from '../../components/authButton/AuthButton';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';
import pixlefiedLogo from '../../assets/header-images/pixlefied-logo.svg';
import gooseicon from '../../assets/header-images/goose.png';
import ideicon from '../../assets/header-images/ide.png';
import fredagicon from '../../assets/header-images/fredag.png';
import neineiicon from '../../assets/header-images/neinei.png';
import SpaceBackground from '../../components/spaceBackground/SpaceBackground';

const Header: React.FC = () => {
    const { currentUser } = useAuthContext();
    const [headerLogo, setHeaderLogo] = React.useState<string>(vevITLogo);

    React.useEffect(() => {
    const username = currentUser?.username?.toLowerCase();
        if (username === 'neinei') setHeaderLogo(neineiicon);
        else if (username === 'pixeln') setHeaderLogo(pixlefiedLogo);
        else if (username === 'goose') setHeaderLogo(gooseicon);
        else if (username === 'ide') setHeaderLogo(ideicon);
        else if (username === 'fredag') setHeaderLogo(fredagicon);
        else setHeaderLogo(vevITLogo);

        console.log(currentUser?.username);
    }, [currentUser]);
    
    return (
        <header className="page-header">
            {(currentUser?.username.toLowerCase() === 'space') && <SpaceBackground />}

            <Link to="/">
                <img src={headerLogo} alt="VevIT Logo" className="header-logo" width={200}/>
            </Link>
            <AuthButton />
        </header>
    );
};

export default Header;