import { useGlobalState } from '../GlobalStateProvider';

import { logout } from '../action';

import { deleteItem } from '../services/storage';

export default function Profile() {
  const { dispatch } = useGlobalState();

  function handleClick() {
    dispatch(logout());

    deleteItem('refreshToken');
  }

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}
