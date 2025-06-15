import './App.css'

import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import MainPage from './pages/mainPage/MainPage'
import AuthPopup from './components/authPopup/AuthPopup';
import UpdateVevPopup from './components/updateVevPopup/UpdateVevPopup';
import VevPopup from './components/vevPopup/VevPopup';

function App() {
    return (
        <>
            <Header />
            <AuthPopup />
            <UpdateVevPopup />
            <VevPopup />
            <MainPage />
            <Footer />
        </>
    )
}

export default App
