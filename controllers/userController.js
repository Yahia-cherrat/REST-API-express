
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mike" }
];

// Get all users
const getUsers = (req, res) => {
    const limit = req.query.limit; // Limit users to the specified number of users per request
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(users.slice(0, limit));
    } else {
        res.status(200).json(users);
    }
}

// Get single user by id
const getUser = (req, res, next) => {
    const id = parseInt(req.params.id);

    // if user does not exist
    const user = users.find((user) => user.id === id);
    if (!user) {
        const err = new Error(`User with the id of ${id} was not found`);
        err.status = 404;
        return next(err);
    } else {
        res.status(200).json(user);
    }
}

// Create User
const createUser = (req, res, next) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    if (!newUser.name) {
        const err = new Error(`Provide a name for the user, Please!`);
        err.status = 400;
        return next(err);
    }

    users.push(newUser);
    res.status(201).json(users);
}

// Update a User
const updateUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        const err = new Error(`User with the id of ${id} was not found`);
        err.status = 404;
        return next(err);
    }

    if (req.body.name) {
        user.name = req.body.name;
        res.status(200).json(users);
    } else {
        res.status(400).json({ message: 'Name is required to update the user.' });
    }
}

// Delete a User
const deleteUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        const err = new Error(`User with the id of ${id} was not found`);
        err.status = 404;
        return next(err);
    }

    users = users.filter((user) => user.id !== id);
    res.status(200).json(users);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}