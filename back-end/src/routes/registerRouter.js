const { Router } = require('express');
const registerController = require('../controllers/registerController');
const middlewareRegister = require('../middlewares/registerMiddleware');

const registerRouter = Router();

registerRouter.post('/', middlewareRegister.validateCreateUser, registerController.registerUser);
registerRouter.post('/admin', registerController.registerNewUserAdmin);

module.exports = registerRouter;
