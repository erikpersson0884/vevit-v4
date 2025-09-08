import { useAuthContext } from "../../contexts/authContext";
import accountImage from '../../assets/account.svg';

const AuthButton = () => {
    const { currentUser, setShowAuthPopup } = useAuthContext();

    return (
        <button className='auth-button' onClick={() => setShowAuthPopup(true)}>
            {currentUser ? (
                <>
                    <img src={accountImage} alt="Account" />
                    <p>{currentUser.username}</p>
                </>
                
            ) : 
                "Logga in"
            }
        </button>
    )
}

export default AuthButton;
