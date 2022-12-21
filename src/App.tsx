import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { authService } from './common/authService';
import AuthorizationPage from './features/authorization/AuthorizationPage';
import Template from './template/Template';

const WithPrivateRoute = authService.withPrivateRoute(Template);

export default function App() {
  const isAuthenticated = authService.useAuth();

  if (isAuthenticated.length < 1) {
    window.location.href = '/auth';
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<AuthorizationPage />}
        />
        <Route
          path="/*"
          element={<WithPrivateRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}
