import { useState, useCallback } from 'react';

import { createUser, postLogin } from '../../services/api';

export default function useAuthForm() {
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

  const fetchAuthData = useCallback(async () => {
    const { email, password } = state.formFields;

    const data = state.newAccount
      ? await createUser({ email, password })
      : await postLogin({ email, password });

    return data;
  }, [state]);

  const handleSubmit = useCallback(async () => {
    try {
      const data = await fetchAuthData();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [fetchAuthData]);

  return {
    state,
    handleChange,
    handleSubmit,
  };
}
