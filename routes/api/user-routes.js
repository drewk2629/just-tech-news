const router = require('express').Router();
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access User model and run .findAll()
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    // same as SQL SELECT * FROM users
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        // same as SELECT * FROM users WHERE id = 1
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects username, email, password
    // same as SQL - INSERT INTO users (username, email, password) 
    // VALUES ("DrewKnoeller", "drewk2629@gmail.com", "thisismypassword1!")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'DrewKnoeller', email: 'drewk2629@gmail.com' password: 'thisismypassword1!'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        // SQL syntax would be UPDATE users
        // SET username = "DrewKnoeller", email = "drewk2629@gmail.com", password = "thisismypassword1!"
        // WHERE id = 1
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        this.console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;