import { memo } from 'react';

export default memo(({ nweetContent, onChange, onSubmit }) => {
  function handleChange({ target: { value } }) {
    onChange(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nweetContent}
        onChange={handleChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <button type="submit">Nweet</button>
    </form>
  );
});
