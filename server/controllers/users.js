const User = require('../models').User;
const bcrypt = require('bcryptjs');
const config = require('../../config');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        return res.status(201).send({ auth: true, token });
      })
      .catch(error => res.status(400).send(error));
  },
  signIn(req, res) {
    return User
      .find({
        where: {
          email: req.body.email,
        },
      })
      .then(user => {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(404).send({
            message: 'User not Found',
          });
        }
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        res.status(201).send({ auth: true, token });
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
