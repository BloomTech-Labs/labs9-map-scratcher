import Link from 'next/link';

import Login from '../components/Login/Login.js'

export default () => (
  <div>
    <p>
      <Link href="/">
        <a>Home </a>
      </Link>
      >
      <Link href="/login">
        <a> Login</a>
      </Link>
    </p>
    <Login />
  </div>
);