const User = require('../models/user.model.js');
const bcrypt = require("bcryptjs");

// Create and Save a new user
exports.create = (req, res) => {
    const { username, password, address, role } = req.body
    // Validate request
    if(!username) {
        return res.status(400).send({
            status: "failed",
            message: "Username is required"
        });
    }

    // Create a user
    const user = new User({
        username,
        password: bcrypt.hashSync(password, 8),
        address,
        role
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send({
            status: "success",
            data
        });
    }).catch(err => {
        res.status(500).send({
            status: "failed",
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .select('-password')
    .then(users => {
        res.send({
            status: "success",
            data: users
        });
    }).catch(err => {
        res.status(500).send({
            status: "failed",
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    const { userId } = req.params
    User.findById(userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });            
        }
        res.send({
            status: "success",
            data: user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });                
        }
        return res.status(500).send({
            status: "failed",
            message: "Error retrieving user with id " + userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    const { userId } = req.params
    const { username, password, address, role } = req.body
    // Validate Request
    if(!username) {
        return res.status(400).send({
            status: "failed",
            message: "Username is required"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(userId, {
        username,
        password: bcrypt.hashSync(password, 8),
        address
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });
        }
        res.send({
            status: "success",
            data: user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });                
        }
        return res.status(500).send({
            status: "failed",
            message: "Error updating user with id " + userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    const { userId } = req.params
    User.findByIdAndRemove(userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });
        }
        res.send({
            status: "success",
            message: "User deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                status: "failed",
                message: "User not found with id " + userId
            });                
        }
        return res.status(500).send({
            status: "failed",
            message: "Could not delete user with id " + userId
        });
    });
};
