import React, {MouseEventHandler, useRef} from "react";
import "./index.scss";
import {useClickOutsideListener} from "../../hooks/useClickOutsideListener";
import {ReactComponent as CloseIcon} from "../../assets/close-icon.svg";
import styled from "styled-components";

export interface IModalProps {
    readonly isOpen: boolean;
    readonly closeFn: MouseEventHandler<any>
}

const BackgroundFilter = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.darkBlue};
  opacity: 70%;
  z-index: 2;
`

export const Modal: React.FC<IModalProps> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useClickOutsideListener(contentRef, props.closeFn);

    return <>
        {props.isOpen && <BackgroundFilter data-testid='background'/>}
        {props.isOpen &&
            <div data-testid="foreground"
                 className="full-screen center">
                <div className="content-container" ref={contentRef}>
                    <CloseIcon title="close-icon" onClick={props.closeFn}/>
                    {props.children}
                </div>
            </div>
        }
    </>
}