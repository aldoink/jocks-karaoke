import styled from "styled-components";

const MenuDrawer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: -1px;
  background-color: ${({ theme }) => theme.mainDark};
  border-right: ${({ theme }) => theme.whiteBorder};
  border-bottom: ${({ theme }) => theme.whiteBorder};
  border-left: ${({ theme }) => theme.whiteBorder};
  overflow: hidden;
  transition: 0.5s;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  max-height: ${({ isOpen }) => (isOpen ? "80px" : "0px")};
`;

export default MenuDrawer;
