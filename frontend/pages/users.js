import Link from 'next/link';

import Users from '../components/User/Users.js';

export default () => (
  <div>
     <Link href="/">
        <a>Home </a>
      </Link>
      >
      <Link href="/users">
        <a> Users</a>
      </Link>
    <Users />
  </div>
);
