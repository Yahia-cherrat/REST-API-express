const express = require('express');
const router = express.Router();

let users = [
    {id: 1, name:"John"},
    {id: 2, name:"Jane"},
    {id: 3, name:"Mike"}
]

// Get all users
router.get('/', (req, res) => {
    const limit = req.query.limit; // Limit users to the specified number of users per request
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(users.slice(0, limit));
    }else{
        res.status(200).json(users);
    }
})

// Get single user by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // if user does not exist
    const user = users.find((user) => user.id === id);
    if(!user){
        res.status(404).json({message: `User with the id of ${id} was not found`});
    }else{
        res.status(200).json(users.find((user) => user.id === id));
    }
})

// Create a new user
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    }

    if(!newUser.name){
        res.status(400).json({ message: `Provide a name for the user, Please!` });
    }

    users.push(newUser);

    res.status(201).json(users);
})

// Update a user
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);

    if(!user){
        res.status(404).json({message: `User with the id of ${id} was not found`});
    }
    
    user.name = req.body.name;
    res.status(200).json(users);
    
})

module.exports = router;
