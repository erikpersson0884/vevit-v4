import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainPage from './pages/mainPage/MainPage'
import UserManagement from './pages/userManagement/UserManagement'

import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'

import AuthPopup from './components/authPopup/AuthPopup';
import UpdateVevPopup from './components/updateVevPopup/UpdateVevPopup';
import VevPopup from './components/vevPopup/VevPopup';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={
                    <>
                        <MainPage />
                        <UpdateVevPopup />
                        <VevPopup />
                    </>
                } />

                <Route path='/user-management' element={
                    <>  
                        <UserManagement />
                        
                    </>
                } />

            </Routes>

            <AuthPopup />
            <Footer />
        </BrowserRouter>
    )
}

export default App
