import useGetForm from './useGetForm';

import EmailForm from './EmailForm';

export default function AuthContainer() {
  const {
    state: { formFields, newAccount },
    handleChange,
    handleSubmit,
  } = useGetForm();

  return (
    <>
      <EmailForm
        formFields={formFields}
        newAccount={newAccount}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button type="button">Continue with Google</button>
      <button type="button">Continue with Github</button>
    </>
  );
}
