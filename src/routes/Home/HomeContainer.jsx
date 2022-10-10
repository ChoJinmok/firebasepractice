import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    state: { nweetContent, nweets },
    handleChange,
    handleSubmit,
  } = useNweetForm();

  return (
    <div>
      <NweetForm
        nweetContent={nweetContent}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Nweets nweets={nweets} />
    </div>
  );
}
