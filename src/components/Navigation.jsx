import { Link } from 'react-router-dom';

import { useGlobalState } from '../GlobalStateProvider';

export default function Navigation() {
  const { state: { accountInfo: { displayName } } } = useGlobalState();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {`${displayName}의` || 'My'}
            {' '}
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
