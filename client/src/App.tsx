import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './contexts/authContext'

import MainPage from './pages/mainPage/MainPage'
import UserManagement from './pages/userManagement/UserManagement'
import NotFoundPage from './pages/notFoundPage/NotFoundPage'

import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'

import AuthPopup from './components/authPopup/AuthPopup';
import VevPopup from './components/vevPopup/VevPopup';

function App() {
    const { isLoggedIn } = useAuthContext()
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={
                    <>
                        <MainPage />
                        <VevPopup />
                    </>
                } />

                { isLoggedIn && <Route path='/user-management' element={ <UserManagement /> } />}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <AuthPopup />
            <Footer />
        </BrowserRouter>
    )
}

export default App
