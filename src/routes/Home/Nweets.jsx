import { memo } from 'react';

export default memo(({ nweets, uid }) => (
  <ul>
    {nweets.map(({ id, creatorId, nweetContent }) => (
      <li key={id}>
        <h4>{nweetContent}</h4>
        {creatorId === uid && (
          <>
            <button type="button">Delete Nweet</button>
            <button type="button">Edit Nweet</button>
          </>
        )}
      </li>
    ))}
  </ul>
));
