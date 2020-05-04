const routes = app => {
  app.get('/', (req, res) => {
    res.send('Hello!!')
  });
}

module.exports = routes;
