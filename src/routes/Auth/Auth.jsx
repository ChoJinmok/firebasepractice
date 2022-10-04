import { useState, useCallback } from 'react';

import AuthPage from './AuthPage';

import { createUser, postLogin } from '../../services/api';

export default function Auth() {
  const [state, setState] = useState({
    formFields: {
      email: '',
      password: '',
    },
    newAccount: true,
  });

  const handleChange = useCallback(({ name, value }) => {
    setState((prevState) => {
      const { formFields } = prevState;

      return {
        ...prevState,
        formFields: {
          ...formFields,
          [name]: value,
        },
      };
    });
  }, [setState]);

  async function fetchAuthData() {
    const { email, password } = state.formFields;

    const data = state.newAccount
      ? await createUser({ email, password })
      : await postLogin({ email, password });

    return data;
  }

  const handleSubmit = useCallback(async () => {
    try {
      const data = await fetchAuthData();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [fetchAuthData]);

  return (
    <AuthPage
      state={state}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
