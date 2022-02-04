import React, {useRef, useState} from "react";
import "./index.scss"
import {Login} from "./Login";
import {useClickOutsideListener} from "../../../hooks/useClickOutsideListener";

export const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuDrawer = useRef<HTMLDivElement>(null);
    const hamburger = useRef<HTMLDivElement>(null);
    useClickOutsideListener(menuDrawer, (event: any) => {
        if (!hamburger?.current?.contains(event.target))
            setIsOpen(false)
    });

    const toggleMenu = () => setIsOpen(!isOpen);

    return (<>
            <div id="hamburger-container"
                 data-testid="hamburger-container"
                 className={isOpen ? "is-active" : ""}
                 ref={hamburger}>
                <button data-testid="hamburger-button"
                        className={`hamburger hamburger--squeeze ${isOpen ? "is-active" : ""}`}
                        type="button"
                        onClick={toggleMenu}>
            <span className="hamburger-box">
                <span className="hamburger-inner"/>
            </span>
                </button>
            </div>
            <div data-testid="menu-drawer"
                 className="menu-drawer"
                 ref={menuDrawer}
                 style={{
                     maxHeight: `${isOpen ? "80px" : "0px"}`,
                     visibility: `${isOpen ? "visible" : "hidden"}`
                 }}>
                <div className="menu-item">
                    <Login/>
                </div>
            </div>
        </>
    )
}