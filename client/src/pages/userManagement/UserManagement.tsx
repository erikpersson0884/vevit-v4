import React from 'react';
import './UserManagement.css';

import { useUsersContext } from '../../contexts/usersContext';

import editIcon from '../../assets/edit.svg';
import UpdateUserPopup from '../../components/updateUserPopup/UpdateUserPopup';


const UserManagement = () => {
    const { users } = useUsersContext();

    const [ searchTerm, setSearchTerm ] = React.useState<string>('');
    const [ selectedUser, setSelectedUser ] = React.useState<IUser | null>(null);

    return (
        <>
            <div className='user-management-page'>
                <h1>Manage Users</h1>

                <input type="text" placeholder='Search users...' onChange={(e) => setSearchTerm(e.target.value)} />

                <ul className='user-list no-ul-formatting'>
                    {users
                        .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(user => (
                            <li key={user.id} onClick={() => setSelectedUser(user)}>
                                <p>{user.username}</p>
                                <img src={editIcon} alt="Edit user"/>
                            </li>
                        ))}
                </ul>
            </div>

            <UpdateUserPopup onClose={() => setSelectedUser(null)} user={selectedUser} />
        </>
    )
}

export default UserManagement;
