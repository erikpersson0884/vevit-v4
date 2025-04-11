import './App.css'

import Header from './layout/header/Header'
import MainPage from './pages/mainPage/MainPage'
import LoginPopup from './components/loginPopup/LoginPopup'
import { useAuthContext } from './contexts/authContext'

function App() {
    const { showLoginPopup, setShowLoginPopup } = useAuthContext()

    return (
        <>
            <Header />
            <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
            <MainPage />
        </>
    )
}

export default App
