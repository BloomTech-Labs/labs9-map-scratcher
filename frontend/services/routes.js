const routes = module.exports = require('next-routes')()


routes
// How to definte a route
//.add('NAME', 'PATTERN = /name/:id', 'PAGE')
.add('friends', '/friends/:id', 'friends')