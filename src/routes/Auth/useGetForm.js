import {
  useState,
  useCallback,
} from 'react';

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

import { auth } from '../../firebase';

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

  const handleClick = useCallback(async (name) => {
    const provider = {
      google: new GoogleAuthProvider(),
      github: new GithubAuthProvider(),
    }[name];

    const result = await signInWithPopup(auth, provider);

    const { accessToken } = {
      google: GoogleAuthProvider.credentialFromResult(result),
      github: GithubAuthProvider.credentialFromResult(result),
    }[name];

    dispatch(setAccessToken(accessToken));

    saveItem('accessToken', accessToken);
  });

  return {
    state,
    handleChange,
    handleSubmit,
    toggleAccount,
    handleClick,
  };
}
