import React, {InputHTMLAttributes, Ref} from "react";
import styled from "styled-components";

const StyledInput = styled.input<InputProps>`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.inverted ? 'white' : props.theme.darkBlue};
  color: ${props => props.hasError ? 'red' : props.theme.inverted ? 'white' : props.theme.darkBlue};
  font-size: 16px;
  caret-color: ${props => props.theme.inverted ? 'white' : props.theme.darkBlue};
  margin-bottom: 2rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.inverted ? 'white' : props.theme.darkBlue};
    opacity: 1;
  }
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    ref?: Ref<any>;
}

export const Input: React.FC<InputProps> = (props) => {
    return <StyledInput {...props}/>
}