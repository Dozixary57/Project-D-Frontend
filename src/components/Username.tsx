import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

interface IPayload {
    username: string;
}

export function Username() {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        function handleTokenChange() {
          const token = localStorage.getItem('AccessToken');
          if (token) {
            const decoded: IPayload = jwtDecode(token);
            setUsername(decoded?.username);
          }
        }
    
        window.addEventListener('storage', handleTokenChange);
    
        handleTokenChange();
    
        return () => {
          window.removeEventListener('storage', handleTokenChange);
        };
      }, []);
    
    return (
        <>{username}</>
    )
}