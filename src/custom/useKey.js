import { useEffect } from 'react'

export function useKey(Key, action) {
    useEffect(
        function () {
            function callBack(e) {
                if (e.code.toLowerCase() === Key.toLowerCase()) {
                    action()
                }
            }
            document.addEventListener('keydown', callBack)
            return function () {
                document.removeEventListener('keydown', callBack)
            }
        },
        [action, Key]
    )
}
