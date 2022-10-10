import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    state: { nweet, nweets },
    handleChange,
    handleSubmit,
  } = useNweetForm();

  return (
    <div>
      <NweetForm
        nweet={nweet}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Nweets nweets={nweets} />
    </div>
  );
}
