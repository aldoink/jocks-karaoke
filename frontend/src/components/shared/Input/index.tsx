import {InputHTMLAttributes, Ref} from "react";
import styled from "styled-components";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    inverted?: boolean;
    ref?: Ref<any>;
}

export const Input = styled.input<InputProps>`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.inverted ? 'white' : props.theme.darkBlue};
  color: ${props => props.hasError ? 'red' : props.inverted ? 'white' : props.theme.darkBlue};
  font-size: 16px;
  caret-color: ${props => props.inverted ? 'white' : props.theme.darkBlue};
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.inverted ? 'white' : props.theme.darkBlue};
    opacity: 1;
  }
`
