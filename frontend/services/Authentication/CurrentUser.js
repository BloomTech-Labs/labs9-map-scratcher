import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import axios from 'axios';
import gql from 'graphql-tag';

axios.defaults.withCredentials = true

const userIdQuery = gql`
  {userId @client}
`;

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://backpaca-yoga.herokuapp.com'

export default function CurrentUser({ children }) {
  const fetchUser = async client => {
    const res = await axios.get(`${URL}/api/current_user`);
    const query = userIdQuery
    client.writeQuery({ query: userIdQuery, data: { userId: res.data.id }})
    const thing = client.readQuery({ query });
    console.log(thing)
    // client.writeData({ data: { userId: res.data.id } })
  }
  console.log(children);
  return (
    <ApolloConsumer>
      {client => {
        fetchUser(client)
        return <Fragment>{children}</Fragment>
      }}
    </ApolloConsumer>
  )
}
