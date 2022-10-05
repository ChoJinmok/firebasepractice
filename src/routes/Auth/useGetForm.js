import { useState, useCallback } from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import { setAccessToken } from '../../action';

import { createUser, postLogin } from '../../services/api';

import { saveItem } from '../../services/storage';

export default function useAuthForm() {
  const { dispatch } = useGlobalState();

  const [state, setState] = useState({
    formFields: {
      email: '',
      password: '',
    },
    newAccount: true,
    error: '',
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

      dispatch(setAccessToken(data.refreshToken));

      saveItem('accessToken', data.refreshToken);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  }, [fetchAuthData, dispatch, saveItem]);

  function toggleAccount() {
    setState((prevState) => ({
      ...prevState,
      newAccount: !prevState.newAccount,
    }));
  }

  return {
    state,
    handleChange,
    handleSubmit,
    toggleAccount,
  };
}
