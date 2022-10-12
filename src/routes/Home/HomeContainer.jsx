import useNweetForm from './useNweetForm';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    uid,
    state: { nweetContent, nweetImageAttachment, nweets },
    handleChange,
    handleSubmit,
    handleDeleteClick,
    handleToggleEditingClick,
    handleEditingChange,
    handleCancelClick,
    handleEditSubmit,
    handleFileChange,
    handleClearPhotoClick,
  } = useNweetForm();

  return (
    <div>
      <NweetForm
        nweetContent={nweetContent}
        nweetImageAttachment={nweetImageAttachment}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
        onClearPhotoClick={handleClearPhotoClick}
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
