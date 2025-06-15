import ActionPopupWindow from "../actionPopupWindow/actionPopupWindow";
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

    const [ selectedUser, setSelectedUser ] = useState<string>(users[0]?.id || '');
    const [ selectedDate, setSelectedDate ] = useState<string>('');
    const [ selectedTime, setSelectedTime ] = useState<string>('');
    const [ reason, setReason ] = useState('');

    const [ errorText, setErrorText ] = useState<string | null>('');

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(event.target.value);
    };
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    }
    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReason(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedUser) {
            setErrorText("Välj en utmanare");
            return;
        } else if (!selectedDate) {
            setErrorText("Välj ett datum");
            return;
        } else if (!selectedTime) {
            setErrorText("Välj en tid");
            return;
        } else if (!reason) {
            setErrorText("Ange en anledning");
            return;
        }

        const dateTime: string = (new Date(`${selectedDate}T${selectedTime}`)).toString();
        const successfullCreation = await createVev(selectedUser, dateTime, reason);

        if (!successfullCreation) {
            setErrorText("Det gick inte att skapa vev");
            return;
        } else handleClose();
    };

    const handleClose = () => {
        setErrorText('');
        setSelectedUser(users[0]?.id || '');
        setSelectedTime('');
        onClose();
    }
        

    return (
        <ActionPopupWindow
            title="Skapa vev"
            acceptButtonText="Boka"
            isOpen={isOpen}
            onClose={handleClose}
            onAccept={handleSubmit}
            className="create-vev-popup"
        >
            <div className="input-container">
                <label htmlFor="pickChallanged">Utmana</label>
                <select id="pickChallanged" name="pickChallanged" onChange={handleUserChange} value={selectedUser}>
                        <option value="" disabled>Person att utmana</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                </select>
            </div>

            <div className="input-container">
                <label htmlFor="pickDate">Välj datum</label>
                <input type="date" id="pickDate" name="pickDate" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
            </div>

            <div className="input-container">
                <label htmlFor="pickTime">Välj tid</label>
                <input type="time" id="pickTime" name="pickTime" onChange={handleTimeChange} value={selectedTime} />
            </div>


            <div className="input-container">
                <label htmlFor="reasonInput">Anledning</label>
                <input type="text" id="reasonInput" name="reasonInput" placeholder="Anledning" onChange={handleReasonChange} value={reason}/>
            </div>

            {errorText && <p className="error-message">{errorText}</p>}
        </ActionPopupWindow>
    );
}

export default CreateVevPopup;
