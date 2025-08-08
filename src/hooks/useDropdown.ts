import { useCallback, useEffect, useState, type RefObject } from "react";

const useDropdown = <T extends HTMLDivElement | null>(ref: RefObject<T>) => {
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    const handleToggleDropdown = useCallback(() => {
        setToggleDropdown(prev => !prev);
    }, []);

    const handleClickOutside = () => {
        setToggleDropdown(false);
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if(ref?.current && !ref?.current.contains(e.target as Node)){
                handleClickOutside();
            }
        }
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [ref]);

    return {
        toggleDropdown,
        handleToggleDropdown
    }
}

export default useDropdown;