import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function ManageAccount() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
    });

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
        // Fetch the personal info on component mount
        const fetchPersonalInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:5000/api/auth/getPersonalInfo",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFormData(response.data);
            } catch (error) {
                notifyError("Failed to fetch personal information");
                console.error(error);
            }
        };
        fetchPersonalInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:5000/api/auth/editPersonalInfo",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            notifySuccess("Personal information updated successfully!");
        } catch (error) {
            notifyError("Failed to update personal information");
            console.error(error);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Edit Personal Information
            </h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    width: "400px",
                }}
            >
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="username"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="email"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="phoneNumber"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}