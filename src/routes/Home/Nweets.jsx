import { memo, useCallback } from 'react';

import EditForm from './EditForm';
import Nweet from './Nweet';

export default memo(({
  nweets, uid, onDeleteClick, onToggleEditingClick, onEditingChange, onCancelClick, onEditSubmit,
}) => {
  const handleDeleteClick = useCallback((nweetId) => () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Are you sure you want to delete this nweet?');

    if (ok) onDeleteClick(nweetId);
  }, [onDeleteClick]);

  const handleToggleEditingClick = useCallback((nweetId) => () => {
    onToggleEditingClick(nweetId);
  }, [onToggleEditingClick]);

  const handleEditingChange = useCallback((nweetId) => ({ target: { value } }) => {
    onEditingChange({ value, nweetId });
  }, [onEditingChange]);

  const handleEditSubmit = useCallback((nweetId) => (event) => {
    event.preventDefault();

    onEditSubmit(nweetId);
  }, [onEditSubmit]);

  const handleCancelClick = useCallback((nweetId) => () => {
    onCancelClick(nweetId);
    onToggleEditingClick(nweetId);
  }, [onCancelClick, onToggleEditingClick]);

  return (
    <ul>
      {nweets.map(({
        id, creatorId, nweetContent, editing, newNweet,
      }) => (
        <li key={id}>
          {editing ? (
            <EditForm
              id={id}
              newNweet={newNweet}
              onCancelClick={handleCancelClick}
              onEditingChange={handleEditingChange}
              onEditSubmit={handleEditSubmit}
            />
          ) : (
            <Nweet
              id={id}
              creatorId={creatorId}
              nweetContent={nweetContent}
              uid={uid}
              onDeleteClick={handleDeleteClick}
              onToggleEditingClick={handleToggleEditingClick}
            />
          )}
        </li>
      ))}
    </ul>
  );
});
