import './AuthButton.css';
import { useAuthContext } from "../../contexts/authContext";

const AuthButton = () => {
    const { currentUser, setShowAuthPopup } = useAuthContext();

    return (
        <button className='auth-button' onClick={() => setShowAuthPopup(true)}>
            {currentUser ? ( "Konto") : ( "Logga in" )}
        </button>
    )
}

export default AuthButton;
