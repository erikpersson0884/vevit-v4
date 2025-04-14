import './App.css'

import Header from './layout/header/Header'
import MainPage from './pages/mainPage/MainPage'
import AuthPopup from './components/authPopup/AuthPopup';

function App() {
    return (
        <>
            <Header />
            <AuthPopup />
            <MainPage />
        </>
    )
}

export default App
