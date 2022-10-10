import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  postNweet,
  postRefreshToken,
  loadNweets,
} from '../../services/api';

import { loadItem } from '../../services/storage';

export default function useNweetForm() {
  const [state, setState] = useState({
    nweet: '',
    nweets: [],
  });

  useEffect(() => {
    (async () => {
      const refreshToken = loadItem('refreshToken');

      const nweetsObject = await loadNweets(refreshToken);

      const nweets = Object.entries(nweetsObject).map((nweetInformations) => {
        const [id, { createdAt, nweet }] = nweetInformations;

        return { id, createdAt, nweet };
      });

      setState((prevState) => ({
        ...prevState,
        nweets,
      }));
    })();
  }, []);

  const handleChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      nweet: value,
    }));
  });

  const handleSubmit = useCallback(async () => {
    const refreshToken = loadItem('refreshToken');

    const idToken = await postRefreshToken(refreshToken);

    const { nweet } = state;

    const createdAt = Date.now();

    postNweet({ idToken, nweet, createdAt });

    const id = uuidv4();

    setState((prevState) => ({
      ...prevState,
      nweet: '',
      nweets: [...prevState.nweets, { id, nweet, createdAt }],
    }));
  });

  return {
    state,
    handleChange,
    handleSubmit,
  };
}
