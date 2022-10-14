import useProfile from './useProfile';

export default function Profile() {
  const { handleClick } = useProfile();

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}
