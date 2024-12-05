import React, { useEffect, useState } from 'react';
import { login } from '../context/loginContext/authActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/adminDashboard');
        }
    }, [navigate]);
    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true
        });
    ;
    const notifyError = (message) =>
        toast.error(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true
        });
    ;
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(login(username, password));

            if (response && response.type === 'LOGIN_SUCCESS') {
                notifySuccess('Welcome');
                navigate('/adminDashboard');
            } else {
                notifyError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.log(error);
            notifyError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: 'red', marginBottom: '20px' }}>This section is only for admins!</h1>
            <form
                onSubmit={handleLogin}
                style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                    width: "400px"
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
