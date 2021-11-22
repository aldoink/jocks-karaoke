import React, {MouseEventHandler, useRef} from "react";
import "./index.scss";
import {useClickOutsideListener} from "../../hooks/useClickOutsideListener";
import {ReactComponent as CloseIcon} from "../../assets/close-icon.svg";

export interface IModalProps {
    readonly isOpen: boolean;
    readonly closeFn: MouseEventHandler<any>
}

export const Modal: React.FC<IModalProps> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useClickOutsideListener(contentRef, props.closeFn);

    return <>
        {props.isOpen &&
        <div data-testid="foreground"
             className="full-screen center">
            <div className="content-container" ref={contentRef}>
                <CloseIcon title="close-icon" onClick={props.closeFn}/>
                {props.children}
            </div>
        </div>
        }
        {props.isOpen &&
        <div data-testid="background"
             className="full-screen background"/>}
    </>
}