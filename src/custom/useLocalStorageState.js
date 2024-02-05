import { useEffect, useState } from 'react'

export function useLocalStorageState(intialValue, Key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(Key)
        return storedValue ? JSON.parse(storedValue) : intialValue
    })
    useEffect(() => {
        localStorage.setItem(Key, JSON.stringify(value))
    }, [value, Key])
    return [value, setValue]
}
