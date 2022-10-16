import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import { useGlobalState } from '../../GlobalStateProvider';

import {
  postNweet,
  postRefreshToken,
  uploadNweetImage,
  deleteNweetImage,
  loadNweets,
  deleteNweet,
  editNweet,
} from '../../services/api';

import { loadItem } from '../../services/storage';

export default function useNweetForm() {
  const { state: { accountInfo: { uid } } } = useGlobalState();

  const [state, setState] = useState({
    nweetContent: '',
    nweetImageAttachment: null,
    nweets: [],
  });

  useEffect(() => {
    (async () => {
      const refreshToken = loadItem('refreshToken');

      const { idToken } = await postRefreshToken(refreshToken);

      const nweetsObject = await loadNweets(idToken);

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

  const setNweets = useCallback(({
    id, nweetContent, createdAt, attachmentUrl,
  }) => {
    setState((prevState) => ({
      ...prevState,
      nweetContent: '',
      nweetImageAttachment: null,
      nweets: [...prevState.nweets, {
        id,
        creatorId: uid,
        nweetContent,
        createdAt,
        editing: false,
        newNweet: nweetContent,
        attachmentUrl,
      }],
    }));
  }, [setState]);

  const handleSubmit = useCallback(async () => {
    const { nweetImageAttachment } = state;

    const attachmentUrl = nweetImageAttachment
     && await uploadNweetImage({ uid, nweetImageAttachment });

    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    const { nweetContent } = state;

    const createdAt = Date.now();

    const id = await postNweet({
      idToken, creatorId: uid, nweetContent, createdAt, attachmentUrl,
    });

    setNweets({
      id, nweetContent, createdAt, attachmentUrl,
    });
  }, [state, setNweets]);

  const handleDeleteClick = useCallback(async ({ nweetId, attachmentUrl }) => {
    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    deleteNweet({ nweetId, idToken });

    deleteNweetImage(attachmentUrl);

    setState((prevState) => ({
      ...prevState,
      nweets: [...prevState.nweets].filter((({ id }) => id !== nweetId)),
    }));
  }, []);

  const handleToggleEditingClick = useCallback((nweetId) => {
    setState((prevState) => {
      const { nweets } = prevState;

      return {
        ...prevState,
        nweets: [...nweets].map((nweet) => {
          if (nweet.id === nweetId) {
            return { ...nweet, editing: !nweet.editing };
          }

          return nweet;
        }),
      };
    });
  }, [setState]);

  const handleEditingChange = useCallback(({ value, nweetId }) => {
    setState((prevState) => {
      const { nweets } = prevState;

      return {
        ...prevState,
        nweets: [...nweets].map((nweet) => {
          if (nweet.id === nweetId) {
            return { ...nweet, newNweet: value };
          }

          return nweet;
        }),
      };
    });
  }, [setState]);

  const handleCancelClick = useCallback((nweetId) => {
    setState((prevState) => {
      const { nweets } = prevState;

      return {
        ...prevState,
        nweets: [...nweets].map((nweet) => {
          if (nweet.id === nweetId) {
            return { ...nweet, newNweet: nweet.nweetContent };
          }

          return nweet;
        }),
      };
    });
  }, []);

  const handleEditSubmit = useCallback(async (nweetId) => {
    const refreshToken = loadItem('refreshToken');

    const { idToken } = await postRefreshToken(refreshToken);

    const { nweets } = state;

    const { newNweet } = nweets.find(({ id }) => id === nweetId);

    editNweet({ nweetId, idToken, newNweet });

    setState((prevState) => ({
      ...prevState,
      nweets: [...prevState.nweets].map((nweet) => {
        if (nweet.id === nweetId) {
          return { ...nweet, nweetContent: nweet.newNweet };
        }

        return nweet;
      }),
    }));

    handleToggleEditingClick(nweetId);
  }, [state, setState, handleToggleEditingClick]);

  const handleFileChange = useCallback((imageFile) => {
    const reader = new FileReader();

    reader.onloadend = ({ currentTarget: { result } }) => {
      setState((prevState) => ({
        ...prevState,
        nweetImageAttachment: result,
      }));
    };

    reader.readAsDataURL(imageFile);
  }, [setState]);

  const handleClearPhotoClick = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      nweetImageAttachment: null,
    }));
  }, [setState]);

  return {
    uid,
    state,
    handleChange,
    handleSubmit,
    handleDeleteClick,
    handleToggleEditingClick,
    handleEditingChange,
    handleCancelClick,
    handleEditSubmit,
    handleFileChange,
    handleClearPhotoClick,
  };
}
