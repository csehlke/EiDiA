"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');

let allowedTokens = new Set();

const exportAllowedTokens = () => {
    return allowedTokens
}

const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property',
        });
    }

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a username property'
        });
    }

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {
            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password); //compares entered password with hashed pw from db
            if (!isPasswordValid) {
                return res.status(401).send({token: null});
            }

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({id: user._id, username: user.username, userRole: user.userRole}, config.JwtSecret, {
                expiresIn: 60 * 60 * 10, // expires in 10 hours
            });
            // add token to whitelist
            allowedTokens.add(token)
            res.status(200).json({token: token});
        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));
};


const register = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property',
        });
    }

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a username property',
        });
    }

    if (!Object.prototype.hasOwnProperty.call(req.body, 'userRole') || !(req.body.userRole === 'admin' || req.body.userRole === 'user')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a userRole property which is either admin or user',
        });
    }

    const user = {};
    user['username'] = req.body.username;
    user['password'] = bcrypt.hashSync(req.body.password, 8);
    user['userRole'] = req.body.userRole;

    user['firstName'] = req.body.firstName ? req.body.firstName : '';
    user['lastName'] = req.body.lastName ? req.body.lastName : '';
    user['picture'] = req.body.picture ? req.body.picture : null;
    user['workPosition'] = req.body.workPosition ? req.body.workPosition : '';
    user['workLocation'] = req.body.workLocation ? req.body.workLocation : '';
    user['settings'] = {};

    UserModel.create(user)
        .then(user => {
            // return new user so it can be added to the table
            res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: '⬤⬤⬤⬤⬤',
                    workPosition: user.workPosition,
                    workLocation: user.workLocation,
                    userRole: user.userRole,
                }
            });
        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'Username already exists',
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message,
                });
            }
        });
};

const me = (req, res) => {
    UserModel.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `User not found`,
                });
            }
            res.status(200).json({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
                workPosition: user.workPosition,
                workLocation: user.workLocation,
            });
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        }));
};

const logout = (req, res) => {
    let token = req.headers.authorization.substring(4);

    allowedTokens.delete(token);
    let tokensToDelete = new Set();
    allowedTokens.forEach(token => {
        jwt.verify(token, config.JwtSecret, (err) => {
            if (err) {
                tokensToDelete.add(token);
            }
        });
    });
    tokensToDelete.forEach(token => allowedTokens.delete(token));

    return res.status(401).send({
        message: 'Logged out successfully'
    });
};

const getSettings = (req, res) => {
    UserModel.findById(req.userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `User not found`,
                });
            }
            res.status(200).json({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
                workPosition: user.workPosition,
                workLocation: user.workLocation,
                settings: user.settings,
            });
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        }));
};

const saveSettings = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    const user = {};
    if (req.body.password) {
        user['password'] = bcrypt.hashSync(req.body.password, 8);
    }
    if (req.body.firstName) {
        user['firstName'] = req.body.firstName;
    }
    if (req.body.lastName) {
        user['lastName'] = req.body.lastName;
    }
    if (req.body.picture) {
        user['picture'] = req.body.picture;
    }
    if (req.body.workPosition) {
        user['workPosition'] = req.body.workPosition;
    }
    if (req.body.workLocation) {
        user['workLocation'] = req.body.workLocation;
    }
    if (req.body.settings) {
        user['settings'] = req.body.settings;
    }

    UserModel.findByIdAndUpdate(req.userId, user, {new: true, runValidators: true}).exec()
        .then(user => res.status(200).json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                workPosition: user.workPosition,
                workLocation: user.workLocation,
                settings: user.settings,
            }
        }))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const listUsersForAdministration = (req, res) => {
    UserModel.find()
        .then(users => {
            let response = users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: '⬤⬤⬤⬤⬤',
                    workPosition: user.workPosition,
                    workLocation: user.workLocation,
                    userRole: user.userRole,
                };
            });
            res.status(200).json({users: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const updateUser = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    const user = {};
    if (req.body.password) {
        user['password'] = bcrypt.hashSync(req.body.password, 8);
    }
    if (req.body.userRole && req.userId !== req.params.id) {
        user['userRole'] = req.body.userRole;
    }
    if (req.body.firstName) {
        user['firstName'] = req.body.firstName;
    }
    if (req.body.lastName) {
        user['lastName'] = req.body.lastName;
    }
    if (req.body.picture) {
        user['picture'] = req.body.picture;
    }
    if (req.body.workPosition) {
        user['workPosition'] = req.body.workPosition;
    }
    if (req.body.workLocation) {
        user['workLocation'] = req.body.workLocation;
    }

    UserModel.findByIdAndUpdate(req.params.id, user, {new: true, runValidators: true}).exec()
        .then(user => res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                password: '⬤⬤⬤⬤⬤',
                workPosition: user.workPosition,
                workLocation: user.workLocation,
                userRole: user.userRole,
            }
        }))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const deleteUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id).exec()
        .then(() => res.status(200).json({message: `User with id ${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}

const listUsers = (req, res) => {
    UserModel.find()
        .then(users => {
            let response = users.map(user => {
                const name = [user.firstName, user.lastName].filter(a => a).join(" "); // First and Last Name are not required
                return {
                    id: user._id,
                    username: user.username,
                    name: name ? name : user.username,
                };
            });
            response.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({users: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

module.exports = {
    login,
    register,
    logout,
    me,
    getSettings,
    saveSettings,
    listUsers,
    exportAllowedTokens,
    listUsersForAdministration,
    updateUser,
    deleteUser,
};
