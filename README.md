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
    - [apollo-boost](#Apollo-Boost)
    - [apollo-client](#Apollo-Client)
    - [apollo-cache-inmemory](#Apollo-cache-inmemory)
    - [apollo-link-http](#Apollo-link-http)
    - [apollo-link-error](#Apollo-link-error)
    - [apollo-link-state](#Apollo-link-state)
    - apollo-cache-persist
    - apollo-link
    - apollo-link-context
    - auth0-lock
    - graphql
    - leaflet
    - node-sass
    - react
    - react-apollo
    - react-dom
    - react-leaflet
    - react-router-dom
    - react-scripts
    - semantic-ui-react
    - which-polygon
  - Back-End production dependencies
    - cookie-session
    - cors
    - dotenv
    - express-jwt
    - graphql-yoga
    - jsonwebtoken
    - jwks-rsa
    - lodash.get
    - prisma-client-lib
  - Back-End development dependencies
     - nodemon
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

### [Apollo-boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost)

A package that contains some recommended defaults for using Apollo Client which include:

#### [Apollo-Client](https://github.com/apollographql/apollo-client)

A fully-featured caching GraphQL client that integrates with React. It allows for you to build UI components that will fetch data using GraphQL.

#### [Apollo-cache-inmemory](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

Used to store data from the client

#### [Apollo-link-http](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link used to remotely fetch data

#### [Apollo-link-error](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for handling errors

#### [Apollo-link-state](https://www.apollographql.com/docs/react/essentials/get-started.html#apollo-boost)

An Apollo link for local state management