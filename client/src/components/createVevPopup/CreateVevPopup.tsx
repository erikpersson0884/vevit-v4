import PopupWindow from "../popupWindow/PopupWindow";
import { useUsersContext } from "../../contexts/usersContext";
import { useVevContext } from "../../contexts/vevContext";
import { useState } from "react";
import "./CreateVevPopup.css";

interface CreateVevPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateVevPopup: React.FC<CreateVevPopupProps> = ({isOpen, onClose}) => {
    const { users } = useUsersContext();
    const { createVev } = useVevContext();

    const [ selectedUser, setSelectedUser ] = useState(users[0]?.id || '');
    const [ selectedTime, setSelectedTime ] = useState('');

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(event.target.value);
    };
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    }

    const handleSubmit = async () => {
        await createVev(selectedUser, selectedTime);

        onClose();
    };
        

    return (
        <PopupWindow
            title="Skapa vev"
            buttonText="Create"
            isOpen={isOpen}
            onClose={onClose}
            onClick={handleSubmit}
            className="create-vev-popup"
        >
            <div className="input-container">
                <label htmlFor="pickChallanged">Pick Challenged</label>
                <select id="pickChallanged" name="pickChallanged" onChange={handleUserChange} value={selectedUser}>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                </select>
            </div>

            <div className="input-container">
                <label htmlFor="pickTime">Pick Time</label>
                <input type="datetime-local" id="pickTime" name="pickTime" onChange={handleTimeChange} value={selectedTime} />
            </div>
        </PopupWindow>
    );
}

export default CreateVevPopup;
