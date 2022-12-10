import { useEffect } from 'react';

import HomeContainer from './HomeContainer';

export default function HomePage() {
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return <HomeContainer />;
}
