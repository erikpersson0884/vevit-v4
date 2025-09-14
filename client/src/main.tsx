import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { VevProvider } from './contexts/vevContext'
import { UsersProvider } from './contexts/usersContext'
import { AuthProvider } from './contexts/authContext'

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
