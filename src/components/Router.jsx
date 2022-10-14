import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AuthPage from '../routes/Auth/AuthPage';
import Navigation from './Navigation';
import HomePage from '../routes/Home/HomePage';
import Profile from '../routes/Profile/ProfileContainer';

export default function Router({ refreshToken }) {
  return (
    <BrowserRouter>
      {refreshToken && <Navigation />}
      <Routes>
        {refreshToken ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
