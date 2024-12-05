import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddUser() {
    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true
        });
    const notifyError = (message) =>
        toast.error(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true
        });
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        isAdmin: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            notifyError('Please enter a valid email address.');
            return;
        }

        if (formData.password.length < 6) {
            notifyError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/auth/addUser', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.status === 201) {
                notifySuccess('User added successfully!');
                setFormData({ username: '', email: '', phoneNumber: '', password: '', isAdmin: '' });
            }
        } catch (error) {
            const errorMessage = error.response?.data || 'Error adding user';
            notifyError(errorMessage);
            console.log(error.response.data);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add User</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                    width: "400px"
                }}
            >
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
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

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                    <label htmlFor="isAdmin" style={{ display: 'block', marginBottom: '5px' }}>Is Admin</label>
                    <select
                        id="isAdmin"
                        name="isAdmin"
                        value={formData.isAdmin}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                        }}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
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
                    Add User
                </button>
            </form>
        </div>
    );
}

export default AddUser;
