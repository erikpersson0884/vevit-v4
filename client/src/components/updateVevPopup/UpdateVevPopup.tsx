import PopupWindow from "../popupWindow/PopupWindow";
import { useVevContext } from "../../contexts/vevContext";
import { useUsersContext } from "../../contexts/usersContext";
import { useState, useEffect } from "react";


const UpdateVevPopup = () => {
    const { updateVevWinner, selectedVevToUpdate, setSelectedVevToUpdate } = useVevContext();
    const { getUserById } = useUsersContext();

    const [ winnerId, setWinnerId ] = useState<string |null>(null);
    const [ errorText, setErrorText ] = useState<string | null>(null);

    useEffect(() => {
        if (selectedVevToUpdate) {
            setWinnerId(selectedVevToUpdate.winner || null);

            console.log("selectedVevToUpdate", selectedVevToUpdate.date);
        } 
    }, [selectedVevToUpdate]);


    const handleUpdate = async () => {
        if (selectedVevToUpdate) {
            const success = await updateVevWinner(selectedVevToUpdate.id, winnerId)
            setSelectedVevToUpdate(null); 
        }
    };

    const handleClose = () => {
        setSelectedVevToUpdate(null);
    }

    if (!selectedVevToUpdate) return null;
    return (
        <PopupWindow 
            onClose={() => handleClose()}
            onAccept={() => handleUpdate()}
            title="Uppdatera Vev"
            isOpen={!!selectedVevToUpdate}
            buttonText="Uppdatera"
        >
            <div>
                <label htmlFor="winner-select">Vinnare</label>
                <select
                    value={winnerId || ""}
                    onChange={(e) => setWinnerId(e.target.value)}
                    id="winner-select"
                >
                    <option value="">Ingen</option>
                    <option value={selectedVevToUpdate.challengerId}>{getUserById(selectedVevToUpdate.challengerId).username}</option>
                    <option value={selectedVevToUpdate.challengedId}>{getUserById(selectedVevToUpdate.challengedId).username}</option>
                </select>
            </div>

            {
                errorText && <p className="error">{errorText}</p>
            }
        </PopupWindow>
    );
}

export default UpdateVevPopup;
