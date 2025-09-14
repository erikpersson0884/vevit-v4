import ActionPopupWindow from "../actionPopupWindow/ActionPopupWindow";
import { useVevContext } from "../../contexts/vevContext";
import { useUsersContext } from "../../contexts/usersContext";
import { useState, useEffect } from "react";

interface UpdateVevPopupProps {
    onClose: () => void;
}

const UpdateVevPopup: React.FC<UpdateVevPopupProps> = ({onClose}) => {
    const { updateVev, selectedVev } = useVevContext();
    const { getUserById } = useUsersContext();

    if (!selectedVev) return null

    const [ winnerId, setWinnerId ] = useState<string>(selectedVev.winnerId || "");
    const [ reson, setReason ] = useState<string>(selectedVev.reason);
    const [ errorText, setErrorText ] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (selectedVev) {
            setWinnerId(selectedVev.winnerId || "");
            setReason(selectedVev.reason || "");

            console.log("selectedVev", selectedVev.date);
        } 
    }, [selectedVev]);


    const handleUpdate = async () => {
        let options = {}
        if (selectedVev.winnerId !== winnerId) options = {...options, winnerId: (winnerId !== "" ? winnerId : null)}
        if (selectedVev.reason !== reson) options = {...options, reason: (reson !== selectedVev.reason ? reson : null)}

        const success = await updateVev(selectedVev.id, options)

        if (success) {
            selectedVev.winnerId = winnerId;
            handleClose()
        }
        
        else setErrorText("Det gick inte att uppdatera vinnaren")
    };

    const handleClose = () => {
        setErrorText(undefined)
        onClose();
    }

    if (!selectedVev) return null;
    return (
        <ActionPopupWindow 
            onClose={() => handleClose()}
            onAccept={() => handleUpdate()}
            title="Uppdatera Vev"
            isOpen={!!selectedVev}
            acceptButtonText="Uppdatera"
            errorText={errorText}
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

            <div>
                <label htmlFor="reason-textarea">Anledning (valfritt):</label>
                <textarea
                    placeholder="Anledning (valfritt)"
                    value={reson}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                />
            </div>
        </ActionPopupWindow>
    );
}

export default UpdateVevPopup;
