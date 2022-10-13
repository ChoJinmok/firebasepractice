import { memo, useRef } from 'react';

export default memo(({
  nweetContent,
  nweetImageAttachment,
  onChange,
  onSubmit,
  onFileChange,
  onClearPhotoClick,
}) => {
  const imageFileRef = useRef(null);

  function handleChange({ target: { value } }) {
    onChange(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit();

    imageFileRef.current.value = '';
  }

  function handleFileChange({ target: { files: [imageFile] } }) {
    onFileChange(imageFile);
  }

  function handleClearPhotoClick() {
    onClearPhotoClick();

    imageFileRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nweetContent}
        onChange={handleChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={imageFileRef}
      />
      <button type="submit">Nweet</button>
      {nweetImageAttachment && (
        <div>
          <img src={nweetImageAttachment} alt="nweet" width="50px" />
          <button
            type="button"
            onClick={handleClearPhotoClick}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
});
