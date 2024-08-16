import React, { useContext, useRef, useState } from "react";
import { Login } from "./Login";
import { useClickOutsideListener } from "../../../hooks/useClickOutsideListener";
import { AuthContext } from "../../../contexts/AuthContext";
import Container from "./components/Container";
import Button from "./components/Button";
import MenuDrawer from "./components/MenuDrawer";
import MenuItem from "./components/MenuItem";

export const HamburgerMenu: React.FC = () => {
  const { authService } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuDrawer = useRef<HTMLDivElement>(null);
  const hamburger = useRef<HTMLDivElement>(null);

  useClickOutsideListener(menuDrawer, (event: any) => {
    if (!hamburger?.current?.contains(event.target)) setIsOpen(false);
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoutClicked = () => {
    authService.logout();
    toggleMenu();
  };

  return (
    <>
      <Container
        id="hamburger-container"
        data-testid="hamburger-container"
        ref={hamburger}
        isOpen={isOpen}
      >
        <Button onClick={toggleMenu} isOpen={isOpen} />
      </Container>
      <MenuDrawer
        data-testid="menu-drawer"
        className="menu-drawer"
        ref={menuDrawer}
        isOpen={isOpen}
      >
        {!authService.isAuthenticated() && (
          <MenuItem>
            <Login closeMenu={toggleMenu} />
          </MenuItem>
        )}
        {authService.isAuthenticated() && (
          <MenuItem>
            <div onClick={handleLogoutClicked}>Logout</div>
          </MenuItem>
        )}
      </MenuDrawer>
    </>
  );
};
