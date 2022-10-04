import { memo } from 'react';

import EmailForm from './EmailForm';

export default memo(({
  state: { formFields, newAccount },
  onChange,
  onSubmit,
}) => (
  <>
    <EmailForm
      formFields={formFields}
      newAccount={newAccount}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    <button type="button">Continue with Google</button>
    <button type="button">Continue with Github</button>
  </>
));
