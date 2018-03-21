const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user not fonund',
          });
        }
        return user
          .update({
            firstName: req.body.firstname || user.firstname,
            lastName: req.body.firstname || user.lastname,
            email: req.body.firstname || user.email,
            password: req.body.firstname || user.password,
          })
          .then(res.status(201).send(user))
          .catch(error => res.status(400).send(error));
      });
  },
};
