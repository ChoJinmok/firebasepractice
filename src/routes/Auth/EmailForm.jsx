import { memo } from 'react';

export default memo(({
  formFields: { email, password },
  newAccount,
  onChange,
  onSubmit,
}) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={handleChange}
      />
      <button type="submit">{newAccount ? 'Create Account' : 'Log In'}</button>
    </form>
  );
});
