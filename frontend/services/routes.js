const routes = module.exports = require('next-routes')()


routes
// How to define a route
//.add('NAME', 'PATTERN = /name/:id', 'PAGE')
.add('friends', '/friends/:id', 'friends')
