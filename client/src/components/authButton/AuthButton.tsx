import './AuthButton.css';
import { useAuthContext } from "../../contexts/authContext";

const AuthButton = () => {
    const { currentUser, logout, setShowLoginPopup } = useAuthContext();

    return (
        currentUser ? 
            <button onClick={logout} className="auth-button">Logga ut</button> 
        :
            <button onClick={() => setShowLoginPopup(true)} className="auth-button">
                Login
            </button>
    )
}

export default AuthButton;
