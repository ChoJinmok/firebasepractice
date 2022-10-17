import useHome from './useHome';

import NweetForm from './NweetForm';
import Nweets from './Nweets';

export default function HomeContainer() {
  const {
    uid,
    state: { nweetContent, nweetImageAttachment, nweets },
    handleNweetChange,
    handleNweetSubmit,
    handleFileChange,
    handleClearPhotoClick,
    handleDeleteClick,
    handleToggleEditingClick,
    handleEditingChange,
    handleCancelClick,
    handleEditSubmit,
  } = useHome();

  return (
    <>
      <NweetForm
        nweetContent={nweetContent}
        nweetImageAttachment={nweetImageAttachment}
        onNweetChange={handleNweetChange}
        onNweetSubmit={handleNweetSubmit}
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
    </>
  );
}
