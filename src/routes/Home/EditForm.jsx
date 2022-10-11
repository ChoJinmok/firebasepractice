import { memo } from 'react';

export default memo(({
  id, newNweet, onCancelClick, onEditingChange, onEditSubmit,
}) => (
  <>
    <form onSubmit={onEditSubmit(id)}>
      <input
        type="text"
        placeholder="Edit your nweet"
        value={newNweet}
        required
        onChange={onEditingChange(id)}
      />
      <button type="submit">
        Update Nweet
      </button>
    </form>
    <button
      type="button"
      onClick={onCancelClick(id)}
    >
      Cancel
    </button>
  </>
));
