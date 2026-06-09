import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingPage } from './Spinner';

/**
 * ProtectedRoute: Protects CRM pages from unauthenticated access.
 * 
 * Logic:
 * 1. If auth is loading → show spinner
 * 2. If no valid token/user → redirect to /login
 * 3. If authenticated (any email/user) → show the page
 * 
 * NOTE: This does NOT check email, role, or user type.
 * All authenticated users see the same Admin Dashboard.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for auth check to complete
  if (loading) {
    return <LoadingPage />;
  }

  // Not authenticated: send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated: render protected content
  return children;
}
