import {
  useState,
  useCallback,
} from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import {
  setRefreshToken,
  setAccountInfo,
} from '../../action';

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
      const { uid, refreshToken, displayName } = await
      postEmailPassword({ email, password, newAccount });

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo({ uid, email, displayName }));

      saveItem('refreshToken', refreshToken);
    } catch (error) {
      setError(error);
    }
  }, [state, dispatch, setError]);

  function toggleAccount() {
    setState((prevState) => ({
      ...prevState,
      newAccount: !prevState.newAccount,
    }));
  }

  const handleClick = useCallback(async (name) => {
    const {
      uid, refreshToken, displayName, email,
    } = await postAuthProvider(name);

    dispatch(setRefreshToken(refreshToken));
    dispatch(setAccountInfo({ uid, email, displayName }));

    saveItem('refreshToken', refreshToken);
  }, [dispatch]);

  return {
    state,
    handleChange,
    handleSubmit,
    toggleAccount,
    handleClick,
  };
}
