import React from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import { SearchBar } from "./SearchBar";
import styled from "styled-components";

export const NavBar: React.FC = () => {
  return (
    <NavContainer>
      <SearchBar />
      <HamburgerMenu />
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.whiteBorder};
  background-color: ${(props) => props.theme.main};

  @media screen and (min-width: 769px) {
    border-left: ${(props) => props.theme.whiteBorder};
    border-right: ${(props) => props.theme.whiteBorder};
    margin: 0 2rem;
  }
`;
