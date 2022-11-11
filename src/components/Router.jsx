import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AuthPage from '../routes/Auth/AuthPage';
import NavigationPage from './Navigation/NavigationPage';
import HomePage from '../routes/Home/HomePage';
import ProfilePage from '../routes/Profile/ProfilePage';

export default function Router({ refreshToken }) {
  return (
    // <BrowserRouter basename={NODE_ENV ? '/' : '/firebasepractice'}>
    <BrowserRouter>
      {refreshToken && <NavigationPage />}
      <Routes>
        {refreshToken ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
