import React, {MouseEventHandler, useRef} from "react";
import {useClickOutsideListener} from "../../hooks/useClickOutsideListener";
import {ReactComponent as CloseIcon} from "../../assets/close-icon.svg";
import styled, {css} from "styled-components";

export interface IModalProps {
    readonly isOpen: boolean;
    readonly closeFn: MouseEventHandler<any>
}

export const Modal: React.FC<IModalProps> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useClickOutsideListener(contentRef, props.closeFn);

    return <>
        {props.isOpen && <SemiTransparentBackground data-testid='background'/>}
        {props.isOpen && <Frame>
            <Inner ref={contentRef}>
                <CloseIcon title="close-icon" onClick={props.closeFn}/>
                {props.children}
            </Inner>
        </Frame>}
    </>
}

const fullScreen = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const SemiTransparentBackground = styled.div`
  ${fullScreen};
  background-color: ${props => props.theme.darkBlue};
  opacity: 70%;
  z-index: 2;
`

const Frame = styled.div`
  ${fullScreen};
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 3;
`

const Inner = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  max-width: 100vw;
  width: 75vw;
  max-height: 75vh;
  position: relative;

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    fill: ${props => props.theme.darkBlue};
    transition: 0.5s;
  }
`