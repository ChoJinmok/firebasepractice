import { memo } from 'react';

import EditForm from './EditForm';
import Nweet from './Nweet';

export default memo(({
  nweets, uid,
  onCancelClick, onEditingChange, onEditSubmit,
  onDeleteClick, onToggleEditingClick,
}) => (
  <ul>
    {nweets.map(({
      id, creatorId, nweetContent, editing, newNweet, attachmentUrl,
    }) => (
      <li key={id}>
        {editing ? (
          creatorId === uid && (
            <EditForm
              id={id}
              newNweet={newNweet}
              onCancelClick={onCancelClick}
              onEditingChange={onEditingChange}
              onEditSubmit={onEditSubmit}
              onToggleEditingClick={onToggleEditingClick}
            />
          )
        ) : (
          <Nweet
            id={id}
            creatorId={creatorId}
            nweetContent={nweetContent}
            attachmentUrl={attachmentUrl}
            uid={uid}
            onDeleteClick={onDeleteClick}
            onToggleEditingClick={onToggleEditingClick}
          />
        )}
      </li>
    ))}
  </ul>
));
