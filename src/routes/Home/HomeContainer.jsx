import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    uid,
    state: { nweetContent, nweets },
    handleChange,
    handleSubmit,
    handleDeleteClick,
    handleToggleEditingClick,
    handleEditingChange,
    handleCancelClick,
    handleEditSubmit,
  } = useNweetForm();

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
        onDeleteClick={handleDeleteClick}
        onToggleEditingClick={handleToggleEditingClick}
        onEditingChange={handleEditingChange}
        onCancelClick={handleCancelClick}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
}
