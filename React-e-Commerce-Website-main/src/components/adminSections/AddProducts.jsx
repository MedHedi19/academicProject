import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AddProducts = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        inStock: "",
        fastDelivery: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const generateRandomRating = () => {
        return (Math.random() * (5 - 3) + 3).toFixed(1); // Generates a value between 3 and 5
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add random rating between 3 and 5 to formData
        const randomRating = parseFloat(generateRandomRating()); // Convert to number
        const updatedFormData = {
            ...formData,
            ratings: randomRating,
            price: parseFloat(formData.price), // Ensure price is a number
            inStock: formData.inStock === "" ? true : formData.inStock,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/Carts/",
                updatedFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Order created successfully!");
            setFormData({
                name: "",
                price: "",
                image: "",
                inStock: "",
                fastDelivery: true, // Reset to default
            });
            console.log("Created Order:", response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add new product. Please try again.");
        }
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add new product</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Price</label>
                    <input
                        style={styles.input}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Image URL</label>
                    <input
                        style={styles.input}
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        Fast Delivery
                        <input
                            style={{ marginLeft: "10px" }}
                            type="checkbox"
                            name="fastDelivery"
                            checked={formData.fastDelivery}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button style={styles.button} type="submit">
                    Add new product
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "500px",
        margin: "0 auto",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "16px",
        marginBottom: "5px",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#3498DB",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        textAlign: "center",
    },
};

export default AddProducts;
