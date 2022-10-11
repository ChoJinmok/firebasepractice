import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import {
  postNweet,
  postRefreshToken,
  loadNweets,
  deleteNweet,
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

      const { idToken } = await postRefreshToken(refreshToken);

      const nweetsObject = await loadNweets(idToken);

      if (!nweetsObject) return;

      const nweets = Object.entries(nweetsObject).map((nweetInformations) => {
        const [id, { creatorId, createdAt, nweetContent }] = nweetInformations;

        return {
          id, creatorId, createdAt, nweetContent,
        };
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

  const setNweets = useCallback(({ id, nweetContent, createdAt }) => {
    setState((prevState) => ({
      ...prevState,
      nweetContent: '',
      nweets: [...prevState.nweets, {
        id, creatorId: uid, nweetContent, createdAt,
      }],
    }));
  }, [setState]);

  const handleSubmit = useCallback(async () => {
    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    const { nweetContent } = state;

    const createdAt = Date.now();

    const id = await postNweet({
      idToken, creatorId: uid, nweetContent, createdAt,
    });

    setNweets({ id, nweetContent, createdAt });
  }, [state, setNweets]);

  const handleDeleteClick = useCallback(async (nweetId) => {
    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    deleteNweet({ nweetId, idToken });

    setState((prevState) => ({
      ...prevState,
      nweets: [...prevState.nweets].filter((({ id }) => id !== nweetId)),
    }));
  }, []);

  return {
    uid,
    state,
    handleChange,
    handleSubmit,
    handleDeleteClick,
  };
}
