import React from "react";
import StyleModalOverlay from "./modal-overlay.module.css";

export const ModalOverlay = (props) => {

    const closeModal = (e) => {
        if (e.target.id === "overlay") {
            props.close();
        }
    };

    return(
        <div className={`${StyleModalOverlay.overlay}`} onClickCapture={closeModal} id="overlay"></div>
    )
}