import { memo } from 'react';

export default memo(({ onClick }) => {
  function handleClick({ target: { name } }) {
    onClick(name);
  }

  return (
    <div>
      <button
        type="button"
        name="google"
        onClick={handleClick}
      >
        Continue with Google
      </button>
      <button
        type="button"
        name="github"
        onClick={handleClick}
      >
        Continue with Github
      </button>
    </div>
  );
});
