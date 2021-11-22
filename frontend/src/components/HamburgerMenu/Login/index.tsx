import React, {useState} from "react";
import "./index.scss";
import {Modal} from "../../Modal";

export const Login: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = () => {
        console.log("Submit")
    }

    const toggleModal = () => setShowModal(!showModal);

    return <>
        <div onClick={toggleModal}>Login</div>
        <Modal isOpen={showModal} closeFn={toggleModal}>
            <div className="login-form">
                <h2 className="login-header">Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <input id="email-input" type="email" placeholder="E-Mail"/>
                    <input id="password-input" type="password" placeholder="Password"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Modal>
    </>
}