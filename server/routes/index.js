const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to todos API',
  }));

  app.get('/api/users', usersController.retrieve);
  app.post('/api/users', usersController.create);
  app.put('/api/users', usersController.update);
  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
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
