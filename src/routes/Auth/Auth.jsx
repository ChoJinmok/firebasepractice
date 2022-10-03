import { useState, useCallback } from 'react';

import AuthPage from './AuthPage';

export default function Auth() {
  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback(({ name, value }) => {
    setLoginFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [setLoginFields]);

  const handleSubmit = useCallback(() => {
  }, []);

  return (
    <AuthPage
      loginFields={loginFields}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
