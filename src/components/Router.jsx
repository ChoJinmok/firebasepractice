import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AuthPage from '../routes/Auth/AuthPage';
import Navigation from './Navigation';
import HomePage from '../routes/Home/HomePage';
import Profile from '../routes/Profile';
import EditProfile from '../routes/EditProfile';

export default function Router({ idToken }) {
  return (
    <BrowserRouter>
      {idToken && <Navigation />}
      <Routes>
        {idToken ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit" element={<EditProfile />} />
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
