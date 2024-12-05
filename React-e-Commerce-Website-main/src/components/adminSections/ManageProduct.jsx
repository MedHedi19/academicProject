import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



function ManageProduct({ isAdmin }) {
    const [products, setProducts] = useState([]);
    const [loadingId, setLoadingId] = useState(null); // To track the loading state of each delete button

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/carts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error fetching products');
            }
        };
        fetchProducts();
    }, []);

    // Handle delete product
    const handleDelete = async (productId) => {
        setLoadingId(productId); // Set loadingId to show the spinner on the button

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/carts/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter(product => product._id !== productId));
            notifySuccess('Product deleted successfully');
        } catch (error) {
            notifyError(error.response?.data?.message || 'Error deleting product');
        } finally {
            setLoadingId(null); // Reset loading state after the request completes
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Products</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Image URL</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Stock Status</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td style={styles.cell}>{product.name}</td>
                            <td style={styles.cell}>{product.price}</td>
                            <td style={styles.cell}>{product.image}</td>
                            <td style={styles.cell}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </td>
                            <td style={styles.cell}>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#f44336',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                    disabled={loadingId === product._id}
                                >
                                    {loadingId === product._id ? (
                                        <span className="spinner" style={styles.spinner}></span>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    cell: {
        padding: '10px',
        border: '1px solid #ccc',
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    spinner: {
        border: '3px solid #f3f3f3', /* Light grey */
        borderTop: '3px solid #3498db', /* Blue */
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        animation: 'spin 1s linear infinite',
        display: 'inline-block',
    },
};

export default ManageProduct;