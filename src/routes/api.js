const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const TodoController = require('../controllers/TodoController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

const router = express.Router();

// Profile Route
router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', ProfileController.UserLogin);
router.get(
    '/SelectProfile',
    AuthVerifyMiddleware,
    ProfileController.SelectProfile
);
router.post(
    '/UpdateProfile',
    AuthVerifyMiddleware,
    ProfileController.UpdateProfile
);

// Todo List Route
router.post('/CreateTodo', AuthVerifyMiddleware, TodoController.CreateTodo);
router.get('/ReadTodo', AuthVerifyMiddleware, TodoController.ReadTodo);
router.post('/UpdateTodo', AuthVerifyMiddleware, TodoController.UpdateTodo);
router.post('/UpdateStatus', AuthVerifyMiddleware, TodoController.UpdateStatus);
router.post('/RemoveTodo', AuthVerifyMiddleware, TodoController.RemoveTodo);
router.post(
    '/SelectTodoStatus',
    AuthVerifyMiddleware,
    TodoController.SelectTodoStatus
);
router.post(
    '/SelectTodoDate',
    AuthVerifyMiddleware,
    TodoController.SelectTodoDate
);

module.exports = router;
