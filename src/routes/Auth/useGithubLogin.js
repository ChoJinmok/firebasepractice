import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import qs from 'qs';

import { useGlobalState } from '../../GlobalStateProvider';

import { setAccessToken } from '../../action';

import { loadGithubAccessToken, postSocialLogin } from '../../services/api';

import { saveItem } from '../../services/storage';

async function postGithubLogin({ code, dispatch }) {
  try {
    const token = await loadGithubAccessToken(code);

    // const data = await postSocialLogin({
    //   providerId: 'github.com',
    //   token,
    // });

    // dispatch(setAccessToken(data.refreshToken));

  // saveItem('accessToken', data.refreshToken);
  } catch (error) {
    console.log(error.message);
  }
}

export default function useGithubLogin() {
  const location = useLocation();

  const { dispatch } = useGlobalState();

  useEffect(() => {
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (code) {
      postGithubLogin({ code, dispatch });
    }
  }, [location]);
}
