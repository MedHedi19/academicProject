const Cart = require("../models/cartSchema");


async function createCartItem(req, res) {
    try {
        const { name, price, image, inStock, fastDelivery, ratings } = req.body;
        if (!name || !price || !image || !inStock || fastDelivery === undefined || !ratings) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newCartItem = new Cart({
            name,
            price,
            image,
            inStock,
            fastDelivery,
            ratings
        });
        const savedCartItem = await newCartItem.save();
        res.status(201).json({
            id: savedCartItem._id,
            name: savedCartItem.name,
            price: savedCartItem.price,
            image: savedCartItem.image,
            inStock: savedCartItem.inStock,
            fastDelivery: savedCartItem.fastDelivery,
            ratings: savedCartItem.ratings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create cart item." });
    }
};

async function getAllCarts(req, res) {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function deleteCart(req, res) {
    try {
        const { id } = req.params;
        const deletedCartItem = await Cart.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({ error: "Cart item not found." });
        }

        res.status(200).json({ message: "Cart item deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete cart item." });
    }
}
async function updateCartItem(req, res) {
    try {
        const { id } = req.params; // Get the ID of the cart item from the request parameters
        const { name, price, image, inStock, fastDelivery, ratings } = req.body; // Get updated details from the request body

        // Ensure that the required fields are provided in the body
        if (!name || !price || !image || !inStock || fastDelivery === undefined || !ratings) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Find the cart item by ID and update it
        const updatedCartItem = await Cart.findByIdAndUpdate(
            id,
            { name, price, image, inStock, fastDelivery, ratings },
            { new: true } // This ensures the updated document is returned
        );

        if (!updatedCartItem) {
            return res.status(404).json({ error: "Cart item not found." });
        }

        res.status(200).json({
            id: updatedCartItem._id,
            name: updatedCartItem.name,
            price: updatedCartItem.price,
            image: updatedCartItem.image,
            inStock: updatedCartItem.inStock,
            fastDelivery: updatedCartItem.fastDelivery,
            ratings: updatedCartItem.ratings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update cart item." });
    }
}



module.exports = {
    getAllCarts,
    createCartItem,
    deleteCart,
    updateCartItem
}