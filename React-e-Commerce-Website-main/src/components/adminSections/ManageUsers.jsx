import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ManageUsers({ isAdmin }) {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // Initialize as null
    const { user } = useSelector((state) => state.auth); // Get user from Redux state

    useEffect(() => {
        if (user && user._id) {
            setCurrentUser(user._id); // Safely set current user ID
        }
    }, [user]);

    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true,
        });

    const notifyError = (message) =>
        toast.error(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true,
        });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/auth/updateRole/${userId}`,
                { isAdmin: newRole },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUsers(users.map((user) => (user._id === userId ? response.data : user)));
            notifySuccess('User role updated successfully');
        } catch (error) {
            notifyError(error.response?.data?.message || 'Error updating role');
        }
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/auth/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== userId));
            notifySuccess('User deleted successfully');
        } catch (error) {
            notifyError(error.response?.data?.message || 'Error deleting user');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Username</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Role</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.username}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.phoneNumber}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                <select
                                    value={user.isAdmin.toString()}
                                    disabled={!isAdmin || currentUser === user._id} // Disable for current user
                                    onChange={(e) => handleRoleChange(user._id, e.target.value === 'true')}
                                    style={{ padding: '5px', borderRadius: '5px' }}
                                >
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                                <button
                                    disabled={!isAdmin || currentUser === user._id} // Disable delete for current user
                                    onClick={() => handleDelete(user._id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: !isAdmin || currentUser === user._id ? 'gray' : '#f44336',
                                        color: !isAdmin || currentUser === user._id ? '#ccc' : '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: !isAdmin || currentUser === user._id ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsers;
