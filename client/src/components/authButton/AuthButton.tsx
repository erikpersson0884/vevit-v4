import './AuthButton.css';
import { useAuthContext } from "../../contexts/authContext";
import { useState } from 'react';

const AuthButton = () => {
    const { currentUser, setShowAuthPopup, logout } = useAuthContext();
    const [ expanded, setExpanded ] = useState(false);

    const handleLogout = () => {
        setExpanded(false);
        logout();
    }
    
    if (!currentUser) return (
        <button onClick={() => setShowAuthPopup(true)} className="login-button">
            Login
        </button>
    ) 
    else return (
        <div className='auth-button-container'>
            <button onClick={() => setExpanded(!expanded)}>
                Konto
            </button>

            <div className={`${expanded && 'expanded '} auth-dropdown`}>
                <button onClick={() => setShowAuthPopup(true)}>
                    Ändra konto
                </button>
                <button onClick={handleLogout}>
                    Logga ut
                </button>

            </div>
        </div>
    )
}

export default AuthButton;
