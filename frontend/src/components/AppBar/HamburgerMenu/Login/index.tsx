import React, { useState } from "react";
import "./index.scss";
import { LoginStatus, useLogin } from "./hooks/useLogin";
import { SuccessCheckmark } from "../../../SuccessCheckmark";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { Input } from "../../../shared/Input";
import { Modal } from "../../../Modal";
import { Button } from "../../../shared/Button";

export const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, login } = useLogin(email, password);

  const showSubmitButton =
    status !== LoginStatus.LOADING && status !== LoginStatus.SUCCESS;

  const toggleModal = () => setShowModal(!showModal);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event?.currentTarget?.value);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event?.currentTarget?.value);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login();
  };

  return (
    <>
      <div onClick={toggleModal}>Login</div>
      <Modal isOpen={showModal} closeFn={toggleModal}>
        <h2 className="login-header">Login</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <Input
            id="email-input"
            data-testid="email-input"
            hasError={status === LoginStatus.FAILURE}
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={handleChangeEmail}
          />
          <Input
            id="password-input"
            data-testid="password-input"
            hasError={status === LoginStatus.FAILURE}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
          {status === LoginStatus.FAILURE && (
            <p className="failure">Username or password is incorrect</p>
          )}
          {showSubmitButton && <Button type="submit">Submit</Button>}
          {status === LoginStatus.LOADING && <LoadingSpinner />}
          {status === LoginStatus.SUCCESS && <SuccessCheckmark />}
        </form>
      </Modal>
    </>
  );
};
