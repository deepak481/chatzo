import { useState } from 'react';

export interface IToken {
  token: string;
}

export default function useToken() {
  const getToken = (): string | null | undefined => {
    const tokenString: string | null | undefined = localStorage.getItem('token');

    if (!tokenString || tokenString === 'undefined') {
      return null;
    }
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState<string | null | undefined>(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
