import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AuthPage from '../routes/Auth/AuthPage';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import EditProfile from '../routes/EditProfile';

export default function Router({ refreshToken }) {
  return (
    <BrowserRouter>
      <Routes>
        {refreshToken ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Profile />} />
            <Route path="/" element={<EditProfile />} />
          </>
        ) : (
          <Route path="/" element={<AuthPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
