import { memo } from 'react';

import EmailLoginForm from './EmailLoginForm';

export default memo(({
  loginFields,
  onChange,
  onSubmit,
}) => (
  <>
    <EmailLoginForm
      loginFields={loginFields}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    <button type="button">Continue with Google</button>
    <button type="button">Continue with Github</button>
  </>
));
