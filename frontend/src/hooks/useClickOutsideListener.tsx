import {RefObject, useEffect} from "react";

export const useClickOutsideListener = (ref: RefObject<HTMLElement>, callback: Function) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        };
    }, [ref, callback]);
}