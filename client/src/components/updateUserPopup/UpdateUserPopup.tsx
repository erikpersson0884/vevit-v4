import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import { useUsersContext } from '../../contexts/usersContext';
import ActionPopupWindow from '../actionPopupWindow/ActionPopupWindow';


interface UpdateUserPopupProps {
    onClose: () => void;
    user: IUser | null;
}

const UpdateUserPopup: React.FC<UpdateUserPopupProps> = ({onClose, user}) => {
    const { currentUser } = useAuthContext();
    const { updateUser } = useUsersContext();

    const [ username, setUsername ] = useState(currentUser ? currentUser.username : '');
    const [ password, setPassword ] = useState('');
    const [ errorText, setErrorText ] = useState<string | undefined>(undefined);

    const handleUpdate = async () => {
        if (!currentUser) return;
        if (currentUser.username == username && password !== '') {
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

    const handleClose = () => {
        setErrorText(undefined);
        onClose();
    }

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setPassword('');
            setErrorText(undefined);
        }
    }, [user]);

    return (
        <ActionPopupWindow 
            isOpen={user !== null} 
            onClose={handleClose} 
            onAccept={handleUpdate} 
            acceptButtonText="Uppdatera" 
            title="Uppdatera användare" 
            errorText={errorText }
        >
            <div>
                <label htmlFor="username">Nytt användarnamn</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nytt användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="password">Nytt lösenord</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Nytt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
        </ActionPopupWindow>
    )
};

export default UpdateUserPopup;