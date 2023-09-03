import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserId } from '../../state/auth/authSlice';

function PrivateRoute() {
    const userId = useSelector(selectUserId);

    if (!userId) {
        return <Navigate to="/login/user-login" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
