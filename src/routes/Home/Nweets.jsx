import { memo } from 'react';

export default memo(({ nweets }) => (
  <ul>
    {nweets.map(({ id, nweetContent }) => (
      <li key={id}>{nweetContent}</li>
    ))}
  </ul>
));
