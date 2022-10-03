export default function EmailLoginForm({
  loginFields: { email, password },
  onChange,
  onSubmit,
}) {
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
        type="text"
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
      <button type="submit">Log In</button>
    </form>
  );
}
