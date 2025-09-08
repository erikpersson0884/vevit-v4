import React from 'react';
import VevInfoPopup from '../vevInfoPopup/VevInfoPopup';
import UpdateVevPopup from '../updateVevPopup/UpdateVevPopup';
import { useVevContext } from '../../contexts/vevContext';

const VevPopup = () => {
    const [ editIsOpen, setEditIsOpen ] = React.useState(false);
    const { selectedVev } = useVevContext();

    React.useEffect(() => {
        if(!selectedVev) setEditIsOpen(false);
    }, [selectedVev]);
    
    if (!selectedVev) return null;

    if (editIsOpen) {
        return <UpdateVevPopup />;
    } 
    return (
        <VevInfoPopup openUpdatePopup={() => setEditIsOpen(true)} />
    );
}

export default VevPopup;
