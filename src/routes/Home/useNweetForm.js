import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useGlobalState } from '../../GlobalStateProvider';

import {
  postNweet,
  postRefreshToken,
  loadNweets,
} from '../../services/api';

import { loadItem } from '../../services/storage';

export default function useNweetForm() {
  const { state: { uid } } = useGlobalState();

  const [state, setState] = useState({
    nweetContent: '',
    nweets: [],
  });

  useEffect(() => {
    (async () => {
      const refreshToken = loadItem('refreshToken');

      const idToken = await postRefreshToken(refreshToken);

      const nweetsObject = await loadNweets(idToken);

      if (!nweetsObject) return;

      const nweets = Object.entries(nweetsObject).map((nweetInformations) => {
        const [id, { createdAt, nweetContent }] = nweetInformations;

        return { id, createdAt, nweetContent };
      });

      setState((prevState) => ({
        ...prevState,
        nweets,
      }));
    })();
  }, [setState]);

  const handleChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      nweetContent: value,
    }));
  }, [setState]);

  const setNweets = useCallback(({ nweetContent, createdAt }) => {
    setState((prevState) => ({
      ...prevState,
      nweetContent: '',
      nweets: [...prevState.nweets, {
        id: uuidv4(), creatorId: uid, nweetContent, createdAt,
      }],
    }));
  }, [uuidv4, setState]);

  const handleSubmit = useCallback(async () => {
    const refreshToken = loadItem('refreshToken');

    const idToken = await postRefreshToken(refreshToken);

    const { nweetContent } = state;

    const createdAt = Date.now();

    postNweet({
      idToken, creatorId: uid, nweetContent, createdAt,
    });

    setNweets({ nweetContent, createdAt });
  }, [state, setNweets]);
  return {
    state,
    handleChange,
    handleSubmit,
  };
}
