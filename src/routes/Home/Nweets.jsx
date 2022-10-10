import { memo } from 'react';

export default memo(({ nweets }) => (
  <ul>
    {nweets.map(({ id, nweet }) => (
      <li key={id}>{nweet}</li>
    ))}
  </ul>
));
