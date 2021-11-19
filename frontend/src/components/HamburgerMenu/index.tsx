import React, {useRef, useState} from "react";
import "./index.scss"

export const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuDrawer = useRef<HTMLDivElement>(null);

    const handleClick = () => setIsOpen(!isOpen);

    return (<>
            <div id="hamburger-container"
                 data-testid="hamburger-container"
                 className={isOpen ? "is-active" : ""}>
                <button data-testid="hamburger-button"
                        className={`hamburger hamburger--squeeze ${isOpen ? "is-active" : ""}`}
                        type="button"
                        onClick={handleClick}>
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
                    Login
                </div>
            </div>
        </>
    )
}