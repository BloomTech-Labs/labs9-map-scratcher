const routes = module.exports = require('next-routes')()

routes
.add('friends', '/friends/:id', 'friends')