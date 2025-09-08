import ActionPopupWindow from "../actionPopupWindow/actionPopupWindow";
import { useVevContext } from "../../contexts/vevContext";
import { useUsersContext } from "../../contexts/usersContext";
import { useState, useEffect } from "react";


const UpdateVevPopup = () => {
    const { updateVevWinner, selectedVev, setSelectedVev } = useVevContext();
    const { getUserById } = useUsersContext();

    const [ winnerId, setWinnerId ] = useState<string>("");
    const [ errorText, setErrorText ] = useState<string | null>(null);

    useEffect(() => {
        if (selectedVev) {
            setWinnerId(selectedVev.winnerId || "");

            console.log("selectedVev", selectedVev.date);
        } 
    }, [selectedVev]);


    const handleUpdate = async () => {
        if (selectedVev) {
            const success = await updateVevWinner(
                selectedVev.id, 
                (winnerId !== "" ? winnerId : null)
            )

            if (success) {
                selectedVev.winnerId = winnerId;
                handleClose()
            }
            
            else setErrorText("Det gick inte att uppdatera vinnaren")
        }
    };

    const handleClose = () => {
        setSelectedVev(null);
        setErrorText(null)
    }

    if (!selectedVev) return null;
    return (
        <ActionPopupWindow 
            onClose={() => handleClose()}
            onAccept={() => handleUpdate()}
            title="Uppdatera Vev"
            isOpen={!!selectedVev}
            acceptButtonText="Uppdatera"
        >
            <div>
                <label htmlFor="winner-select">Välj ny vinnare:</label>
                <select
                    value={winnerId}
                    onChange={(e) => setWinnerId(e.target.value)}
                    id="winner-select"
                >
                    <option value="">Ingen</option>
                    <option value={selectedVev.challengerId}>{getUserById(selectedVev.challengerId).username}</option>
                    <option value={selectedVev.challengedId}>{getUserById(selectedVev.challengedId).username}</option>
                </select>
            </div>

            {
                errorText && <p className="error-message">{errorText}</p>
            }
        </ActionPopupWindow>
    );
}

export default UpdateVevPopup;
