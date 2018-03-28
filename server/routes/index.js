const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const jwt = require('jsonwebtoken');
const config = require('../../config');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to todos API',
  }));

  app.use('/api/todos', (req, res, next) => {
    jwt.verify(req.headers.authorization, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  });

  app.post('/api/users/signIn', usersController.signIn);
  app.post('/api/users/signUp', usersController.signUp);
  app.put('/api/users/update', usersController.update);
  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.put('/api/todos/:todoId', todosController.update);
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
