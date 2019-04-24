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

- front-end: https://backpaca.app/
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
    - [Recharts](#Recharts)
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
- [Auth0 Setup](#Auth0-Setup)
- [API Documentation](#API-Documentation)
  - [Yoga Server Mutations and Queries](#Yoga-Server-Mutations-and-Queries)
    - [Query example](#User-Query-example)
    - [Mutation example](#updateUser-Mutation-example)
  - [Database Mutations and Queries](#Database-Mutations-and-Queries)
    - [Query example](#User-query-with-multiple-subfields-example)
    - [Mutation example](#updateUser-mutation-example)
    
# Running

>cd /frontend > `yarn` to install dependencies > `yarn dev` : Runs the frontend on `http://localhost:3000`

>cd /backend > `yarn` to install dependencies > `yarn dev` : Runs the backend locally with [nodemon](#Nodemon) on `http://localhost:4000`

# Environment variables

> See [Auth0 Setup](#Auth0-Setup) for a guide on how to assign environment variables with Auth0

## Frontend

In a `.env` file at the highest level of the front end folder add these environment variables:

`REACT_APP_AUTH0_DOMAIN` : domain name

`REACT_APP_AUTH0_CLIENT_ID` : Your personal Auth0 Client ID

`REACT_APP_AUTH0_CLIENT_SECRET` : Secret for Auth0

`REACT_APP_AUTH0_AUDIENCE` : URL 

## Backend

In a `config.env` file at the highest level of the project add these environment variables:

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

### [Recharts](https://www.npmjs.com/package/recharts)

Used to build the user visit distribution pie chart. Recharts is a library built with React and [D3](https://d3js.org/). The purpose of Recharts is to help in the writing of charts.

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

## Auth0 Setup

* Log in or sign up for an account at Auth0.com.

* Create a new tenant domain. You will be prompted to do so if this is a new account.

* Go to your dashboard and create a new single page web application.

* Go to the Applications tab and open your newly created App.

* Copy and paste the domain field into the REACT_APP_AUTH0_DOMAIN key.

* Copy and paste your Client ID field into the REACT_APP_AUTH0_CLIENT_ID key.

* Scroll down to the Allowed Callback URLs field. Enter http://localhost:3000/callback

* In the Allowed Web Origins field, the Allowed Logout URLs field, and the Allowed Origins(CORS) field, enter http://localhost:3000

* Under the APIs tab, create a new API. Use the identifier http://localhost:5000

* To use our custom log in widget, go to the Hosted Pages tab, enable the Custom Login Page switch and paste the following code over the existing widget code.

## API Documentation

### Yoga Server Mutations and Queries

GraphQL allows for the client to retrieve only the information they request. Here is an example of how you can use GraphQL. You can find our schema [here](https://backpaca-yoga.herokuapp.com/). When clicking the link you will be navigated to the GraphQL interactive playground where you can perform queries and mutations that are provided by the schema when the tab on the right side is opened.

#### User Query example

```
query {
  user(id: "cjqpxk83t000o0829p7mr6qto") {
    id
    name
    nickname
    scratchingAutomated
    isPrivate
    identity
    twitterHandle
  }
}
```

Using the schema you can see on the user route we have a variety of responses we can retrieve off the user.

`id` : The id of the user

`name` : The users name

`nickname` : The nickname set by the user on their profile page

`scratchingAutomated` : Boolean - Is scratching automated for the modal scratch off

`isPrivate` : Boolean - Is the users profile set to private on their profile page

`idenitity` : How the user was authenticated

`twitterHandle` : The current users Twitter handle

##### We would expect a response within a data object

```
{
  "data": {
    "user": {
      "id": "cjqpxk83t000o0829p7mr6qto",
      "name": "Ally Paca",
      "nickname": "Al",
      "scratchingAutomated": null,
      "isPrivate": true,
      "identity": null,
      "twitterHandle": null,
      "auth0id": null
    }
  }
}
```

#### updateUser Mutation example

```
mutation {
  updateUser(id:"cjqpxk83t000o0829p7mr6qto", bio: "cool new bio") {
    name
    id
    nickname
    bio
  }
}
```
A mutation is how we change the data of an object, which in this case is updating the users information.

We will first call updateUser then pass in the users id. Our next argument to updateUser is our data field. In the data field we will pass what we want to update on the user, which is bio in this example.

`name` : The name of the user from the where argument

`id` : The id of the user

`nickname` : The current users nickname

`bio` : The updated bio of the user

##### We would expect a response within a data object

```
{
  "data": {
    "updateUser": {
      "name": "Ally Paca",
      "id": "cjqpxk83t000o0829p7mr6qto",
      "nickname": "Al",
      "bio": "cool new bio"
    }
  }
}
```



### Database Mutations and Queries

Using the database we can expect a similar experience with a slightly different syntax. You can find our database schema [here](https://backpaca-ed6c7c4fde.herokuapp.com/backpaca/prod). When in the GraphQL interactive playground, navigate to the right side of the screen and click the **DOCS** tab this time.

#### User query with multiple subfields example

```
query {
  user(where: { id: "cjqpxk83t000o0829p7mr6qto" }) {
    name
    id
    visits {
      id
      country {
	name
        code
      }
    }
  }
}
```

Here we are querying for the user and asking for their visits and the country of those visits with the country name and country code.

`name` : The current users name we are querying

`id` : The Id of the queried user

`visits` : An object containing the users visits

`id` : The id of the visit nested inside the visits object

`country` : An object containing the country within that users visit

`name` : The name of the country inside the country object

`code` : The country code inside of the country object

##### We would expect a response within a data object

```
{
  "data": {
    "user": {
      "name": "Ally Paca",
      "id": "cjqpxk83t000o0829p7mr6qto",
      "visits": [
        {
          "id": "cjr0da23s002r0847hq4jx8g5",
          "country": {
            "name": "Hungary",
            "code": "HUN"
          }
        }
      ]
    }
  }
}
```

#### updateUser mutation example

```
mutation {
  updateUser(where: { id: "cjqpxk83t000o0829p7mr6qto" }, data: { bio: "My new bio" }) {
    name
    bio
  }
}
```

A mutation is how we change the data of an object, which in this case is updating the users information.

We will first call `updateUser` then pass in `where` which is an object containing the users **id**. Our next argument to `updateUser` is our data field. In the data field we will pass an object of what we want to update on the user.

`where: {id: cjqpxk83t000o0829p7mr6qto}` : Contains the user we are updating

`data: {bio: "My new bio"}` : The field we are updating with the updated content

`name` : The name of the user from the `where` argument

`bio` : The updated bio of the user

##### We would expect a response within a data object

```
{
  "data": {
    "updateUser": {
      "name": "Ally Paca",
      "bio": "My new bio"
    }
  }
}
```
