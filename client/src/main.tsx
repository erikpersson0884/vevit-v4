import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { VevProvider } from './contexts/vevContext'
import { UsersProvider } from './contexts/usersContext'
import { AuthProvider } from './contexts/authContext'
// import { registerSW } from 'virtual:pwa-register'


// Does not work wiht the oauth flow, since the service worker will intercept the request to the backend and block the redirection to gamma's login page.
// registerSW({
//     immediate: true, // update on reload
//     onNeedRefresh() {
//         // You could show a custom "new version available" UI here
//         console.log('New content available, refresh to update.')
//     },
//     onOfflineReady() {
//         console.log('App ready to work offline.')
//     },
// })


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
        <UsersProvider>
            <VevProvider>
                <App />
            </VevProvider>
        </UsersProvider>
        </AuthProvider>
    </StrictMode>,
)
