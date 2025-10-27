import type { JSX } from 'react';
import { useState } from 'react';
import './PopupImage.css';

type PopupImageProps = {src: string;}

export default function PopupImage({src}: PopupImageProps): JSX.Element {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className={"popup-image-container"}>
            <img src={src} onClick={openPopup} className="popup-image"/>

            {isPopupOpen && (
                <div className="popup-image-overlay" onClick={closePopup}>
                    <div className="popup-image-content" onClick={(e) => e.stopPropagation()}>
                        <button className="popup-image-close" onClick={closePopup}>×</button>
                        <img src={src} className="popup-image-big" />
                    </div>
                </div>
            )}
        </div>
    );
}