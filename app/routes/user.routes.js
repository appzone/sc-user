module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const auth = require('../../middleware/auth.js');
    const role = require('../../middleware/role.js');

    // Create a new user
    app.post('/sc-user/users', auth, role, users.create);

    // Retrieve all users
    app.get('/sc-user/users', auth, users.findAll);

    // Retrieve a single user with UserId
    app.get('/sc-user/users/:userId', auth, users.findOne);

    // Update a user with userid
    app.put('/sc-user/users/:userId', auth, role, users.update);

    // Delete a user with userid
    app.delete('/sc-user/users/:userId', auth, role, users.delete);
}