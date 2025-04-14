import { useAuthContext } from "../../contexts/authContext";
import LoginPopup from "./LoginPopup";
import ProfilePopup from "./ProfilePopup";

const AuthPopup = () => {
    const { currentUser, showAuthPopup, setShowAuthPopup } = useAuthContext();

    if (!showAuthPopup) return null;
    
    if (currentUser) return <ProfilePopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)}/>;
    else return <LoginPopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)}/>;
}

export default AuthPopup;
