import { useNavigate } from 'react-router-dom';

import NavigationContainer from './NavigationContainer';

export default function NavigationPage() {
  const navigate = useNavigate();

  function onClick(pathName) {
    navigate(pathName);
  }

  return <NavigationContainer onClick={onClick} />;
}
