import {useEffect, useState} from "react";

export default function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(undefined);
    useEffect(() => {
            const handler = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(handler);
        },
        [value, delay]
    );
    return debouncedValue;
}