import {
  useState,
  useCallback,
} from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import { setIdToken } from '../../action';

import {
  postEmailPassword,
  postAuthProvider,
} from '../../services/api';

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

  const setError = useCallback((error) => {
    setState((prevState) => ({
      ...prevState,
      error: error.message,
    }));
  }, [setState]);

  const handleSubmit = useCallback(async () => {
    const { formFields: { email, password }, newAccount } = state;

    try {
      const { idToken, refreshToken } = await
      postEmailPassword({ email, password, newAccount });

      dispatch(setIdToken(idToken));

      saveItem('refreshToken', refreshToken);
    } catch (error) {
      setError(error);
    }
  }, [state, dispatch, setError, postEmailPassword, saveItem]);

  function toggleAccount() {
    setState((prevState) => ({
      ...prevState,
      newAccount: !prevState.newAccount,
    }));
  }

  const handleClick = useCallback(async (name) => {
    const { idToken, refreshToken } = await postAuthProvider(name);

    dispatch(setIdToken(idToken));

    saveItem('refreshToken', refreshToken);
  }, [postAuthProvider, dispatch, setIdToken, saveItem]);

  return {
    state,
    handleChange,
    handleSubmit,
    toggleAccount,
    handleClick,
  };
}
