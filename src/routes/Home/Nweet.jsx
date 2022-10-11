import { memo } from 'react';

export default memo(({
  id, nweetContent, creatorId, uid, onDeleteClick, onToggleEditingClick,
}) => (
  <>
    <h4>{nweetContent}</h4>
    {creatorId === uid && (
      <>
        <button
          type="button"
          onClick={onDeleteClick(id)}
        >
          Delete Nweet
        </button>
        <button
          type="button"
          onClick={onToggleEditingClick(id)}
        >
          Edit Nweet
        </button>
      </>
    )}
  </>
));
