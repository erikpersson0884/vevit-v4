import './App.css'

import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import MainPage from './pages/mainPage/MainPage'
import AuthPopup from './components/authPopup/AuthPopup';

function App() {
    return (
        <>
            <Header />
            <AuthPopup />
            <MainPage />
            <Footer />
        </>
    )
}

export default App
