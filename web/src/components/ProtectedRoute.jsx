import { Navigate } from 'react-router-dom';
import useUiStore from '../store/uiStore';

export default function ProtectedRoute({ children }) {
  const { user } = useUiStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
