import PopupWindow from "../popupWindow/PopupWindow";
import { useVevContext } from "../../contexts/vevContext";
import { useUsersContext } from "../../contexts/usersContext";
import { useState, useEffect } from "react";


const UpdateVevPopup = () => {
    const { updateVevWinner, selectedVevToUpdate, setSelectedVevToUpdate } = useVevContext();
    const { getUserById } = useUsersContext();

    const [ winnerId, setWinnerId ] = useState<string>("");
    const [ errorText, setErrorText ] = useState<string | null>(null);

    useEffect(() => {
        if (selectedVevToUpdate) {
            setWinnerId(selectedVevToUpdate.winnerId || "");

            console.log("selectedVevToUpdate", selectedVevToUpdate.date);
        } 
    }, [selectedVevToUpdate]);


    const handleUpdate = async () => {
        if (selectedVevToUpdate) {
            const success = await updateVevWinner(
                selectedVevToUpdate.id, 
                (winnerId !== "" ? winnerId : null)
            )

            if (success) {
                selectedVevToUpdate.winnerId = winnerId;
                handleClose()
            }
            
            else setErrorText("Det gick inte att uppdatera vinnaren")
        }
    };

    const handleClose = () => {
        setSelectedVevToUpdate(null);
        setErrorText(null)
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
                    value={winnerId}
                    onChange={(e) => setWinnerId(e.target.value)}
                    id="winner-select"
                >
                    <option value="">Ingen</option>
                    <option value={selectedVevToUpdate.challengerId}>{getUserById(selectedVevToUpdate.challengerId).username}</option>
                    <option value={selectedVevToUpdate.challengedId}>{getUserById(selectedVevToUpdate.challengedId).username}</option>
                </select>
            </div>

            {
                errorText && <p className="error-message">{errorText}</p>
            }
        </PopupWindow>
    );
}

export default UpdateVevPopup;
