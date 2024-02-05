import { useEffect, useRef } from 'react'
import { useKey } from './useKey'

export function useSearch(setQuery) {
    const inputEl = useRef(null)

    return { inputEl }
}
