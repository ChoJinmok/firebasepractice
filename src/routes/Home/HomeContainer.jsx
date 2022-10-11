import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    uid,
    state: { nweetContent, nweets },
    handleChange,
    handleSubmit,
  } = useNweetForm();

  console.log(nweets);
  return (
    <div>
      <NweetForm
        nweetContent={nweetContent}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Nweets
        nweets={nweets}
        uid={uid}
      />
    </div>
  );
}
