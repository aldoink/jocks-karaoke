import styled from "styled-components";

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  border-left: 2px solid #ffffff4c;
  padding: 1rem;
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.mainDark : "transparent"};
`;

export default Container;
