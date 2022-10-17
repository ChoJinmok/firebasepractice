import { memo } from 'react';

export default memo(({
  id, newNweet,
  onEditSubmit, onEditingChange, onCancelClick,
  onToggleEditingClick,
}) => {
  function handleEditSubmit(nweetId) {
    return (event) => {
      event.preventDefault();

      onEditSubmit(nweetId);
    };
  }

  function handleEditingChange(nweetId) {
    return ({ target: { value } }) => {
      onEditingChange({ value, nweetId });
    };
  }

  function handleCancelClick(nweetId) {
    return () => {
      onCancelClick(nweetId);
      onToggleEditingClick(nweetId);
    };
  }

  return (
    <>
      <form onSubmit={handleEditSubmit(id)}>
        <input
          type="text"
          placeholder="Edit your nweet"
          value={newNweet}
          required
          onChange={handleEditingChange(id)}
        />
        <button type="submit">
          Update Nweet
        </button>
      </form>
      <button
        type="button"
        onClick={handleCancelClick(id)}
      >
        Cancel
      </button>
    </>
  );
});
