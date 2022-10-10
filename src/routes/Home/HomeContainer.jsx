import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';

export default function HomeContainer() {
  const {
    state: { nweet },
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
    </div>
  );
}
