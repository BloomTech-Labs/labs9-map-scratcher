import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import axios from 'axios';

axios.defaults.withCredentials = true;

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://backpaca-yoga.herokuapp.com';

export default function CurrentUser({ children }) {
  const fetchUser = async client => {
    const res = await axios.get(`${URL}/api/current_user`);
    if (res.data.id !== undefined) {
      client.writeData({ data: { userId: res.data.id } });
    }
  };

  return (
    <ApolloConsumer>
      {client => {
        fetchUser(client);
        return <Fragment>{children}</Fragment>;
      }}
    </ApolloConsumer>
  );
}
