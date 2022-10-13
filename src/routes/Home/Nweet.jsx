import { memo } from 'react';

export default memo(({
  id, nweetContent, creatorId, attachmentUrl, uid, onDeleteClick, onToggleEditingClick,
}) => (
  <>
    <h4>{nweetContent}</h4>
    {attachmentUrl && <img src={attachmentUrl} alt={`${id}`} width="50px" />}
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
