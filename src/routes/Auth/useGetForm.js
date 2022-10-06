import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { gapi } from 'gapi-script';

import { useGlobalState } from '../../GlobalStateProvider';

import { setAccessToken } from '../../action';

import { createUser, postLogin } from '../../services/api';

import { saveItem } from '../../services/storage';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function useAuthForm() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

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
      setError(error);
    }
  }, [fetchAuthData, dispatch, saveItem, setError]);

  function toggleAccount() {
    setState((prevState) => ({
      ...prevState,
      newAccount: !prevState.newAccount,
    }));
  }

  const handleClick = useCallback(() => {

  });

  return {
    state,
    handleChange,
    handleSubmit,
    toggleAccount,
    handleClick,
  };
}
