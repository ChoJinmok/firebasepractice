import { memo } from 'react';

export default memo(({ newDisplayName, onChange, onSubmit }) => {
  function handleChange({ target: { value } }) {
    onChange(value);
  }

  function handleSubmit() {
    return (event) => {
      event.preventDefault();

      onSubmit();
    };
  }

  return (
    <form onSubmit={handleSubmit()}>
      <input
        type="text"
        placeholder="Display Name"
        value={newDisplayName}
        onChange={handleChange}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
});
