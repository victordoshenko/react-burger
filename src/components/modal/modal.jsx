import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import StyleModal from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export const Modal = ({ close, children }) => {

        function closeByEsc(evt) {
            if (evt.key === "Escape") {
                close();
            }
        }

        useEffect(() => {
            document.addEventListener("keydown", closeByEsc);
            return () => {
                document.removeEventListener("keydown", closeByEsc);
            };
        },[]);

        return ReactDOM.createPortal(
            <>
                <div className={`${StyleModal.container}`}>
                    <button className={`${StyleModal.btn}`} onClickCapture={close}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
                <ModalOverlay close={close} />
            </>,
            modalRoot
        );
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}