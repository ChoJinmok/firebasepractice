import useGetForm from './useGetForm';

import EmailForm from './EmailForm';

export default function AuthContainer() {
  const {
    state: { formFields, newAccount, error },
    handleChange,
    handleSubmit,
    toggleAccount,
  } = useGetForm();

  return (
    <>
      <EmailForm
        formFields={formFields}
        newAccount={newAccount}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button
        type="button"
        onClick={toggleAccount}
      >
        {newAccount ? 'Sign In' : 'Create Account'}
      </button>
      <div>
        <button type="button">Continue with Google</button>
        <button type="button">Continue with Github</button>
      </div>
    </>
  );
}
