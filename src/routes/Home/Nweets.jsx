import { memo } from 'react';

export default memo(({ nweets, uid, onDeleteClick }) => (
  <ul>
    {nweets.map(({ id, creatorId, nweetContent }) => {
      function handleDeleteClick(nweetId) {
        return () => {
          // eslint-disable-next-line no-alert
          const ok = window.confirm('Are you sure you want to delete this nweet?');

          if (ok) onDeleteClick(nweetId);
        };
      }

      function handleEditClick() {

      }

      return (
        <li key={id}>
          <h4>{nweetContent}</h4>
          {creatorId === uid && (
            <>
              <button
                type="button"
                onClick={handleDeleteClick(id)}
              >
                Delete Nweet
              </button>
              <button
                type="button"
                onClick={handleEditClick}
              >
                Edit Nweet
              </button>
            </>
          )}
        </li>
      );
    })}
  </ul>
));
