const routes = module.exports = require('next-routes')()

// How to define a route
//.add('NAME', 'PATTERN = /name/:id', 'PAGE')
routes
    .add('friends', '/friends/:id', 'friends')
    .add('travels', '/travels', 'travels')

