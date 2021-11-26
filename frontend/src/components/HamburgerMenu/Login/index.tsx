import React, {useState} from "react";
import "./index.scss";
import {Modal} from "../../Modal";
import {SuccessCheckmark} from "../../SuccessCheckmark";
import {LoadingSpinner} from "../../LoadingSpinner";
import {LoginStatus, useLogin} from "./hooks/useLogin";

export const Login: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {status, login} = useLogin(email, password);

    const showSubmitButton = status !== LoginStatus.LOADING && status !== LoginStatus.SUCCESS;

    const toggleModal = () => setShowModal(!showModal);
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event?.currentTarget?.value);
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event?.currentTarget?.value);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await login();
    }

    return <>
        <div onClick={toggleModal}>Login</div>
        <Modal isOpen={showModal} closeFn={toggleModal}>
            <div data-testid="login-modal" className="login-form">
                <h2 className="login-header">Login</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input id="email-input"
                           data-testid="email-input"
                           className={`${status === LoginStatus.FAILURE ? "failure" : ""}`}
                           type="email"
                           placeholder="E-Mail"
                           value={email}
                           onChange={handleChangeEmail}/>
                    <input id="password-input"
                           data-testid="password-input"
                           className={`${status === LoginStatus.FAILURE ? "failure" : ""}`}
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={handleChangePassword}/>
                    {status === LoginStatus.FAILURE && <p className="failure">Username or password is incorrect</p>}
                    {showSubmitButton && <button type="submit">Submit</button>}
                    {status === LoginStatus.LOADING && <LoadingSpinner/>}
                    {status === LoginStatus.SUCCESS && <SuccessCheckmark/>}
                </form>
            </div>
        </Modal>
    </>
}