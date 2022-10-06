import useGetForm from './useGetForm';
import useGithubLogin from './useGithubLogin';

import EmailForm from './EmailForm';
import SocialLogin from './SocialLogin';

export default function AuthContainer() {
  const {
    state: { formFields, newAccount, error },
    handleChange,
    handleSubmit,
    toggleAccount,
    handleClick,
  } = useGetForm();

  useGithubLogin();

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
      <SocialLogin onClick={handleClick} />
    </>
  );
}
