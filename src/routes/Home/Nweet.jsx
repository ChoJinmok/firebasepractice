import { memo } from 'react';

export default memo(({
  id, nweetContent, creatorId, attachmentUrl, uid, onDeleteClick, onToggleEditingClick,
}) => {
  function handleDeleteClick({ nweetId, deleteUrl }) {
    return () => {
    // eslint-disable-next-line no-alert
      const ok = window.confirm('Are you sure you want to delete this nweet?');

      if (ok) onDeleteClick({ nweetId, attachmentUrl: deleteUrl });
    };
  }

  function handleToggleEditingClick(nweetId) {
    return () => {
      onToggleEditingClick(nweetId);
    };
  }

  return (
    <>
      <h4>{nweetContent}</h4>
      {attachmentUrl && <img src={attachmentUrl} alt={`${id}`} width="50px" />}
      {creatorId === uid && (
        <>
          <button
            type="button"
            onClick={handleDeleteClick({ nweetId: id, deleteUrl: attachmentUrl })}
          >
            Delete Nweet
          </button>
          <button
            type="button"
            onClick={handleToggleEditingClick(id)}
          >
            Edit Nweet
          </button>
        </>
      )}
    </>
  );
});
