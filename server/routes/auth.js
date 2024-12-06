const router = require('express').Router();
const authController = require("../controllers/authControllers");
const { checkAuth, checkAdmin } = require('../middleware/verifyToken');

router.post('/login', authController.Login);
router.get('/', checkAuth, authController.getAllUsers);
router.post('/addUser', checkAuth, checkAdmin, authController.addUser);
router.delete('/:userId', checkAuth, checkAdmin, authController.deleteUser);
router.put('/updateRole/:id', checkAuth, checkAdmin, authController.updateUserRole);
router.get('/getPersonalInfo', checkAuth, authController.getPersonalInfo);
router.put('/editPersonalInfo', checkAuth, authController.editPersonalInfo);

module.exports = router;