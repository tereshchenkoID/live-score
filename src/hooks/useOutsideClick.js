import { useEffect } from 'react';

const useOutsideClick = (ref, buttonRef, callback) => {
    const handleClick = (e) => {
        if (e.target === buttonRef.current) return;
        if (!ref.current && !buttonRef.current) return
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOutsideClick;
