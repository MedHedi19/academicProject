import React, { useState } from 'react';
import AddUser from './adminSections/AddUser';
import MangeUsers from './adminSections/ManageUsers';
import AddProducts from './adminSections/AddProducts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ManageUsers from './adminSections/ManageUsers';
import { useDispatch } from 'react-redux';
import { logout } from '../context/loginContext/authActions';
import { jwtDecode } from "jwt-decode";
import ManageProduct from './adminSections/ManageProduct';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("addProducts");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Decode the token to get the isAdmin field
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdmin = decodedToken?.isAdmin;
    const notifyError = (message) =>
        toast.error(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true,
        });

    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-left",
            autoClose: 1500,
            closeOnClick: true,
        });

    const handleSectionToggle = (section) => {
        if (section === 'addUser' && !isAdmin) {
            notifyError('You are not allowed to access this section!');
        } else {
            setActiveSection(activeSection === section ? null : section);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        notifySuccess('Logged out successfully');
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
                <div
                    style={styles.sidebarItem}
                    onClick={() => handleSectionToggle('addUser')}
                >
                    Add User
                </div>
                <div
                    style={styles.sidebarItem}
                    onClick={() => handleSectionToggle('ManageUsers')}
                >
                    Manage Users
                </div>
                <div
                    style={styles.sidebarItem}
                    onClick={() => handleSectionToggle('addProducts')}
                >
                    Add Product
                </div>
                <div
                    style={styles.sidebarItem}
                    onClick={() => handleSectionToggle('ManageProduct')}
                >
                    Manage Product
                </div>
                <div
                    style={styles.sidebarItem}
                    onClick={() => navigate('/')}
                >
                    Back to shop
                </div>
                <div
                    style={{ ...styles.sidebarItem, marginTop: 'auto', backgroundColor: '#E74C3C', color: '#fff' }}
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>

            <div style={styles.mainContent}>
                {activeSection === 'addUser' && isAdmin && (
                    <div style={styles.section}>
                        <AddUser />
                    </div>
                )}

                {activeSection === 'ManageUsers' && (
                    <div style={styles.section}>
                        <ManageUsers isAdmin={isAdmin} />
                    </div>
                )}

                {activeSection === 'addProducts' && (
                    <div style={styles.section}>
                        <AddProducts />
                    </div>
                )}
                {activeSection === 'ManageProduct' && (
                    <div style={styles.section}>
                        <ManageProduct />
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f4f4f9',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#2C3E50',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    sidebarTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '30px',
    },
    sidebarItem: {
        fontSize: '18px',
        fontWeight: 'normal',
        marginBottom: '20px',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        textAlign: 'left',
        transition: 'background-color 0.3s',
    },
    sidebarItemActive: {
        backgroundColor: '#34495E',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    section: {
        padding: '20px',
        width: '80%',
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default AdminDashboard;