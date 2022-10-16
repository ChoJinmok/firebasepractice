import { useEffect } from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import { logout } from '../../action';

import { deleteItem, loadItem } from '../../services/storage';

import {
  postRefreshToken,
  loadMyNweets,
} from '../../services/api';

export default function useProfile() {
  const { state: { accountInfo: { uid } }, dispatch } = useGlobalState();

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
    })();
  });

  function handleClick() {
    dispatch(logout());

    deleteItem('refreshToken');
  }

  return { handleClick };
}
