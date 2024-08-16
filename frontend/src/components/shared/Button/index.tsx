import styled from "styled-components";

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  color: ${(props) => props.theme.mainDark};
  border: 1px solid ${(props) => props.theme.mainDark};
  border-radius: 4px;
  background-color: transparent;
  font-size: 18px;
  align-self: center;
`;
