const router = require('express').Router();
const cartController = require("../controllers/cartControllers");
const { checkAuth } = require('../middleware/verifyToken');

router.get("/", cartController.getAllCarts)
router.post("/", checkAuth, cartController.createCartItem)
router.delete('/:id', checkAuth, cartController.deleteCart);
router.put('/:id', checkAuth, cartController.updateCartItem);


module.exports = router;