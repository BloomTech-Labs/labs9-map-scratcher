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
    - [apollo-link-http](#Apollo-link-http)
    - [apollo-link-error](#Apollo-link-error)
    - [apollo-link-state](#Apollo-link-state)
    - [Apollo-cache-persist](#Apollo-cache-persist)
    - [Apollo-link](#Apollo-link)
    - [Apollo-link-context](#Apollo-link-context)
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
    - [Cookie-session](#Cookie-session)
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
- Running
- Environment Variables
 - Frontend
 - Backend
    
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

Used to store data from the client

### [Apollo-link-http](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link used to remotely fetch data

### [Apollo-link-error](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for handling errors

### [Apollo-link-state](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for local state management

### Apollo-cache-persist

### Apollo-link

### Apollo-link-context

### Auth0-lock

### Graphql

### Leaflet

### Node-sass

### React

### React-apollo

### React-dom

### React-leaflet

### React-router-dom

### React-scripts

### Semantic-ui-react

### Which-polygon

## Back-End dependencies (_Production_)

### Cookie-session

### Cors

### Dotenv

### Express-jwt

### Graphql-yoga

### Jsonwebtoken

### Jwks-rsa

### Lodash.get

### Prisma-client-lib

## Back-End dependencies (_Development_)

### Nodemon

