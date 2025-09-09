import { useAuthContext } from "../../contexts/authContext";
import { useState, useEffect } from "react";
import ActionPopupWindow from "../actionPopupWindow/ActionPopupWindow";
import UpdateUserPopup from "../updateUserPopup/UpdateUserPopup";
import { useUsersContext } from "../../contexts/usersContext";
import './AuthPopup.css';

import { Link } from "react-router-dom";

const errortextDisplayTime = 5000; // milliseconds

enum PopupType {
    LOGIN = 'login',
    REGISTER = 'register',
    PROFILE = 'profile',
    UPDATE = 'update',
}

const AuthPopup: React.FC = () => {
    const { login, logout, currentUser, showAuthPopup, setShowAuthPopup } = useAuthContext();
    const { createUser, updateUser } = useUsersContext();

    const [ username, setUsername ] = useState(currentUser ? currentUser.username : '');
    const [ password, setPassword ] = useState('');
    const [ errorText, setErrorText ] = useState<string | null>(null);

    const [popupType, setPopupType] = useState<PopupType>(PopupType.LOGIN);

    const inputs = () => (
        <>
            <div>
                <label htmlFor="username">Användarnamn</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Lösenord</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {errorText && <p className="error-message">{errorText}</p>}
        </>
    );

    const handleClose = () => {
        setUsername(currentUser ? currentUser.username : '');
        setPassword('');
        setErrorText(null);
        setShowAuthPopup(false);
        if (currentUser) setPopupType(PopupType.PROFILE);
        else setPopupType(PopupType.LOGIN);
    };

    useEffect(() => {
        if (errorText) {
            const timer = setTimeout(() => {
                setErrorText(null);
            }, errortextDisplayTime);

            return () => clearTimeout(timer);
        }
    }, [errorText]);


    const handleLogin = async () => {
        const successfullLogin: boolean = await login(username, password);
        if (!successfullLogin) setErrorText("Felaktigt användarnamn eller lösenord");
        else handleClose();
    }

    if (!currentUser) {
        return (
            <ActionPopupWindow
                isOpen={showAuthPopup}
                onClose={handleClose}
                onAccept={handleLogin}
                title="Logga in"
                acceptButtonText="Logga in"
                className="auth-popup"
            >
                {inputs()}
                <p>Har du inget konto? <button className="link-button" onClick={() => setPopupType(PopupType.REGISTER)}>Registrera</button></p>
            </ActionPopupWindow>
        );
    }

    const handleLogout = () => {
        logout();
        handleClose();
    }
    
    if (popupType === PopupType.PROFILE) {
        return (
            <ActionPopupWindow 
                isOpen={showAuthPopup}
                onClose={handleClose}
                onAccept={handleLogout}
                title={currentUser.username}
                acceptButtonText="Logga ut"
                className="auth-popup"
            >
                <button className="" onClick={() => setPopupType(PopupType.UPDATE)}>Uppdatera uppgifter</button>
                <Link to="/user-management">
                    <button onClick={handleClose}>Hantera Användare</button>
                </Link>
            </ActionPopupWindow>
        );
    }

    const handleCreation = async () => {
        const successfullCreation: boolean = await createUser(username, password);
        if (!successfullCreation) setErrorText("Det gick inte att skapa användaren, försök igen senare");
        else handleClose();
    }

    if (popupType === PopupType.REGISTER) return (
        <ActionPopupWindow
            isOpen={showAuthPopup}
            onClose={handleClose}
            onAccept={handleCreation}
            title="Registrera"
            acceptButtonText="Registrera"
            className="auth-popup"
        >
            {inputs()}
            <p>Har du redan ett konto? <button className="link-button" onClick={() => setPopupType(PopupType.LOGIN)}>Logga in</button></p>
        </ActionPopupWindow>
    );

    if (popupType === PopupType.UPDATE) {
        return (
            <UpdateUserPopup 
                onClose={handleClose}
                user={currentUser}
            />
        );
    }


}

export default AuthPopup;
