import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

interface IPayload {
    username: string;
}

export function Username() {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        if (token) {
            const decoded: IPayload = jwtDecode(token);
            setUsername(decoded?.username)
        }
    }, [])
    return (
        <>{username}</>
    )
}