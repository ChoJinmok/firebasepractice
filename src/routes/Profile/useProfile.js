import { useCallback, useEffect, useState } from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import {
  logout,
  setDisplayName,
} from '../../action';

import { deleteItem, loadItem } from '../../services/storage';

import {
  postRefreshToken,
  loadMyNweets,
  updateAccountInfo,
} from '../../services/api';

export default function useProfile() {
  const { state: { accountInfo: { uid, displayName } }, dispatch } = useGlobalState();

  const [state, setState] = useState({
    userNweets: [],
    newDisplayName: displayName || '',
  });

  useEffect(() => {
    (async () => {
      const refreshToken = loadItem('refreshToken');

      const { idToken } = await postRefreshToken(refreshToken);

      const nweetsObject = await loadMyNweets({ idToken, uid });

      if (!nweetsObject) return;

      const nweets = Object.entries(nweetsObject).map((nweetInformations) => {
        const [id, {
          creatorId, createdAt, nweetContent, attachmentUrl,
        }] = nweetInformations;

        return {
          id,
          creatorId,
          createdAt,
          nweetContent,
          editing: false,
          newNweet: nweetContent,
          attachmentUrl,
        };
      });

      setState((prevState) => ({
        ...prevState,
        userNweets: nweets,
      }));
    })();
  }, [setState]);

  const handleChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      newDisplayName: value,
    }));
  }, [setState]);

  const handleSubmit = useCallback(async () => {
    const { newDisplayName } = state;

    if (displayName === newDisplayName) return;

    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    updateAccountInfo({ idToken, newDisplayName });

    dispatch(setDisplayName(newDisplayName));
  }, [state, dispatch]);

  function handleClick() {
    dispatch(logout());

    deleteItem('refreshToken');
  }

  return {
    state,
    handleChange,
    handleSubmit,
    handleClick,
  };
}
