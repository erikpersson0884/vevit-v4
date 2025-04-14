import PopupWindow from "../popupWindow/PopupWindow";
import './LoginPopup.css';
import { useAuthContext } from "../../contexts/authContext";
import { useState } from "react";


interface LoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
    const { login } = useAuthContext();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showError, setShowError ] = useState(false);

    const handleLogin = async () => {
        const successfullLogin: boolean = await login(username, password);
        if (!successfullLogin) {
            setShowError(true);
            return;
        }
        handleClose();
    }

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setShowError(false);
        onClose();
    };

    return (
        <PopupWindow 
            isOpen={isOpen}
            onClose={handleClose}
            onAccept={handleLogin}
            title="Logga in"
            buttonText="Logga in"
            className="login-popup"
        >
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

                {showError && <p className="error-message">Felaktigt användarnamn eller lösenord</p>}
        </PopupWindow>
    );
};

export default LoginPopup;
