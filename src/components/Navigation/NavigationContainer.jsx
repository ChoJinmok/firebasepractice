import { useGlobalState } from '../../GlobalStateProvider';

export default function NavigationContainer({ onClick }) {
  const { state: { accountInfo: { displayName } } } = useGlobalState();

  function handleClick(event) {
    event.preventDefault();

    onClick(event.target.pathname);
  }

  return (
    <nav>
      <ul>
        <li>
          <a
            href="/"
            onClick={handleClick}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/profile"
            onClick={handleClick}
          >
            {displayName || 'My'}
            {displayName && '의'}
            {' '}
            Profile
          </a>
        </li>
      </ul>
    </nav>
  );
}
