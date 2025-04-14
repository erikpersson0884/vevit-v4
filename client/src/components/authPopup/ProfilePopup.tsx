import React from 'react';

import PopupWindow from '../popupWindow/PopupWindow';
import { useAuthContext } from '../../contexts/authContext';
import { useUsersContext } from '../../contexts/usersContext';
import { useState, useEffect } from 'react';

interface ProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
    const { currentUser } = useAuthContext();
    const { updateUser } = useUsersContext();

    if (!currentUser) return null;

    const [username, setUsername] = useState(currentUser?.username);
    const [password, setPassword] = useState(currentUser?.password || '');
    const [ errorText, setErrorText ] = useState<string | null>('');

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username);
            setPassword(currentUser.password || '');
        }
    }, [currentUser]);

    const handleUpdate = async () => {
        if (currentUser.username == username && currentUser.password == password) {
            setErrorText('Inga ändringar gjorda');
            return;
        }

        const successfullUpdate = await updateUser(currentUser.id, username, password);
        if (!successfullUpdate) {
            setErrorText('Något gick fel, försök igen senare');
            return;
        }
        onClose();
        
    };


    return (
        <PopupWindow
            isOpen={isOpen}
            onClose={onClose}
            onAccept={handleUpdate}
            title="Profile"
            buttonText='Uppdatera'
        >
            <div className='input-container'>
                <label htmlFor="username">Username:</label>
                <input 
                    className={username != currentUser?.username ? 'changed-input' : ''}
                    type="text" 
                    id="username" 
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className='input-container'>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            { errorText && <p className='error-message'>{errorText}</p> }

        </PopupWindow>
    );
}

export default ProfilePopup;
