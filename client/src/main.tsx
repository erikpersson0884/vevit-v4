import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VevProvider } from './contexts/vevContext.tsx'
import { UsersProvider } from './contexts/usersContext.tsx'
import { AuthProvider } from './contexts/authContext.tsx'

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
