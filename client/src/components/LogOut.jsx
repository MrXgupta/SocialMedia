import { useDispatch } from 'react-redux';
import { logout } from '../features/auth.js';

const LogoutButton = () => {
    const dispatch = useDispatch();
        dispatch(logout());
        window.location.href = "/";

    return null
};

export default LogoutButton;
