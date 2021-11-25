import React, {useContext, useState} from "react";
import "./index.scss";
import {Modal} from "../../Modal";
import {AuthContext} from "../../../contexts/AuthContext";
import {SuccessCheckmark} from "../../SuccessCheckmark";
import {LoadingSpinner} from "../../LoadingSpinner";

export const Login: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const {authService} = useContext(AuthContext);

    const toggleModal = () => {
        setShowModal(!showModal);
        setIsSuccess(false);
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event?.currentTarget?.value);
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event?.currentTarget?.value);
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await authService.login(email, password);
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => setShowModal(false), 1500);
        } catch (e) {
            setIsLoading(false);
        }
    }

    return <>
        <div onClick={toggleModal}>Login</div>
        <Modal isOpen={showModal} closeFn={toggleModal}>
            <div data-testid="login-modal" className="login-form">
                <h2 className="login-header">Login</h2>
                <form className="form-container" onSubmit={handleFormSubmit}>
                    <input id="email-input"
                           data-testid="email-input"
                           type="email"
                           placeholder="E-Mail"
                           value={email}
                           onChange={handleChangeEmail}/>
                    <input id="password-input"
                           data-testid="password-input"
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={handleChangePassword}/>
                    {!isSuccess && <button type="submit" onClick={handleFormSubmit}>Submit</button>}
                    {isLoading && <LoadingSpinner/>}
                    {isSuccess && <SuccessCheckmark/>}
                </form>
            </div>
        </Modal>
    </>
}