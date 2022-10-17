import useProfile from './useProfile';

import ProfileForm from './ProfileForm';

export default function ProfileContainer() {
  const {
    state: { newDisplayName },
    handleChange,
    handleSubmit,
    handleClick,
  } = useProfile();

  return (
    <>
      <ProfileForm
        newDisplayName={newDisplayName}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        Log Out
      </button>
    </>
  );
}
