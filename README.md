# Backpaca

## Introduction

- Backpaca is an web application that allows users to brag about their travel experiences and plan future adventures with their friends.

## Team

|Jacob A Brennan| Kyran McCann  | Lola Heffernan  | Conner Hoessly |
| ------------- |-------------| ---------------| --------------| 
| [<img src="https://avatars1.githubusercontent.com/u/2273265?s=400&v=4" width="80">](https://github.com/jacobabrennan)           | [<img src="https://avatars1.githubusercontent.com/u/27053629?s=400&v=4" width="80">](https://github.com/lolax/)              | [<img src="https://avatars1.githubusercontent.com/u/26800433?s=400&v=4" width="80">](https://github.com/kyranmccann)             | [<img src="https://avatars1.githubusercontent.com/u/38872454?s=400&u=2ac045e5fcbdc48357a5407acf888264d352092c&v=4" width="80">](https://github.com/TRIF3X)         | 
|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/JacobABrennan/)|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/kyran-mccann/)|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/lola-heffernan/)|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/conner-hoessly-0970b38a/)|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn
|[<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/jacobabrennan)|[<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/kyranmccann)|[<img src="https://github.com/favicon.ico" width="15"> Github](http://github.com/lolax/)|[<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/TRIF3X)|

## Deployment links

- front-end: https://backpaca.surge.sh/
- back-end: https://backpaca-yoga.herokuapp.com/
- database: https://backpaca-ed6c7c4fde.herokuapp.com/backpaca/prod

# Table of Contents

- [Introduction](#Introduction)
- [Team](#Team)
- [Deployment Links](#Deployment-links)
- [Table of Contents](#Table-of-Contents)
- [Tech-Stack](#Tech-Stack)
  - [Front-End production dependencies](#Front-End-Dependencies-Production)
    - [apollo-client](#Apollo-Client)
    - [apollo-cache-inmemory](#Apollo-cache-inmemory)
    - [Apollo-link](#Apollo-link)
    - [apollo-link-http](#Apollo-link-http)
    - [apollo-link-error](#Apollo-link-error)
    - [apollo-link-state](#Apollo-link-state)
    - [Apollo-link-context](#Apollo-link-context)
    - [Apollo-cache-persist](#Apollo-cache-persist)
    - [Auth0-lock](#Auth0-lock)
    - [Graphql](#Graphql)
    - [Leaflet](#Leaflet)
    - [Node-sass](#Node-sass)
    - [React](#React)
    - [React-apollo](#React-apollo)
    - [React-dom](#React-dom)
    - [React-leaflet](#React-leaflet)
    - [React-router-dom](#React-router-dom)
    - [React-scripts](#React-scripts)
    - [Semantic-ui-react](#Semantic-ui-react)
    - [Which-polygon](#Which-polygon)
  - [Back-End production dependencies](#Back-End-dependencies-Production)
    - [Cors](#Cors)
    - [Dotenv](#Dotenv)
    - [Express-jwt](#Express-jwt)
    - [Graphql-yoga](#Graphql-yoga)
    - [Jsonwebtoken](#Jsonwebtoken)
    - [Jwks-rsa](#Jwks-rsa)
    - [Lodash.get](#Lodash.get)
    - [Prisma-client-lib](#Prisma-client-lib)
  - [Back-End development dependencies](#Back-End-dependencies-Development)
     - [Nodemon](#Nodemon)
- [Running](#Running)
- [Environment variables](#Enviornment-variables)
 - [Frontend](#Frontend)
 - [Backend](#Backend)
    
# Running

>cd /frontend > `yarn dev` : Runs the frontend on `http://localhost:3000`

>cd /backend > `yarn dev` : Runs the backend locally with nodemon on `http://localhost:4000`

# Environment variables

## Frontend

`REACT_APP_AUTH0_DOMAIN` : domain name

`REACT_APP_AUTH0_CLIENT_ID` : Your personal Auth0 Client ID

`REACT_APP_AUTH0_CLIENT_SECRET` : Secret for Auth0

`REACT_APP_AUTH0_AUDIENCE` : URL 

## Backend

`REACT_APP_AUTH0_ISSUER` : URL

`REACT_APP_AUTH0_CLIENT_SECRET` : Secret for Auth0 (Same as frontend)

`REACT_APP_AUTH0_AUDIENCE` : URL (Same as frontend)

# Tech-Stack

## Front-End Dependencies (_Production_)

### [Apollo-Client](https://github.com/apollographql/apollo-client)

A fully-featured caching GraphQL client that integrates with React. It allows for you to build UI components that will fetch data using GraphQL.

### [Apollo-cache-inmemory](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

Used to store data from the client.

### [Apollo-link](https://github.com/apollographql/apollo-link)

A standard interface for modifying control flow of GraphQL requests and fetching GraphQL results.

### [Apollo-link-http](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link used to remotely fetch data.

### [Apollo-link-error](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for handling errors.

### [Apollo-link-state](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for local state management.

### [Apollo-link-context](https://www.npmjs.com/package/apollo-link-context)

Allows for async look up of things like Authentication tokens. Provides a function that returns either an object or a promise that returns an object to set the new context of the request.

### [Apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist)

Provides persistence for Apollo Client, the Apollo cache will immediately be restored asynchronously and will be persisted upon every write to the cache.

### [Auth0-lock](https://github.com/auth0/lock)

Allows for authentication through social and enterprise identity providers. Supports both logging the user in and registering the user. 

### [Graphql](https://www.npmjs.com/package/graphql)

A data query and manipulation language built in Javascript for APIs. GraphQL allows the client to retrieve exactly what they are asking for and nothing more.

### [Leaflet](https://github.com/Leaflet/Leaflet)

A Javascript library for for light-weight, mobile-friendly maps.

### [Node-sass](https://github.com/sass/node-sass)

Binds Node.JS to [LibSass](https://github.com/sass/libsass) which is used to complile Sass.

### [React](https://reactjs.org/)

A fast and scalable Javascript library for building user interfaces. Allows for a lot of out of the box solutions to modern problems. React has a large community backing which allows for finding solutions to most problems easy accessible. 

### [React-apollo](https://github.com/apollographql/react-apollo)

Allows for fetching of data from the GraphQL server and use of the data for building UIs with React right out of the box.

### [React-dom](https://www.npmjs.com/package/react-dom)

Pairs with react to serve as the entry point to the DOM.

### [React-leaflet](https://react-leaflet.js.org/)

React-leaflet provides for an abstraction of Leaflet as React components. This does not replace Leaflet but leverages React's lifecycle methods to call the relevant Leaflet handlers.

### [React-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

Binds React Router to the DOM.

### [React-scripts](https://www.npmjs.com/package/react-scripts)

Includes the scripts and configuration used by Create React App.

See documentation [here](https://facebook.github.io/create-react-app/docs/getting-started) on how to use Create React App.

### [Semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React)

A react implementation of Semantic-UI which is a component framework used to build elegant user interfaces.

### [Which-polygon](https://www.npmjs.com/package/which-polygon)

Used within our map, which-polygon allows for matching against a set of GeoJSON polygons to determine the location of a country.

## Back-End dependencies (_Production_)

### [Cors](https://www.npmjs.com/package/cors)

A node.js package used as a middleware for Express that allows for enabling of CORS with various options.

### [Dotenv](https://www.npmjs.com/package/dotenv)

Allows for loading of environment variables from a `.env` file into `process.env` separating the configuration environment from the actual code.

### [Express-jwt](https://github.com/auth0/express-jwt)

Middleware to validate the JsonWebToken which allows for authentication of JWT tokens in the application.

### [Graphql-yoga](https://github.com/prisma/graphql-yoga)

A fully featured GraphQL Server that allows us to implement our Query and Mutation Resolvers, check permissions, and authenticates our JsonWebTokens.

### [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

An implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519) used for Auth0.

### [Jwks-rsa](https://github.com/auth0/node-jwks-rsa)

A library used to retrieve RSA signing kets from a JSON Web Key Set endpoint. Jwks-rsa is used with Auth0.

### [Lodash.get](https://www.npmjs.com/package/lodash.get)

A lodash method used to get the value at path of an object. If the resolved value is undefined, the default value will be returned.

### [Prisma-client-lib](https://www.npmjs.com/package/prisma-client-lib)

Includes all the dependancies besides GraphQL needed to run Prisma client in Javascript. Prisma is our GraphQL database interface that provides a set of CRUD APIs for the database. Prisma also allows us to define our schema and add data relationships.

## Back-End dependencies (_Development_)

### [Nodemon](https://github.com/remy/nodemon)

Watches for changes in the server and automatically restarts the server once changes are detected.

